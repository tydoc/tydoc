# Contributing

## Architecture

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

1. There are some handy `dump` utility functions for quickly logging TS API data structures to the console in a readable way.
2. There is a `quokka` directory used to live-edit (run code as you type it) example code snippets. Think of this as a little sandbox for development. To take full advantage you'll need Quokka VSCode plugin.

## Testing

Snapshot testing is used extensively. Testing is designed to be run in watch mode while developing. Inline snapshots are discouraged because when Jest updates them or writes them for the first time it triggers Jest watch mode reruns due to file changes. In contrast normal snapshots don't have this issue and with the VSCode snapshot tools plugin they can still be viewed inline. A caveat is that the VSCode plugin does not work with colocated test suite modules.
