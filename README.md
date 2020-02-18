```
Work in progress 👷‍
```

# tydoc <!-- omit in toc -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [API](#api)
  - [`renderMarkdown`](#rendermarkdown)
  - [`fromProject`](#fromproject)
  - [`fromModule`](#frommodule)
  - [Exported Types](#exported-types)
    - [`I` `RenderMarkdownOptions`](#i-rendermarkdownoptions)
  - [Type Index](#type-index)
    - [`I` `Options`](#i-options)
    - [`T` `DocPackage`](#t-docpackage)
    - [`T` `DocModule`](#t-docmodule)
    - [`&` `DocTypeUnion`](#-doctypeunion)
    - [`|` `Node`](#-node)
    - [`T` `DocTypePrimitive`](#t-doctypeprimitive)
    - [`T` `DocTypeLiteral`](#t-doctypeliteral)
    - [`&` `DocTypeAlias`](#-doctypealias)
    - [`T` `Raw`](#t-raw)
    - [`&` `DocTypeInterface`](#-doctypeinterface)
    - [`T` `DocProp`](#t-docprop)
    - [`&` `DocTypeCallable`](#-doctypecallable)
    - [`T` `DocSig`](#t-docsig)
    - [`T` `DocSigParam`](#t-docsigparam)
    - [`T` `DocTypeArray`](#t-doctypearray)
    - [`&` `DocTypeObject`](#-doctypeobject)
    - [`T` `DocTypeIndexRef`](#t-doctypeindexref)
    - [`&` `DocUnsupported`](#-docunsupported)
    - [`&` `DocTypeIntersection`](#-doctypeintersection)
    - [`T` `Expor`](#t-expor)
    - [`I` `Options`](#i-options-1)
    - [`I` `Manager`](#i-manager)
    - [`F` `Thunk`](#f-thunk)
- [Internal Development](#internal-development)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## API

<!-- START API DOCS --->

### `renderMarkdown`

<!-- prettier-ignore -->
```ts
(docs: DocPackage, opts: Options) => string
```

### `fromProject`

<!-- prettier-ignore -->
```ts
(opts: Options) => DocPackage
```

### `fromModule`

<!-- prettier-ignore -->
```ts
(docs: Manager, sourceFile: SourceFile) => DocPackage
```

### Exported Types

#### `I` `RenderMarkdownOptions`

```ts
typeIndexRef
```

### Type Index

#### `I` `Options`

```ts
export interface Options {
  /**
   * Whether or not the API terms section should have a title and nest its term
   * entries under it. If false, term entry titles are de-nested by one level.
   */
  flatTermsSection: boolean
}
```

#### `T` `DocPackage`

```ts
//
// Package node
//

export type DocPackage = {
  modules: DocModule[]
  typeIndex: TypeIndex
}
```

#### `T` `DocModule`

```ts
//
// Module Node
//

export type DocModule = {
  kind: 'module'
  name: string
  mainExport: null | Node
  namedExports: Expor[]
}
```

#### `&` `DocTypeUnion`

```ts
//
// Union Node
//

export type DocTypeUnion = {
  kind: 'union'
  isDiscriminated: boolean
  discriminantProperties: null | string[]
  types: Node[]
} & Raw
```

#### `|` `Node`

```ts
export type Node =
  | DocTypeUnion
  | DocTypePrimitive
  | DocTypeLiteral
  | DocTypeAlias
  | DocTypeInterface
  | DocTypeCallable
  | DocTypeArray
  | DocTypeObject
  | DocTypeIndexRef
  | DocUnsupported
  | DocTypeIntersection
  // todo unused?
  | { kind: 'function'; signatures: DocSig[] }
  | ({
      kind: 'callable_object'
      signatures: DocSig[]
      properties: DocProp[]
    } & Raw)
  | ({
      kind: 'callable_interface'
      properties: DocProp[]
      signatures: DocSig[]
    } & Raw)
```

#### `T` `DocTypePrimitive`

```ts
export type DocTypePrimitive = { kind: 'primitive'; type: string }
```

#### `T` `DocTypeLiteral`

```ts
export type DocTypeLiteral = { kind: 'literal'; base: string }
```

#### `&` `DocTypeAlias`

```ts
export type DocTypeAlias = { kind: 'alias'; name: string; type: Node } & Raw
```

#### `T` `Raw`

```ts
export type Raw = {
  raw: {
    typeText: string
    nodeText: string
    nodeFullText: string
  }
}
```

#### `&` `DocTypeInterface`

```ts
export type DocTypeInterface = {
  kind: 'interface'
  name: string
  props: DocProp[]
} & Raw
```

#### `T` `DocProp`

```ts
export type DocProp = { kind: 'prop'; name: string; type: Node }
```

#### `&` `DocTypeCallable`

```ts
export type DocTypeCallable = {
  kind: 'callable'
  isOverloaded: boolean
  hasProps: boolean
  sigs: DocSig[]
  props: DocProp[]
} & Raw
```

#### `T` `DocSig`

```ts
export type DocSig = { kind: 'sig'; params: DocSigParam[]; return: Node }
```

#### `T` `DocSigParam`

```ts
export type DocSigParam = { kind: 'sigParam'; name: string; type: Node }
```

#### `T` `DocTypeArray`

```ts
export type DocTypeArray = { kind: 'array'; innerType: Node }
```

#### `&` `DocTypeObject`

```ts
export type DocTypeObject = { kind: 'object'; props: DocProp[] } & Raw
```

#### `T` `DocTypeIndexRef`

````ts
/**
 * A link to the type index. All named types go into the type index. When a type
 * or export includes a named type, rather than documenting it inline, a
 * reference to the type index is created.
 *
 */
export type DocTypeIndexRef = {
  kind: 'typeIndexRef'
  /**
   * An identifier that can be used to lookup the type in the type index.
   *
   * @example
   *
   * ```ts
   * docs.typeIndex[typeIndexRef.link]
   * ```
   */
  link: string
}
````

#### `&` `DocUnsupported`

```ts
export type DocUnsupported = { kind: 'unsupported' } & Raw
```

#### `&` `DocTypeIntersection`

```ts
//
// Intersection Node
//

export type DocTypeIntersection = { kind: 'intersection'; types: Node[] } & Raw
```

#### `T` `Expor`

```ts
//
// Export Node
//

export type Expor = {
  kind: 'export'
  name: string
  isTerm: boolean
  isType: boolean
  type: Node
}
```

#### `I` `Options`

```ts
interface Options {
  entrypoints: string[]
  project?: tsm.Project
}
```

#### `I` `Manager`

```ts
export interface Manager {
  d: DocPackage
  isIndexable(t: tsm.Type): boolean
  isIndexed(name: string): boolean
  getFromIndex(name: string): Node
  indexIfApplicable(t: tsm.Type, doc: Thunk<Node>): Node
}
```

#### `F` `Thunk`

<!-- prettier-ignore -->
```ts
export type Thunk<T> = () => T
```

<!-- END API DOCS --->

<br>

## Internal Development

- `yarn -s dev:test` gives fast feedback with many simple unit tests.

- https://ts-ast-viewer.com can be extremely help when trying to get a birds eye view of the AST. Sometimes you see data that you wish you were shown the API navigation calls to get it. But even without that it is still very handy to at least get a sense.

- Amazing use-case for [Quokka.js](https://quokkajs.com/) if you have it. Set yourself up a test module using techniques like those seen in `test/setup.ts` and get the best possible feedback loop going!

- Very little information about the TS AST seems available. There is [the Wiki](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) and a bit of information here https://sandersn.github.io/manual/Typescript-compiler-implementation.html.
