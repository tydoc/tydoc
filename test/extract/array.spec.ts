it('passes smoke test', () => {
  const docs = ctx.extract(`
    export type StringList = string[]
  `)
  expect(docs).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "kind": "module",
          "location": Object {
            "absoluteFilePath": "/a.ts",
          },
          "mainExport": null,
          "name": "a",
          "namedExports": Array [
            Object {
              "isTerm": false,
              "isType": true,
              "kind": "export",
              "name": "StringList",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").StringList",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").StringList": Object {
          "kind": "alias",
          "name": "StringList",
          "raw": Object {
            "nodeFullText": "export type StringList = string[];",
            "nodeText": "export type StringList = string[];",
            "typeText": "StringList",
          },
          "type": Object {
            "innerType": Object {
              "kind": "primitive",
              "type": "string",
            },
            "kind": "array",
          },
        },
      },
    }
  `)
})
