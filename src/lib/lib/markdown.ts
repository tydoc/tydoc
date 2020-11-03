import * as lo from 'lodash'
import { ArrayOrVarg, MaybeArray } from '../../utils'

/**
 * Create a markdown section. A section is a title following by content.
 */
export function section(title: Node): SmartNode {
  const data: { title: Node; nodes: Node[] } = {
    title,
    nodes: [],
  }
  const me: SmartNode = {
    add(...sections) {
      data.nodes.push(...lo.flatten(sections))
      return me
    },
    render(state) {
      return render(
        state,
        lines(
          render(state, heading(state.level, data.title)),
          ...lo.flatMap(data.nodes, (content) => renderN({ ...state, level: state.level + 1 }, content))
        )
      )
    },
  }
  return me
}

/**
 * Text inside a code block.
 */
export function codeBlock(languageType: string, content: Node): Renderable {
  return lines(join('```', languageType), content, '```')
}

/**
 * Text inside a TypeScript code block.
 */
export const tsCodeBlock = codeBlock.bind(null, 'ts')

/**
 * Text styled as code.
 */
export function codeSpan(n: Node): Renderable {
  return {
    render(state) {
      return join('`', render(state, n), '`')
    },
  }
}

/**
 * A markdown link.
 */
export function link(text: Node, url: string): Renderable {
  return {
    render(state) {
      return `[${render(state, text)}](${url})`
    },
  }
}

/**
 * A heading.
 */
export function heading(n: number, content: Node): Renderable {
  let i = 0
  let s = ''

  while (i < n) {
    s += '#'
    i++
  }

  return span(s, content)
}

/**
 * A newline separated series of nodes.
 */
export function lines(...nodes: ArrayOrVarg<Node>): SmartNode {
  const data = {
    nodes: lo.flatten(nodes),
  }

  const me: SmartNode = {
    add(...nodes) {
      data.nodes.push(...lo.flatten(nodes))
      return me
    },
    render(state) {
      return lo.flatMap(data.nodes, (n) => renderN(state, n)).join('\n')
    },
  }

  return me
}

/**
 * A space separated series of nodes.
 */
export function span(...nodes: ArrayOrVarg<Node>): SmartNode {
  const data = {
    nodes: lo.flatten(nodes),
  }

  const me: SmartNode = {
    add(...nodes) {
      data.nodes.push(...lo.flatten(nodes))
      return me
    },
    render(state) {
      return lo.flatMap(data.nodes, (n) => renderN(state, n)).join(' ')
    },
  }

  return me
}

/**
 * Prettier ignore pragma constant.
 */
export const PRETTIER_IGNORE = '<!-- prettier-ignore -->'

//
// Internal Utilities
//

function renderN(state: RenderState, r: Node): MaybeArray<string> {
  return typeof r === 'string' ? r : r.render(state)
}

export function render(state: RenderState, n: Node): string {
  return lo.flatten(renderN(state, n)).join('')
}

interface RenderState {
  level: number
}

interface Renderable {
  render(state: RenderState): MaybeArray<string>
}

interface Appendable {
  add(...nodes: ArrayOrVarg<Node>): Node
}

export interface SmartNode extends Renderable, Appendable {}

export type Node = Renderable | string

function join(...strings: string[]): string {
  return strings.join('')
}
