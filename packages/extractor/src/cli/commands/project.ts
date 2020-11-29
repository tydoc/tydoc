import Command, { flags } from '@oclif/command'
import * as JSON5 from 'json5'
import * as TyDoc from '../../'
import { DiagnosticFilter } from '../../api/lib/ts-helpers'
import { arrayify } from '../../utils'
import dedent = require('dedent')

export class Project extends Command {
  static strict = false
  static args = [
    {
      name: 'filePath',
      required: true,
      description: 'Entrypoint(s) into the package',
    },
  ]
  static flags = {
    markdown: flags.boolean({
      default: true,
      char: 'm',
      exclusive: ['json'],
    }),
    dir: flags.string({
      char: 'd',
      helpValue: './projects/my-awesome-project',
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
    sourceMainEntrypointPath: flags.string({
      description: `Absolute path to the source main entrypoint. By default a discovery attempt is made by running heuristics against a combination of package.json and tsconfig.json however it only covers common patterns, not all possible setups. If you give a relative path it is relative to the project directory (--dir).`,
    }),
  }

  async run() {
    const { flags, argv } = this.parse(Project)

    let haltOnDiagnostics

    if (flags['ignore-diagnostics-matching']) {
      haltOnDiagnostics = arrayify(JSON5.parse(flags['ignore-diagnostics-matching'])) as DiagnosticFilter[]
    } else {
      haltOnDiagnostics = !flags['ignore-diagnostics']
    }

    const docs = TyDoc.fromProject({
      entrypoints: argv,
      readSettingsFromJSON: true,
      haltOnDiagnostics,
      layout: {
        projectDir: flags.dir,
        sourceMainModulePath: flags.sourceMainEntrypointPath,
      },
    })

    if (flags.json) {
      this.log(JSON.stringify(docs, null, 2))
      return
    }

    if (flags.markdown) {
      const options = {
        flatTermsSection: flags['flat-terms-section'],
      }
      this.log(TyDoc.renderMarkdown(docs, options))
      return
    }
  }
}
