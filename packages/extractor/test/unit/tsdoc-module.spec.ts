it('extracts first comment in an empty file', () => {
  expect(
    ctx.extract(`
      /**
       * ...
       * 
       * @example
       * 
       * 1
       * 
       * @example
       * 
       * 2
       */

       // I am ignored
    `)
  ).toMatchInlineSnapshot(`
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
          "namedExports": Array [],
          "path": "/",
          "tsdoc": Object {
            "customTags": Array [],
            "examples": Array [
              Object {
                "text": "1",
              },
              Object {
                "text": "2",
              },
            ],
            "raw": "/**
     * ...
     *
     * @example
     *
     * 1
     *
     * @example
     *
     * 2
     */",
            "summary": "...",
          },
        },
      ],
      "typeIndex": Object {},
    }
  `)
})

it('extracts first comment above an import node', () => {
  expect(
    ctx.extract(
      `
        /**
         * ...
         */
        import './b'
      `,
      `
        // some file
      `
    )
  ).toMatchInlineSnapshot(`
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
          "namedExports": Array [],
          "path": "/",
          "tsdoc": Object {
            "customTags": Array [],
            "examples": Array [],
            "raw": "/**
     * ...
     */",
            "summary": "...",
          },
        },
      ],
      "typeIndex": Object {},
    }
  `)
})

it('extracts first comment above an export node', () => {
  expect(
    ctx.extract(
      `
        /**
         * ...
         */
        export * from './b'
      `,
      `
        export let a = 1
      `
    )
  ).toMatchInlineSnapshot(`
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
              "name": "a",
              "type": Object {
                "kind": "primitive",
                "type": "number",
              },
            },
          ],
          "path": "/",
          "tsdoc": Object {
            "customTags": Array [],
            "examples": Array [],
            "raw": "/**
     * ...
     */",
            "summary": "...",
          },
        },
      ],
      "typeIndex": Object {},
    }
  `)
})

it('extracts leadig comment above any node if node has own comment', () => {
  expect(
    ctx.extract(
      `
        /**
         * ...
         */
        
         /**
          * Doc for A
          */
         type A = {}
      `
    )
  ).toMatchInlineSnapshot(`
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
          "namedExports": Array [],
          "path": "/",
          "tsdoc": Object {
            "customTags": Array [],
            "examples": Array [],
            "raw": "/**
     * ...
     */",
            "summary": "...",
          },
        },
      ],
      "typeIndex": Object {},
    }
  `)
})

it('does not extract leadig comment if appears to be for a piece of code', () => {
  expect(
    ctx.extract(
      `
        /**
         * ...
         */
         type A = {}
      `
    )
  ).toMatchInlineSnapshot(`
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
          "namedExports": Array [],
          "path": "/",
          "tsdoc": null,
        },
      ],
      "typeIndex": Object {},
    }
  `)
})

it('does not extract leadig comment if there is none', () => {
  expect(
    ctx.extract(
      `
         type A = {}
      `
    )
  ).toMatchInlineSnapshot(`
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
          "namedExports": Array [],
          "path": "/",
          "tsdoc": null,
        },
      ],
      "typeIndex": Object {},
    }
  `)
})

it('does not extract leadig comment from totally empty file', () => {
  expect(ctx.extract(``)).toMatchInlineSnapshot(`
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
          "namedExports": Array [],
          "path": "/",
          "tsdoc": null,
        },
      ],
      "typeIndex": Object {},
    }
  `)
})
