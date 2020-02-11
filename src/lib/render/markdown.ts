import { Docs } from '../extract/extract'
import { codeBlock, codeSpan, document, section } from '../lib/markdown'

export interface Options {
  /**
   * Whether or not the API terms section should have a title and nest its term
   * entries under it. If false, term entry titles are de-nested by one level.
   */
  flatTermsSection: boolean
}

/**
 * Render docs as Markdown.
 */
export function render(docs: Docs, opts: Options): string {
  const d = document()

  // once multiple modules are supported, we will need to have module sections
  // md += '## Default Module\n\n'

  const exportedTerms = docs.terms.map(term => {
    const s = section(codeSpan(term.name))
    if (term.kind === 'function') {
      s.add('<!-- prettier-ignore -->', codeBlock('ts', term.signature.text))
    }
    return s
  })

  const exportedTermsSection = opts.flatTermsSection
    ? exportedTerms
    : [section('Exported Terms').add(...exportedTerms)]

  d.add(...exportedTermsSection)

  d.add(
    section('Exported Types').add(
      ...Object.values(docs.typeIndex)
        .filter(type => type.exported)
        .map(type => {
          // todo export text presence seems like an extraction concern
          return section(codeSpan(type.exported!.name)).add(
            codeBlock('ts', type.textWithJSDoc.replace(/export /, ''))
          )
        })
    )
  )

  d.add(
    section('Type Index').add(
      ...Object.values(docs.typeIndex)
        .filter(type => !type.exported)
        .map(type => {
          // todo export text presence seems like an extraction concern
          return section(codeSpan(type.name)).add(
            codeBlock('ts', type.textWithJSDoc.replace(/export /, ''))
          )
        })
    )
  )

  return d.render({ level: 3 })
}
