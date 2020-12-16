import makeDebug from 'debug'
import dedent from 'dedent'
import * as fs from 'fs-jetpack'
import * as lo from 'lodash'
import { isEmpty } from 'lodash'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { PackageJson } from 'type-fest'
import * as Doc from './doc'
import { scan } from './layout'
import * as Package from './lib/package'
import {
  absolutify,
  assertFileExists,
  downloadPackage,
  getPackageMain,
  JsFilePathToTsDeclarationFilePath,
  pathToModulePath,
  readPackageJson,
} from './lib/package-helpers'
import {
  DiagnosticFilter,
  getDiscriminantPropertiesOfUnionMembers,
  getFirstDeclarationOrThrow,
  getGenericType,
  getProperties,
  getSourceFileModulePath,
} from './lib/ts-helpers'
import { getLocationKind, getNodeFromTypePreferingAlias, hasAlias, isCallable, isPrimitive } from './utils'

const debug = makeDebug('tydoc:extract')
const debugExport = makeDebug('tydoc:extract:export')
const debugVisible = makeDebug('tydoc:extract:visible')
const debugWarn = makeDebug('tydoc:warn')

export interface FromProjectParams {
  /**
   * Paths to modules in project, relative to source root or absolute.
   */
  entrypoints: string[]
  /**
   * Should Tydoc settings be read from from the package file.
   */
  readSettingsFromJSON?: boolean
  /**
   * Sometimes a source entrypoint is fronted by a facade module that allows
   * package consumers to do e.g. `import foo from "bar/toto"` _instead of_
   * `import foo from "bar/dist/toto". Use this mapping to force tydoc to view
   * the given source modules (the keys) at the given package path (the values).
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
  layout?: {
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
    validateTypeScriptDiagnostics?: boolean | DiagnosticFilter[]

    /**
     * Should the projectDir and sourceMainModulePath be validated that they exist on disk?
     *
     * @default true
     */
    validateExists?: boolean
    /**
     * Absolute path to the source main entrypoint.
     *
     * @default A discovery attempt is made by running heuristics against a combination of package.json and tsconfig.json however it only covers common patterns, not all possible setups.
     */
    sourceMainModulePath?: string
    /**
     * Specify the root of the project.
     *
     * @default The current working directory
     * @remarks This is useful for tests to avoid having to mock process.cwd
     */
    projectDir?: string
    sourceDir?: string
    packageJson?: PackageJson
    tsMorphProject?: tsm.Project
  }
}

export type FromPublishedParams = {
  packageName: string
  packageVersion?: string
  project?: tsm.Project
  downloadDir?: string
}

export type ExtractedPackageData = {
  docs: Doc.Package
  metadata: Package.Metadata
}

// todo support extracting fromPublished with additional entrypoints
export async function fromPublished(options: FromPublishedParams): Promise<ExtractedPackageData> {
  const tmpDir = await fs.tmpDirAsync()
  const projectDir = options.downloadDir ?? tmpDir.cwd()

  await downloadPackage({
    name: options.packageName,
    version: options.packageVersion,
    downloadDir: projectDir,
  })

  const packageJson = readPackageJson(projectDir)

  if (!packageJson) {
    throw new Error(
      `The downloaded package at ${projectDir} was not valid. It is missing a package.json file.`
    )
  }

  const packageJsonMain = getPackageMain(packageJson)
  debug('found packageJsonMain %s', packageJsonMain)

  const entrypointPath = JsFilePathToTsDeclarationFilePath(path.join(projectDir, packageJsonMain))
  debug('found entrypointPath %s', entrypointPath)

  assertFileExists(
    entrypointPath,
    `The downloaded package at ${projectDir} is not valid because it did not include TypeScript declaration files (looked for one at ${entrypointPath}).`
  )

  const project = options.project ?? new tsm.Project()

  project.addSourceFilesAtPaths(entrypointPath)

  const manager = new Doc.Manager({
    projectDir: projectDir,
    sourceDir: projectDir,
    sourceMainModulePath: entrypointPath,
  })

  project.getSourceFiles().forEach((sf) => {
    fromModule(manager, sf)
  })

  const metadata = await Package.getMetadata(options.packageName)

  return {
    docs: manager.EDD,
    metadata,
  }
}

/**
 * Recursively extract docs from the given project starting from the exports of
 * the given list of entrypoint modules. Everything that is reachable from the
 * exports will be considered part of the API.
 */
export function fromProject(options: FromProjectParams): Doc.Package {
  const layout = scan(options.layout)

  const sourceFiles = layout.tsMorphPoject.getSourceFiles()

  if (isEmpty(sourceFiles)) {
    throw new Error('No source files found in project to document.')
  }

  debug(
    'found project source files:',
    sourceFiles.map((sf) => sf.getFilePath())
  )

  /**
   * Find the corresponding source files for the given entrypoints
   */

  const sourceFileEntrypoints = options.entrypoints.map((givenEntryPoint) => {
    let givenEntryPointAbs = absolutify(layout.sourceDir, givenEntryPoint)

    /**
     * If given entrypoint is a folder then infer that to mean looking for
     * an index within it (just like how node module resolution works).
     *
     * In case user is working with in-memory ts-morph project do not care if the directory
     * does not actually exist.
     */
    if (fs.exists(givenEntryPointAbs) === 'dir') {
      givenEntryPointAbs = path.join(givenEntryPointAbs, 'index.ts')
    }

    debug('givenEntryPointAbs is %s', givenEntryPointAbs)

    const sourceFileEntryPoint = sourceFiles.find((sf) => {
      return getSourceFileModulePath(sf) === pathToModulePath(givenEntryPointAbs)
    })

    if (!sourceFileEntryPoint) {
      throw new Error(
        `Given entrypoint not found in project: "${givenEntryPointAbs}". Source files were:\n\n${sourceFiles
          .map(getSourceFileModulePath)
          .join('\n')}`
      )
    }

    return sourceFileEntryPoint
  })

  /**
   * Setup manager
   */

  const managerSettings = {
    sourceDir: layout.sourceDir,
    projectDir: layout.projectDir,
    sourceMainModulePath: layout.sourceMainModulePath,
    sourceModuleToPackagePathMappings: options.sourceModuleToPackagePathMappings,
  }

  if (options.readSettingsFromJSON) {
    lo.merge(managerSettings, layout.tydocSettingsInPackage)
  } else {
    debug('reading user settings from package.json is disabled')
  }

  const manager = new Doc.Manager(managerSettings)

  /**
   * Get EDD
   */

  sourceFileEntrypoints.forEach((sf) => {
    fromModule(manager, sf)
  })

  return manager.EDD
}

/**
 * Recursively extract docs starting from exports of the given module.
 * Everything that is reachable will be considered.
 */
export function fromModule(manager: Doc.Manager, sourceFile: tsm.SourceFile): Doc.Package {
  const mod = Doc.modFromSourceFile(manager, sourceFile)

  for (const [exportName, exportedDeclarations] of sourceFile.getExportedDeclarations()) {
    const n = exportedDeclarations[0]

    if (!n) {
      console.warn(
        dedent`
          Skipping named export "${exportName}" in module at "${sourceFile.getFilePath()}" because there were no exported declarations for it.

          This should not normally happen. Please open an issue with your use-case/context so we can investigate the issue.
        `
      )
      continue
    }

    const t = n.getType()
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
          name: n.getName(),
          raw: {
            nodeFullText: n.getFullText(),
            nodeText: n.getText(),
            typeText: t.getText(),
          },
          typeParameters: typeParametersDocsFromType(manager, t),
          // todo getTSDocFromNode()
          ...getTSDoc(manager, t),
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

  manager.EDD.modules.push(mod)
  return manager.EDD
}

export function fromType(manager: Doc.Manager, t: tsm.Type): Doc.Node {
  debugVisible('start')
  debugVisible('-> type text is %j', t.getText())
  const locationKind = getLocationKind(t)
  debugVisible('-> type location is %s', locationKind)

  if (locationKind === 'dep') {
    debugVisible('-> location is a dependency, stopping here')
    return Doc.unsupported(getRaw(t), 'We do not support extracting from dependencies.')
  }
  if (locationKind === 'typeScriptStandardLibrary') {
    // we handle arrays specially below
    if (!t.isArray()) {
      debugVisible('-> location is standard lib and not array, stopping here')
      return Doc.unsupported(getRaw(t), 'We do not support extracting from the standard library.')
    }
  }
  if (locationKind === 'unknown') {
    debugWarn(
      '-> location is unknown, stopping here to be safe (code needs to be updated to handle this case)'
    )
    return Doc.unsupported(getRaw(t), 'We do not support extracting from types whose loation is unknown.')
  }

  if (t.isArray()) {
    debugVisible('-> type is array')
    const innerType = t.getArrayElementTypeOrThrow()
    debugVisible('-> handle array inner type %s', innerType.getText())
    return manager.indexTypeIfApplicable(t, () =>
      extractAliasIfOne(manager, t, Doc.array(fromType(manager, innerType)))
    )
  }

  const tt = getGenericType(t)
  if (tt) {
    debugVisible('-> type is an instance of a generic type: %s', tt.getText())
    return Doc.genericInstance({
      target: fromType(manager, tt) as any,
      ...getRaw(t),
    })
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

  if (t.isTuple()) {
    debugVisible('-> type is tuple')
    return Doc.unsupported(getRaw(t), 'Tuples not yet implemented')
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
    const sym = t.getSymbolOrThrow()
    return manager.indexTypeIfApplicable(t, () =>
      Doc.inter({
        name: sym.getName(),
        typeParameters: typeParametersDocsFromType(manager, t),
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
  return Doc.unsupported(getRaw(t), `This kind of type is not supported: "${t.getText()}"`)
}

/**
 * Get the docs for the type parameters of the given type
 */
function typeParametersDocsFromType(docs: Doc.Manager, t: tsm.Type): Doc.TypeParameter[] {
  // todo why does ts-moprh separate type arg access?
  const params = t.isInterface() ? t.getTypeArguments() : t.getAliasTypeArguments()
  return params.map((param) => {
    const sym = param.getSymbolOrThrow()
    const defaultType = param.getDefault()
    const defaultTypeDocs = defaultType ? fromType(docs, defaultType) : null

    // todo use a better function than fromType that is for extracting inline or indexed types
    if (defaultTypeDocs) {
      if (defaultTypeDocs.kind === 'interface') {
        throw new Error(`Type parameters cannot be an inline interface`)
      }
      if (defaultTypeDocs.kind === 'alias') {
        throw new Error(`Type parameters cannot be an inline alias`)
      }
    }

    return {
      name: sym.getName(),
      default: defaultTypeDocs,
      ...getRaw(param),
    }
  })
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
  return getProperties(t).map((p) => {
    const propName = p.getName()
    const propType = p.getType()
    // what is this method for then? It was just returning an `any` type
    // const propType = p.getDeclaredType()
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
  const asym = t.getAliasSymbol()!
  debug('-> type had alias %s (extracting a doc node for it)', asym.getName())
  return Doc.alias({
    name: asym.getName(),
    type: doc,
    typeParameters: typeParametersDocsFromType(manager, t),
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
export function getTSDoc(manager: Doc.Manager, t: tsm.Type): Doc.TSDocFrag {
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
