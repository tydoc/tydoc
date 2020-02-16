it('raw is based on type alias declaration node', () => {
  expect(
    ctx.extract(`
      export { A }
      /**
       * foobar
       */
      type A = {}
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
            "nodeFullText": "/**
     * foobar
     */
    type A = {};",
            "nodeText": "type A = {};",
            "typeText": "import(\\"/a\\").A",
          },
          "type": Object {
            "kind": "object",
            "props": Array [],
            "raw": Object {
              "nodeFullText": "/**
     * foobar
     */
    type A = {};",
              "nodeText": "type A = {};",
              "typeText": "import(\\"/a\\").A",
            },
          },
        },
      },
    }
  `)
})
