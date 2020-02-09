import { DocFunction, Docs } from './extract'

export function render(docs: Docs): string {
  let md = ''

  md += docs.terms
    .map(term => {
      let s = `#### ${term.name}\n\n`
      if (term.kind === 'function') {
        s += markdownCodeBlock(renderSignature(term), 'ts')
      }
      return s
    })
    .join('\n\n')

  md += '\n'
  return md
}

/**
 * Render signature markdown for the given function doc.
 */
function renderSignature(f: DocFunction): string {
  let s = ''

  s += '('
  if (f.signature.parameters.length > 0) {
    s += f.signature.parameters
      .map(p => {
        return p.name + ':' + p.type.name
      })
      .join(', ')
  }
  s += ')'

  s += ` => ${f.signature.return.name}`

  return s
}

/**
 * Render the given string inside markdown codeblock.
 */
function markdownCodeBlock(s: string, languageType?: string): string {
  return '```' + (languageType || '') + '\n' + s + '\n' + '```'
}
