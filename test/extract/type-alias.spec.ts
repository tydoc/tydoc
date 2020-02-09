import '../../src/extract'
const ctx = createContext()

it('extracts doc from type aliases', () => {
  expect(
    ctx.given(`
      export type Foo = {}
      /**
       * boo
       */
      export type Bar = {}
    `)
  ).toMatchSnapshot()
})
