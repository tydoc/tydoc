#!/usr/bin/env node
import { FromProjectParams } from '@tydoc/extractor/dist/extract'
import { DiagnosticFilter } from '@tydoc/extractor/dist/lib/ts-helpers'
import debug from 'debug'
import dedent from 'dedent'
import * as JSON5 from 'json5'
import yargs from 'yargs'
import * as TyDoc from '..'
import { absolutify, arrayify } from '../utils'

const argv = yargs(process.argv.slice(2))
  .help()
  .strictOptions()
  .strict()
  .recommendCommands()

  // todo
  //.conflicts

  /**
   * global options
   */

  .options({
    debug: {
      type: 'boolean',
      default: false,
      description: 'Enable deug logs. Convenience for setting DEBUG=tydoc* envar.',
    },
    json: {
      type: 'boolean',
      default: false,
      alias: 'j',
      description: 'Output results as structured JSON data',
      // exclusive: ['markdown'],
    },
  })

  .command(
    'fromPublished <packageName>',
    'EPD from an npm registry published package',
    (yargs) => {
      return yargs
        .positional('packageName' as any, { description: 'Name of a package published on the npm registry' })
        .options({
          ver: {
            type: 'string',
            description: 'Version of the package to get EDD for.',
          },
          markdown: {
            type: 'boolean',
            default: true,
            alias: 'm',
            // exclusive: ['json'],
          },
          flatTermsSection: {
            type: 'boolean',
            default: false,
            description:
              'For use with markdown rendering. Whether or not the API terms section should have a title and nest its term entries under it. If false, term entry titles are de-nested by one level.',
          },
        })
    },
    async (input) => {
      if (input.debug) {
        debug.enable('tydoc*')
      }

      /**
       * Map input to FromProjectParams
       */

      const FromPublishedParams: TyDoc.FromPublishedParams = {
        packageName: input.packageName as string,
        packageVersion: input.ver,
      }

      /**
       * Get EPD
       */

      const epd = await TyDoc.fromPublished(FromPublishedParams)

      if (input.json) {
        process.stdout.write(JSON.stringify(epd, null, 2) + '\n')
        return
      }

      if (input.markdown) {
        const options = {
          flatTermsSection: input.flatTermsSection,
        }
        process.stdout.write(TyDoc.Renderers.Markdown.render(epd.docs, options) + '\n')
        return
      }
    }
  )

  .command(
    'project <filePath>',
    'EPD from local package source',
    (yargs) => {
      return yargs
        .positional('filePath', {
          description: 'Entrypoint path(s) into the package',
        })
        .options({
          markdown: {
            type: 'boolean',
            default: true,
            alias: 'm',
            // exclusive: ['json'],
          },
          dir: {
            type: 'string',
            alias: 'd',
            description: 'Project path e.g.: ./projects/my-package',
          },
          sourceMainEntrypointPath: {
            type: 'string',
            description: `Absolute path to the source main entrypoint. By default a discovery attempt is made by running heuristics against a combination of package.json and tsconfig.json however it only covers common patterns, not all possible setups. If you give a relative path it is relative to the project directory (--dir).`,
          },
          flatTermsSection: {
            type: 'boolean',
            default: false,
            description:
              'For use with markdown rendering. Whether or not the API terms section should have a title and nest its term entries under it. If false, term entry titles are de-nested by one level.',
          },
          ignoreDiagnostics: {
            type: 'boolean',
            default: false,
            description:
              'Should Tydoc ignore any TypeScript diagnostics that are raised? If not ignored then Tydoc will refuse to extract when diagnostics are raised.',
          },
          ignoreDiagnosticsMatching: {
            type: 'string',
            // exclusive: ['ignore-diagnostics'],
            description: dedent`
              JSON5 of one (or an array of) diagnostic filters. Examples:

                { path: '/foo/bar/.*' }
                { code: '2\d{2}5' }
                { category: 'error' }
                [{ path: '/foo/bar/.*', code '24.*' }]
            `,
          },
        })
    },
    async (input) => {
      if (input.debug) {
        debug.enable('tydoc*')
      }

      /**
       * Map arv and flags to FromProjectParams
       */

      let validateTypeScriptDiagnostics

      if (input.ignoreDiagnosticsMatching) {
        validateTypeScriptDiagnostics = arrayify(
          JSON5.parse(input.ignoreDiagnosticsMatching)
        ) as DiagnosticFilter[]
      } else {
        validateTypeScriptDiagnostics = !input.ignoreDiagnostics
      }

      const FromProjectParams: FromProjectParams = {
        entrypoints: arrayify(input.filePath as string | string[]),
        readSettingsFromJSON: true,
        layout: {
          validateTypeScriptDiagnostics,
          projectDir: input.dir === undefined ? undefined : absolutify(process.cwd(), input.dir),
          sourceMainModulePath: input.sourceMainEntrypointPath,
        },
      }

      /**
       * Get EDD
       */

      const docs = TyDoc.fromProject(FromProjectParams)

      if (input.json) {
        process.stdout.write(JSON.stringify(docs, null, 2) + '\n')
        return
      }

      if (input.markdown) {
        const options = {
          flatTermsSection: input.flatTermsSection,
        }
        process.stdout.write(TyDoc.Renderers.Markdown.render(docs, options) + '\n')
        return
      }
    }
  ).argv

if (!argv._[0]) {
  yargs.showHelp()
}
