it('works', () => {
  expect(
    ctx.extract(`
      // type reference to type alias of primitive
      export { I }
      type I = string

      // not exported transient type references, type reference to type alias of primitive
      export type H = { g: G }
      type G = { f:F }
      type F = number

      // export oriented type references, type aliases, type operators, export
      // aliasing, property modifiers
      export { E as EE }  
      type E = Omit<{ a: string, readonly b?: number }, "a">

      // type references, type aliases, type operators
      export type D = Readonly<{ a: string, b: number, c: null }>
      export interface C { d: D }

      // interfaces
      export interface B { a: string, b: number, c: null }
      export interface A {}

      // scalar variables
      export let b = 2
      export const a = 1
    `)
  ).toMatchInlineSnapshot(`
    Object {
      "hybrids": Array [],
      "length": 0,
      "modules": Array [
        Object {
          "absoluteFilePath": "/a.ts",
          "exported": Object {
            "hasMain": false,
            "terms": Array [
              Object {
                "exportName": "b",
                "isMain": false,
                "type": Object {
                  "isLit": false,
                  "isPrim": true,
                  "isRef": false,
                  "name": "number",
                },
              },
              Object {
                "exportName": "a",
                "isMain": false,
                "type": Object {
                  "isLit": true,
                  "isPrim": false,
                  "isRef": false,
                  "name": "1",
                },
              },
            ],
            "types": Array [
              Object {
                "exportName": "I",
                "isMain": false,
                "typeName": "I",
              },
              Object {
                "exportName": "H",
                "isMain": false,
                "typeName": "H",
              },
              Object {
                "exportName": "EE",
                "isMain": false,
                "typeName": "E",
              },
              Object {
                "exportName": "D",
                "isMain": false,
                "typeName": "D",
              },
              Object {
                "exportName": "C",
                "isMain": false,
                "typeName": "C",
              },
              Object {
                "exportName": "B",
                "isMain": false,
                "typeName": "B",
              },
              Object {
                "exportName": "A",
                "isMain": false,
                "typeName": "A",
              },
            ],
          },
          "name": "a",
          "projectRelativeFilePath": "todo",
        },
      ],
      "terms": Array [],
      "typeIndex": Object {
        "A": Object {
          "name": "A",
          "properties": Array [],
        },
        "B": Object {
          "name": "B",
          "properties": Array [
            Object {
              "name": "a",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "string",
              },
            },
            Object {
              "name": "b",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "number",
              },
            },
            Object {
              "name": "c",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "null",
              },
            },
          ],
        },
        "C": Object {
          "name": "C",
          "properties": Array [
            Object {
              "name": "d",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": false,
                "isRef": true,
                "name": "D",
              },
            },
          ],
        },
        "D": Object {
          "name": "D",
          "properties": Array [
            Object {
              "name": "a",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "string",
              },
            },
            Object {
              "name": "b",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "number",
              },
            },
            Object {
              "name": "c",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "null",
              },
            },
          ],
        },
        "E": Object {
          "name": "E",
          "properties": Array [
            Object {
              "name": "b",
              "optional": true,
              "readonly": true,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "number",
              },
            },
          ],
        },
        "F": Object {
          "isLit": false,
          "isPrim": true,
          "isRef": false,
          "name": "number",
        },
        "G": Object {
          "name": "G",
          "properties": Array [
            Object {
              "name": "f",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": true,
                "isRef": false,
                "name": "F",
              },
            },
          ],
        },
        "H": Object {
          "name": "H",
          "properties": Array [
            Object {
              "name": "g",
              "optional": false,
              "readonly": false,
              "type": Object {
                "isLit": false,
                "isPrim": false,
                "isRef": true,
                "name": "G",
              },
            },
          ],
        },
        "I": Object {
          "isLit": false,
          "isPrim": true,
          "isRef": false,
          "name": "string",
        },
        "null": Object {
          "isLit": false,
          "isPrim": true,
          "isRef": false,
          "name": "null",
        },
        "number": Object {
          "isLit": false,
          "isPrim": true,
          "isRef": false,
          "name": "number",
        },
        "string": Object {
          "isLit": false,
          "isPrim": true,
          "isRef": false,
          "name": "string",
        },
      },
      "types": Array [],
    }
  `)
})
