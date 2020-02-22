it('inlines the type extracted from the term', () => {
  expect(
    ctx.extract(`
      export interface A { foo: typeof foo }
      export interface B {}
      function foo(): B { return undefined as any }
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
            Object {
              "isTerm": false,
              "isType": true,
              "kind": "export",
              "name": "B",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(a).B",
              },
            },
          ],
          "path": "/",
        },
      ],
      "typeIndex": Object {
        "(a).A": Object {
          "jsdoc": null,
          "kind": "interface",
          "name": "A",
          "props": Array [
            Object {
              "kind": "prop",
              "name": "foo",
              "type": Object {
                "hasProps": false,
                "isOverloaded": false,
                "kind": "callable",
                "props": Array [],
                "raw": Object {
                  "nodeFullText": "function foo(): B {
      return undefined as any;
    }",
                  "nodeText": "function foo(): B {
      return undefined as any;
    }",
                  "typeText": "() => B",
                },
                "sigs": Array [
                  Object {
                    "kind": "sig",
                    "params": Array [],
                    "return": Object {
                      "kind": "typeIndexRef",
                      "link": "(a).B",
                    },
                  },
                ],
              },
            },
          ],
          "raw": Object {
            "nodeFullText": "export interface A {
      foo: typeof foo;
    }",
            "nodeText": "export interface A {
      foo: typeof foo;
    }",
            "typeText": "A",
          },
        },
        "(a).B": Object {
          "jsdoc": null,
          "kind": "interface",
          "name": "B",
          "props": Array [],
          "raw": Object {
            "nodeFullText": "export interface B {}",
            "nodeText": "export interface B {}",
            "typeText": "B",
          },
        },
      },
    }
  `)
})
