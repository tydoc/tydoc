it('skips import nodes when pulling type text', () => {
  expect(
    ctx.extract(
      `
        export * from './b'
      `,
      `
        export function fa () {}
      `
    ).modules[0].namedExports[0].type.raw
  ).toMatchInlineSnapshot(`
    Object {
      "nodeFullText": "export function fa() {}",
      "nodeText": "export function fa() {}",
      "typeText": "() => void",
    }
  `)
})
