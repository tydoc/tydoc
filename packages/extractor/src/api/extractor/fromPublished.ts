import Debug from 'debug'
import * as fs from 'fs-jetpack'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { applyDiagnosticFilters, DiagnosticFilter } from '../lib/ts-helpers'
import * as Doc from './doc'
import { fromType, getTSDoc } from './extract'
import { hasAlias } from './utils'
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
    fromModule(manager, sf)
  })

  return manager.EDD
}
let done: string[] = []

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
    if (tsm.Node.isSourceFile(n)) {
      if (!done.includes(n.getFilePath())) {
        done.push(n.getFilePath())
        manager = fromModule(manager, n)
      }
      continue
    }
    const t = n?.getType()
    if (!t) continue
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

  manager.EDD.modules.push(mod)
  return manager
}
