it('a function statement', () => {
  const docs = ctx.extract(`export function a() {}`)
  expect(docs.modules[0].namedExports).toMatchObject([{ name: 'a' }])
})

it('an interface not exported is not part of named exports', () => {
  const docs = ctx.extract('interface A {}')
  expect(docs.modules[0].namedExports).not.toMatchObject([{ name: 'A' }])
})
