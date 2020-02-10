import { Docs } from './extract'

/**
 * Render docs as Markdown.
 */
export function render(docs: Docs): string {
  let md = ''

  md += '### API\n\n'
  md += docs.terms
    .map(term => {
      let s = `#### ${term.name}\n\n`
      if (term.kind === 'function') {
        s += markdownCodeBlock(term.signature.text, 'ts')
      }
      return s
    })
    .join('\n\n')

  md += '\n\n'
  md += '### Types\n\n'
  md += docs.types
    .map(type => {
      let s = ''
      s += `#### ${type.name}\n\n`
      s += type.properties
        .map(prop => {
          let s = ''
          s += `- ${prop.name} (\`${prop.type.name}\`)\n`
          s += `  ${prop.jsDoc ? prop.jsDoc.primary.source + '\n' : ''}`
          return s
        })
        .join('\n')
      return s
    })
    .join('\n\n')

  md += '\n'
  return md
}

/**
 * Render the given string inside markdown codeblock.
 */
function markdownCodeBlock(s: string, languageType?: string): string {
  return '```' + (languageType || '') + '\n' + s + '\n' + '```'
}
