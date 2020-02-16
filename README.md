```
Work in progress 👷‍
```

# jsdoc-extractor <!-- omit in toc -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Development](#development)
- [API](#api)
  - [`renderMarkdown`](#rendermarkdown)
  - [`extractDocsFromProject`](#extractdocsfromproject)
  - [`extractDocsFromModule`](#extractdocsfrommodule)
  - [Exported Types](#exported-types)
    - [`RenderMarkdownOptions` `I`](#rendermarkdownoptions-i)
  - [Type Index](#type-index)
    - [`Options` `I`](#options-i)
    - [`DocPackage` `T`](#docpackage-t)
    - [`Options` `I`](#options-i-1)
    - [`Manager` `I`](#manager-i)
    - [`Node` `U`](#node-u)
    - [`DocTypePrimitive` `T`](#doctypeprimitive-t)
    - [`DocTypeLiteral` `T`](#doctypeliteral-t)
    - [`DocTypeArray` `T`](#doctypearray-t)
    - [`DocTypeIndexRef` `T`](#doctypeindexref-t)
    - [`DocUnsupported` `T`](#docunsupported-t)
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


### `extractDocsFromProject`


### `extractDocsFromModule`


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
{
  modules: DocModule[]
  typeIndex: TypeIndex
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

#### `Node` `U`

```ts
type Node = 
  | DocTypeAlias  
  | DocTypeInterface  
  | DocUnion  
  | DocTypePrimitive  
  | DocTypeLiteral  
  | DocTypeCallable  
  | DocTypeArray  
  | DocTypeObject  
  | DocTypeIndexRef  
  | DocUnsupported  
  | { kind: 'function'; signatures: DocSig[] }  
  |   
  | 
```

#### `DocTypePrimitive` `T`

```ts
{ kind: 'primitive', type: string }
```

#### `DocTypeLiteral` `T`

```ts
{ kind: 'literal'; base: string }
```

#### `DocTypeArray` `T`

```ts
{ kind: 'array'; innerType: Node }
```

#### `DocTypeIndexRef` `T`

```ts
{ kind: 'typeIndexRef', link: string }
```

#### `DocUnsupported` `T`

```ts
{ kind:'unsupported', checkerText: string }
```

#### `Thunk` `F`

<!-- prettier-ignore -->
```ts
() => T
```

<!-- END API DOCS --->
