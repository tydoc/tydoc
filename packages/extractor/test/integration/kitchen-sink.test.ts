const sources = [
  `
  /**
   * @example
   * 
   * \`\`\`ts
   * ...
   * \`\`\`
   */
    import { D, fooFromB } from './b'

    export { fooFromB }


    /**
     * Toto
     */
    export function foo(a:string, b:number) {}
    export function bar() {}
    export const toto = () => {}
    export const fofo = function fofo2(): number {
      return 1
    }
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

    export function fooFromB(n: number): boolean {
      return false
    }
  `,
]

it('tydoc can extract data', () => {
  expect(ctx.extract(...sources)).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "isMain": true,
          "kind": "module",
          "location": Object {
            "filePath": "src/a.ts",
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
                  "typeText": "(a: string, b: number) => void",
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
              "name": "fooFromB",
              "type": Object {
                "hasProps": false,
                "isOverloaded": false,
                "kind": "callable",
                "props": Array [],
                "raw": Object {
                  "nodeFullText": "export function fooFromB(n: number): boolean {
      return false;
    }",
                  "nodeText": "export function fooFromB(n: number): boolean {
      return false;
    }",
                  "typeText": "(n: number) => boolean",
                },
                "sigs": Array [
                  Object {
                    "kind": "sig",
                    "params": Array [
                      Object {
                        "kind": "sigParam",
                        "name": "n",
                        "type": Object {
                          "kind": "primitive",
                          "type": "number",
                        },
                      },
                    ],
                    "return": Object {
                      "kind": "primitive",
                      "type": "boolean",
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
                  "nodeFullText": "function fofo2(): number {
      return 1;
    }",
                  "nodeText": "function fofo2(): number {
      return 1;
    }",
                  "typeText": "() => number",
                },
                "sigs": Array [
                  Object {
                    "kind": "sig",
                    "params": Array [],
                    "return": Object {
                      "kind": "primitive",
                      "type": "number",
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
                "link": "(a).A",
              },
            },
          ],
          "path": "/",
          "tsdoc": Object {
            "customTags": Array [],
            "examples": Array [
              Object {
                "text": "\`\`\`ts
    ...
    \`\`\`",
              },
            ],
            "raw": "/**
     * @example
     *
     * \`\`\`ts
     * ...
     * \`\`\`
     */",
            "summary": "",
          },
        },
      ],
      "typeIndex": Object {
        "(a).A": Object {
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
                "link": "(a).C",
              },
            },
            Object {
              "kind": "prop",
              "name": "d",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(b).D",
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
            "typeText": "A",
          },
          "tsdoc": null,
          "typeParameters": Array [],
        },
        "(a).C": Object {
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
          "tsdoc": null,
          "typeParameters": Array [],
        },
        "(b).D": Object {
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
            "typeText": "D",
          },
          "tsdoc": null,
          "typeParameters": Array [],
        },
      },
    }
  `)
})
