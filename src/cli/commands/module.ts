import Command from '@oclif/command'
import { extractDocsFromModuleAtPath } from '../..'

export class Log extends Command {
  static args = [{ name: 'filePath', required: true }]
  async run() {
    const { args } = this.parse(Log)
    this.log(
      JSON.stringify(extractDocsFromModuleAtPath(args.filePath), null, 2)
    )
  }
}
