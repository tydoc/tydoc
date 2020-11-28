import createDebug from 'debug'
import dedent from 'dedent'
import kleur from 'kleur'
import * as path from 'path'
import {
  absolutify,
  assertPathAbsolute,
  assertPathExists,
  readPackageJson,
  readTsconfigJson,
} from '../lib/package-helpers'

const debug = createDebug('tydoc:package')

type Givens = {
  projectDir?: string
  sourceMainModulePath?: string
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
    assertPathExists(
      givens.projectDir,
      'Layout received a path for "projectDir" that does not actually exist.'
    )
    debug('prjDir set to %s -- taken from passed config ', projectDir)
  } else {
    projectDir = process.cwd()
    debug('prjDir set to %s -- taken from current working directory', projectDir)
  }

  /**
   * Read package.json
   */

  let packageMain: string

  const packageJson = readPackageJson(projectDir)

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

  const tsconfigJson = readTsconfigJson(projectDir)

  if (!tsconfigJson) {
    throw new Error(`Your project at ${kleur.yellow(projectDir)} is missing a tsconfig.json file.`)
  }

  /**
   * Find the source dir
   */

  let sourceDir: string

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

  debug('sourceDir set to %s', sourceDir)

  /**
   * Find the main _source_ module
   */

  let sourceMainModulePath: string

  if (givens?.sourceMainModulePath) {
    sourceMainModulePath = givens?.sourceMainModulePath
    assertPathAbsolute(
      sourceMainModulePath,
      'Layout received a relative path for "sourceMainModulePath". It must be absolute.'
    )
    assertPathExists(
      sourceMainModulePath,
      'Layout received a path for "sourceMainModulePath" that does not actually exist.'
    )
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

  return {
    projectDir,
    sourceDir,
    sourceMainModulePath,
    tydocSettingsInPackage,
    tsconfigPath: path.join(projectDir, 'tsconfig.json'),
    packageJson,
    tsconfigJson,
  }
}
