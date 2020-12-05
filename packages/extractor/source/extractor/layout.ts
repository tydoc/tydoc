import createDebug from 'debug'
import * as dedent from 'dedent'
import * as kleur from 'kleur'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { PackageJson } from 'type-fest'
import {
  absolutify,
  assertDirExists,
  assertFileExists,
  assertPathAbsolute,
  getPackageMain,
  readPackageJson,
  stripExtension,
} from '../lib/package-helpers'
import { applyDiagnosticFilters, DiagnosticFilter } from '../lib/ts-helpers'

const debug = createDebug('tydoc:package')

type Givens = {
  /**
   * Should the projectDir and sourceMainModulePath be validated that they exist on disk?
   *
   * @default true
   */
  validateExists?: boolean
  /**
   * On a TypeScript
   */
  validateTypeScriptDiagnostics?: boolean | DiagnosticFilter[]
  projectDir?: string
  sourceMainModulePath?: string
  packageJson?: PackageJson
  sourceDir?: string
  tsMorphProject?: tsm.Project
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

  packageMain = path.join(projectDir, getPackageMain(packageJson))

  debug('packageMain is %s', packageMain)

  /**
   * Create a ts-morph project, including reading tsconfig.json
   */

  let tsMorphPoject

  if (givens?.tsMorphProject) {
    tsMorphPoject = givens.tsMorphProject
  } else {
    const tsConfigFilePath = path.join(projectDir, 'tsconfig.json')

    if (givens?.validateExists) {
      assertFileExists(
        tsConfigFilePath,
        `You must have a tsconfig.json file in the root of your project (${kleur.yellow(projectDir)}).`
      )
    }

    tsMorphPoject = new tsm.Project({ tsConfigFilePath })

    if (givens?.validateTypeScriptDiagnostics) {
      const diagnostics = tsMorphPoject.getPreEmitDiagnostics()
      if (diagnostics.length) {
        if (
          givens.validateTypeScriptDiagnostics === true ||
          applyDiagnosticFilters(givens.validateTypeScriptDiagnostics, diagnostics)
        ) {
          const message = tsMorphPoject.formatDiagnosticsWithColorAndContext(diagnostics)
          console.log(`
        Tydoc stopped extracting documentation becuase the package was found to have type errors. You should fix these and then try again. If you do not care about these type errors and want to try extracting documentation anyways then try using one of the following flags:\n  --ignore-diagnostics\n  --ignore-diagnostics-matching
      `)
          throw new Error(message)
        }
      }
    }
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
    // todo what is .rootDirs?
    const tsconfigRootDir = tsMorphPoject.compilerOptions.get().rootDir

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

    const tsconfigOutDir = tsMorphPoject.compilerOptions.get().outDir

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
    tsMorphPoject,
  }

  debug(`layout calculated:`, layout)

  return layout
}
