import Command, { flags } from '@oclif/command'
import * as TyDoc from '../../'

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
  }
  async run() {
    const { flags, argv } = this.parse(Project)

    const docs = TyDoc.fromProject({
      entrypoints: argv,
      readSettingsFromJSON: true,
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
