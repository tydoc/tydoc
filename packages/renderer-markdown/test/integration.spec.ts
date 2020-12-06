const sources = [
  `
  /**
   * @example
   * 
   * \`\`\`ts
   * ...
   * \`\`\`
   */
    import { D, fooFromB } from './b'

    export { fooFromB }


    /**
     * Toto
     */
    export function foo(a:string, b:number) {}
    export function bar() {}
    export const toto = () => {}
    export const fofo = function fofo2(): number {
      return 1
    }
    export { A as AAlias }
    interface A {
      /**
       * About a...
       */
      a: string,
      b: number
      c: C
      d: D
    }
    interface C {
      d: number,
      e: string
    }
  `,
  `
    export interface D {
      a: string
      b: string
    }

    export function fooFromB(n: number): boolean {
      return false
    }
  `,
]

it('tydoc can render markdown', () => {
  expect(ctx.markdown({ flatTermsSection: true }, ...sources)).toMatchInlineSnapshot(`
    "### Example

    \`\`\`ts
    ...
    \`\`\`

    ### \`foo\`

    <!-- prettier-ignore -->
    \`\`\`ts
    (a: string, b: number) => void
    \`\`\`

    ### \`bar\`

    <!-- prettier-ignore -->
    \`\`\`ts
    () => void
    \`\`\`

    ### \`fooFromB\`

    <!-- prettier-ignore -->
    \`\`\`ts
    (n: number) => boolean
    \`\`\`

    ### \`toto\`

    <!-- prettier-ignore -->
    \`\`\`ts
    () => void
    \`\`\`

    ### \`fofo\`

    <!-- prettier-ignore -->
    \`\`\`ts
    () => number
    \`\`\`

    ### Exported Types

    #### \`I\` \`AAlias\`

    \`\`\`ts
    typeIndexRef
    \`\`\`

    ### Type Index

    #### \`I\` \`A\`

    \`\`\`ts
    interface A {
      /**
       * About a...
       */
      a: string
      b: number
      c: C
      d: D
    }
    \`\`\`

    #### \`I\` \`C\`

    \`\`\`ts
    interface C {
      d: number
      e: string
    }
    \`\`\`

    #### \`I\` \`D\`

    \`\`\`ts
    export interface D {
      a: string
      b: string
    }
    \`\`\`
    "
  `)
})
