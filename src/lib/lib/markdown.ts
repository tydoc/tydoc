import * as lo from 'lodash'

interface RenderState {
  level: number
}

interface Renderable {
  render(state: RenderState): string | string[]
}

interface CodeBlock extends Renderable {}

export type Node = Renderable | string

/**
 * A newline constant.
 */
const NL = '\n'

export const PRETTIER_IGNORE = '<!-- prettier-ignore -->'

//
// Document
//

type DocumentData = {
  children: Node[]
}

interface Document {
  add(content: Node[]): Section
  add(...content: Node[]): Section
  render(state: RenderState): string
}

/**
 * Create a new markdown document.
 */
export function document(): Document {
  const data: DocumentData = {
    children: [],
  }
  const api: Document = {
    add(...sections: Node[] | [Node[]]) {
      data.children.push(...lo.flatten(sections))
      return api
    },
    render(state) {
      return (
        lo
          .flatMap(data.children, n => {
            return typeof n === 'string' ? n : n.render({ ...state })
          })
          .join('\n') + NL
      )
    },
  }
  return api
}

//
// Section
//

type SectionData = {
  title: string
  children: Node[]
}

interface Section extends Renderable {
  add(content: Node[]): Section
  add(...content: Node[]): Section
}

/**
 * Create a markdown section. A section is a title following by content.
 */
export function section(title: string): Section {
  const data: SectionData = {
    title,
    children: [],
  }
  const api: Section = {
    add(...sections: Node[] | [Node[]]) {
      data.children.push(...lo.flatten(sections))
      return api
    },
    render(state) {
      let s = ''
      s += heading(state.level, data.title) + NL
      s += NL
      s += data.children
        .map(content =>
          typeof content === 'string'
            ? content
            : content.render({ ...state, level: state.level + 1 })
        )
        .join('\n')
      return s
    },
  }
  return api
}

//
// Group
//

interface Frag extends Renderable {
  add(nodes: Node[]): Frag
  add(...nodes: Node[]): Frag
}

type FragData = {
  nodes: Node[]
}

/**
 * Create a flat grouping of content. This is just a little wrapper around
 * effectively an array of elements. This is handy to be able to easily go
 * between flat and non-flat content without having to go through potentially
 * unwanted refactoring.
 */
export function frag(...nodes: Node[] | [Node[]]): Frag {
  const data: FragData = {
    nodes: lo.flatten(nodes),
  }
  const api: Frag = {
    add(...nodes: Node[] | [Node[]]) {
      data.nodes.push(...lo.flatten(nodes))
      return api
    },
    render(state) {
      return lo.flatMap(data.nodes, n => {
        return typeof n === 'string' ? n : n.render(state)
      })
    },
  }
  return api
}

//
// Helpers
//

/**
 * Create a markdown code block.
 */
export function codeBlock(languageType: string, content: string): CodeBlock {
  return {
    render() {
      let s = ''
      s += '```' + languageType + NL
      s += content + NL
      s += '```' + NL
      return s
    },
  }
}

export const tsCodeBlock = codeBlock.bind(null, 'ts')

/**
 * Create a markdown heading.
 */
export function heading(n: number, content: string): string {
  let i = 0
  let s = ''
  while (i < n) {
    s += '#'
    i++
  }
  return s + ' ' + content
}

/**
 * Create markdown text styled as code.
 */
export function codeSpan(content: string): string {
  return `\`${content}\``
}
