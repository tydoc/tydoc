let docs: any

it('can be self recursive', () => {
  const docs = ctx.extract(`
    export type A = { a: A }
  `)
  expect(docs).toMatchSnapshot()
})

it('can be recursive within inline objects', () => {
  expect(
    ctx.extract(`
      export type A = { a: { aa: B }}
      export type B = { b: { bb: A }}
    `)
  ).toMatchSnapshot()
})

describe('can be a named export', () => {
  beforeAll(() => {
    docs = ctx.extract(`export type A = {}`)
  })
  it('shows up as a named export', () => {
    expect(docs).toMatchObject({
      modules: [{ namedExports: [{ name: 'A' }] }],
    })
  })
  it('its type is added to the type index', () => {
    expect(docs).toMatchObject({
      typeIndex: { '("/a").A': { kind: 'aliasAlias' } },
    })
  })
  it('refs the type index entry', () => {
    expect(docs).toMatchObject({
      modules: [
        { namedExports: [{ type: { kind: 'typeref', name: '("/a").A' } }] },
      ],
    })
  })
})

it('can be a return type ref', () => {
  expect(
    ctx.extract(`
      export function fa (): A {
        return { b: { a: '' } }
      }
      export type B = { a: string }
      type A = { b: B }
    `)
  ).toMatchSnapshot()
})

describe('can be a parameter type ref', () => {
  // const docs = ctx.extract(`
  //   export function withA (b:B) {}
  //   type B = { a: A }
  //   export type A = { b: B }
  // `)
  it.todo('type gets added to type indx')
  it.todo('parameter refs the type index')
})

describe('lists', () => {
  it.todo('can be a list')
})

it('passes smoke test', () => {
  const docs = ctx.extract(`
    export function withReB (reb:ReB) {}
    type ReB = { a: ReAB }
    export type ReAB = { b: ReB }

    export type Recursive = { a: Recursive }

    export type A = {}
  `)
  expect(docs).toMatchInlineSnapshot(`
    Object {
      "modules": Array [
        Object {
          "mainExport": null,
          "name": "a",
          "namedExports": Array [
            Object {
              "isTerm": true,
              "isType": false,
              "name": "withReB",
              "type": Object {
                "kind": "function",
                "name": "(\\"/a\\").(reb: ReB) => void",
                "properties": Array [],
                "signatures": Array [
                  Object {
                    "parameters": Array [
                      Object {
                        "name": "reb",
                        "type": Object {
                          "kind": "typeref",
                          "name": "(\\"/a\\").ReB",
                        },
                      },
                    ],
                    "return": Object {
                      "kind": "primitive",
                      "name": "void",
                    },
                  },
                ],
              },
            },
            Object {
              "isTerm": false,
              "isType": true,
              "name": "ReAB",
              "type": Object {
                "kind": "typeref",
                "name": "(\\"/a\\").ReAB",
              },
            },
            Object {
              "isTerm": false,
              "isType": true,
              "name": "Recursive",
              "type": Object {
                "kind": "typeref",
                "name": "(\\"/a\\").Recursive",
              },
            },
            Object {
              "isTerm": false,
              "isType": true,
              "name": "A",
              "type": Object {
                "kind": "typeref",
                "name": "(\\"/a\\").A",
              },
            },
          ],
        },
      ],
      "typeIndex": Object {
        "(\\"/a\\").A": Object {
          "kind": "aliasAlias",
          "name": "(\\"/a\\").A",
          "refType": Object {
            "kind": "object",
            "name": "__INLINE__",
            "properties": Array [],
            "signatures": Array [],
          },
        },
        "(\\"/a\\").ReAB": Object {
          "kind": "object",
          "name": "(\\"/a\\").ReAB",
          "properties": Array [
            Object {
              "name": "b",
              "type": Object {
                "kind": "typeref",
                "name": "(\\"/a\\").ReB",
              },
            },
          ],
          "signatures": Array [],
        },
        "(\\"/a\\").ReB": Object {
          "kind": "object",
          "name": "(\\"/a\\").ReB",
          "properties": Array [
            Object {
              "name": "a",
              "type": Object {
                "kind": "typeref",
                "name": "(\\"/a\\").ReAB",
              },
            },
          ],
          "signatures": Array [],
        },
        "(\\"/a\\").Recursive": Object {
          "kind": "aliasAlias",
          "name": "(\\"/a\\").Recursive",
          "refType": Object {
            "kind": "object",
            "name": "__INLINE__",
            "properties": Array [
              Object {
                "name": "a",
                "type": Object {
                  "kind": "typeref",
                  "name": "(\\"/a\\").Recursive",
                },
              },
            ],
            "signatures": Array [],
          },
        },
      },
    }
  `)
})
