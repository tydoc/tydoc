import '../src'
const ctx = createContext()

it('extracts nothing if the module is empty', () => {
  expect(ctx.given('')).toMatchSnapshot()
})

it('extracts nothing if the module has no exports', () => {
  expect(
    ctx.given(`
      function a() {}
      const b = 2
    `)
  ).toMatchSnapshot()
})
