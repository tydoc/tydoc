import * as tydocMarkdownRender from '@tydoc/renderer-markdown'
import * as fs from 'fs-jetpack'
import * as path from 'path'
import { inspect } from 'util'
import { fromSource } from '../source'

const docsData = fromSource({
  entrypoints: ['index'],
  readSettingsFromJSON: true,
})

if (process.argv[2] === '--json') {
  console.log(inspect(docsData, { depth: null }))
  process.exit(0)
}

const docsMarkdown = tydocMarkdownRender.render(docsData, { flatTermsSection: true })
updateMarkdownBlock(path.join(__dirname, '../README.md'), 'api docs', docsMarkdown)

/**
 * Replace a block of content inside a markdown file.
 */
function updateMarkdownBlock(filePath: string, blockName: string, blockContent: string): void {
  let contents = fs.read(filePath)!

  contents = contents.replace(
    new RegExp(`(<!-- START ${blockName} --->).*(<!-- END ${blockName} --->)`, 'is'),
    `$1\n\n${blockContent}$2`
  )

  fs.write(filePath, contents)
}
