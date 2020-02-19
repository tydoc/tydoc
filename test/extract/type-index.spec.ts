it('type alias of number is added to type index', () => {
  expect(
    ctx.extract(`
      export type A = 1
    `)
  ).toMatchInlineSnapshot(`
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
              "name": "A",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").A",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").A": Object {
          "kind": "alias",
          "name": "A",
          "raw": Object {
            "nodeFullText": "",
            "nodeText": "",
            "typeText": "1",
          },
          "type": Object {
            "base": "number",
            "kind": "literal",
            "name": "1",
          },
        },
      },
    }
  `)
})
