import Debug from 'debug'
import * as path from 'path'
import * as tsm from 'ts-morph'
import * as Doc from './doc'
import {
  getLocationKind,
  getNodeFromTypePreferingAlias,
  hasAlias,
  isCallable,
  isPrimitive,
} from './utils'

const debug = Debug('dox:extract')
const debugExport = Debug('dox:extract:export')
const debugVisible = Debug('dox:extract:visible')
const debugWarn = Debug('dox:warn')

interface Options {
  entrypoints: string[]
  project?: tsm.Project
}

/**
 * Recursively extract docs from the given project starting from the exports of
 * the given list of entrypoint modules. Everything that is reachable from the
 * exports will be considered part of the API.
 */
export function fromProject(opts: Options): Doc.DocPackage {
  const project =
    opts.project ??
    new tsm.Project({
      tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
    })

  // If the project is in a bad state don't bother trying to extract docs from it
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length) {
    const message = project.formatDiagnosticsWithColorAndContext(diagnostics)
    throw new Error(message)
  }

  const sourceFiles = project.getSourceFiles()
  if (sourceFiles.length === 0) {
    throw new Error('No source files found in project to document.')
  }
  debug(
    'found project source files ',
    sourceFiles.map(sf => sf.getFilePath())
  )

  const sourceFileEntrypoints = []
  for (const findEntryPoint of opts.entrypoints) {
    const sf = sourceFiles.find(
      sf => sf.getBaseNameWithoutExtension() === findEntryPoint
    )
    if (!sf) {
      throw new Error(
        `Given entrypoint not found in project: ${findEntryPoint}`
      )
    }
    sourceFileEntrypoints.push(sf)
  }

  const docman = Doc.createManager()
  sourceFileEntrypoints.forEach(sf => {
    fromModule(docman, sf)
  })

  return docman.d
}

/**
 * Recursively extract docs starting from exports of the given module.
 * Everything that is reachable will be considered.
 */
export function fromModule(
  docs: Doc.Manager,
  sourceFile: tsm.SourceFile
): Doc.DocPackage {
  const mod = Doc.modFromSourceFile(sourceFile)

  for (const ex of sourceFile.getExportedDeclarations()) {
    const exportName = ex[0]
    const n = ex[1][0]
    debugExport('start')
    debugExport('-> node kind is %s', n.getKindName())
    debugExport('-> type text is %j', n.getType().getText())
    const doc = fromType(docs, n.getType())
    if (exportName === 'default') {
      mod.mainExport = doc
      continue
    }
    mod.namedExports.push(
      Doc.expor({
        name: exportName,
        type: doc,
        node: n,
      })
    )
  }

  docs.d.modules.push(mod)
  return docs.d
}

function fromType(manager: Doc.Manager, t: tsm.Type): Doc.Node {
  debugVisible('start')
  debugVisible('-> type text is %j', t.getText())
  const locationKind = getLocationKind(t)
  debugVisible('-> type location is %s', locationKind)

  if (locationKind === 'dep') {
    debugVisible('-> location is a dependency, stopping here')
    return Doc.unsupported(getRaw(t))
  }
  if (locationKind === 'typeScriptStandardLibrary') {
    // we handle arrays specially below
    if (!t.isArray()) {
      debugVisible('-> location is standard lib and not array, stopping here')
      return Doc.unsupported(getRaw(t))
    }
  }
  if (locationKind === 'unknown') {
    debugWarn(
      '-> location is unknown, stopping here to be safe (code needs to be updated to handle this case)'
    )
    return Doc.unsupported(getRaw(t))
  }
  if (manager.isIndexable(t)) {
    debugVisible('-> type is indexable')
    const fqtn = Doc.getFullyQualifiedTypeName(t)
    if (manager.isIndexed(fqtn)) {
      debugVisible(
        '-> type is being documented as link to the type index (aka. cache hit)'
      )
      return Doc.typeIndexRef(fqtn)
    }
  } else {
    debugVisible('-> type is not indexable')
  }
  if (t.isLiteral()) {
    debugVisible('-> type is literal')
    return Doc.literal({
      name: t.getText(),
      base: t.getBaseTypeOfLiteralType().getText(),
    })
  }
  if (isPrimitive(t)) {
    debugVisible('-> type is primitive')
    return Doc.prim(t.getText())
  }
  if (t.isArray()) {
    debugVisible('-> type is array')
    const innerType = t.getArrayElementTypeOrThrow()
    debugVisible('-> handle array inner type %s', innerType.getText())
    return manager.indexIfApplicable(t, () =>
      extractAliasIfOne(t, Doc.array(fromType(manager, innerType)))
    )
  }
  if (t.isInterface()) {
    debugVisible('-> type is interface')
    const s = t.getSymbolOrThrow()
    return manager.indexIfApplicable(t, () =>
      Doc.inter({
        name: s.getName(),
        props: propertyDocsFromType(manager, t),
        ...getRaw(t),
      })
    )
  }
  // Place before object becuase objects are superset.
  if (isCallable(t)) {
    debugVisible('-> type is callable')
    return manager.indexIfApplicable(t, () =>
      extractAliasIfOne(
        t,
        Doc.callable({
          props: propertyDocsFromType(manager, t),
          sigs: sigDocsFromType(manager, t),
          ...getRaw(t),
        })
      )
    )
  }
  // Place after callable check because objects are superset.
  if (t.isObject()) {
    debugVisible('-> type is object')
    return manager.indexIfApplicable(t, () =>
      extractAliasIfOne(
        t,
        Doc.obj({
          props: propertyDocsFromType(manager, t),
          ...getRaw(t),
        })
      )
    )
  }
  if (t.isUnion()) {
    debugVisible('-> type is union')
    return manager.indexIfApplicable(t, () =>
      extractAliasIfOne(
        t,
        Doc.union({
          ...getRaw(t),
          types: t.getUnionTypes().map(tm => {
            debugVisible('-> handle union member %s', tm.getText())
            // todo no extract alias here ...
            return extractAliasIfOne(tm, fromType(manager, tm))
          }),
        })
      )
    )
  }
  if (t.isIntersection()) {
    debugVisible('-> type is intersection')
    return manager.indexIfApplicable(t, () =>
      extractAliasIfOne(
        t,
        Doc.intersection({
          ...getRaw(t),
          types: t.getIntersectionTypes().map(tm => {
            debugVisible('-> handle intersection member %s', tm.getText())
            return fromType(manager, tm)
          }),
        })
      )
    )
  }
  debugWarn('unsupported kind of type %s', t.getText())
  return Doc.unsupported(getRaw(t))
}

function sigDocsFromType(docs: Doc.Manager, t: tsm.Type): Doc.DocSig[] {
  return t.getCallSignatures().map(sig => {
    const tRet = sig.getReturnType()
    const params = sig.getParameters()
    debugVisible('handle callable return: %s', tRet.getText())
    return Doc.sig({
      return: fromType(docs, tRet),
      params: params.map(p => {
        const node = p.getDeclarations()[0]
        const paramName = p.getName()
        const paramType = node.getType()
        // what is this method for then? It was just returning an `any` type
        // const paramType = p.getDeclaredType()
        // prettier-ignore
        debugVisible('handle callable param: %s %s %s', node.getKindName(), paramName, paramType.getText())
        return Doc.sigParam({
          name: paramName,
          type: fromType(docs, paramType),
        })
      }),
    })
  })
}

function propertyDocsFromType(docs: Doc.Manager, t: tsm.Type): Doc.DocProp[] {
  return t.getProperties().map(p => {
    // prettier-ignore
    const node = p.getDeclarations()[0] as tsm.PropertySignature | tsm.MethodSignature
    const propName = p.getName()
    const propType = node.getType()
    // what is this method for then? It was just returning an `any` type
    // const propType = p.getDeclaredType()
    // prettier-ignore
    debugVisible('handle property: %s %s %s', node.getKindName(), propName, propType.getText())
    // Do not try to index type here. Must come after index lookup.
    return Doc.prop({
      name: propName,
      type: fromType(docs, propType),
    })
  })
}

function extractAliasIfOne(t: tsm.Type, doc: Doc.Node): Doc.Node {
  // is it possible to get alias of aliases? It seems the checker "compacts"
  // these and if we __really__ wanted to "see" the chain we'd have to go the
  // node AST way.
  // debug(as?.getAliasedSymbol()?.getName())
  if (!hasAlias(t)) {
    return doc
  }
  const as = t.getAliasSymbol()!
  debug('-> type had alias %s (extracting a doc node for it)', as.getName())
  return Doc.alias({
    name: as.getName(),
    type: doc,
    ...getRaw(t),
  })
}

function getRaw(t: tsm.Type): Doc.Raw {
  const node = getNodeFromTypePreferingAlias(t)
  if (!node) {
    return {
      raw: {
        // todo null instead of empty string?
        nodeFullText: '',
        nodeText: '',
        typeText: t.getText().trim(),
      },
    }
  }
  return {
    raw: {
      typeText: t.getText().trim(),
      nodeText: node.getText().trim(),
      nodeFullText: node.getFullText().trim(),
    },
  }
}
