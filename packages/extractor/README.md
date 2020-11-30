```
Work in progress 👷‍
```

# tydoc <!-- omit in toc -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Features Still TODO](#features-still-todo)
- [General Features Overview](#general-features-overview)
  - [CLI](#cli)
  - [JSON Representation](#json-representation)
  - [Markdown Representation](#markdown-representation)
  - [Automatic Main-Entrypoint Detection](#automatic-main-entrypoint-detection)
    - [Theory](#theory)
    - [Tydoc Support](#tydoc-support)
  - [Multiple Entrypoint Support](#multiple-entrypoint-support)
    - [What does "multiple entrypoints" mean](#what-does-multiple-entrypoints-mean)
    - [Tydoc support](#tydoc-support)
  - [Named Exports](#named-exports)
  - [Main Export](#main-export)
- [Type Index Overview](#type-index-overview)
  - [Exported Types of exported terms reference the type index](#exported-types-of-exported-terms-reference-the-type-index)
  - [Non-exported types of exported terms show up in the Type Index](#non-exported-types-of-exported-terms-show-up-in-the-type-index)
  - [Module Level TsDoc](#module-level-tsdoc)
  - [Qualified Module Paths](#qualified-module-paths)
  - [Avoids extracting docs for native types (Array, RegExp, etc.)](#avoids-extracting-docs-for-native-types-array-regexp-etc)
- [TS Types Support Overview](#ts-types-support-overview)
  - [Functions](#functions)
  - [Overloaded Functions](#overloaded-functions)
  - [Callable Namespaces](#callable-namespaces)
  - [Union Types](#union-types)
  - [Discriminant Union Types](#discriminant-union-types)
    - [Theory](#theory-1)
    - [Tydoc Support](#tydoc-support-1)
  - [Intersection Types](#intersection-types)
  - [Interface Types](#interface-types)
  - [Array Types](#array-types)
  - [Literal Types](#literal-types)
  - [Inline Object types](#inline-object-types)
  - [`typeof` operator](#typeof-operator)
- [AST Guide](#ast-guide)
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
- [Debugging](#debugging)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- CLI
- API
- JSON output
- Markdown output
- Support for named exports
- Support for default exports
- Support for packages with multiple entrypoints
- Automatic main module detection
- Type Index to dedupe type referenes
- Support for different same-name types by using module paths to disambiguate (fully qualified type name aka. "FQTN")
- Interfaces
- Type aliases
- Support for unions with multiple discriminants
- Function types
- Overloaded function types
- Callable namespace types (functions with properties)
- Union types
- Literal types
- Discriminant union types
- Intersection types
- Array types
- Inline Object types
- Typeof operator

## Features Still TODO

- Parse jsdoc on extracted items
- Parse jsdoc on modules
- [classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [generics](https://www.typescriptlang.org/docs/handbook/generics.html)
- `RegExp` Type
- `Date` Type
- Parameter defaults
- Indexable Types
- [Tuple Types](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple)

## General Features Overview

> **Note**: The following feature examples show JSON in [JSON5](https://json5.org/) format so that comments may be rendered with the examples. Just understand that Tydoc actually emits JSON, not JSON5.

> **Note**: The JSON output of Tydoc is verbose. Examples here show only a minimal subset of the data as required to make the point in any given example. Just understand that there are many more aspects to the data than any one example shows at a time.

### CLI

Tydoc comes with a CLI. Use the `project` sub-command at the root of your node package (where `package.json` resides) to generate your API documentation.

```
$ cd my/node/package
$ tydoc project a b ...
```

Pass as many entrypoints as there are in your node package. All paths given are relative to your source root. Source root is the `rootDir` as configured in your `tsconfig.json`. If not set then source root is the current working directory.

### JSON Representation

Tydoc can extract documentation as JSON so that you can render it however you want.

You can generate JSON from the CLI like so:

```
tydoc project --json main > docs.json
```

The structure is fully typed. You can leverage the typings like so:

```ts
import docPackageJson from './docs.json'
import { Doc } from 'tydoc/types'

const docs = docPackageJson as Doc.DocPackage
```

The types are extensively documented inline so read them to learn more about the shape/schema of the JSON data and semantics of fields therein (e.g. is a path relative or not).

### Markdown Representation

There is a bundled markdown renderer. You can use it from the command line like so:

```
$ tydoc project --markdown main > docs.md
```

For an example of what the output looks like see the [Tydoc repo `README.md` "API" section](https://github.com/jasonkuhrt/tydoc/tree/docs/features#api).

### Automatic Main-Entrypoint Detection

#### Theory

All valid Node packages must specify their main entrtypoint in `package.json` like so:

```json
{
  "name": "somePackage",
  "main": "./path/to/main.js"
}
```

The main entrypoint can be imported without path qualification, while all other module imports from the package must be done via explicit paths:

```ts
import { foo } from 'somePackage' // <somePackagePath>/path/to/main.js
import { bar } from 'somePackage/not/main/one'
import { qux } from 'somePackage/not/main/two'
```

#### Tydoc Support

Tydoc takes advantage of this to automatically detect when the entrypoint it is extracting is the main one or not.

For example:

```
$ tydoc project path/to/main
```

Leads to extracted JSON:

```json5
{
  modules: [
    {
      isMain: true,
    },
  ],
}
```

### Multiple Entrypoint Support

#### What does "multiple entrypoints" mean

A package with multiple entrypoints means that your package has more than one module where your users are allowed to import things from. For example in the following `b.ts` and `c.ts` are official entrypoints into the package in addition to `a`.

```
a.ts
b.ts
c.ts
package.json  <-  "name": "some-package"
```

Thus allowing users to do e.g.:

```ts
import { foo } from 'some-package' // a
import { bar } from 'some-package/b'
import { qux } from 'some-package/c'
```

#### Tydoc support

Tydoc accepts multiple entrypoints on the CLI:

```
tydoc project a b c
```

### Named Exports

Tydoc captures all named exports of a module.

For example:

```ts
export const a = 0
export const b = 1
export const c = 2
```

```json5
{
  modules: [
    {
      namedExports: [
        {
          name: 'a',
        },
        {
          name: 'b',
        },
        {
          name: 'c',
        },
      ],
    },
  ],
}
```

### Main Export

Tydoc captures the main export of a module. The "main" export is the one exported using `export default ...` syntax. Note that main exports are nameless by design and so Tydoc will naturally not extract a name either.

For example:

```ts
const a = 0
export default a
```

```json5
{
  "modules": [
    {
      "mainExport": {
      }
  ]
}
```

## Type Index Overview

The types in a package are a graph of references, so Tydoc always creates a type index. What this means is that when Tydoc is extracting type information from your package, it keeps extracted types in the type index rather than documenting types inline.

#### Exported Types of exported terms reference the type index

For example in the following module the `Foo` type will be indexed and referenced by the two named exports here. Note that `Foo` type is treated as both a named export and a type in the type index. Tydoc decouples the concepts.

```ts
export type Foo = { a: string }

export const foo: Foo = { a: 'bar' }
```

```json5
{
  modules: [
    {
      namedExports: [
        {
          name: 'Foo',
          type: {
            link: '(test).Foo',
          },
        },
        {
          name: 'foo',
          type: {
            link: '(test).Foo',
          },
        },
      ],
    },
  ],
  typeIndex: {
    '(test).Foo': {
      kind: 'alias',
      name: 'Foo',
      type: {
        kind: 'object',
        props: [
          {
            kind: 'prop',
            name: 'a',
            type: {
              kind: 'primitive',
              type: 'string',
            },
          },
        ],
      },
    },
  },
}
```

#### Non-exported types of exported terms show up in the Type Index

For example in the following module `Foo` is not exported. But since the exported term `foo` references it, it will still be part of the type index.

In this way the Type Index is a representation of all the possible types that your users could encounter as they use your package.

```ts
type Foo = { a: string }

export const foo: Foo = { a: 'bar' }
```

```json5
{
  modules: [
    {
      namedExports: [
        {
          name: 'foo',
          type: {
            link: '(test).Foo',
          },
        },
      ],
    },
  ],
  typeIndex: {
    '(test).Foo': {
      kind: 'alias',
      name: 'Foo',
      type: {
        kind: 'object',
        props: [
          {
            kind: 'prop',
            name: 'a',
            type: {
              kind: 'primitive',
              type: 'string',
            },
          },
        ],
      },
    },
  },
}
```

#### Module Level TsDoc

If you write TsDoc at the top of your module then it will be treated as module-level documentation.

For example:

```ts
/**
 * Welcome to MyAwesomePackage...
 */
```

```json5
{
  modules: [
    {
      tsdoc: {
        raw: '/**\n * Welcome to MyAwesomePackage...\n */',
        summary: 'Welcome to MyAwesomePackage...',
        examples: [],
        customTags: [],
      },
    },
  ],
}
```

Note that if you have non-import syntax below the the TsDoc then the TsDoc will be assumed to be part of that syntax node.

For example:

```ts
/**
 * Welcome to MyAwesomePackage...
 */

function foo() {}
```

```json5
{
  modules: [
    {
      tsdoc: null,
    },
  ],
}
```

To handle this case, make sure that the syntax node has its _own_ TsDoc.

For example:

```ts
/**
 * Welcome to MyAwesomePackage...
 */

/**
 * Whatever
 */
function foo() {}
```

```json5
{
  modules: [
    {
      tsdoc: {
        raw: '/**\n * Welcome to MyAwesomePackage...\n */',
        summary: 'Welcome to MyAwesomePackage...',
        examples: [],
        customTags: [],
      },
    },
  ],
}
```

#### Qualified Module Paths

Tydoc fully qualifies each type name in the type index. This version of a type name is referred to as its "fully qualified type name", abbreviated as FQTN. The FQTN makes it possible to keep different types with the same name in the index.

For example:

```ts
// a.ts
import * as B from './foo/bar/b'
import * as A from './tim/buk/c'

export const a: B.Foo = { b: 1 }
export const b: C.Foo = { c: 2 }
```

```ts
// b.ts
export type Foo = { b: 2 }
```

```ts
// c.ts
export type Foo = { c: 3 }
```

Would result in two `Foo` types in the type index, qualified with paths `b` and `c`:

```json5
{
  typeIndex: {
    '(foo/bar/b).Foo': {},
    '(tim/buk/c).Foo': {},
  },
}
```

### Avoids extracting docs for native types (Array, RegExp, etc.)

## TS Types Support Overview

### Functions

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/functions.html)

```ts
export function foo(x: string, y: boolean): number {
  // ...
}
```

```json5
{
  modules: [
    {
      kind: 'module',
      namedExports: [
        {
          kind: 'export',
          name: 'foo',
          type: {
            kind: 'callable',
            isOverloaded: false,
            hasProps: false,
            props: [],
            sigs: [ <-- guaranteed one signature here becuase `isOverloaded` is `false`
              {
                kind: 'sig',
                return: {
                  kind: 'primitive',
                  type: 'number',
                },
                params: [
                  {
                    kind: 'sigParam',
                    name: 'x',
                    type: {
                      kind: 'primitive',
                      type: 'string',
                    },
                  },
                  {
                    kind: 'sigParam',
                    name: 'y',
                    type: {
                      kind: 'primitive',
                      type: 'boolean',
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
}
```

### Overloaded Functions

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/functions.html#overloads)

```ts
function foo(x: RegExp): boolean
function foo(a: string, b: number): number
function foo(...args: [RegExp] | [string, number]) {
  // ...
}

export { foo }
```

```json5
{
  modules: [
    {
      kind: 'module',
      namedExports: [
        {
          kind: 'export',
          name: 'foo',
          type: {
            kind: 'callable',
            isOverloaded: true, // <-- true
            hasProps: false,
            props: [],
            sigs: [
              // v-- All signatures are contained in this array
              {
                kind: 'sig',
                return: {
                  kind: 'primitive',
                  type: 'boolean',
                },
                params: [
                  {
                    kind: 'sigParam',
                    name: 'x',
                    type: {
                      kind: 'unsupported',
                    },
                  },
                ],
              },
              {
                kind: 'sig',
                return: {
                  kind: 'primitive',
                  type: 'number',
                },
                params: [
                  {
                    kind: 'sigParam',
                    name: 'a',
                    type: {
                      kind: 'primitive',
                      type: 'string',
                    },
                  },
                  {
                    kind: 'sigParam',
                    name: 'b',
                    type: {
                      kind: 'primitive',
                      type: 'number',
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
}
```

### Callable Namespaces

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/interfaces.html#function-types)

Tydoc supports callable namespaces. These are basically functions with properties. In TS they can be represented like so:

```ts
interface foo {
  (x: string): boolean
  bar: string
  qux: number
}
```

In JS it could look like:

```ts
function foo(x) {
  //...
}
foo.bar = 'something'
foo.qux = 0
```

In Tydoc:

```json5
{
  typeIndex: {
    '(a).foo': {
      kind: 'callable',
      hasProps: true, // <-- true
      props: [
        // v--- all properties of the namespace are in this array
        {
          kind: 'prop',
          name: 'a',
          type: {
            kind: 'literal',
            base: 'number',
            name: '1',
          },
        },
        {
          kind: 'prop',
          name: 'b',
          type: {
            kind: 'literal',
            base: 'number',
            name: '2',
          },
        },
      ],
      sigs: [
        {
          kind: 'sig',
          params: [],
          return: {
            kind: 'primitive',
            type: 'boolean',
          },
        },
      ],
    },
  },
}
```

### Union Types

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types)

```ts
export type Foo = 'a' | 'b'
```

```json5
{
  typeIndex: {
    '(example).Foo': {
      kind: 'alias',
      name: 'Foo',
      type: {
        kind: 'union',
        isDiscriminated: false,
        discriminantProperties: null,
        types: [
          {
            kind: 'literal',
            name: '"a"',
            base: 'string',
          },
          {
            kind: 'literal',
            name: '"b"',
            base: 'string',
          },
        ],
      },
    },
  },
}
```

### Discriminant Union Types

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions)

#### Theory

TypeScript supports the concept of discriminant union types. It simply means that among the members of the union there is a common property that can be used at runtime to narrow which member is being worked with.

```ts
type Fruit = Apple | Banana
type Apple = { kind: 'Apple'; crispy: boolean }
type Banana = { kind: 'Banana'; slippery: boolean }

const members = [
  { kind: 'Apple', crispy: true },
  { kind: 'Banana', slippery: false }
] as const

const fruit: Fruit = members[Math.floor(Math.random() * 2]

if (fruit.kind === 'Apple') {
  fruit.crispy // narrows to type Apple
}

if (fruit.kind === 'Banana') {
  fruit.slippery // narrows to type Banana
}
```

There are two requirements for a property to be discriminant:

1. The type of the property must be a literal. Often a string, but it could just as well be `1` `2` `false` etc. Another requirement
2. The types of the properties between union members must not overlap. For example if all `kind` properties above were of type `hello` then the checks would not be sufficient to know which member is being worked with. TS statically enforces this.

#### Tydoc Support

Tydoc will detect if all members of a union type have a property in common whose type does not overlap and if so mark the union type as being descriminated and capture which property is the discriminant. If multiple properties could act as discriminants then Tydoc captures them all.

```ts
export type A = B | C
type B = { b: 2; kind1: 'B1'; kind2: 'B2' }
type C = { c: 3; kind1: 'C1'; kind2: 'C2' }
```

```json5
{
  typeIndex: {
    '(a).A': {
      kind: 'alias',
      name: 'A',
      type: {
        kind: 'union',
        discriminantProperties: ['kind1', 'kind2'],
        isDiscriminated: true,
      },
    },
  },
}
```

### Intersection Types

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types)

```ts
export type A = { s: string } & { b: boolean }
```

```json5
{
  typeIndex: {
    '(a).A': {
      kind: 'alias',
      name: 'A',
      type: {
        kind: 'intersection',
        types: [
          {
            kind: 'object',
            props: [
              {
                kind: 'prop',
                name: 's',
                type: {
                  kind: 'primitive',
                  type: 'string',
                },
              },
            ],
          },
          {
            kind: 'object',
            props: [
              {
                kind: 'prop',
                name: 'b',
                type: {
                  kind: 'primitive',
                  type: 'boolean',
                },
              },
            ],
          },
        ],
      },
    },
  },
}
```

### Interface Types

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/interfaces.html)

```ts
export interface foo {
  bar: string
  qux: number
}
```

```json5
{
  typeIndex: {
    '(example).foo': {
      kind: 'interface',
      name: 'foo',
      props: [
        {
          kind: 'prop',
          name: 'bar',
          type: {
            kind: 'primitive',
            type: 'string',
          },
        },
        {
          kind: 'prop',
          name: 'qux',
          type: {
            kind: 'primitive',
            type: 'number',
          },
        },
      ],
    },
  },
}
```

### Array Types

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)

Tydoc avoids extracting docs for array types since they are native. Tydoc simply traverses into the member types as you would expect.

```ts
export type foo = string[]
```

```json5
{
  typeIndex: {
    '(example).foo': {
      kind: 'alias',
      name: 'foo',
      type: {
        kind: 'array',
        innerType: {
          kind: 'primitive',
          type: 'string',
        },
      },
    },
  },
}
```

### Literal Types

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)

```ts
export type Foo = 'bar'
export type Qux = 1
export type Wuf = false
```

```json5
{
  typeIndex: {
    '(example).Foo': {
      kind: 'alias',
      name: 'Foo',
      type: {
        kind: 'literal',
        name: '"bar"',
        base: 'string',
      },
    },
    '(example).Qux': {
      kind: 'alias',
      name: 'Qux',
      type: {
        kind: 'literal',
        name: '1',
        base: 'number',
      },
    },
    '(example).Wuf': {
      kind: 'alias',
      name: 'Wuf',
      type: {
        kind: 'literal',
        name: 'false',
        base: 'boolean',
      },
    },
  },
}
```

### Inline Object types

```ts
export type Foo = {
  bar: string
}
```

```json5
{
  typeIndex: {
    '(example).Foo': {
      kind: 'alias',
      name: 'Foo',
      type: {
        kind: 'object', // <--
        props: [
          {
            kind: 'prop',
            name: 'bar',
            type: {
              kind: 'primitive',
              type: 'string',
            },
          },
        ],
      },
    },
  },
}
```

### `typeof` operator

[Official TS Docs](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#the-typeof-type-operator)

```ts
const foo = 1

export type Bar = {
  foo: typeof foo
}
```

```json5
{
  modules: [
    {
      namedExports: [
        {
          name: 'Bar',
          type: {
            link: '(example).Bar',
          },
        },
      ],
    },
  ],
  typeIndex: {
    '(example).Bar': {
      kind: 'alias',
      name: 'Bar',
      type: {
        kind: 'object',
        props: [
          {
            kind: 'prop',
            name: 'foo',
            // Notice how the type result of calling
            // `typeof` has been inlined here.
            type: {
              kind: 'literal',
              name: '1',
              base: 'number',
            },
          },
        ],
      },
    },
  },
}
```

## EDD Guide

todo

## CLI

### `project`

This command extracts documentation data from a TypeScript package. You must tell it where the package entrypoints are. You must also tell it which of the given entrypoints is the main entrypoint. Often a package only has a main entrypoint, and no others. An example of a package with more than one entrypoint is `lodash` which has `lodash/fp`.

## Glossary

### A package entrypoint

### The main package entrypoint

## API

It is possible to use Tydoc in a programmatic way. The CLI is built using this API.

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

## Debugging

Tydoc uses [debug](https://github.com/visionmedia/debug). When enabled via `*` it also causes Oclif to render stack traces for unexpected thrown errors.

```
DEBUG=* tydoc ...
```
