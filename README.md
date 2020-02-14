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


### `extractDocsFromProject`


### `extractDocsFromModule`


### Exported Types

#### `RenderMarkdownOptions`


### Type Index

#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/render/markdown").Options`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/docman").DocPackage`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").DocModule[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").() => string`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").() => T | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").(...items: T[]) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").{ (...items: ConcatArray<T>[]): T[]; (...items: (T | ConcatArray<T>)[]): T[]; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").(separator?: string | undefined) => string`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").() => T[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").(start?: number | undefined, end?: number | undefined) => T[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").(compareFn?: ((a: T, b: T) => number) | undefined) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").{ (start: number, deleteCount?: number | undefined): T[]; (start: number, deleteCount: number, ...items: T[]): T[]; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").(searchElement: T, fromIndex?: number | undefined) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => boolean`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any) => void`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any) => U[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").{ <S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[]; (callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[]; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").{ (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T; (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T; <U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.core").{ <S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined; (predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.core").(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.core").(value: T, start?: number | undefined, end?: number | undefined) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.core").(target: number, start: number, end?: number | undefined) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.iterable").() => IterableIterator<T>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.iterable").() => IterableIterator<[number, T]>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.iterable").() => IterableIterator<number>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.symbol.wellknown").() => { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2016.array.include").(searchElement: T, fromIndex?: number | undefined) => boolean`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2019.array").<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[], thisArg?: This | undefined) => U[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2019.array").{ <U>(this: U[][][][][][][][], depth: 7): U[]; <U>(this: U[][][][][][][], depth: 6): U[]; <U>(this: U[][][][][][], depth: 5): U[]; <U>(this: U[][][][][], depth: 4): U[]; <U>(this: U[][][][], depth: 3): U[]; <U>(this: U[][][], depth: 2): U[]; <U>(this: U[][], depth?: 1 | undefined): U[]; <U>(this: U[], depth: 0): U[]...`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/extract").Options`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").string[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/src/lib/extract/docman").Docman`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").SourceFile`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => StandardizedFilePath`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => string`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Directory`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").Directory`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(pos: number) => { line: number; column: number; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(pos: number) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(dirPathOrDirectory: string | Directory, options?: SourceFileCopyOptions | undefined) => SourceFile`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(filePath: string, options?: SourceFileCopyOptions | undefined) => SourceFile`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(filePath: string, options?: SourceFileCopyOptions | undefined) => Promise<SourceFile>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").Promise<T>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(dirPathOrDirectory: string | Directory, options?: SourceFileMoveOptions | undefined) => SourceFile`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(filePath: string, options?: SourceFileMoveOptions | undefined) => SourceFile`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(filePath: string, options?: SourceFileMoveOptions | undefined) => Promise<SourceFile>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => void`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Promise<void>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => FileReference[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").T[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => SourceFile[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => SourceFileReferencingNodes[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => StringLiteral[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ScriptTarget`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").ScriptTarget`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => LanguageVariant`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").LanguageVariant`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ScriptKind`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").ScriptKind`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => boolean`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Diagnostic<Diagnostic>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (pos: number, times?: number | undefined): this; (positionRange: [number, number], times?: number | undefined): this; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(options?: SourceFileEmitOptions | undefined) => Promise<EmitResult>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(options?: SourceFileEmitOptions | undefined) => EmitResult`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").EmitResult`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(options?: { emitOnlyDtsFiles?: boolean | undefined; } | undefined) => EmitOutput`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").EmitOutput`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(settings?: FormatCodeSettings | undefined) => void`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Promise<FileSystemRefreshResult>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => FileSystemRefreshResult`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").FileSystemRefreshResult`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (sourceFile: SourceFile): string; (directory: Directory): string; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(subscription: (sender: SourceFile) => void, subscribe?: boolean | undefined) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(formatSettings?: FormatCodeSettings | undefined, userPreferences?: UserPreferences | undefined) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(textChanges: readonly (TextChange | TextChange)[]) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly (TextChange | TextChange)[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: Partial<SourceFileStructure>) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => SourceFileStructure`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").SourceFileStructure`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => never`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<ImportDeclarationStructure>) => ImportDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").ImportDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<ImportDeclarationStructure>[]) => ImportDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<ImportDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<ImportDeclarationStructure>) => ImportDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<ImportDeclarationStructure>[]) => ImportDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (condition: (importDeclaration: ImportDeclaration) => boolean): ImportDeclaration | undefined; (moduleSpecifier: string): ImportDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (condition: (importDeclaration: ImportDeclaration) => boolean): ImportDeclaration; (moduleSpecifier: string): ImportDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ImportDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<ExportDeclarationStructure>) => ExportDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").ExportDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<ExportDeclarationStructure>[]) => ExportDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<ExportDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<ExportDeclarationStructure>) => ExportDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<ExportDeclarationStructure>[]) => ExportDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (condition: (exportDeclaration: ExportDeclaration) => boolean): ExportDeclaration | undefined; (moduleSpecifier: string): ExportDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (condition: (exportDeclaration: ExportDeclaration) => boolean): ExportDeclaration; (moduleSpecifier: string): ExportDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ExportDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<ExportAssignmentStructure>) => ExportAssignment`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").ExportAssignment`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<ExportAssignmentStructure>[]) => ExportAssignment[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<ExportAssignmentStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<ExportAssignmentStructure>) => ExportAssignment`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<ExportAssignmentStructure>[]) => ExportAssignment[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(condition: (exportAssignment: ExportAssignment) => boolean) => ExportAssignment | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(condition: (exportAssignment: ExportAssignment) => boolean) => ExportAssignment`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ExportAssignment[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Symbol | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Symbol`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").Symbol`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Symbol[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ReadonlyMap<string, ExportedDeclarations[]>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es2015.collection").ReadonlyMap<K, V>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(defaultExportSymbol?: Symbol | undefined) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<T extends Constructor<ModuledNodeExtensionType>>(Base: T) => Constructor<ModuledNode> & T`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Statement<Statement>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Statement<Statement>>(findFunction: (statement: Statement<Statement>) => statement is T): T | undefined; (findFunction: (statement: Statement<Statement>) => boolean): Statement<...> | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Statement<Statement>>(findFunction: (statement: Statement<Statement>) => statement is T): T; (findFunction: (statement: Statement<Statement>) => boolean): Statement<...>; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").T`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").Statement<T>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<TKind extends SyntaxKind>(kind: TKind) => KindToNodeMappingsWithCommentStatements[TKind] | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").TKind`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<TKind extends SyntaxKind>(kind: TKind) => KindToNodeMappingsWithCommentStatements[TKind]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(statements: string | WriterFunction | readonly (string | WriterFunction | ClassDeclarationStructure | EnumDeclarationStructure | ... 7 more ... | VariableStatementStructure)[]) => Statement<...>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, statements: string | WriterFunction | readonly (string | WriterFunction | ClassDeclarationStructure | EnumDeclarationStructure | ... 7 more ... | VariableStatementStructure)[]) => Statement<...>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<T extends Constructor<StatementedNodeExtensionType>>(Base: T) => Constructor<StatementedNode> & T`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(indexRange: [number, number]) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<ClassDeclarationStructure>) => ClassDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").ClassDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<ClassDeclarationStructure>[]) => ClassDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<ClassDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<ClassDeclarationStructure>) => ClassDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<ClassDeclarationStructure>[]) => ClassDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ClassDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): ClassDeclaration | undefined; (findFunction: (declaration: ClassDeclaration) => boolean): ClassDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): ClassDeclaration; (findFunction: (declaration: ClassDeclaration) => boolean): ClassDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<EnumDeclarationStructure>) => EnumDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").EnumDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<EnumDeclarationStructure>[]) => EnumDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<EnumDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<EnumDeclarationStructure>) => EnumDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<EnumDeclarationStructure>[]) => EnumDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => EnumDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): EnumDeclaration | undefined; (findFunction: (declaration: EnumDeclaration) => boolean): EnumDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): EnumDeclaration; (findFunction: (declaration: EnumDeclaration) => boolean): EnumDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<FunctionDeclarationStructure>) => FunctionDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").FunctionDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<FunctionDeclarationStructure>[]) => FunctionDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<FunctionDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<FunctionDeclarationStructure>) => FunctionDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<FunctionDeclarationStructure>[]) => FunctionDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => FunctionDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): FunctionDeclaration | undefined; (findFunction: (declaration: FunctionDeclaration) => boolean): FunctionDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): FunctionDeclaration; (findFunction: (declaration: FunctionDeclaration) => boolean): FunctionDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<InterfaceDeclarationStructure>) => InterfaceDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").InterfaceDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<InterfaceDeclarationStructure>[]) => InterfaceDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<InterfaceDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<InterfaceDeclarationStructure>) => InterfaceDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<InterfaceDeclarationStructure>[]) => InterfaceDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => InterfaceDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): InterfaceDeclaration | undefined; (findFunction: (declaration: InterfaceDeclaration) => boolean): InterfaceDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): InterfaceDeclaration; (findFunction: (declaration: InterfaceDeclaration) => boolean): InterfaceDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<NamespaceDeclarationStructure>) => NamespaceDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").NamespaceDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<NamespaceDeclarationStructure>[]) => NamespaceDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<NamespaceDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<NamespaceDeclarationStructure>) => NamespaceDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<NamespaceDeclarationStructure>[]) => NamespaceDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => NamespaceDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): NamespaceDeclaration | undefined; (findFunction: (declaration: NamespaceDeclaration) => boolean): NamespaceDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): NamespaceDeclaration; (findFunction: (declaration: NamespaceDeclaration) => boolean): NamespaceDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<TypeAliasDeclarationStructure>) => TypeAliasDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").TypeAliasDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<TypeAliasDeclarationStructure>[]) => TypeAliasDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<TypeAliasDeclarationStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<TypeAliasDeclarationStructure>) => TypeAliasDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<TypeAliasDeclarationStructure>[]) => TypeAliasDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => TypeAliasDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): TypeAliasDeclaration | undefined; (findFunction: (declaration: TypeAliasDeclaration) => boolean): TypeAliasDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): TypeAliasDeclaration; (findFunction: (declaration: TypeAliasDeclaration) => boolean): TypeAliasDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structure: OptionalKind<VariableStatementStructure>) => VariableStatement`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").VariableStatement`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(structures: readonly OptionalKind<VariableStatementStructure>[]) => VariableStatement[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/lib.es5").readonly OptionalKind<VariableStatementStructure>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structure: OptionalKind<VariableStatementStructure>) => VariableStatement`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number, structures: readonly OptionalKind<VariableStatementStructure>[]) => VariableStatement[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => VariableStatement[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): VariableStatement | undefined; (findFunction: (declaration: VariableStatement) => boolean): VariableStatement | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): VariableStatement; (findFunction: (declaration: VariableStatement) => boolean): VariableStatement; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => VariableDeclaration[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): VariableDeclaration | undefined; (findFunction: (declaration: VariableDeclaration) => boolean): VariableDeclaration | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (name: string): VariableDeclaration; (findFunction: (declaration: VariableDeclaration) => boolean): VariableDeclaration; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").VariableDeclaration`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(pos: number, textOrWriterFunction: string | WriterFunction) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<T extends Constructor<TextInsertableNodeExtensionType>>(Base: T) => Constructor<TextInsertableNode> & T`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(range: [number, number], textOrWriterFunction: string | WriterFunction) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (): this; (pos: number, end: number): this; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").NodeType`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").SyntaxKind`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").NodeFlags`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").Node`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").() => SourceFile`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").(sourceFile?: SourceFile | undefined) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").(index: number, sourceFile?: SourceFile | undefined) => Node`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").(sourceFile?: SourceFile | undefined) => Node[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").(sourceFile?: SourceFile | undefined, includeJsDocComment?: boolean | undefined) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").() => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").(sourceFile?: SourceFileLike | undefined) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").(sourceFile?: SourceFile | undefined) => string`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").(sourceFile?: SourceFile | undefined) => Node | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").<T>(cbNode: (node: Node) => T | undefined, cbNodeArray?: ((nodes: NodeArray<Node>) => T | undefined) | undefined) => T | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").Node<NodeType>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => SyntaxKind`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(options?: PrintNodeOptions | undefined) => string`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(meaning: SymbolFlags) => Symbol[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").SymbolFlags`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(name: string) => Symbol`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(name: string) => Symbol | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Type<Type>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").Type<TType>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(pos: number, end: number) => boolean`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(pos: number) => boolean`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Node<Node>>(condition?: ((node: Node<Node>) => node is T) | undefined): T; (condition?: ((node: Node<Node>) => boolean) | undefined): Node<Node>; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Node<Node>>(condition?: ((node: Node<Node>) => node is T) | undefined): T | undefined; (condition?: ((node: Node<Node>) => boolean) | undefined): Node<...> | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Node<Node>[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(index: number) => Node<Node>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => SyntaxList`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").SyntaxList`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => SyntaxList | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<T>(cbNode: (node: Node<Node>) => T | undefined, cbNodeArray?: ((nodes: Node<Node>[]) => T | undefined) | undefined) => T | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<T>(cbNode: (node: Node<Node>, traversal: ForEachDescendantTraversalControl) => T | undefined, cbNodeArray?: ((nodes: Node<Node>[], traversal: ForEachDescendantTraversalControl) => T | undefined) | undefined) => T | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => (Statement<Statement> | Expression<Expression>)[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(pos: number) => Node<Node> | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(start: number, width: number) => Node<Node> | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(includeJsDocComments?: boolean | undefined) => number`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ (includeJsDocComments?: boolean | undefined): string; (options: { trimLeadingIndentation?: boolean | undefined; includeJsDocComments?: boolean | undefined; }): string; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => ModifierFlags`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/typescript/lib/typescript").ModifierFlags`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => SourceFile`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<KeyType extends keyof LocalNodeType, LocalNodeType extends Node = NodeType>(propertyName: KeyType) => NodePropertyToWrappedType<LocalNodeType, KeyType, NonNullable<LocalNodeType[KeyType]>>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").KeyType`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Node<Node>>(condition: (parent: Node<Node>, node: Node<Node>) => parent is T): T; (condition: (parent: Node<Node>, node: Node<Node>) => boolean): Node<...>; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Node<Node>>(condition: (parent: Node<Node>, child: Node<Node>) => parent is T): T | undefined; (condition: (parent: Node<Node>, child: Node<Node>) => boolean): Node<...> | undefined; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<TKind extends SyntaxKind>(kind: TKind) => KindToNodeMappings[TKind]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<TKind extends SyntaxKind>(kind: TKind) => KindToNodeMappings[TKind] | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => Node<Node>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(offset?: number | undefined) => string`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(textOrWriterFunction: string | WriterFunction) => Node<Node>`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(textOrWriterFunction: string | WriterFunction) => void`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").(visitNode: (traversal: TransformTraversalControl) => Node) => this`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").() => CommentRange[]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<TKind extends SyntaxKind>(kind: TKind) => KindToNodeMappings[TKind][]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<TKind extends SyntaxKind>(index: number, kind: TKind) => KindToNodeMappings[TKind]`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").<TKind extends SyntaxKind>(index: number, kind: TKind) => KindToNodeMappings[TKind] | undefined`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Node<Node>>(condition: (parent: Node<Node> | undefined, node: Node<Node>) => parent is T): T; (condition: (parent: Node<Node> | undefined, node: Node<...>) => boolean): Node<...>; }`


#### `("/Users/jasonkuhrt/projects/prisma-labs/jsdoc-extractor/node_modules/ts-morph/lib/ts-morph").{ <T extends Node<Node>>(condition: (parent: Node<Node> | undefined, node: Node<Node>) => parent is T): T | undefined; (condition: (parent: Node<Node> | undefined, node: Node<...>) => boolean): Node<...> | undefined; }`


<!-- END API DOCS --->
