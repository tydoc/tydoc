it('extracts nothing if the module is empty', () => {
  expect(ctx.given('')).toMatchInlineSnapshot(`
    Object {
      "hybrids": Array [],
      "length": 0,
      "terms": Array [],
      "types": Array [],
    }
  `)
})

it('extracts nothing if the module has no exports', () => {
  expect(
    ctx.given(`
      function a() {}
      const b = 2
    `)
  ).toMatchInlineSnapshot(`
Object {
  "hybrids": Array [],
  "length": 0,
  "terms": Array [],
  "types": Array [],
}
`)
})
