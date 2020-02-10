import Command, { flags } from '@oclif/command'
import * as fs from 'fs-jetpack'
import * as path from 'path'
import { extractDocsFromModuleAtPath, renderMarkdown } from '../../'

export class Log extends Command {
  static args = [{ name: 'filePath', required: true }]
  static flags = {
    markdown: flags.boolean({ default: true, char: 'm', exclusive: ['json'] }),
    json: flags.boolean({ default: false, char: 'j', exclusive: ['markdown'] }),
  }
  async run() {
    const { args, flags } = this.parse(Log)
    const existsResult = fs.exists(args.filePath)

    if (existsResult === false) {
      return this.error(`No module found at ${args.filePath}`)
    }

    let docs
    if (existsResult === 'dir') {
      docs = extractDocsFromModuleAtPath(path.join(args.filePath, 'index.ts'))
    } else {
      docs = extractDocsFromModuleAtPath(args.filePath)
    }

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
