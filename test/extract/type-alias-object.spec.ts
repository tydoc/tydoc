describe('can be a named export', () => {
  const docs = ctx.extract(`
    export type A = {}
  `)
  it('shows up as a named export', () => {
    expect(docs).toMatchObject({
      modules: [{ namedExports: [{ name: 'A' }] }],
    })
  })
  it('its type is added to the type index', () => {
    expect(docs).toMatchObject({
      typeIndex: { '("/a").A': { kind: 'alias', properties: [] } },
    })
  })
  it('refs the type index entry', () => {
    expect(docs).toMatchObject({
      modules: [
        { namedExports: [{ type: { kind: 'typeref', name: '("/a").A' } }] },
      ],
    })
  })
})

it('passes smoke test', () => {
  const docs = ctx.extract(`
    export type A = {}
  `)
  expect(docs).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "mainExport": null,
          "name": "a",
          "namedExports": Array [
            Object {
              "isTerm": false,
              "isType": true,
              "name": "A",
              "type": Object {
                "kind": "typeref",
                "name": "(\\"/a\\").A",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").A": Object {
          "kind": "alias",
          "name": "(\\"/a\\").A",
          "properties": Array [],
          "signatures": Array [],
        },
      },
    }
  `)
})
