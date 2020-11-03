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
    - [`&` `DocModule`](#-docmodule)
    - [`T` `TSDocFrag`](#t-tsdocfrag)
    - [`I` `TSDoc`](#i-tsdoc)
    - [`&` `DocTypeUnion`](#-doctypeunion)
    - [`|` `Node`](#-node)
    - [`T` `DocTypePrimitive`](#t-doctypeprimitive)
    - [`T` `DocTypeLiteral`](#t-doctypeliteral)
    - [`&` `DocTypeAlias`](#-doctypealias)
    - [`T` `RawFrag`](#t-rawfrag)
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
    - [`I` `Settings`](#i-settings)
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
(manager: Manager, sourceFile: SourceFile) => DocPackage
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

#### `&` `DocModule`

````ts
//
// Module Node
//

export type DocModule = TSDocFrag & {
  kind: 'module'
  name: string
  /**
   * The path to this module from package root. If this module is the root
   * module then the path will be `/`.
   *
   * @remarks
   *
   * This is what a user would place in their import `from `string _following_ the
   * package name. For example:
   *
   * ```ts
   * import foo from "@foo/bar/quux/toto"
   * //                       ^^^^^^^^^^
   * ```
   */
  path: string
  isMain: boolean
  mainExport: null | Node
  namedExports: Expor[]
  location: {
    absoluteFilePath: string
  }
}
````

#### `T` `TSDocFrag`

```ts
//
// Node Features
//

export type TSDocFrag = {
  tsdoc: null | TSDoc
}
```

#### `I` `TSDoc`

```ts
export interface TSDoc {
  raw: string
  summary: string
  examples: { text: string }[]
  customTags: { name: string; text: string }[]
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
} & RawFrag
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
    } & RawFrag)
  | ({
      kind: 'callable_interface'
      properties: DocProp[]
      signatures: DocSig[]
    } & RawFrag)
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
export type DocTypeAlias = {
  kind: 'alias'
  name: string
  type: Node
} & RawFrag &
  TSDocFrag
```

#### `T` `RawFrag`

```ts
export type RawFrag = {
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
} & RawFrag &
  TSDocFrag
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
} & RawFrag
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
export type DocTypeObject = { kind: 'object'; props: DocProp[] } & RawFrag
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
export type DocUnsupported = { kind: 'unsupported' } & RawFrag
```

#### `&` `DocTypeIntersection`

```ts
//
// Intersection Node
//

export type DocTypeIntersection = {
  kind: 'intersection'
  types: Node[]
} & RawFrag
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

````ts
interface Options {
  /**
   * Paths to modules in project, relative to project root or absolute.
   */
  entrypoints: string[]
  project?: tsm.Project
  /**
   * Specify the path to the package's entrypoint file.
   *
   * @defualt Read from package.json main field
   * @remarks This is useful for tests to avoid mocks or environment setup
   */
  packageMainEntrypoint?: string
  /**
   * Specify the root of the project.
   *
   * @default The current working directory
   * @remarks This is useful for tests to avoid having to mock process.cwd
   */
  prjDir?: string
  readSettingsFromJSON: boolean
  /**
   * Sometimes a source entrypoint is fronted by a facade module that allows
   * package consumers to do e.g. `import foo from "bar/toto"` _instead of_
   * `import foo from "bar/dist/toto". Use this mapping to force tydoc to view
   * the given source modules (keys) at the given package path (values).
   *
   * @example
   *
   * Given project layout:
   *
   * ```
   * /src/foo/bar/toto.ts
   * ```
   *
   * The setting:
   *
   * ```ts
   * sourceModuleToPackagePathMappings: {
   *    "foo/bar/toto": "toto"
   * }
   * ```
   *
   * Will cause the `toto` module to be documented as being available at path:
   *
   * ```ts
   * import some from "thing/toto"
   * ```
   */
  sourceModuleToPackagePathMappings?: Record<string, string>
}
````

#### `I` `Settings`

```ts
export interface Settings {
  /**
   * Absolute path to the source root. This should match the path that rootDir
   * resolves to from the project's tsconfig.json.
   */
  srcDir: string
  prjDir: string
  mainModuleFilePathAbs: string
  sourceModuleToPackagePathMappings?: Record<string, string>
}
```

#### `F` `Thunk`

<!-- prettier-ignore -->
```ts
export type Thunk<T> = () => T
```

<!-- END API DOCS --->
