import Debug from 'debug'
import * as fs from 'fs-jetpack'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { applyDiagnosticFilters, DiagnosticFilter } from '../lib/ts-helpers'
import * as Doc from './doc'
import { fromModule as fromModule2 } from './extract'

const debug = Debug('tydoc:extract')

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

function findEntry(prjDir: string) {
  // TODO This logic is hacky and need to be cleanup
  const pjson = fs.read(path.join(prjDir, 'package.json'), 'json')
  let entryPoint: string = ''
  if (pjson && pjson.typings) {
    entryPoint = path.join(prjDir, pjson.typings)
  } else if (pjson && pjson.main) {
    if (path.extname(pjson.main) === '.ts') {
      entryPoint = path.join(prjDir, pjson.main)
    } else {
      entryPoint = path.join(prjDir, path.dirname(pjson.main), path.basename(pjson.main, '.js') + '.d.ts')
    }
  }

  if (!entryPoint || !fs.exists(entryPoint)) {
    const found = fs.find(prjDir, {
      matching: 'index.d.ts',
      recursive: true,
    })
    if (found.length > 0) entryPoint = found[0]
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
  const managerSettings: Doc.Settings = {
    projectDir: prjDir,
    sourceDir: prjDir,
    sourceMainModulePath: entryPoint,
  }

  // Create manager extract doc and return final docs AST
  //
  const manager = new Doc.Manager(managerSettings)

  project.getSourceFiles().forEach((sf) => {
    fromModule2(manager, sf)
  })

  return manager.EDD
}
