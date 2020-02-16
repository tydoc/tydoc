```
Work in progress 👷‍
```

# jsdoc-extractor <!-- omit in toc -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Development](#development)
- [API](#api)
  - [`renderMarkdown`](#rendermarkdown)
  - [`fromProject`](#fromproject)
  - [`fromModule`](#frommodule)
  - [Exported Types](#exported-types)
    - [`RenderMarkdownOptions` `I`](#rendermarkdownoptions-i)
  - [Type Index](#type-index)
    - [`Options` `I`](#options-i)
    - [`DocPackage` `T`](#docpackage-t)
    - [`DocModule` `T`](#docmodule-t)
    - [`DocTypePrimitive` `T`](#doctypeprimitive-t)
    - [`DocTypeLiteral` `T`](#doctypeliteral-t)
    - [`DocTypeArray` `T`](#doctypearray-t)
    - [`Node` `U`](#node-u)
    - [`DocTypeIndexRef` `T`](#doctypeindexref-t)
    - [`DocSig` `T`](#docsig-t)
    - [`DocSigParam` `T`](#docsigparam-t)
    - [`Expor` `T`](#expor-t)
    - [`Options` `I`](#options-i-1)
    - [`Manager` `I`](#manager-i)
    - [`Thunk` `F`](#thunk-f)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

- `yarn -s dev:test` gives fast feedback with many simple unit tests.

- https://ts-ast-viewer.com can be extremely help when trying to get a birds eye view of the AST. Sometimes you see data that you wish you were shown the API navigation calls to get it. But even without that it is still very handy to at least get a sense.

- Amazing use-case for [Quokka.js](https://quokkajs.com/) if you have it. Set yourself up a test module using techniques like those seen in `test/setup.ts` and get the best possible feedback loop going!

- Very little information about the TS AST seems available. There is [the Wiki](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) and a bit of information here https://sandersn.github.io/manual/Typescript-compiler-implementation.html.

## API

<!-- START API DOCS --->

### `renderMarkdown`


### `fromProject`


### `fromModule`


### Exported Types

#### `RenderMarkdownOptions` `I`

```ts
typeIndexRef
```

### Type Index

#### `Options` `I`

```ts
export interface Options {
  /**
   * Whether or not the API terms section should have a title and nest its term
   * entries under it. If false, term entry titles are de-nested by one level.
   */
  flatTermsSection: boolean
}
```

#### `DocPackage` `T`

```ts
//
// Package node
//

export type DocPackage = {
  modules: DocModule[]
  typeIndex: TypeIndex
}
```

#### `DocModule` `T`

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

#### `DocTypePrimitive` `T`

```ts
// prettier-ignore
export type DocTypePrimitive = { kind: 'primitive', type: string }
```

#### `DocTypeLiteral` `T`

```ts
// prettier-ignore
export type DocTypeLiteral = { kind: 'literal'; base: string }
```

#### `DocTypeArray` `T`

```ts
export type DocTypeArray = { kind: 'array'; innerType: Node }
```

#### `Node` `U`

```ts
type Node = 
  | DocUnion  
  | DocTypePrimitive  
  | DocTypeLiteral  
  | DocTypeAlias  
  | DocTypeInterface  
  | DocTypeCallable  
  | DocTypeArray  
  | DocTypeObject  
  | DocTypeIndexRef  
  | DocUnsupported  
  | { kind: 'function'; signatures: DocSig[] }  
  |   
  | 
```

#### `DocTypeIndexRef` `T`

```ts
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
```

#### `DocSig` `T`

```ts
export type DocSig = { kind: 'sig'; params: DocSigParam[]; return: Node }
```

#### `DocSigParam` `T`

```ts
// prettier-ignore
export type DocSigParam = { kind:'sigParam', name: string; type: Node }
```

#### `Expor` `T`

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

#### `Options` `I`

```ts
interface Options {
  entrypoints: string[]
  project?: tsm.Project
}
```

#### `Manager` `I`

```ts
export interface Manager {
  d: DocPackage
  isIndexable(t: tsm.Type): boolean
  isIndexed(name: string): boolean
  getFromIndex(name: string): Node
  indexIfApplicable(t: tsm.Type, doc: Thunk<Node>): Node
}
```

#### `Thunk` `F`

<!-- prettier-ignore -->
```ts
export type Thunk<T> = () => T
```

<!-- END API DOCS --->
