/**
 * https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#package-endpoints
 */

import got from 'got'

/**
 * https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
 */
export async function getMetadata(name: string): Promise<Metadata> {
  const baseUrl = 'https://registry.npmjs.org'
  const url = `${baseUrl}/${name}`
  const res = await got.get(url)
  const data = JSON.parse(res.body)
  return data
}

type Semver = string

type ISOTimestamp = string

type SemverRange = string

export type Metadata = {
  _id: ID
  _rev: string
  name: ID
  description: string
  'dist-tags': DistTags
  versions: Record<Semver, Version>
  maintainers: Contributor[]
  repository: Repository
  time: {
    created: ISOTimestamp
    modified: ISOTimestamp
    [semver: string]: ISOTimestamp
  }
  users: Record<string, boolean>
  readme: string
  readmeFilename: string
  keywords: ID[]
  contributors: Contributor[]
  homepage: string
  bugs: Bugs
  license: License
}

export type License = 'MIT'

export type ID = 'guid' | 'rfc4122' | 'uuid'

export type Bugs = {
  url: string
}

export type Contributor = {
  name: string
  email: string
}

export type DistTags = {
  latest: string
  beta: string
}

export type Repository = {
  type: Type
  url: string
}

export type Type = 'git' | 'hg'

export type Version = {
  name: ID
  license: License
  description: string
  version: Semver
  author: Author
  repository: Repository
  engine: any
  scripts: Record<string, string>
  main?: string
  types?: string
  typings?: string
  _id: string
  engines: Engines
  _nodeSupported: boolean
  _npmVersion: string
  _nodeVersion: string
  dist: Dist
  directories: any
  dependencies?: Record<string, SemverRange>
  devDependencies?: Record<string, SemverRange>
}

export type Author = {
  name: string
}

export type Ies = {}

export type Dist = {
  tarball: string
  shasum: string
  integrity?: string
  fileCount?: number
  unpackedSize?: number
  'npm-signature'?: string
}

export type Engines = {
  node: string
}
