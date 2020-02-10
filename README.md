```
Work in progress 👷‍
```

# jsdoc-extractor

## Development

- `yarn -s dev:test` gives fast feedback with many simple unit tests.

- https://ts-ast-viewer.com can be extremely help when trying to get a birds eye view of the AST. Sometimes you see data that you wish you were shown the API navigation calls to get it. But even without that it is still very handy to at least get a sense.

- Amazing use-case for [Quokka.js](https://quokkajs.com/) if you have it. Set yourself up a test module using techniques like those seen in `test/setup.ts` and get the best possible feedback loop going!

## API

<!-- START API DOCS --->

### API

#### renderMarkdown

<!-- prettier-ignore -->
```ts
(docs: import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").Docs) => string
```

#### extractDocsFromModuleAtPath

<!-- prettier-ignore -->
```ts
(filePath: string) => import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").Docs
```

#### extractDocsFromModule

<!-- prettier-ignore -->
```ts
(sourceFile: import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").SourceFile) => import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").Docs
```

### Types

#### `Docs`

```ts
/**
 * The root of documentation data.
 */
interface Docs {
  terms: (DocFunction | DocVariable)[]
  /**
   * todo
   */
  types: (DocTypeAlias | DocInterface)[]
  hybrids: any[]
  length: number
}
```

#### `DocFunction`

```ts
interface DocFunction extends DocBase {
  kind: 'function'
  signature: SignatureData & {
    text: string
  }
}
```

#### `DocVariable`

```ts
interface DocVariable extends DocBase {
  kind: 'variable'
  type: TypeData
}
```

#### `DocTypeAlias`

```ts
interface DocTypeAlias extends DocBase {
  kind: 'typeAlias'
  properties: {
    jsDoc: null | JSDocContent
    name: string
    type: { name: string }
  }[]
}
```

#### `DocInterface`

```ts
interface DocInterface extends DocBase {
  kind: 'interface'
  properties: {
    jsDoc: null | JSDocContent
    name: string
    type: { name: string }
  }[]
}
```

#### `DocItem`

```ts
type DocItem = DocFunction | DocVariable | DocTypeAlias | DocInterface
```

<!-- END API DOCS --->
