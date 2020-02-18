import * as lo from 'lodash'
interface RenderState {
  level: number
}

interface Renderable {
  render(state: RenderState): string
}

type SectionData = {
  title: string
  children: Node[]
}

interface Section extends Renderable {
  add(content: Node[]): Section
  add(...content: Node[]): Section
}

interface CodeBlock extends Renderable {}

type DocumentData = {
  children: Node[]
}

export type Node = Renderable | string

interface Document extends Renderable {
  add(content: Node[]): Section
  add(...content: Node[]): Section
}

/**
 * A newline constant.
 */
const NL = '\n'

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
        data.children
          .map(content =>
            typeof content === 'string' ? content : content.render({ ...state })
          )
          .join('\n') + NL
      )
    },
  }
  return api
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

interface Group {
  add(...elements: Node[]): Group
  render(state: RenderState): string
}

// /**
//  * Create a flat grouping of content. This is just a little wrapper around
//  * effectively an array of elements. This is handy to be able to easily go
//  * between flat and non-flat content without having to go through potentially
//  * unwanted refactoring.
//  */
// export function group(): Group {
//   const data = {
//     elements: [],
//   }
//   const api: Group = {
//     add(...elements) {
//       elements.push(...elements)
//       return api
//     },
//     render(state){
//       return data.elements.map((c,el) => {
//         if (typeof el === 'string') c +
//       })
//     }
//   }
//   return api
// }
