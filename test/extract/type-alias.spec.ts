import '../../src/extract'
const ctx = createContext()

it('extracts doc from type aliases', () => {
  expect(
    ctx.given(`
      export type Foo = {}

      /**
       * boo
       */
      export type Bar = {
        /**
         * Doc about a 2
         */
        /**
         * Doc about a 1
         */
        a: string
        /**
         * Doc about b
         */
        b: number
      }
    `)
  ).toMatchSnapshot()
})
