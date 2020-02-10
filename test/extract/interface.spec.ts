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
