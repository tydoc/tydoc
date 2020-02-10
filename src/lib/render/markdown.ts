import { Docs } from '../extract/extract'

/**
 * Render docs as Markdown.
 */
export function render(docs: Docs): string {
  let md = ''

  md += '## Default Module\n\n'

  md += '### Terms\n\n'
  md += docs.terms
    .map(term => {
      let s = `#### ${term.name}\n\n`
      if (term.kind === 'function') {
        s += '<!-- prettier-ignore -->\n'
        s += markdownCodeBlock(term.signature.text, 'ts')
      }
      return s
    })
    .join('\n\n')

  md += '\n\n'
  md += '### Types\n\n'
  md += docs.types
    .filter(type => type.isExported)
    .map(type => {
      let s = ''
      s += `#### \`${type.name}\`\n`
      // s += type.jsDoc ? type.jsDoc.primary.source + '\n' : ''
      s += '\n'
      s += '```ts\n'
      // todo export text presence seems like an extraction concern
      s += type.textWithJSDoc.replace(/export /, '') + '\n'
      s += '```\n'
      // s += type.properties
      //   .map(prop => {
      //     let s = ''
      //     s += `- ${prop.name} (\`${prop.type.name}\`)\n`
      //     s += `  ${prop.jsDoc ? prop.jsDoc.primary.source + '\n' : ''}`
      //     return s
      //   })
      //   .join('\n')
      return s
    })
    .join('\n')

  md += '\n'

  md += '## Type Index\n\n'

  return md
}

/**
 * Render the given string inside markdown codeblock.
 */
function markdownCodeBlock(s: string, languageType?: string): string {
  return '```' + (languageType || '') + '\n' + s + '\n' + '```'
}
