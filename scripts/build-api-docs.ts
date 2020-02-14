import * as fs from 'fs-jetpack'
import * as path from 'path'
import { extractDocsFromProject, renderMarkdown } from '../src'

const docsData = extractDocsFromProject({ entrypoints: ['index'] })
const docsMarkdown = renderMarkdown(docsData, { flatTermsSection: true })
updateMarkdownBlock(
  path.join(__dirname, '../README.md'),
  'api docs',
  docsMarkdown
)

/**
 * Replace a block of content inside a markdown file.
 */
function updateMarkdownBlock(
  filePath: string,
  blockName: string,
  blockContent: string
): void {
  let contents = fs.read(filePath)!

  contents = contents.replace(
    new RegExp(
      `(<!-- START ${blockName} --->).*(<!-- END ${blockName} --->)`,
      'is'
    ),
    `$1\n\n${blockContent}$2`
  )

  fs.write(filePath, contents)
}
