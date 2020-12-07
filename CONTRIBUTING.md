# Contributing

## General Workflow Tips

- Use `yarn tydoc` to work with the TyDoc CLI locally. Note that before using you must have run `yarn build` in `packages/tydoc`.

## Extractor Architecture

Tydoc has three decoupled layers internally. These layers are:

1. Entrypoint/Settings layer that accounts for the CLI but also configuration processing to produce a final settings.
2. Extraction layer that accepts settings and recursively traverses sourcecode to extract documentation information represented in a JSON format for machine consumption.
3. Rendering layer that accepts the JSON documentation data and transforms it into a view for human consumption. Currently the only renderer is Markdown but others like HTML could exist.

Overall the top level pipeline can be understood as a three step process:

```
1                      2                 3
entrypoint/settings -> doc extraction -> doc rendering
```

## Codebase

#### Modules

- `src/cli` contains the CLI codebase
- `src/lib/extractor` contains the doc extraction logic and project/settings entrypoint logic
- `src/lib/lib` contains factored out abstractions to make the rest of implementation easier. Each module therein is standalone and could be seen as a npm package candidate.
- `src/lib/renderers` contains renderers for the doc rendering layer

The three arhcitectural layers span the codebase roughly like so:

```
entrypoint/settings -> src/cli
                       src/lib/extractor (some of)
doc extraction      -> src/lib/extractor (most of)
doc rendering       -> src/lib/renderers
```

#### Notable Deps

- `ts-morph` is used because it is a significantly easier API than the vanilla `tsc` api.
- `@oclif/*` is used to build the CLI. Oclif is a CLI framework from a team at Heroku.
- `debug` is used to leave trace logs behind for debugging

#### Implementation

The heart of the program is arguably the recursive type extractor `fromType` followed by `fromModule` which calls into it.

## Tips

- There are some handy `dump` utility functions for quickly logging TS API data structures to the console in a readable way.

- There is a `quokka` directory used to live-edit (run code as you type it) example code snippets. Think of this as a little sandbox for development. To take full advantage you'll need Quokka VSCode plugin.

- `yarn -s dev:test` gives fast feedback with many simple unit tests.

- https://ts-ast-viewer.com can be extremely help when trying to get a birds eye view of the AST. Sometimes you see data that you wish you were shown the API navigation calls to get it. But even without that it is still very handy to at least get a sense.

- Amazing use-case for [Quokka.js](https://quokkajs.com/) if you have it. Set yourself up a test module using techniques like those seen in `test/setup.ts` and get the best possible feedback loop going!

- Very little information about the TS AST seems available. There is [the Wiki](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) and a bit of information here https://sandersn.github.io/manual/Typescript-compiler-implementation.html. Also here: https://basarat.gitbook.io/typescript/overview (but this has not been updated for a long time).

## Testing

Snapshot testing is used extensively. Testing is designed to be run in watch mode while developing. Inline snapshots are discouraged because when Jest updates them or writes them for the first time it triggers Jest watch mode reruns due to file changes. In contrast normal snapshots don't have this issue and with the VSCode snapshot tools plugin they can still be viewed inline. A caveat is that the VSCode plugin does not work with colocated test suite modules.
