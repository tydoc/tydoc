import '../src'
const ctx = createContext()

it('extracts nothing if the module is empty', () => {
  expect(ctx.extractDocsAndTypesFromModuleAtPath('')).toMatchSnapshot()
})

it('extracts nothing if the module has no exports', () => {
  expect(
    ctx.extractDocsAndTypesFromModuleAtPath(`
      function a() {}
      const b = 2
    `)
  ).toMatchSnapshot()
})
