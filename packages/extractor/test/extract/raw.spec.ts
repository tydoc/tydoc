it('skips import nodes when pulling type text', () => {
  expect(
    ctx.extract(
      `
        export * from './b'
      `,
      `
        export function fa () {}
      `
    ).modules[0].namedExports[0].type
  ).toMatchInlineSnapshot(`
    Object {
      "hasProps": false,
      "isOverloaded": false,
      "kind": "callable",
      "props": Array [],
      "raw": Object {
        "nodeFullText": "export function fa() {}",
        "nodeText": "export function fa() {}",
        "typeText": "() => void",
      },
      "sigs": Array [
        Object {
          "kind": "sig",
          "params": Array [],
          "return": Object {
            "kind": "primitive",
            "type": "void",
          },
        },
      ],
    }
  `)
})
