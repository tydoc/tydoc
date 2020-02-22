it('interfaces can have jsdoc', () => {
  expect(
    ctx.extract(`
    /**
     * ...
     * 
     * @a foo
     * @b
     * 
     * bar
     * 
     */
    export interface A {}
  `)
  ).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "isMain": true,
          "jsdoc": null,
          "kind": "module",
          "location": Object {
            "absoluteFilePath": "/src/a.ts",
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
          "path": "/",
        },
      ],
      "typeIndex": Object {
        "(a).A": Object {
          "jsdoc": Object {
            "raw": "...

    @a foo
    @b

    bar
    ",
            "summary": "",
            "tags": Array [
              Object {
                "name": "a",
                "text": "foo",
              },
              Object {
                "name": "b",
                "text": "bar",
              },
            ],
          },
          "kind": "interface",
          "name": "A",
          "props": Array [],
          "raw": Object {
            "nodeFullText": "/**
     * ...
     *
     * @a foo
     * @b
     *
     * bar
     *
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
