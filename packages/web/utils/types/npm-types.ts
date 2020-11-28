export type Response = {
  _id: ID
  _rev: string
  name: ID
  description: string
  'dist-tags': DistTags
  versions: Versions
  maintainers: Contributor[]
  repository: Repository
  time: string
  users: { [key: string]: boolean }
  readme: string
  readmeFilename: string
  keywords: ID[]
  contributors: Contributor[]
  homepage: string
  bugs: Bugs
  license: string
}

export enum ID {
  GUID = 'guid',
  Rfc4122 = 'rfc4122',
  UUID = 'uuid',
}

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

export enum Type {
  Git = 'git',
  Hg = 'hg',
}

export type Versions = {
  [version: string]: Version
}

export type Version = {
  name: ID
  description: string
  version: string
  author: Author
  repository: Repository
  engine: any
  scripts: { [key: string]: string }
  main: string
  types?: string
  typings?: string
  _id: string
  engines: Engines
  _nodeSupported: boolean
  _npmVersion: string
  _nodeVersion: string
  dist: Dist
  directories: any
  dependencies?: { [key: string]: string }
  devDependencies?: { [key: string]: string }
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
