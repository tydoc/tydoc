it('passes smoke test', () => {
  const docs = ctx.extract(`
    export type StringList = string[]
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
              "name": "StringList",
              "type": Object {
                "kind": "typeref",
                "name": "(\\"/a\\").StringList",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").StringList": Object {
          "kind": "aliasAlias",
          "name": "(\\"/a\\").StringList",
          "refType": Object {
            "innerType": Object {
              "kind": "primitive",
              "name": "string",
            },
            "kind": "array",
          },
        },
      },
    }
  `)
})
