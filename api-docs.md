### API

#### renderMarkdown

```ts
;(
  docs: import('/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract').Docs
) => string
```

#### extractDocsFromModuleAtPath

```ts
;(filePath: string) =>
  import(
    '/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract'
  ).Docs
```

#### extractDocsFromModule

```ts
;(
  sourceFile: import('/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph').SourceFile
) =>
  import(
    '/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract'
  ).Docs
```

### Types

#### Docs

- terms (`(import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").DocFunction | import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").DocVariable)[]`)

- types (`(import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").DocTypeAlias | import("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").DocInterface)[]`)

- hybrids (`any[]`)

- length (`number`)

#### DocFunction

- kind (`"function"`)

- signature (`SignatureData & { text: string; }`)

#### DocVariable

- kind (`"variable"`)

- type (`TypeData`)

#### DocTypeAlias

- kind (`"typeAlias"`)

- properties (`{ jsDoc: JSDocContent; name: string; type: { name: string; }; }[]`)

#### DocInterface

- kind (`"interface"`)

- properties (`{ jsDoc: JSDocContent; name: string; type: { name: string; }; }[]`)

#### DocItem

- kind (`"function" | "variable" | "typeAlias" | "interface"`)

- name (`string`)

- jsDoc (`JSDocContent`)

- text (`string`)

- languageLevel (`"term" | "type" | "hybrid"`)
  This is about if the item is from the JavaScript language or the TypeScript
  type system. "term" refers to JavaScript values. "type" refers to
  TypeSript types. "hybrid" refers to constructs span both levels, such as classes.

- sourceLocation (`{ filePath: string; fileLine: number; }`)
