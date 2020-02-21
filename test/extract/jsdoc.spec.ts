it('interfaces can have jsdoc', () => {
  expect(
    ctx.extract(`
    /**
     * ...
     */
    export interface A {}
  `)
  ).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "jsdoc": null,
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
                "link": "(a).A",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(a).A": Object {
          "jsdoc": Object {
            "tags": Array [],
            "text": "...",
          },
          "kind": "interface",
          "name": "A",
          "props": Array [],
          "raw": Object {
            "nodeFullText": "/**
     * ...
     */
    export interface A {}",
            "nodeText": "export interface A {}",
            "typeText": "A",
          },
        },
      },
    }
  `)
})
