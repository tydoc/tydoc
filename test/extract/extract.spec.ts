it.todo('does not try to document builtins')
it.todo('documents types wrapped in arrays')
it.todo('documents callable interfaces')
it.todo('documents type aliases')

it('when there is an invalid type reference an error is thrown', () => {
  expect(() => {
    ctx.extract('export interface A { b: B }')
  }).toThrowErrorMatchingSnapshot()
})

it.only('passes smoke test', () => {
  expect(
    ctx.extract(`
      let any: any
      export const a           = 1
      export   let b           = 'foobar'
      export const c: string[] = any
      export   let d: D        = any;         interface D {}
      export   let e: E        = any;         interface E { a: string; b: any; c: null[]; d: unknown; e: never }
      export   let f: F        = any;         type F = {}
      export   let f2: F2      = any;         type F2 = string
      export   let f3: F3      = any;         type F3 = F4; type F4 = F5; type F5 = { a:string }              // F3-4 is ereased...
      export   let g: G        = any;         type G = { a: string; b: any; c: null[]; d: unknown; e: never }
      export   let h: H        = any;         type H = { h2: H2[] }; interface H2 {}
      export   let i: I        = any;         type I = () => {}                                               // I is ereased...
      export   let j: J        = any;         type J = string                                                 // J is ereased...
      export   let k: K        = any;         type K = string | boolean[] | { a: string }
      export   let l: L        = any;         type L = { d1: 'a'; d2: 'a'; foo: boolean } | { d1: 'b'; d2: 'b'; bar: number }
      export   let m1: M       = any;         type M = {}                                                     // <--\
      export   let m2: M       = any;                                                                         //  <--\ enable debug logs to see cache hit take place
      export   let n1: N1      = any;         type N1 = { n1: N1 }                                            // recursion
      export   let n2: N2      = any;         type N2 = N2[]                                                  // recursion
      export   let n3: N3      = any;         type N3 =  { n3: N3 } | 1                                       // recursion
      // todo check recursion for within func params and return and props
  `)
  ).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "mainExport": null,
          "name": "a",
          "namedExports": Array [
            Object {
              "isTerm": true,
              "isType": false,
              "name": "a",
              "type": Object {
                "base": "number",
                "kind": "literal",
                "name": "1",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "b",
              "type": Object {
                "kind": "primitive",
                "type": "string",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "c",
              "type": Object {
                "checkerText": "string[]",
                "kind": "unsupported",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "d",
              "type": Object {
                "kind": "interface",
                "name": "D",
                "props": Array [],
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "e",
              "type": Object {
                "kind": "interface",
                "name": "E",
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
                      "type": "any",
                    },
                  },
                  Object {
                    "kind": "prop",
                    "name": "c",
                    "type": Object {
                      "checkerText": "null[]",
                      "kind": "unsupported",
                    },
                  },
                  Object {
                    "kind": "prop",
                    "name": "d",
                    "type": Object {
                      "kind": "primitive",
                      "type": "unknown",
                    },
                  },
                  Object {
                    "kind": "prop",
                    "name": "e",
                    "type": Object {
                      "kind": "primitive",
                      "type": "never",
                    },
                  },
                ],
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "f",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").F",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "f2",
              "type": Object {
                "kind": "primitive",
                "type": "string",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "f3",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").F5",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "g",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").G",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "h",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").H",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "i",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").I",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "j",
              "type": Object {
                "kind": "primitive",
                "type": "string",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "k",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").K",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "l",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").L",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "m1",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").M",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "n1",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").N1",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "n2",
              "type": Object {
                "checkerText": "N2",
                "kind": "unsupported",
              },
            },
            Object {
              "isTerm": true,
              "isType": false,
              "name": "n3",
              "type": Object {
                "kind": "typeIndexRef",
                "link": "(\\"/a\\").N3",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").F": Object {
          "kind": "alias",
          "name": "F",
          "type": Object {
            "kind": "object",
            "props": Array [],
          },
        },
        "(\\"/a\\").F5": Object {
          "kind": "alias",
          "name": "F5",
          "type": Object {
            "kind": "object",
            "props": Array [
              Object {
                "kind": "prop",
                "name": "a",
                "type": Object {
                  "kind": "primitive",
                  "type": "string",
                },
              },
            ],
          },
        },
        "(\\"/a\\").G": Object {
          "kind": "alias",
          "name": "G",
          "type": Object {
            "kind": "object",
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
                  "type": "any",
                },
              },
              Object {
                "kind": "prop",
                "name": "c",
                "type": Object {
                  "checkerText": "null[]",
                  "kind": "unsupported",
                },
              },
              Object {
                "kind": "prop",
                "name": "d",
                "type": Object {
                  "kind": "primitive",
                  "type": "unknown",
                },
              },
              Object {
                "kind": "prop",
                "name": "e",
                "type": Object {
                  "kind": "primitive",
                  "type": "never",
                },
              },
            ],
          },
        },
        "(\\"/a\\").H": Object {
          "kind": "alias",
          "name": "H",
          "type": Object {
            "kind": "object",
            "props": Array [
              Object {
                "kind": "prop",
                "name": "h2",
                "type": Object {
                  "checkerText": "H2[]",
                  "kind": "unsupported",
                },
              },
            ],
          },
        },
        "(\\"/a\\").I": Object {
          "kind": "alias",
          "name": "I",
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
                  "kind": "object",
                  "props": Array [],
                },
              },
            ],
          },
        },
        "(\\"/a\\").K": Object {
          "kind": "alias",
          "name": "K",
          "type": Object {
            "discriminantProperties": null,
            "isDiscriminated": false,
            "kind": "union",
            "types": Array [
              Object {
                "kind": "primitive",
                "type": "string",
              },
              Object {
                "checkerText": "boolean[]",
                "kind": "unsupported",
              },
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "a",
                    "type": Object {
                      "kind": "primitive",
                      "type": "string",
                    },
                  },
                ],
              },
            ],
          },
        },
        "(\\"/a\\").L": Object {
          "kind": "alias",
          "name": "L",
          "type": Object {
            "discriminantProperties": Array [
              "d1",
              "d2",
            ],
            "isDiscriminated": true,
            "kind": "union",
            "types": Array [
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "d1",
                    "type": Object {
                      "base": "string",
                      "kind": "literal",
                      "name": "\\"a\\"",
                    },
                  },
                  Object {
                    "kind": "prop",
                    "name": "d2",
                    "type": Object {
                      "base": "string",
                      "kind": "literal",
                      "name": "\\"a\\"",
                    },
                  },
                  Object {
                    "kind": "prop",
                    "name": "foo",
                    "type": Object {
                      "kind": "primitive",
                      "type": "boolean",
                    },
                  },
                ],
              },
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "d1",
                    "type": Object {
                      "base": "string",
                      "kind": "literal",
                      "name": "\\"b\\"",
                    },
                  },
                  Object {
                    "kind": "prop",
                    "name": "d2",
                    "type": Object {
                      "base": "string",
                      "kind": "literal",
                      "name": "\\"b\\"",
                    },
                  },
                  Object {
                    "kind": "prop",
                    "name": "bar",
                    "type": Object {
                      "kind": "primitive",
                      "type": "number",
                    },
                  },
                ],
              },
            ],
          },
        },
        "(\\"/a\\").M": Object {
          "kind": "alias",
          "name": "M",
          "type": Object {
            "kind": "object",
            "props": Array [],
          },
        },
        "(\\"/a\\").N1": Object {
          "kind": "alias",
          "name": "N1",
          "type": Object {
            "kind": "object",
            "props": Array [
              Object {
                "kind": "prop",
                "name": "n1",
                "type": Object {
                  "kind": "typeIndexRef",
                  "link": "(\\"/a\\").N1",
                },
              },
            ],
          },
        },
        "(\\"/a\\").N3": Object {
          "kind": "alias",
          "name": "N3",
          "type": Object {
            "discriminantProperties": null,
            "isDiscriminated": false,
            "kind": "union",
            "types": Array [
              Object {
                "base": "number",
                "kind": "literal",
                "name": "1",
              },
              Object {
                "kind": "object",
                "props": Array [
                  Object {
                    "kind": "prop",
                    "name": "n3",
                    "type": Object {
                      "kind": "typeIndexRef",
                      "link": "(\\"/a\\").N3",
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
