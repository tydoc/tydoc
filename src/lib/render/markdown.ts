import * as Debug from 'Debug'
import * as Prettier from 'prettier'
import * as Doc from '../extract/doc'
import {
  codeSpan,
  lines,
  PRETTIER_IGNORE,
  render as renderMarkdown,
  section,
  span,
  tsCodeBlock,
} from '../lib/markdown'
const debug = Debug('tydoc:markdown')
const debugModule = Debug('tydoc:markdown:module')

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

  const md = lines()

  if (docs.modules.length === 0) {
    // do nothing
  } else if (docs.modules.length === 1) {
    md.add(renderModule(opts, docs.modules[0], docs.typeIndex))
  } else {
    md.add(
      docs.modules.map(mod => {
        return section(codeSpan(mod.name)).add(
          renderModule(opts, mod, docs.typeIndex)
        )
      })
    )
  }

  // .replace() hack until we have jsdoc extraction
  const docsString = renderMarkdown({ level: 3 }, md).replace(
    /\/\/ prettier-ignore\n/g,
    ''
  )

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
  function renderModule(opts: Options, mod: Doc.DocModule, ti: Doc.TypeIndex) {
    debugModule('start')

    const exportedTypes = mod.namedExports.filter(ex => ex.isType)
    const exportedTerms = mod.namedExports.filter(ex => ex.isTerm)

    debugModule('start exported terms')

    const md = lines()
    const exportedTermsContent = exportedTerms.map(ex => {
      const md = section(codeSpan(ex.name))
      // Use type text for terms. Using node text would render uninteresting and
      // potentially massive implementation source code.
      if (ex.type.kind === 'callable') {
        md.add(sigCodeBlock((ex.type as any)?.raw?.typeText ?? ''))
      } else {
        md.add(tsCodeBlock((ex.type as any)?.raw?.typeText ?? ''))
      }
      return md
    })

    if (opts.flatTermsSection) {
      md.add(exportedTermsContent)
    } else {
      md.add(section('Exported Terms').add(exportedTermsContent))
    }

    debugModule('start exported types')

    md.add(
      section('Exported Types').add(
        exportedTypes.map(ext => {
          const type = ext.type
          const c = section(typeTitle(ext))
          c.add(tsCodeBlock(type.kind))
          return c
        })
      )
    )

    debugModule('start type index')

    md.add(
      section('Type Index').add(
        Object.values(ti).map(t => {
          const md = section(typeTitle(t))
          // Use type node text because type text for types is just names it
          // seems, not informative.
          if (t.kind === 'alias' && t.type.kind === 'callable') {
            md.add(sigCodeBlock(t.raw.nodeFullText))
          } else {
            md.add(tsCodeBlock(t.raw.nodeFullText))
          }
          return md
        })
      )
    )

    return md
  }

  /**
   * prevent prettier adding a leading `;`
   */
  function sigCodeBlock(sig: string) {
    return lines(PRETTIER_IGNORE, tsCodeBlock(sig))
  }

  // todo need type modelling for concept of "named" type
  // todo need type modelling for concept of "type" export
  function typeTitle(et: Doc.TypeNode | Doc.Expor) {
    const md = span()

    if (et.kind === 'export') {
      md.add(codeSpan(typeIcon(et.type)))
    } else {
      md.add(codeSpan(typeIcon(et)))
    }

    if (et.kind === 'export') {
      return md.add(codeSpan(et.name))
    } else {
      // @ts-ignore
      return md.add(codeSpan(et.name))
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
