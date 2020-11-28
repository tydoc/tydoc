import * as MD from 'chaindown'
import {
  codeSpan,
  lines,
  link,
  PRETTIER_IGNORE,
  render as renderMarkdown,
  section,
  span,
  tsCodeBlock,
} from 'chaindown'
import Debug from 'debug'
import * as Prettier from 'prettier'
import { lookupOrThrow } from '../../utils'
import * as Doc from '../extractor/doc'

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

  const markdownDocs = renderPackage()

  // .replace() hack until we are using tsdoc extraction rather than the raw
  // source/checker extraction from TS. Without this, any prettier-ignore
  // pragmas in source code will end up in docs preventing them from being
  // formatted by prettier (which isn't obviously desirable, as the reasons to
  // disable prettier in source may not follow through to doc blocks).
  const docsString = renderMarkdown({ level: 3 }, markdownDocs).replace(/\/\/ prettier-ignore\n/g, '')

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

  function renderPackage() {
    const md = lines()

    if (docs.modules.length === 0) {
      // do nothing
      return md
    }

    if (docs.modules.length === 1) {
      // If there is only one module then no need to qualify it
      debugModule('start module %s', docs.modules[0]!.path)
      md.add(renderModule(opts, docs.modules[0]!, docs.typeIndex))
    } else {
      md.add(
        docs.modules.map((mod) => {
          debugModule('start module %s', mod.path)
          return section(codeSpan(mod.path)).add(renderModule(opts, mod, docs.typeIndex))
        })
      )
    }

    debugModule('start type index')

    md.add(
      section('Type Index').add(
        Object.values(docs.typeIndex).map((t) => {
          const md = section(typeTitle(t))
          // Use type node text because type text for types is just names it
          // seems, not informative.
          if (t.kind === 'alias' && t.type.kind === 'callable') {
            md.add(sigCodeBlock(t.raw.nodeFullText))
          } else {
            md.add(tsCodeBlock(t.raw.nodeFullText))
          }
          // todo render examples for all
          if (t.kind === 'interface' && t.tsdoc) {
            renderExamples(md, t.tsdoc)
          }
          return md
        })
      )
    )

    return md
  }

  /**
   * Render one module of the package.
   */
  function renderModule(opts: Options, mod: Doc.DocModule, ti: Doc.TypeIndex) {
    debugModule('start')

    const exportedTypes = mod.namedExports.filter((ex) => ex.isType)
    const exportedTerms = mod.namedExports.filter((ex) => ex.isTerm)

    debugModule('start exported terms')

    const md = lines()

    if (mod.tsdoc) {
      md.add(mod.tsdoc.summary)
      renderExamples(md, mod.tsdoc)
    }

    const exportedTermsContent = exportedTerms.map((ex) => {
      const termSection = section(codeSpan(ex.name))
      // Use type text for terms. Using node text would render uninteresting and
      // potentially massive implementation source code.

      if (ex.type.kind === 'callable') {
        termSection.add(sigCodeBlock((ex.type as any)?.raw?.typeText ?? ''))
      } else if (ex.type.kind === 'typeIndexRef') {
        termSection.add(
          span(
            'Of type',
            link(
              codeSpan(lookupOrThrow(ti, ex.type.link).name),
              typeTitleAnchorLink(lookupOrThrow(ti, ex.type.link))
            )
          )
        )
      } else {
        termSection.add(tsCodeBlock((ex.type as any)?.raw?.typeText ?? ''))
      }
      return termSection
    })

    if (opts.flatTermsSection) {
      md.add(exportedTermsContent)
    } else {
      md.add(section('Exported Terms').add(exportedTermsContent))
    }

    debugModule('start exported types')

    md.add(
      section('Exported Types').add(
        exportedTypes.map((ext) => {
          const type = ext.type
          const c = section(typeTitle(ext))
          c.add(tsCodeBlock(type.kind))
          return c
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

  function typeTitleAnchorLink(et: Doc.TypeNode | Doc.Expor): string {
    return '#' + slugify(renderMarkdown({ level: 0 }, typeTitle(et)))
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
      return typeIcon(lookupOrThrow(docs.typeIndex, t.link))
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

/**
 * Basic slugification. This should produce results consistent with the
 * slugifier from the markdown-to-html rendering used by whatever system is
 * transforming these markdown docs. This slugifier is intended to be used to
 * create anchor links to other titles in the document which can only work if it
 * matches how the host system creates anchor links from title text.
 */
function slugify(x: string) {
  return x
    .replace(/ +/g, '-')
    .replace(/[^A-Za-z0-9-_]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/, '')
    .toLowerCase()
}

function renderExamples(md: MD.SmartNode, tsdoc: Doc.TSDoc): void {
  if (tsdoc.examples.length === 0) return

  if (tsdoc.examples.length === 1) {
    md.add(section('Example').add(tsdoc.examples[0]!.text))
  } else {
    md.add(section('Examples').add(tsdoc.examples.map((ex, i) => section(`Example ${i}`).add(ex.text))))
  }
}
