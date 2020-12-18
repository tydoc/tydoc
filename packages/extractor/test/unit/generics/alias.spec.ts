describe('first type parameter', () => {
  it('the name', () => {
    const edd = ctx.extract2(/* ts */ `
      export type Foo<T> = {}
    `)
    expect(edd.getAlias('(a).Foo').typeParameters).toMatchSnapshot()
  })

  it('the primitive type default', () => {
    const edd = ctx.extract2(/* ts */ `
      export type Foo<T = string> = {}
    `)
    expect(edd.getAlias('(a).Foo').typeParameters).toMatchSnapshot()
  })

  it('the alias object type default is added to the type index and refererenced', () => {
    const edd = ctx.extract2(/* ts */ `
      export type Bar = { a: 1 }
      export type Foo<T = Bar> = {}
    `)
    expect(edd.getAlias('(a).Foo').typeParameters).toMatchSnapshot()
    expect(edd.getAlias('(a).Bar')).toMatchSnapshot()
  })

  it('the interface object type default is added to the type index and refererenced', () => {
    const edd = ctx.extract2(/* ts */ `
      export interface Bar { a: 1 }
      export type Foo<T = Bar> = {}
    `)
    expect(edd.getAlias('(a).Foo').typeParameters).toMatchSnapshot()
    expect(edd.getInterface('(a).Bar')).toMatchSnapshot()
  })
})

describe('standard library generic instances have type arguments captured and generic target set as external', () => {
  it('Record', () => {
    const edd = ctx.extract2(/*ts*/ `
      export type A = Record<string,number>
    `)
    expect(edd.firstExportOrThrow('A')).toMatchInlineSnapshot(`
      Object {
        "isTerm": false,
        "isType": true,
        "kind": "export",
        "name": "A",
        "type": Object {
          "args": Array [
            Object {
              "kind": "primitive",
              "type": "string",
            },
            Object {
              "kind": "primitive",
              "type": "number",
            },
          ],
          "kind": "generic_instance",
          "raw": Object {
            "nodeFullText": "type Record<K extends keyof any,T>={[P in K]:T;};",
            "nodeText": "type Record<K extends keyof any,T>={[P in K]:T;};",
            "typeText": "Record<string, number>",
          },
          "target": Object {
            "kind": "standard_library",
            "location": Object {
              "modulePath": "typescript/lib/lib.es5.d.ts",
            },
            "name": "Record",
            "raw": Object {
              "nodeFullText": "type Record<K extends keyof any,T>={[P in K]:T;};",
              "nodeText": "type Record<K extends keyof any,T>={[P in K]:T;};",
              "typeText": "Record<K, T>",
            },
          },
        },
      }
    `)
  })
})

describe('bugs', () => {
  it('generic instance within union type', () => {
    const edd = ctx.extract2(/*ts*/ `
      export type A = 1 | Record<string, 2>
    `)
    expect(edd.getAlias('(a).A')).toMatchInlineSnapshot(`
      Object {
        "kind": "alias",
        "name": "A",
        "raw": Object {
          "nodeFullText": "export type A = 1 | Record<string, 2>;",
          "nodeText": "export type A = 1 | Record<string, 2>;",
          "typeText": "A",
        },
        "tsdoc": null,
        "type": Object {
          "discriminantProperties": null,
          "isDiscriminated": false,
          "kind": "union",
          "raw": Object {
            "nodeFullText": "export type A = 1 | Record<string, 2>;",
            "nodeText": "export type A = 1 | Record<string, 2>;",
            "typeText": "A",
          },
          "types": Array [
            Object {
              "base": "number",
              "kind": "literal",
              "name": "1",
            },
            Object {
              "args": Array [
                Object {
                  "kind": "primitive",
                  "type": "string",
                },
                Object {
                  "base": "number",
                  "kind": "literal",
                  "name": "2",
                },
              ],
              "kind": "generic_instance",
              "raw": Object {
                "nodeFullText": "type Record<K extends keyof any,T>={[P in K]:T;};",
                "nodeText": "type Record<K extends keyof any,T>={[P in K]:T;};",
                "typeText": "Record<string, 2>",
              },
              "target": Object {
                "kind": "standard_library",
                "location": Object {
                  "modulePath": "typescript/lib/lib.es5.d.ts",
                },
                "name": "Record",
                "raw": Object {
                  "nodeFullText": "type Record<K extends keyof any,T>={[P in K]:T;};",
                  "nodeText": "type Record<K extends keyof any,T>={[P in K]:T;};",
                  "typeText": "Record<K, T>",
                },
              },
            },
          ],
        },
        "typeParameters": Array [],
      }
    `)
  })
})
