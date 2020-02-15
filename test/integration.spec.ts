const sources = [
  `
    import { D } from './b'

    /**
     * Toto
     */
    export function foo(a:string, b:number) {}
    export function bar() {}
    export const toto = () => {}
    export const fofo = function fofo2() {}
    export { A as AAlias }
    interface A {
      /**
       * About a...
       */
      a: string,
      b: number
      c: C
      d: D
    }
    interface C {
      d: number,
      e: string
    }
  `,
  `
    export interface D {
      a: string
      b: string
    }
  `,
]

it('dox can render markdown', () => {
  expect(ctx.markdown({ flatTermsSection: true }, ...sources))
    .toMatchInlineSnapshot(`
    "### \`foo\`


    ### \`bar\`


    ### \`toto\`


    ### \`fofo\`


    ### Exported Types

    #### \`AAlias\`

    \`\`\`ts
    typeIndexRef
    \`\`\`

    ### Type Index

    #### \`A\`

    \`\`\`ts
    interface
    \`\`\`

    #### \`C\`

    \`\`\`ts
    interface
    \`\`\`

    #### \`D\`

    \`\`\`ts
    interface
    \`\`\`

    "
  `)
})

it('dox can extract data', () => {
  expect(ctx.extract(...sources)).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "mainExport": null,
          "name": "a",
          "namedExports": Array [
            Object {
              "isTerm": true,
              "isType": false,
              "name": "foo",
              "type": Object {
                "hasProps": false,
                "isOverloaded": false,
                "kind": "callable",
                "props": Array [],
                "sigs": Array [
                  Object {
                    "kind": "sig",
                    "params": Array [
                      Object {
                        "kind": "sigParam",
                        "name": "a",
                        "type": Object {
                          "kind": "primitive",
                          "type": "string",
                        },
                      },
                      Object {
                        "kind": "sigParam",
                        "name": "b",
                        "type": Object {
                          "kind": "primitive",
                          "type": "number",
                        },
                      },
                    ],
                    "return": Object {
                      "kind": "primitive",
                      "type": "void",
                    },
                  },
                ],
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "bar",
              "type": Object {
                "hasProps": false,
                "isOverloaded": false,
                "kind": "callable",
                "props": Array [],
                "sigs": Array [
                  Object {
                    "kind": "sig",
                    "params": Array [],
                    "return": Object {
                      "kind": "primitive",
                      "type": "void",
                    },
                  },
                ],
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "toto",
              "type": Object {
                "hasProps": false,
                "isOverloaded": false,
                "kind": "callable",
                "props": Array [],
                "sigs": Array [
                  Object {
                    "kind": "sig",
                    "params": Array [],
                    "return": Object {
                      "kind": "primitive",
                      "type": "void",
                    },
                  },
                ],
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "fofo",
              "type": Object {
                "hasProps": false,
                "isOverloaded": false,
                "kind": "callable",
                "props": Array [],
                "sigs": Array [
                  Object {
                    "kind": "sig",
                    "params": Array [],
                    "return": Object {
                      "kind": "primitive",
                      "type": "void",
                    },
                  },
                ],
              },
            },
            Object {
              "isTerm": false,
              "isType": true,
              "name": "AAlias",
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
          "kind": "interface",
          "name": "A",
          "props": Array [
            Object {
              "kind": "prop",
              "name": "a",
              "type": Object {
                "kind": "primitive",
                "type": "string",
              },
            },
            Object {
              "kind": "prop",
              "name": "b",
              "type": Object {
                "kind": "primitive",
                "type": "number",
              },
            },
            Object {
              "kind": "prop",
              "name": "c",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").C",
              },
            },
            Object {
              "kind": "prop",
              "name": "d",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/b\\").D",
              },
            },
          ],
          "raw": Object {
            "text": "import(\\"/a\\").AAlias",
          },
        },
        "(\\"/a\\").C": Object {
          "kind": "interface",
          "name": "C",
          "props": Array [
            Object {
              "kind": "prop",
              "name": "d",
              "type": Object {
                "kind": "primitive",
                "type": "number",
              },
            },
            Object {
              "kind": "prop",
              "name": "e",
              "type": Object {
                "kind": "primitive",
                "type": "string",
              },
            },
          ],
          "raw": Object {
            "text": "C",
          },
        },
        "(\\"/b\\").D": Object {
          "kind": "interface",
          "name": "D",
          "props": Array [
            Object {
              "kind": "prop",
              "name": "a",
              "type": Object {
                "kind": "primitive",
                "type": "string",
              },
            },
            Object {
              "kind": "prop",
              "name": "b",
              "type": Object {
                "kind": "primitive",
                "type": "string",
              },
            },
          ],
          "raw": Object {
            "text": "import(\\"/b\\").D",
          },
        },
      },
    }
  `)
})
