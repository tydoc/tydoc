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
  `)
  ).toMatchInlineSnapshot(`
    "#### foo

    \`\`\`ts
    (a:string, b:number) => void
    \`\`\`
    
    #### bar

    \`\`\`ts
    () => void
    \`\`\`"
  `)
})
