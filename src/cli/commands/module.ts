import Command, { flags } from '@oclif/command'
import { extractDocsFromModuleAtPath, renderMarkdown } from '../../'

export class Log extends Command {
  static args = [{ name: 'filePath', required: true }]
  static flags = {
    markdown: flags.boolean({ default: true, char: 'm', exclusive: ['json'] }),
    json: flags.boolean({ default: false, char: 'j', exclusive: ['markdown'] }),
  }
  async run() {
    const { args, flags } = this.parse(Log)
    const docs = extractDocsFromModuleAtPath(args.filePath)

    if (flags.json) {
      this.log(JSON.stringify(docs, null, 2))
      return
    }

    if (flags.markdown) {
      this.log(renderMarkdown(docs))
      return
    }
  }
}
