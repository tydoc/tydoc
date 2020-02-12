it('works', () => {
  expect(
    ctx.extract(`
      export type D = Readonly<{ a: string, b: number, c: null }>
      export interface C { d: D }

      export interface B { a: string, b: number, c: null }
      export interface A {}

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
                "isMain": false,
                "name": "b",
                "type": "number",
              },
              Object {
                "isMain": false,
                "name": "a",
                "type": "1",
              },
            ],
            "types": Array [
              Object {
                "isMain": false,
                "name": "D",
              },
              Object {
                "isMain": false,
                "name": "C",
              },
              Object {
                "isMain": false,
                "name": "B",
              },
              Object {
                "isMain": false,
                "name": "A",
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
          "isAlias": false,
          "isCallable": false,
          "name": "A",
          "nameApparent": "import(\\"/a\\").A",
          "properties": Array [],
          "signatures": Array [],
          "symbol": "A",
          "target": undefined,
          "valDec": undefined,
        },
        "B": Object {
          "isAlias": false,
          "isCallable": false,
          "name": "B",
          "nameApparent": "import(\\"/a\\").B",
          "properties": Array [
            Object {
              "name": "a",
              "type": "string",
            },
            Object {
              "name": "b",
              "type": "number",
            },
            Object {
              "name": "c",
              "type": "null",
            },
          ],
          "signatures": Array [],
          "symbol": "B",
          "target": undefined,
          "valDec": undefined,
        },
        "C": Object {
          "isAlias": false,
          "isCallable": false,
          "name": "C",
          "nameApparent": "import(\\"/a\\").C",
          "properties": Array [
            Object {
              "name": "d",
              "type": "D",
            },
          ],
          "signatures": Array [],
          "symbol": "C",
          "target": undefined,
          "valDec": undefined,
        },
        "Readonly<{ a: string; b: number; c: null; }>": Object {
          "isAlias": false,
          "isCallable": false,
          "name": "Readonly<{ a: string; b: number; c: null; }>",
          "nameApparent": "Readonly<{ a: string; b: number; c: null; }>",
          "properties": Array [
            Object {
              "name": "a",
              "type": "string",
            },
            Object {
              "name": "b",
              "type": "number",
            },
            Object {
              "name": "c",
              "type": "null",
            },
          ],
          "signatures": Array [],
          "symbol": "__type",
          "target": "Readonly<T>",
          "valDec": undefined,
        },
      },
      "types": Array [],
    }
  `)
})
