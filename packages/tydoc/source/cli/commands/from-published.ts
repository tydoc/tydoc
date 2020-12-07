import Command, { flags } from '@oclif/command'
import * as TyDoc from '@tydoc/extractor'
import * as TyDocMarkdownRenderer from '@tydoc/renderer-markdown'
import debug from 'debug'

export class FromPublished extends Command {
  static args = [
    {
      name: 'packageName',
      required: true,
      description: 'Name of a package published on the npm registry',
    },
  ]

  // todo DRY with proejct sub-command flag
  static flags = {
    debug: flags.boolean({
      default: false,
      description: 'Enable deug logs. Convenience for setting DEBUG=tydoc* envar.',
    }),
    'flat-terms-section': flags.boolean({
      default: false,
      description:
        'For use with markdown rendering. Whether or not the API terms section should have a title and nest its term entries under it. If false, term entry titles are de-nested by one level.',
    }),
    json: flags.boolean({
      default: false,
      char: 'j',
      exclusive: ['markdown'],
    }),
    markdown: flags.boolean({
      default: true,
      char: 'm',
      exclusive: ['json'],
    }),
    version: flags.string({
      description: 'Version of the package to get EDD for.',
    }),
  }

  async run() {
    const { flags, argv } = this.parse(FromPublished)

    if (flags.debug) {
      debug.enable('tydoc*')
    }

    /**
     * Map arv and flags to FromProjectParams
     */

    const FromPublishedParams: TyDoc.FromPublishedParams = {
      packageName: argv[0]!,
      packageVersion: flags.version,
    }

    /**
     * Get EDD
     */

    const docs = await TyDoc.fromPublished(FromPublishedParams)

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
