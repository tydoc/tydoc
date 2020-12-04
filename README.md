# TyDoc

The TypeScript documenter that meets you where you are

## Packages Overview

This repository is a monorepo. Here is the package breakdown.

| On npm                                                               | In monorepo                                                                        | Purpose                                                                                                                                                                     |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`tydoc`](https://www.npmjs.com/package/tydoc)                       | [`packges/tydoc`](https://github.com/tydoc/tydoc/tree/main/packages/tydoc)         | The `tydoc` package is an entrypoint for most people. It has the CLI and re-exports various Tydoc APIs that are re-exported from packages under the `@tydoc` npm namespace. |
| [`@tydoc/extractor`](https://www.npmjs.com/package/@tydoc/extractor) | [`packges/extractor`](https://github.com/tydoc/tydoc/tree/main/packages/extractor) | The `@tydoc/extractor` package is strictly an API (library) for getting the extracted documentation data (EDD).                                                             |
| N/A                                                                  | [`packages/web`](https://github.com/tydoc/tydoc/tree/main/packages/web)            | The web app hosted at [tydoc.vercel.app](https://tydoc.vercel.app). Since this is not a consumable package with an interface it is not published on npm.                    |

## About the Project

TyDoc is an open-source project worked on by us (the core team) in our free time. We maintain a roadmap for TyDoc [as a GitHub project](https://github.com/orgs/tydoc/projects/1). We envision a better way to document TypeScript packages that approximates the standards already set by other language communities like [Elm](https://package.elm-lang.org/), [Elixir](https://hexdocs.pm/), [Haskell](https://hackage.haskell.org/packages/), [Rust](https://docs.rs/), and [Go](https://godoc.org/).
