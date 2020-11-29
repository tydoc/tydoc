import createDebug from 'debug'
import * as dedent from 'dedent'
import * as kleur from 'kleur'
import * as path from 'path'
import { PackageJson } from 'type-fest'
import {
  absolutify,
  assertDirExists,
  assertFileExists,
  assertPathAbsolute,
  readPackageJson,
  readTsconfigJson,
  stripExtension,
} from '../lib/package-helpers'

const debug = createDebug('tydoc:package')

type Givens = {
  /**
   * Should the projectDir and sourceMainModulePath be validated that they exist on disk?
   *
   * @default true
   */
  validateExists?: boolean
  projectDir?: string
  sourceMainModulePath?: string
  packageJson?: PackageJson
  sourceDir?: string
}

/**
 * Calculate and validate the project layout
 */
export function scan(givens?: Givens) {
  let projectDir: string

  /**
   * Find the project root
   */

  if (givens?.projectDir) {
    projectDir = givens.projectDir
    assertPathAbsolute(
      givens.projectDir,
      `Layout scan received a relative path for "projectDir". It must be an absolute path.`
    )
    if (givens.validateExists) {
      assertDirExists(
        givens.projectDir,
        'Layout received a path for "projectDir" that is not a directory or does not actually exist.'
      )
    }
    debug('prjDir set to %s -- taken from passed config ', projectDir)
  } else {
    projectDir = process.cwd()
    debug('prjDir set to %s -- taken from current working directory', projectDir)
  }

  /**
   * Read package.json
   */

  let packageMain: string

  const packageJson = givens?.packageJson ?? readPackageJson(projectDir)

  if (!packageJson) {
    throw new Error(`Your project at ${kleur.yellow(projectDir)} is missing a package.json file.`)
  }

  /**
   * Find the real package entrypoint
   */

  if (packageJson.main) {
    packageMain = absolutify(projectDir, packageJson.main)
  } else {
    throw new Error('Your package.json main field is missing or empty. It must be present.')
  }

  debug('packageMain is %s', packageMain)

  /**
   * Read tsconfig.json
   */

  // todo does not support tsconfig inheritance
  const tsconfigJson = readTsconfigJson(projectDir)

  if (!tsconfigJson) {
    throw new Error(`Your project at ${kleur.yellow(projectDir)} is missing a tsconfig.json file.`)
  }

  /**
   * Find the source dir
   */

  let sourceDir: string

  if (givens?.sourceDir) {
    sourceDir = absolutify(projectDir, givens.sourceDir)
    if (givens.validateExists) {
      assertDirExists(givens.sourceDir)
    }
  } else {
    const tsconfigRootDir = tsconfigJson.compilerOptions?.rootDir

    if (tsconfigRootDir) {
      if (path.isAbsolute(tsconfigRootDir)) {
        sourceDir = tsconfigRootDir
      } else {
        sourceDir = path.resolve(projectDir, tsconfigRootDir)
      }
    } else {
      sourceDir = projectDir
    }
  }

  debug('sourceDir set to %s', sourceDir)

  /**
   * Find the main _source_ module
   */

  let sourceMainModulePath: string

  if (givens?.sourceMainModulePath) {
    sourceMainModulePath = absolutify(projectDir, givens.sourceMainModulePath)
    if (givens.validateExists) {
      assertFileExists(
        sourceMainModulePath,
        'Layout received a path for "sourceMainModulePath" that is not a file or does not actually exist.'
      )
    }
    sourceMainModulePath = stripExtension(sourceMainModulePath)
  } else {
    let outDir: string

    const tsconfigOutDir = tsconfigJson.compilerOptions?.outDir

    if (tsconfigOutDir === undefined) {
      throw new Error(dedent`
        Your ${kleur.yellow('tsconfig.json')} compilerOptions does not have ${kleur.yellow(
        'compilerOptions.outDir'
      )} specified.
      
        Tydoc needs this information to discover the path to your source main entrypoint.

        You can pass the --sourceMainEntrypointPath flag to specify this path explicitly.

        Otherwise, please update your tsconfig.json so that it has an outDir set.
    `)
    }

    outDir = absolutify(projectDir, tsconfigOutDir)

    debug('outDir set to %s', outDir)

    /**
     * Default assumptions:
     *
     * - The package.json "main" will be pointed at/within tsconfig.json outDir. E.g. there is no post-tsc build steps.
     * - The module name pointed to by "main" will map directly to the main [TS] source file name. E.g. there is no bundle step.
     */

    const realMainModulePathRel = path.relative(outDir, packageMain)
    const realMainModuleDirRel = path.dirname(realMainModulePathRel)
    const mainModuleName = path.basename(realMainModulePathRel, '.js')
    const sourceMainModulePathRel = path.join(realMainModuleDirRel, mainModuleName)
    const sourceMainModulePathAbs = path.join(sourceDir, sourceMainModulePathRel)
    sourceMainModulePath = sourceMainModulePathAbs
  }

  debug('sourceMainModulePath is %s', sourceMainModulePath)

  /**
   * Get settings in package.json
   */

  let tydocSettingsInPackage

  if ((packageJson as any).tydoc) {
    tydocSettingsInPackage = (packageJson as any).tydoc
    debug('read user settings from package.json %O', tydocSettingsInPackage)
    // todo validate
  } else {
    debug('no user settings to read from package.json')
    tydocSettingsInPackage = {}
  }

  const layout = {
    projectDir,
    sourceDir,
    sourceMainModulePath,
    tydocSettingsInPackage,
    tsconfigPath: path.join(projectDir, 'tsconfig.json'),
    packageJson,
    tsconfigJson,
  }

  debug(`layout calculated:`, layout)

  return layout
}
