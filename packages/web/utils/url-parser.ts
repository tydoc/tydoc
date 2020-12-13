export type ParsedPath = {
  source: 'npm'
  org: string | null
  package: string
  module: string | null
} & XOR<
  XOR<{ version: string; tag: null }, { version: null; tag: string }>,
  { version: null; tag: null }
>

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

type Result<Err extends Error, Value> = XOR<{ error: Err }, { value: Value }>

export function parseUrl(url: string): Result<ParseUrlError, ParsedPath> {
  type MatchGroup = {
    source: string
    org: string | undefined
    package: string
    version: string | undefined
    tag: string | undefined
    module: string | undefined
  }
  // const keywords = [/** module */ 'm', /** version */ 'v', /** tag */ 't']
  const regex = /^\/(?<source>npm)(\/(?<org>@[^\/]+))?\/(?<package>[^\/]+)((\/v\/(?<version>[^\/]+))|(\/t\/(?<tag>[^\/]+)))?(\/m\/(?<module>.+)((\/v\/)|))?$/
  const matchResults = url.match(regex)
  const groups = matchResults!.groups as MatchGroup
  const resultValue = {
    source: groups.source as 'npm',
    org: groups.org ?? null,
    package: groups.package,
    tag: groups.tag ?? null,
    version: groups.version ?? null,
    module: groups.module ?? null,
  } as ParsedPath

  return { value: resultValue }
}

export type ParseUrlError = InvalidPathError

export class InvalidPathError extends Error {}
