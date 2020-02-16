import Debug from 'debug'
import * as path from 'path'
import * as tsm from 'ts-morph'
import * as Doc from './doc'
import {
  getNodeFromTypePreferingAlias,
  hasAlias,
  isCallable,
  isNodeAtTypeLevel,
  isPrimitive,
  isTypeFromDependencies,
} from './utils'

const debug = Debug('dox:extract')
const debugExport = Debug('dox:extract:export')
const debugVisible = Debug('dox:extract:visible')

interface Options {
  entrypoints: string[]
  project?: tsm.Project
}

/**
 * Recursively extract docs from the given project starting from the exports of
 * the given list of entrypoint modules. Everything that is reachable from the
 * exports will be considered part of the API.
 */
export function extractDocsFromProject(opts: Options): Doc.DocPackage {
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
    extractDocsFromModule(docman, sf)
  })

  return docman.d
}

/**
 * Recursively extract docs starting from exports of the given module.
 * Everything that is reachable will be considered.
 */
export function extractDocsFromModule(
  docman: Doc.Manager,
  sourceFile: tsm.SourceFile
): Doc.DocPackage {
  const mod = {
    name: sourceFile.getBaseNameWithoutExtension(),
    // absoluteFilePath: sourceFile.getFilePath(),
    // projectRelativeFilePath: 'todo', // todo
    mainExport: null,
    namedExports: [],
  } as Doc.DocModule

  for (const ex of sourceFile.getExportedDeclarations()) {
    const exportName = ex[0]
    const n = ex[1][0]
    const typeDoc = extractDocsFromModuleExport(docman, n)
    const isType = isNodeAtTypeLevel(n)
    if (exportName === 'default') {
      mod.mainExport = typeDoc
      continue
    }
    mod.namedExports.push({
      kind: 'export',
      name: exportName,
      type: typeDoc,
      isType: isType,
      isTerm: !isType,
    })
    // extractDocsFromExportedNode(docman, [exportName, n])
  }

  docman.d.modules.push(mod)
  return docman.d
}

/**
 * Extract doc from the node. Recurses into linked nodes until a terminal is hit
 * (e.g. boolean, string)
 */
// prettier-ignore
function extractDocsFromModuleExport(
  docs: Doc.Manager,
  n: tsm.Node
): Doc.Node {
  debugExport('start')
  debugExport('-> node kind is %s', n.getKindName())
  debugExport('-> type text is %j', n.getType().getText())
  return extractDocsFromType(docs, n.getType())
}

function extractDocsFromType(manager: Doc.Manager, t: tsm.Type): Doc.Node {
  debugVisible('start')
  debugVisible('-> type text is %j', t.getText())
  if (isTypeFromDependencies(t)) {
    debugVisible('type is from a dependency, stopping here')
    return Doc.unsupported(t.getText())
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
    return Doc.array(
      manager.indexIfApplicable(t, () =>
        extractAliasIfOne(t, extractDocsFromType(manager, innerType))
      )
    )
  }
  if (t.isInterface()) {
    debugVisible('-> type is interface')
    const s = t.getSymbolOrThrow()
    return manager.indexIfApplicable(t, () =>
      Doc.inter({
        name: s.getName(),
        props: extractPropertyDocsFromType(manager, t),
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
          props: extractPropertyDocsFromType(manager, t),
          sigs: extractSigDocsFromType(manager, t),
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
          props: extractPropertyDocsFromType(manager, t),
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
          types: t.getUnionTypes().map(tm => {
            debugVisible('-> handle union member %s', tm.getText())
            return extractAliasIfOne(tm, extractDocsFromType(manager, tm))
          }),
          ...getRaw(t),
        })
      )
    )
  }
  debugVisible('unsupported kind of type %s', t.getText())
  return Doc.unsupported(t.getText())
}

function getRaw(t: tsm.Type): Doc.Raw {
  const node = getNodeFromTypePreferingAlias(t)
  if (!node) {
    return {
      raw: {
        nodeFullText: '',
        nodeText: '',
        typeText: '',
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

function extractAliasIfOne(t: tsm.Type, doc: Doc.Node): Doc.Node {
  // return doc
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
function extractSigDocsFromType(docs: Doc.Manager, t: tsm.Type): Doc.DocSig[] {
  return t.getCallSignatures().map(sig => {
    const tRet = sig.getReturnType()
    const params = sig.getParameters()
    return Doc.sig({
      return: extractAliasIfOne(tRet, extractDocsFromType(docs, tRet)),
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
          type: extractAliasIfOne(
            paramType,
            extractDocsFromType(docs, paramType)
          ),
        })
      }),
    })
  })
}

function extractPropertyDocsFromType(
  docs: Doc.Manager,
  t: tsm.Type
): Doc.DocProp[] {
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
      type: extractAliasIfOne(propType, extractDocsFromType(docs, propType)),
    })
  })
}
