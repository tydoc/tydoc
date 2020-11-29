import Debug from 'debug'
import * as fs from 'fs-jetpack'
import * as path from 'path'
import * as tsm from 'ts-morph'
import {
  applyDiagnosticFilters,
  DiagnosticFilter,
  getDiscriminantPropertiesOfUnionMembers,
  getFirstDeclarationOrThrow,
  getProperties,
} from '../lib/ts-helpers'
import * as Doc from './doc'
import { getLocationKind, getNodeFromTypePreferingAlias, hasAlias, isCallable, isPrimitive } from './utils'
import dedent = require('dedent')

const debug = Debug('tydoc:extract')
const debugExport = Debug('tydoc:extract:export')
const debugVisible = Debug('tydoc:extract:visible')
const debugWarn = Debug('tydoc:warn')

interface Options {
  project?: tsm.Project
  /**
   * Specify the path to the package's entrypoint file.
   *
   * @defualt Read from package.json main field
   * @remarks This is useful for tests to avoid mocks or environment setup
   */
  prjDir: string

  /**
   * Should Tydoc halt when TypeScript diagnostics are raised?
   *
   * Pass true to halt on any diagnostic
   *
   * Pass false to ignore all diagnostics
   *
   * Pass an array of filters to ignore only certain diagnostics.
   *
   * @default true
   *
   * @remarks
   *
   * Typically your package should be error free before documentation is extracted for it. However there may be cases where you want to bypass this check in general or for specific kinds of type check errors. For example a @ts-expect-error that is erroring because there is no error.
   *
   */
  haltOnDiagnostics?: boolean | DiagnosticFilter[]
}

function findEntry(prjDir: string){
  // TODO This logic is hacky and need to be cleanup
  const pjson = fs.read(path.join(prjDir, 'package.json'), 'json')
  let entryPoint: string = '';
  if(pjson && pjson.typings){
    entryPoint = path.join(prjDir, pjson.typings)
  } else if(pjson && pjson.main){
    if(path.extname(pjson.main) === '.ts'){
      entryPoint = path.join(prjDir, pjson.main)
    } else {
      entryPoint = path.join(prjDir, path.dirname(pjson.main), path.basename(pjson.main, '.js') + '.d.ts')
    }
  }

  if(!entryPoint || !fs.exists(entryPoint)) {
    const found = fs.find(prjDir, {
      matching: "index.d.ts",
      recursive: true
    })
    if(found.length > 0) entryPoint = found[0]
    else throw new Error('Unable to find Entrypoint')
  }
  if (!path.isAbsolute(entryPoint)) {
    entryPoint = path.join(prjDir, entryPoint)
  }
  return entryPoint
}
/**
 * Recursively extract docs from the given project starting from the exports of
 * the given list of entrypoint modules. Everything that is reachable from the
 * exports will be considered part of the API.
 */
export function fromPublished(options: Options): Doc.DocPackage {
  const prjDir = options.prjDir
  debug('prjDir set to %s', prjDir)

  const project = options.project ?? new tsm.Project()

  const entryPoint = findEntry(prjDir)

  debug('packageMainEntrypoint is %s', entryPoint)

  // todo use setset
  const stopOnTypeErrors = options.haltOnDiagnostics ?? true

  if (stopOnTypeErrors !== false) {
    const diagnostics = project.getPreEmitDiagnostics()
    if (diagnostics.length) {
      if (stopOnTypeErrors === true || applyDiagnosticFilters(stopOnTypeErrors, diagnostics)) {
        const message = project.formatDiagnosticsWithColorAndContext(diagnostics)
        console.log(`
        Tydoc stopped extracting documentation becuase the package was found to have type errors. You should fix these and then try again. If you do not care about these type errors and want to try extracting documentation anyways then try using one of the following flags:\n  --ignore-diagnostics\n  --ignore-diagnostics-matching
      `)
        throw new Error(message)
      }
    }
  }

  // If the project is empty dont' bother trying to extract docs
  //
  let sourceFiles = project.getSourceFiles()
  if (sourceFiles.length === 0) {
    sourceFiles = project.addSourceFilesAtPaths(entryPoint)

    // throw new Error('No source files found in project to document.')
  }
  debug(
    'found project source files ',
    sourceFiles.map((sf) => sf.getFilePath())
  )

  // Setup manager settings
  //
  const managerSettings = {
    srcDir: prjDir,
    prjDir: prjDir,
    mainModuleFilePathAbs: entryPoint,
  }

  // Create manager extract doc and return final docs AST
  //
  const manager = new Doc.Manager(managerSettings)

  project.getSourceFiles().forEach((sf) => {
    fromModule(manager, sf)
  })

  return manager.data
}
let done:string[] = []

/**
 * Recursively extract docs starting from exports of the given module.
 * Everything that is reachable will be considered.
 */
function fromModule(manager: Doc.Manager, sourceFile: tsm.SourceFile): Doc.Manager {
  const mod = Doc.modFromSourceFile(manager, sourceFile)
  const exportedDeclarations = sourceFile.getExportedDeclarations()
  debugExport(`filepath: ${sourceFile.getFilePath()}`)
  debugExport({ exportedDeclarations, mod })
  for (const [exportName, expDeclarations] of exportedDeclarations) {
    let n = expDeclarations[0]
    if (!n) {
      console.warn(
        dedent`
          Skipping named export "${exportName}" in module at "${sourceFile.getFilePath()}" because there were no exported declarations for it.

          This should not normally happen. Please open an issue with your use-case/context so we can investigate the issue.
        `
      )
      continue
    }
    debugExport('-> export declaration %s', exportName)
    debugExport(n)

    debugExport('-> export declaration %s', n.getKindName())
    if(tsm.Node.isSourceFile(n)){
      if(!done.includes(n.getFilePath())){
        done.push(n.getFilePath())
        manager = fromModule(manager, n)
      } 
      continue
    } 
    const t = n?.getType()
    if(!t) continue
    debugExport('start')
    debugExport('-> node kind is %s', n.getKindName())
    debugExport('-> type text is %j', n.getType().getText())

    // if the node is a type alias and its type cannot find its way back to the
    // type alias then we are forced to run type alias extraction logic here.
    // So far we know this happens in typeof cases.
    let doc
    if (tsm.Node.isTypeAliasDeclaration(n) && !hasAlias(t)) {
      debugExport('type alias pointing to type that cannot back reference to the type alias %s', n.getText())
      doc = manager.indexTypeAliasNode(n, () =>
        Doc.alias({
          // @ts-ignore
          name: n.getName ? n.getName() : n.getKindName(),
          raw: {
            nodeFullText: n.getFullText(),
            nodeText: n.getText(),
            typeText: t.getText(),
          },
          // todo getTSDocFromNode()
          ...getTSDoc(manager, n.getType()),
          type: fromType(manager, t),
        })
      )
    } else {
      doc = fromType(manager, t)
    }

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

  manager.data.modules.push(mod)
  return manager
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
    const fqtn = manager.getFQTN(t)
    if (manager.isIndexed(fqtn)) {
      debugVisible('-> type is being documented as link to the type index (aka. cache hit)')
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
    return manager.indexTypeIfApplicable(t, () =>
      extractAliasIfOne(manager, t, Doc.array(fromType(manager, innerType)))
    )
  }
  // Place before object becuase objects are superset.
  // Place before interface becuase interfaces can be callable
  if (isCallable(t)) {
    debugVisible('-> type is callable')
    return manager.indexTypeIfApplicable(t, () =>
      extractAliasIfOne(
        manager,
        t,
        Doc.callable({
          props: propertyDocsFromType(manager, t),
          sigs: sigDocsFromType(manager, t),
          ...getRaw(t),
        })
      )
    )
  }
  if (t.isInterface()) {
    debugVisible('-> type is interface')
    const s = t.getSymbolOrThrow()
    return manager.indexTypeIfApplicable(t, () =>
      Doc.inter({
        name: s.getName(),
        props: propertyDocsFromType(manager, t),
        ...getTSDoc(manager, t),
        ...getRaw(t),
      })
    )
  }

  // Place after callable check because objects are superset.
  if (t.isObject()) {
    debugVisible('-> type is object')
    return manager.indexTypeIfApplicable(t, () =>
      extractAliasIfOne(
        manager,
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
    return manager.indexTypeIfApplicable(t, () => {
      const members = t.getUnionTypes()
      const discriminantProperties = getDiscriminantPropertiesOfUnionMembers(members)
      return extractAliasIfOne(
        manager,
        t,
        Doc.union({
          ...getRaw(t),
          discriminantProperties: discriminantProperties.map((p) => p.getName()),
          types: members.map((tm) => {
            debugVisible('-> handle union member %s', tm.getText())
            // todo no extract alias here ...
            return extractAliasIfOne(manager, tm, fromType(manager, tm))
          }),
        })
      )
    })
  }
  if (t.isIntersection()) {
    debugVisible('-> type is intersection')
    return manager.indexTypeIfApplicable(t, () =>
      extractAliasIfOne(
        manager,
        t,
        Doc.intersection({
          ...getRaw(t),
          types: t.getIntersectionTypes().map((tm) => {
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

/**
 * Extract docs from a type's call signatures. There may be multiple because of
 * function overloading.
 *
 * Note not only functions and methods may have call signatures
 * but anything callable which means objects too (in JS a function is an object
 * and in TS this as modelled as object types being able to be made callable).
 */
function sigDocsFromType(docs: Doc.Manager, t: tsm.Type): Doc.DocSig[] {
  return t.getCallSignatures().map((sig) => {
    const tRet = sig.getReturnType()
    const params = sig.getParameters()
    debugVisible('handle callable return: %s', tRet.getText())
    return Doc.sig({
      return: fromType(docs, tRet),
      params: params.map((p) => {
        const n = getFirstDeclarationOrThrow(p)
        const paramName = p.getName()
        const paramType = n.getType()
        // what is this method for then? It was just returning an `any` type
        // const paramType = p.getDeclaredType()
        // prettier-ignore
        debugVisible('handle callable param: %s %s %s', n.getKindName(), paramName, paramType.getText())
        return Doc.sigParam({
          name: paramName,
          type: fromType(docs, paramType),
        })
      }),
    })
  })
}

/**
 * Extract docs from the type's properties.
 */
function propertyDocsFromType(docs: Doc.Manager, t: tsm.Type): Doc.DocProp[] {
  return getProperties(t).filter(Boolean).map((p) => {
    const propName = p.getName()
    const propType = p.getType()
    // what is this method for then? It was just returning an `any` type
    // const propType = p.getDeclaredType()
    // prettier-ignore
    debugVisible('handle property: %s %s %s', p.getKindName(), propName, propType.getText())
    // Do not try to index type here. Must come after index lookup.
    return Doc.prop({
      name: propName,
      type: fromType(docs, propType),
    })
  })
}

/**
 * Extract doc for the type alias pointing to the given type, if any. The
 * extracted doc node is then wrapped around the given doc node and returned.
 * Thus the given doc node may be returned as-is if no alias found or returned
 * wrapped in doc for the found alias.
 */
function extractAliasIfOne(manager: Doc.Manager, t: tsm.Type, doc: Doc.Node): Doc.Node {
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
    ...getTSDoc(manager, t),
  })
}

/**
 * Get raw doc information for the given type.
 */
function getRaw(t: tsm.Type): Doc.RawFrag {
  /**
   * The use-alias-outside-current-scope flag makes it so that the type for
   * something imported is seen not as `import(...).<name>` but the actual type
   * from the thing's origin.
   */
  const typeText = t.getText(undefined, tsm.ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope).trim()

  const node = getNodeFromTypePreferingAlias(t)

  if (!node) {
    return {
      raw: {
        typeText: typeText,
        // todo null instead of empty string?
        nodeFullText: '',
        nodeText: '',
      },
    }
  }

  return {
    raw: {
      typeText: typeText,
      nodeText: node.getText().trim(),
      nodeFullText: node.getFullText().trim(),
    },
  }
}

/**
 * Extract tsdoc docs for the given type.
 *
 * @return
 *
 * If the node associated with the type does not support JSDoc (not all node
 * types do) then `null` is returned.
 *
 * If the node associated with the type does not have JSDoc present in the
 * source code then `null` is returned.
 */
function getTSDoc(manager: Doc.Manager, t: tsm.Type): Doc.TSDocFrag {
  const n = getNodeFromTypePreferingAlias(t)
  let docFragTSDoc: Doc.TSDocFrag['tsdoc']

  if (!n) {
    docFragTSDoc = null
  } else if (!tsm.Node.isJSDocableNode(n)) {
    docFragTSDoc = null
  } else {
    const jsDocNode = n.getJsDocs()[0]
    if (!jsDocNode) {
      docFragTSDoc = null
    } else {
      docFragTSDoc = Doc.tsDocFromText(manager, jsDocNode.getText())
    }
  }

  return {
    tsdoc: docFragTSDoc,
  }
}
