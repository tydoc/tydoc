import Debug from 'debug'
import * as fs from 'fs-jetpack'
import * as lo from 'lodash'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { dump } from '../../utils'
import * as Doc from './doc'
import {
  dumpNode,
  dumpType,
  getLocationKind,
  getNodeFromTypePreferingAlias,
  hasAlias,
  isCallable,
  isPrimitive
} from './utils'

const debug = Debug('tydoc:extract')
const debugExport = Debug('tydoc:extract:export')
const debugVisible = Debug('tydoc:extract:visible')
const debugWarn = Debug('tydoc:warn')

interface Options {
  /**
   * Paths to modules in project, relative to project root or absolute.
   */
  entrypoints: string[]
  project?: tsm.Project
  /**
   * Specify the path to the package's entrypoint file.
   *
   * @defualt Read from package.json main field
   * @remarks This is useful for tests to avoid mocks or environment setup
   */
  packageMainEntrypoint?: string
  /**
   * Specify the root of the project.
   *
   * @default The current working directory
   * @remarks This is useful for tests to avoid having to mock process.cwd
   */
  prjDir?: string
  readSettingsFromJSON: boolean
  /**
   * Sometimes a source entrypoint is fronted by a facade module that allows
   * package consumers to do e.g. `import foo from "bar/toto"` _instead of_
   * `import foo from "bar/dist/toto". Use this mapping to force tydoc to view
   * the given source modules (keys) at the given package path (values).
   *
   * @example
   *
   * Given project layout:
   *
   * ```
   * /src/foo/bar/toto.ts
   * ```
   *
   * The setting:
   *
   * ```ts
   * sourceModuleToPackagePathMappings: {
   *    "foo/bar/toto": "toto"
   * }
   * ```
   *
   * Will cause the `toto` module to be documented as being available at path:
   *
   * ```ts
   * import some from "thing/toto"
   * ```
   */
  sourceModuleToPackagePathMappings?: Record<string, string>
}

function readSettingsFromPackage(): Partial<Doc.Settings> {
  const userSettings = fs.read('package.json', 'json').tydoc

  // todo validation ... :(
  if (userSettings) {
    debug('read user settings from package.json %O', userSettings)
    return userSettings
  }

  debug('no user settings to read from package.json')
  return {}
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

  // Wherever the user's package.json is. We assume for now that this tool is
  // running from project root.
  // todo there seems to be no way to get project dir from project instance??
  // todo guard that cwd has tsconfig in it
  let prjDir: string
  if (opts.prjDir) {
    prjDir = opts.prjDir
    debug('prjDir set to %s -- taken from passed config ', prjDir)
  } else {
    prjDir = process.cwd()
    debug('prjDir set to %s -- taken from current working directory', prjDir)
  }

  // Find the source dir
  //
  let srcDir: string
  const compilerOptRootDir = project.getCompilerOptions().rootDir
  if (compilerOptRootDir) {
    if (path.isAbsolute(compilerOptRootDir)) {
      srcDir = compilerOptRootDir
    } else {
      srcDir = path.resolve(prjDir, compilerOptRootDir)
    }
  } else {
    srcDir = prjDir
  }
  if (!path.isAbsolute(srcDir)) {
    srcDir = path.join(prjDir, srcDir)
  }
  debug('srcDir set to %s', srcDir)

  // Find the out dir
  //
  let outDir: string
  const compilerOptOutDir = project.getCompilerOptions().outDir
  if (compilerOptOutDir !== undefined) {
    outDir = compilerOptOutDir
  } else {
    // todo we could fallback to the source root dir which IIUC is what TS does?
    throw new Error('Your tsconfig.json compilerOptions did not specify an outDir. It must.')
  }
  if (!path.isAbsolute(outDir)) {
    outDir = path.join(prjDir, outDir)
  }
  debug('outDir set to %s', outDir)

  // Find the package entrypoint
  //
  let packageMainEntrypoint: string
  if (opts.packageMainEntrypoint) {
    // useful for tests
    packageMainEntrypoint = opts.packageMainEntrypoint
  } else {
    const pjson = fs.read('package.json', 'json')
    if (pjson.main) {
      packageMainEntrypoint = pjson.main
    } else {
      throw new Error('Your package.json main field is missing or empty. It must be present.')
    }
  }
  if (!path.isAbsolute(packageMainEntrypoint)) {
    packageMainEntrypoint = path.join(prjDir, packageMainEntrypoint)
  }
  debug('packageMainEntrypoint is %s', packageMainEntrypoint)

  // Find the package _source_ entrypoint
  //
  const mainModuleFilePathAbs = Doc.getMainModule({
    outDir,
    packageMainEntrypoint,
    srcDir,
  })
  debug('mainModuleFilePathAbs is %s', mainModuleFilePathAbs)

  // If the project is in a bad state don't bother trying to extract docs
  //
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length) {
    const message = project.formatDiagnosticsWithColorAndContext(diagnostics)
    throw new Error(message)
  }

  // If the project is empty dont' bother trying to extract docs
  //
  const sourceFiles = project.getSourceFiles()
  if (sourceFiles.length === 0) {
    throw new Error('No source files found in project to document.')
  }
  debug(
    'found project source files ',
    sourceFiles.map((sf) => sf.getFilePath())
  )

  // Get the entrypoints to crawl
  //
  const sourceFileEntrypoints = []
  for (const findEntryPoint of opts.entrypoints) {
    let entrypointModulePathAbs: string
    if (path.isAbsolute(findEntryPoint[0])) {
      debug('considering given entrypoint as absolute, disregarding srcDir: %s', findEntryPoint)
      entrypointModulePathAbs = path.join(
        path.dirname(findEntryPoint),
        path.basename(findEntryPoint, path.extname(findEntryPoint))
      )
    } else {
      debug('considering given entrypoint relative to srcDir: %s', findEntryPoint)
      entrypointModulePathAbs = path.join(
        srcDir,
        path.dirname(findEntryPoint),
        path.basename(findEntryPoint, path.extname(findEntryPoint))
      )
    }
    debug('entrypointModulePathAbs is %s', entrypointModulePathAbs)

    // todo if given entrypoint is a folder then infer that to mean looking for
    // an index within it (just like how node module resolution works)

    const tried: string[] = []
    const sf = sourceFiles.find((sf) => {
      const absoluteModulePath = path.join(path.dirname(sf.getFilePath()), sf.getBaseNameWithoutExtension())
      tried.push(absoluteModulePath)
      return absoluteModulePath === entrypointModulePathAbs
    })

    if (!sf) {
      throw new Error(
        `Given entrypoint not found in project: ${entrypointModulePathAbs}. Source files were:\n\n${tried.join(
          ', '
        )}`
      )
    }

    sourceFileEntrypoints.push(sf)
  }

  // Setup manager settings
  //
  const managerSettings = {
    srcDir: srcDir,
    prjDir: prjDir,
    mainModuleFilePathAbs: mainModuleFilePathAbs,
    sourceModuleToPackagePathMappings: opts.sourceModuleToPackagePathMappings,
  }

  if (opts.readSettingsFromJSON) {
    lo.merge(managerSettings, readSettingsFromPackage())
  } else {
    debug('reading user settings from package.json is disabled')
  }

  // Create manager extract doc and return final docs AST
  //
  const manager = new Doc.Manager(managerSettings)

  sourceFileEntrypoints.forEach((sf) => {
    fromModule(manager, sf)
  })

  return manager.data
}

/**
 * Recursively extract docs starting from exports of the given module.
 * Everything that is reachable will be considered.
 */
export function fromModule(manager: Doc.Manager, sourceFile: tsm.SourceFile): Doc.DocPackage {
  const mod = Doc.modFromSourceFile(manager, sourceFile)

  for (const [exportedName, exportedDeclarations] of sourceFile.getExportedDeclarations()) {
    const n = exportedDeclarations[0]
    const t = n.getType()
    debugExport('start')
    debugExport('-> export name is "%s"', exportedName)
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
          name: n.getName(),
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
    } else if (tsm.Node.isVariableDeclaration(n)) {
      dumpType(t)
      dumpNode(n)
      dumpNode(n.getChildren()[2])
      dumpNode(n.getChildrenOfKind(tsm.SyntaxKind.TypeReference)[0])
      const tr = n.getChildrenOfKind(tsm.SyntaxKind.TypeReference)[0]
      dump(tr)
      dump(tr.getTypeName())
      doc = fromType(manager, t)
    } else {
      dumpType(t)
      dumpNode(n)
      doc = fromType(manager, t)
    }

    if (exportedName === 'default') {
      mod.mainExport = doc
      continue
    }

    mod.namedExports.push(
      Doc.expor({
        name: exportedName,
        type: doc,
        node: n,
      })
    )
  }

  manager.data.modules.push(mod)
  return manager.data
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
  // Place before object becuase objects are superset.
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
    return manager.indexTypeIfApplicable(t, () =>
      extractAliasIfOne(
        manager,
        t,
        Doc.union({
          ...getRaw(t),
          types: t.getUnionTypes().map((tm) => {
            debugVisible('-> handle union member %s', tm.getText())
            // todo no extract alias here ...
            return extractAliasIfOne(manager, tm, fromType(manager, tm))
          }),
        })
      )
    )
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

/**
 * Extract docs from the type's properties.
 */
function propertyDocsFromType(docs: Doc.Manager, t: tsm.Type): Doc.DocProp[] {
  return t.getProperties().map((p) => {
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
