import '../../src'
const ctx = createContext()

it('renders markdown', () => {
  expect(
    ctx.markdown(`
      /**
       * Toto
       */
      export function foo(a:string, b:number) {}
      export function bar() {}
      export const toto = () => {}
      export const fofo = function fofo2() {}
      export type A = {
        /**
         * About a...
         */
        a: string,
        b: number
        c: C
      }
      type C = {
        d: number,
        e: string
      }
  `)
  ).toMatchInlineSnapshot(`
    "### API

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

    ### Types

    #### \`A\`

    \`\`\`ts
    type A = {
      /**
       * About a...
       */
      a: string;
      b: number;
      c: C;
    };
    \`\`\`

    "
  `)
})
