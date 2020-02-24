it('interfaces can have tsdoc', () => {
  expect(
    ctx.extract(`
    /**
     * ...
     * 
     * @example
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
          "tsdoc": null,
        },
      ],
      "typeIndex": Object {
        "(a).A": Object {
          "kind": "interface",
          "name": "A",
          "props": Array [],
          "raw": Object {
            "nodeFullText": "/**
     * ...
     *
     * @example
     *
     * bar
     *
     */
    export interface A {}",
            "nodeText": "export interface A {}",
            "typeText": "A",
          },
          "tsdoc": Object {
            "customTags": Array [],
            "examples": Array [
              Object {
                "text": "bar",
              },
            ],
            "raw": "/**
     * ...
     *
     * @example
     *
     * bar
     *
     */",
            "summary": "...",
          },
        },
      },
    }
  `)
})
