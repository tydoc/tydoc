import '../../src'
const ctx = createContext()

it('renders markdown', () => {
  expect(
    ctx.markdown(
      `
        import { D } from './b'

        /**
         * Toto
         */
        export function foo(a:string, b:number) {}
        export function bar() {}
        export const toto = () => {}
        export const fofo = function fofo2() {}
        export interface A {
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
    `
    )
  ).toMatchInlineSnapshot(`
    "## Default Module

    ### Exported Terms

    #### foo

    <!-- prettier-ignore -->
    \`\`\`ts
    (a: string, b: number) => void
    \`\`\`

    #### bar

    <!-- prettier-ignore -->
    \`\`\`ts
    () => void
    \`\`\`

    #### toto

    <!-- prettier-ignore -->
    \`\`\`ts
    () => void
    \`\`\`

    #### fofo

    <!-- prettier-ignore -->
    \`\`\`ts
    () => void
    \`\`\`

    ### Exported Types

    #### \`A\`

    \`\`\`ts
    interface A {
      /**
       * About a...
       */
      a: string;
      b: number;
      c: C;
      d: D;
    }
    \`\`\`


    ## Type Index

    #### \`C\`

    \`\`\`ts
    interface C {
      d: number;
      e: string;
    }
    \`\`\`

    #### \`D\`

    \`\`\`ts
    interface D {
      a: string;
      b: string;
    }
    \`\`\`

    "
  `)
})
