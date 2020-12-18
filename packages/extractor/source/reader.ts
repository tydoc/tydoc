import { inspect } from 'util'
import * as Doc from './doc'
import { ExtractedPackageData } from './extract'

/**
 * Methods for easily exploring the given EPD.
 */
type Reader = {
  edd: ExtractedPackageData['docs']
  types: {
    get(name: string): Doc.IndexableNode
    getInterface(name: string): Doc.Interface
    getAlias(name: string): Doc.Alias
  }
  exports: {
    first(name: string): Doc.Expor
  }
  dump(): void
}

/**
 * Create a reader. A fluent (aka. chaining) API for navigating the EPD.
 */
export function create(edd: Doc.Package): Reader {
  return {
    edd,
    types: {
      getInterface: getInterface.bind(null, edd),
      getAlias: getAlias.bind(null, edd),
      get: get.bind(null, edd),
    },
    exports: {
      first: firstExport.bind(null, edd),
    },
    dump() {
      console.error(inspect(edd, { depth: null }))
    },
  }
}

/**
 * Lookup an interface type in the type index.
 *
 * Throws if searched type is not in the type index.
 * Throws if the found type is not an interface.
 */
export function getInterface(edd: Doc.Package, name: string): Doc.Interface {
  const t = get(edd, name)

  if (t.kind !== 'interface') {
    throw new Error(`Expected the indexed type "${name}" to be an interface but it was actually an ${t.kind}`)
  }

  return t
}

/**
 * Lookup an alias type in the type index.
 *
 * Throws if searched type is not in the type index.
 * Throws if the found type is not an alias.
 */
export function getAlias(edd: Doc.Package, name: string): Doc.Alias {
  const t = get(edd, name)

  if (t.kind !== 'alias') {
    throw new Error(`Expected the indexed type "${name}" to be an alias but it was actually an ${t.kind}`)
  }

  return t
}

/**
 * Lookup a type in the type index.
 *
 * Throws if searched type is not in the type index.
 */
export function get(edd: Doc.Package, name: string): Doc.IndexableNode {
  const t = edd.typeIndex[name]

  if (!t) {
    throw new Error(`Could not find type "${name}" in the type index.`)
  }

  return t
}

/**
 * Look through all modules for a named export and return it. If none found, then throw.
 */
export function firstExport(edd: Doc.Package, name: string): Doc.Expor {
  let ex

  for (const mod of edd.modules) {
    const ex = mod.namedExports.find((ex) => ex.name === name)
    if (ex) return ex
  }

  throw new Error(`Could not find an export named "${name}" in the ${edd.modules.length} EDD module(s).`)
}
