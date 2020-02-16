import * as Debug from 'Debug'
import * as Prettier from 'prettier'
import * as Doc from '../extract/doc'
import { codeSpan, document, Node, section, tsCodeBlock } from '../lib/markdown'
const debug = Debug('dox:markdown')
const debugModule = Debug('dox:markdown:module')

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
  debug('start')

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

  // .replace() hack until we have jsdoc extraction
  const docsString = c
    .render({ level: 3 })
    .replace(/\/\/ prettier-ignore\n/g, '')

  debug('prettier start')
  const formattedDocsString = Prettier.format(docsString, {
    semi: false,
    singleQuote: true,
    parser: 'markdown',
  })
  debug('prettier done')

  return formattedDocsString

  //
  // helpers
  //

  /**
   * Render one module of the package.
   */
  function renderModule(
    opts: Options,
    mod: Doc.DocModule,
    ti: Doc.TypeIndex
  ): Node[] {
    debugModule('start')

    const exportedTypes = mod.namedExports.filter(ex => ex.isType)
    const exportedTerms = mod.namedExports.filter(ex => ex.isTerm)

    debugModule('start exported terms')

    const els = []
    const exportedTermsContent = exportedTerms.map(ex => {
      const c = section(codeSpan(ex.name))
      // Use type text for terms. Using node text would render uninteresting and
      // potentially massive implementation source code.
      if (ex.type.kind === 'callable') {
        c.add(...sigCodeBlock((ex.type as any)?.raw.typeText))
      } else {
        c.add(tsCodeBlock((ex.type as any)?.raw.typeText))
      }
      return c
    })

    const exportedTermsSection = opts.flatTermsSection
      ? exportedTermsContent
      : [section('Exported Terms').add(...exportedTermsContent)]

    els.push(...exportedTermsSection)

    debugModule('start exported types')

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

    debugModule('start type index')

    els.push(
      section('Type Index').add(
        ...Object.values(ti).map(t => {
          const c = section(typeTitle(t))
          // Use type node text because type text for types is just names it
          // seems, not informative.
          if (t.kind === 'alias' && t.type.kind === 'callable') {
            c.add(...sigCodeBlock(t.raw.nodeFullText))
          } else {
            c.add(tsCodeBlock(t.raw.nodeFullText))
          }
          return c
        })
      )
    )

    return els
  }

  /**
   * prevent prettier adding a leading `;`
   */
  function sigCodeBlock(sig: string) {
    return ['<!-- prettier-ignore -->', tsCodeBlock(sig)]
  }

  // todo need type modelling for concept of "named" type
  // todo need type modelling for concept of "type" export
  function typeTitle(et: Doc.TypeNode | Doc.Expor) {
    let icon = ''
    if (et.kind === 'export') {
      icon = typeIcon(et.type)
    } else {
      icon = typeIcon(et)
    }

    if (icon) icon = codeSpan(icon) + ' '

    if (et.kind === 'export') {
      return icon + codeSpan(et.name)
    } else {
      // @ts-ignore
      return icon + codeSpan(et.name)
    }
  }

  function typeIcon(t: Doc.Node): string {
    if (t.kind === 'interface') return 'I'
    if (t.kind === 'object') return 'T'
    if (t.kind === 'callable') return 'F'
    if (t.kind === 'union') return '|'
    if (t.kind === 'intersection') return '&'
    if (t.kind === 'alias') {
      return typeIcon(t.type)
    }
    if (t.kind === 'typeIndexRef') {
      return typeIcon(docs.typeIndex[t.link])
    }
    return '' // todo
  }

  //   function unionCodeBlock(t: any): MD.Node {
  //     return tsCodeBlock(
  //       `type ${t.name} = \n  | ` +
  //         t.type.types
  //           .map((t: any) => {
  //             return t.name || t.raw?.nodeFullText || t.raw?.typeText || ''
  //           })
  //           .join('  \n  | ')
  //     )
  //   }
}
