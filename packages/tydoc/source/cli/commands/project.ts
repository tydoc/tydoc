import Command, { flags } from '@oclif/command'
import * as TyDoc from '@tydoc/extractor'
import { FromProjectParams } from '@tydoc/extractor/dist/extract'
import { DiagnosticFilter } from '@tydoc/extractor/dist/lib/ts-helpers'
import * as TyDocMarkdownRenderer from '@tydoc/renderer-markdown'
import debug from 'debug'
import dedent from 'dedent'
import JSON5 from 'json5'
import { arrayify } from '../../utils'

export class Project extends Command {
  static strict = false
  static args = [
    {
      name: 'filePath',
      required: true,
      description: 'Entrypoint(s) into the package',
    },
  ]
  static flags: any = {
    sourceMainEntrypointPath: flags.string({
      description: `Absolute path to the source main entrypoint. By default a discovery attempt is made by running heuristics against a combination of package.json and tsconfig.json however it only covers common patterns, not all possible setups. If you give a relative path it is relative to the project directory (--dir).`,
    }),
    dir: flags.string({
      char: 'd',
      helpValue: './projects/my-awesome-project',
    }),
    debug: flags.boolean({
      default: false,
      description: 'Enable deug logs. Convenience for setting DEBUG=tydoc* envar.',
    }),
    markdown: flags.boolean({
      default: true,
      char: 'm',
      exclusive: ['json'],
    }),
    json: flags.boolean({
      default: false,
      char: 'j',
      exclusive: ['markdown'],
    }),
    'flat-terms-section': flags.boolean({
      default: false,
      description:
        'For use with markdown rendering. Whether or not the API terms section should have a title and nest its term entries under it. If false, term entry titles are de-nested by one level.',
    }),
    'ignore-diagnostics': flags.boolean({
      default: false,
      description:
        'Should Tydoc ignore any TypeScript diagnostics that are raised? If not ignored then Tydoc will refuse to extract when diagnostics are raised.',
    }),
    'ignore-diagnostics-matching': flags.string({
      exclusive: ['ignore-diagnostics'],
      description: dedent`
        JSON5 of one (or an array of) diagnostic filters. Examples:

          { path: '/foo/bar/.*' }
          { code: '2\d{2}5' }
          { category: 'error' }
          [{ path: '/foo/bar/.*', code '24.*' }]
        `,
    }),
  }

  async run() {
    const { flags, argv } = this.parse(Project) as any

    if (flags.debug) {
      debug.enable('tydoc*')
    }

    /**
     * Map arv and flags to FromProjectParams
     */

    let validateTypeScriptDiagnostics

    if (flags['ignore-diagnostics-matching']) {
      validateTypeScriptDiagnostics = arrayify(
        JSON5.parse(flags['ignore-diagnostics-matching'])
      ) as DiagnosticFilter[]
    } else {
      validateTypeScriptDiagnostics = !flags['ignore-diagnostics']
    }

    const FromProjectParams: FromProjectParams = {
      entrypoints: argv,
      readSettingsFromJSON: true,
      layout: {
        validateTypeScriptDiagnostics,
        projectDir: flags.dir,
        sourceMainModulePath: flags.sourceMainEntrypointPath,
      },
    }

    /**
     * Get EDD
     */

    const docs = TyDoc.fromProject(FromProjectParams)

    if (flags.json) {
      this.log(JSON.stringify(docs, null, 2))
      return
    }

    if (flags.markdown) {
      const options = {
        flatTermsSection: flags['flat-terms-section'],
      }
      this.log(TyDocMarkdownRenderer.render(docs, options))
      return
    }
  }
}
