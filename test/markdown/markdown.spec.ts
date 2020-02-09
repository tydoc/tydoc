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
  `)
  ).toMatchInlineSnapshot(`
    "#### foo

    \`\`\`ts
    (a:string, b:number) => void
    \`\`\`

    #### bar

    \`\`\`ts
    () => void
    \`\`\`

    #### toto

    \`\`\`ts
    () => void
    \`\`\`

    #### fofo

    \`\`\`ts
    () => void
    \`\`\`
    "
  `)
})
