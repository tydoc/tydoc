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

    #### \`AAlias\` \`I\`

    \`\`\`ts
    typeIndexRef
    \`\`\`

    ### Type Index

    #### \`A\` \`I\`

    \`\`\`ts
    interface A {
      /**
       * About a...
       */
      a: string;
      b: number;
      c: C;
      d: D;
    }
    \`\`\`

    #### \`C\` \`I\`

    \`\`\`ts
    interface C {
      d: number;
      e: string;
    }
    \`\`\`

    #### \`D\` \`I\`

    \`\`\`ts
    export interface D {
      a: string;
      b: string;
    }
    \`\`\`

    "
  `)
})

it('dox can extract data', () => {
  expect(ctx.extract(...sources)).toMatchInlineSnapshot(`
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
          "isTerm": true,
          "isType": false,
          "kind": "export",
          "name": "foo",
          "type": Object {
            "hasProps": false,
            "isOverloaded": false,
            "kind": "callable",
            "props": Array [],
            "raw": Object {
              "nodeFullText": "/**
 * Toto
 */
export function foo(a: string, b: number) {}",
              "nodeText": "export function foo(a: string, b: number) {}",
              "typeText": "typeof import(\\"/a\\").foo",
            },
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
          "kind": "export",
          "name": "bar",
          "type": Object {
            "hasProps": false,
            "isOverloaded": false,
            "kind": "callable",
            "props": Array [],
            "raw": Object {
              "nodeFullText": "export function bar() {}",
              "nodeText": "export function bar() {}",
              "typeText": "typeof import(\\"/a\\").bar",
            },
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
          "kind": "export",
          "name": "toto",
          "type": Object {
            "hasProps": false,
            "isOverloaded": false,
            "kind": "callable",
            "props": Array [],
            "raw": Object {
              "nodeFullText": "() => {}",
              "nodeText": "() => {}",
              "typeText": "() => void",
            },
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
          "kind": "export",
          "name": "fofo",
          "type": Object {
            "hasProps": false,
            "isOverloaded": false,
            "kind": "callable",
            "props": Array [],
            "raw": Object {
              "nodeFullText": "function fofo2() {}",
              "nodeText": "function fofo2() {}",
              "typeText": "() => void",
            },
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
          "kind": "export",
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
        "nodeFullText": "interface A {
  /**
   * About a...
   */
  a: string;
  b: number;
  c: C;
  d: D;
}",
        "nodeText": "interface A {
  /**
   * About a...
   */
  a: string;
  b: number;
  c: C;
  d: D;
}",
        "typeText": "import(\\"/a\\").AAlias",
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
        "nodeFullText": "interface C {
  d: number;
  e: string;
}",
        "nodeText": "interface C {
  d: number;
  e: string;
}",
        "typeText": "C",
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
        "nodeFullText": "export interface D {
  a: string;
  b: string;
}",
        "nodeText": "export interface D {
  a: string;
  b: string;
}",
        "typeText": "import(\\"/b\\").D",
      },
    },
  },
}
`)
})
