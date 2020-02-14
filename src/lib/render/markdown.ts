import * as D from '../extract/docman'
import { codeSpan, document, Element, section } from '../lib/markdown'

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
export function render(docs: D.DocPackage, opts: Options): string {
  const d = document()

  if (docs.modules.length === 0) {
    // do nothing
  } else if (docs.modules.length === 1) {
    d.add(...renderModule(opts, docs.modules[0], docs.typeIndex))
  } else {
    d.add(
      ...docs.modules.map(mod => {
        return section(codeSpan(mod.name)).add(
          ...renderModule(opts, mod, docs.typeIndex)
        )
      })
    )
  }

  return d.render({ level: 3 })
}

/**
 * Render one module of the package.
 */
function renderModule(
  opts: Options,
  mod: D.DocModule,
  ti: D.TypeIndex
): Element[] {
  const exportedTypes = mod.namedExports.filter(ex => ex.isType)
  const exportedTerms = mod.namedExports.filter(ex => ex.isTerm)

  const g = []
  const exportedTermsContent = exportedTerms.map(ex => {
    const s = section(codeSpan(ex.name))
    if (ex.type.kind === 'function') {
      // todo
      // s.add('<!-- prettier-ignore -->', codeBlock('ts', ex.signature.text))
    }
    return s
  })

  const exportedTermsSection = opts.flatTermsSection
    ? exportedTermsContent
    : [section('Exported Terms').add(...exportedTermsContent)]

  g.push(...exportedTermsSection)

  g.push(
    section('Exported Types').add(
      ...exportedTypes.map(ext => {
        return section(codeSpan(ext.name))
        // .add(
        //   codeBlock('ts', type.textWithJSDoc.replace(/export /, ''))
        // )
      })
    )
  )

  g.push(
    section('Type Index').add(
      ...Object.values(ti).map(type => {
        return section(codeSpan(type.name))
        // .add(
        //   codeBlock('ts', type.textWithJSDoc.replace(/export /, ''))
        // )
      })
    )
  )

  return g
}
