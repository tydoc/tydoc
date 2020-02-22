it('gets each member of the intersection', () => {
  expect(
    ctx.extract(`
      export type A = { s: string } & { b: boolean }
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
            "nodeFullText": "export type A = { s: string } & { b: boolean };",
            "nodeText": "export type A = { s: string } & { b: boolean };",
            "typeText": "import(\\"/a\\").A",
          },
          "type": Object {
            "kind": "intersection",
            "raw": Object {
              "nodeFullText": "export type A = { s: string } & { b: boolean };",
              "nodeText": "export type A = { s: string } & { b: boolean };",
              "typeText": "import(\\"/a\\").A",
            },
            "types": Array [
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "s",
                    "type": Object {
                      "kind": "primitive",
                      "type": "string",
                    },
                  },
                ],
                "raw": Object {
                  "nodeFullText": "{ s: string }",
                  "nodeText": "{ s: string }",
                  "typeText": "{ s: string; }",
                },
              },
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "b",
                    "type": Object {
                      "kind": "primitive",
                      "type": "boolean",
                    },
                  },
                ],
                "raw": Object {
                  "nodeFullText": "{ b: boolean }",
                  "nodeText": "{ b: boolean }",
                  "typeText": "{ b: boolean; }",
                },
              },
            ],
          },
        },
      },
    }
  `)
})

it.only('gets each member of the intersection when inside a union', () => {
  expect(
    ctx.extract(`
      export type A = 1 | { s: string } & { b: boolean }
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
      "kind": "alias",
      "name": "A",
      "raw": Object {
        "nodeFullText": "export type A = 1 | ({ s: string } & { b: boolean });",
        "nodeText": "export type A = 1 | ({ s: string } & { b: boolean });",
        "typeText": "A",
      },
      "type": Object {
        "discriminantProperties": null,
        "isDiscriminated": false,
        "kind": "union",
        "raw": Object {
          "nodeFullText": "export type A = 1 | ({ s: string } & { b: boolean });",
          "nodeText": "export type A = 1 | ({ s: string } & { b: boolean });",
          "typeText": "A",
        },
        "types": Array [
          Object {
            "base": "number",
            "kind": "literal",
            "name": "1",
          },
          Object {
            "kind": "intersection",
            "raw": Object {
              "nodeFullText": "",
              "nodeText": "",
              "typeText": "{ s: string; } & { b: boolean; }",
            },
            "types": Array [
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "s",
                    "type": Object {
                      "kind": "primitive",
                      "type": "string",
                    },
                  },
                ],
                "raw": Object {
                  "nodeFullText": "{ s: string }",
                  "nodeText": "{ s: string }",
                  "typeText": "{ s: string; }",
                },
              },
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "b",
                    "type": Object {
                      "kind": "primitive",
                      "type": "boolean",
                    },
                  },
                ],
                "raw": Object {
                  "nodeFullText": "{ b: boolean }",
                  "nodeText": "{ b: boolean }",
                  "typeText": "{ b: boolean; }",
                },
              },
            ],
          },
        ],
      },
    },
  },
}
`)
})
