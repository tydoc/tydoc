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

it('exported type aliases can have tsdoc', () => {
  expect(
    ctx.extract(`
    /**
     * foobar
     */
    export type A = {}
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
      "kind": "alias",
      "name": "A",
      "raw": Object {
        "nodeFullText": "/**
 * foobar
 */
export type A = {};",
        "nodeText": "export type A = {};",
        "typeText": "A",
      },
      "tsdoc": Object {
        "customTags": Array [],
        "examples": Array [],
        "raw": "/**
 * foobar
 */",
        "summary": "foobar",
      },
      "type": Object {
        "kind": "object",
        "props": Array [],
        "raw": Object {
          "nodeFullText": "/**
 * foobar
 */
export type A = {};",
          "nodeText": "export type A = {};",
          "typeText": "A",
        },
      },
    },
  },
}
`)
})

it('type aliases can have tsdoc', () => {
  expect(
    ctx.extract(`
    /**
     * foobar
     */
    type B = {}
    type A = { b: B }
    export { A }
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
      "kind": "alias",
      "name": "A",
      "raw": Object {
        "nodeFullText": "type A = { b: B };",
        "nodeText": "type A = { b: B };",
        "typeText": "A",
      },
      "tsdoc": null,
      "type": Object {
        "kind": "object",
        "props": Array [
          Object {
            "kind": "prop",
            "name": "b",
            "type": Object {
              "kind": "typeIndexRef",
              "link": "(a).B",
            },
          },
        ],
        "raw": Object {
          "nodeFullText": "type A = { b: B };",
          "nodeText": "type A = { b: B };",
          "typeText": "A",
        },
      },
    },
    "(a).B": Object {
      "kind": "alias",
      "name": "B",
      "raw": Object {
        "nodeFullText": "/**
 * foobar
 */
type B = {};",
        "nodeText": "type B = {};",
        "typeText": "B",
      },
      "tsdoc": Object {
        "customTags": Array [],
        "examples": Array [],
        "raw": "/**
 * foobar
 */",
        "summary": "foobar",
      },
      "type": Object {
        "kind": "object",
        "props": Array [],
        "raw": Object {
          "nodeFullText": "/**
 * foobar
 */
type B = {};",
          "nodeText": "type B = {};",
          "typeText": "B",
        },
      },
    },
  },
}
`)
})

// todo these should test the lower level tsdoc extraction part, as these checks
// are lower-level than extraction layer. In other words testing this shouldn't
// be tied to particular cases of TS checker types/AST nodes.
it.todo('examples are extracted')
it.todo('summary is extracted')
it.todo('remarks are extracted')
