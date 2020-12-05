it('a callable interface is marked as a callable namespace', () => {
  expect(
    ctx.extract(`
      export interface A {
        (): boolean
        a: 1
        b: 2
      }
    `)
  ).toMatchSnapshot()
})
