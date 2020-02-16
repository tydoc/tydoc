import * as Doc from '../extract/doc'
import {
  codeSpan,
  document,
  Element,
  section,
  tsCodeBlock,
} from '../lib/markdown'

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
export function render(docs: Doc.DocPackage, opts: Options): string {
  const c = document()

  if (docs.modules.length === 0) {
    // do nothing
  } else if (docs.modules.length === 1) {
    c.add(...renderModule(opts, docs.modules[0], docs.typeIndex))
  } else {
    c.add(
      ...docs.modules.map(mod => {
        return section(codeSpan(mod.name)).add(
          ...renderModule(opts, mod, docs.typeIndex)
        )
      })
    )
  }

  return c.render({ level: 3 })

  /**
   * Render one module of the package.
   */
  function renderModule(
    opts: Options,
    mod: Doc.DocModule,
    ti: Doc.TypeIndex
  ): Element[] {
    const exportedTypes = mod.namedExports.filter(ex => ex.isType)
    const exportedTerms = mod.namedExports.filter(ex => ex.isTerm)

    const els = []
    const exportedTermsContent = exportedTerms.map(ex => {
      const c = section(codeSpan(ex.name))
      return c
    })

    const exportedTermsSection = opts.flatTermsSection
      ? exportedTermsContent
      : [section('Exported Terms').add(...exportedTermsContent)]

    els.push(...exportedTermsSection)

    els.push(
      section('Exported Types').add(
        ...exportedTypes.map(ext => {
          const type = ext.type
          const c = section(typeTitle(ext))
          c.add(tsCodeBlock(type.kind))
          return c
        })
      )
    )

    els.push(
      section('Type Index').add(
        ...Object.values(ti).map(t => {
          const c = section(typeTitle(t))
          // prevent prettier adding a leading `;`
          if (t.kind === 'alias' && t.type.kind === 'callable') {
            c.add('<!-- prettier-ignore -->')
          }
          if (t.kind === 'alias' && t.type.kind === 'union') {
            // todo it seems type/node text for unions is not working?
            // c.add(tsCodeBlock(t.type.raw.nodeText))
            c.add(
              tsCodeBlock(
                `type ${t.name} = \n  | ` +
                  t.type.types
                    .map((t: any) => t.name ?? t?.raw?.nodeText ?? '')
                    .join('  \n  | ')
              )
            )
          } else {
            c.add(tsCodeBlock(t.raw.nodeText))
          }
          return c
        })
      )
    )

    return els
  }

  // todo need type modelling for concept of "named" type
  // todo need type modelling for concept of "type" export
  function typeTitle(et: Doc.TypeNode | Doc.Expor) {
    if (et.kind === 'export') {
      return codeSpan(et.name) + ' ' + codeSpan(typeSymbol(et.type))
    } else {
      // @ts-ignore
      return codeSpan(et.name) + ' ' + codeSpan(typeSymbol(et))
    }
  }

  function typeSymbol(t: Doc.Node): string {
    if (t.kind === 'interface') return 'I'
    if (t.kind === 'object') return 'T'
    if (t.kind === 'callable') return 'F'
    if (t.kind === 'union') return 'U'
    if (t.kind === 'alias') {
      return typeSymbol(t.type)
    }
    if (t.kind === 'typeIndexRef') {
      return typeSymbol(docs.typeIndex[t.link])
    }
    return '' // todo
  }
}
