it('extracts doc from interface', () => {
  expect(
    ctx.given(`
      export interface A {
        foo: string
        bar: string
      }
    `)
  ).toMatchSnapshot()
})

it('if exported with as-alias then export name reflects alias name', () => {
  expect(
    ctx.given(`
      interface A {}
      export { A as B }
    `)
  ).toMatchSnapshot()
})

it('export as-alias names do not conflict with type names in the type index', () => {
  expect(
    ctx.given(`
      interface A {
        c: C
      }

      interface C {}

      export { A as C }
    `)
  ).toMatchSnapshot()
})
