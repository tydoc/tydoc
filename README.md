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

### `renderMarkdown`

<!-- prettier-ignore -->
```ts
(docs: Docs, opts: Options) => string
```

### `extractDocsFromModuleAtPath`

<!-- prettier-ignore -->
```ts
(filePath: ('./a/b').SourceFile) => Docs
```

### `extractDocsFromModule`

<!-- prettier-ignore -->
```ts
(sourceFile: ('./a/c').SourceFile) => Docs
```

### Exported Types

#### `RenderMarkdownOptions`

```ts
interface Options {
  /**
   * Whether or not the API terms section should have a title and nest its term
   * entries under it. If false, term entry titles are de-nested by one level.
   */
  flatTermsSection: boolean
}
```

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
  typeIndex: Record<string, DocTypeAlias | DocInterface>
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
  exported: null | { name: string }
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
  exported: null | { name: string }
  properties: {
    jsDoc: null | JSDocContent
    name: string
    type: {
      name: string
    }
  }[]
}
```

#### `DocObject`

```ts
interface DocObject extends DocBase {
  kind: 'object'
  properties: { name: string; type: TypeData }[]
}
```

### Type Index

#### `TypeData`

```ts
interface TypeData {
  name: string
}
```

<!-- END API DOCS --->
