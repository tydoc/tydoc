import Debug from 'debug'
import * as lo from 'lodash'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { Index, Thunk } from '../../utils'
import { hasAlias, isPrimitive } from './utils'

const debug = Debug('dox:doc')

export interface Manager {
  d: DocPackage
  isIndexable(t: tsm.Type): boolean
  isIndexed(name: string): boolean
  getFromIndex(name: string): Node
  indexIfApplicable(t: tsm.Type, doc: Thunk<Node>): Node
}

/**
 * Create a new set of docs.
 */
export function createManager(): Manager {
  const d: DocPackage = {
    modules: [],
    typeIndex: {},
  }

  const api: Manager = {
    d: d,
    isIndexable(t) {
      if (t.isLiteral()) return false
      if (isPrimitive(t)) return false
      // something without a symbol must be inline since it means it is nameless
      if (!t.getSymbol() && !t.getAliasSymbol()) return false
      // an object with no alias means it must be inline
      // note that interfaces are considered objects so we filter these out
      if (!t.isInterface()) {
        if (!hasAlias(t) && t.isObject()) return false
      }
      return true
    },
    isIndexed(name) {
      return d.typeIndex[name] !== undefined
    },
    getFromIndex(name) {
      return d.typeIndex[name]
    },
    indexIfApplicable(t, doc) {
      if (api.isIndexable(t)) {
        const fqtn = getFullyQualifiedTypeName(t)
        if (!api.isIndexed(fqtn)) {
          // register then hydrate, this prevents infinite loops
          debug('provisioning entry in type index: %s', fqtn)
          api.d.typeIndex[fqtn] = {} as any
          const result = doc() as IndexableNode
          debug('hydrating entry in type index: %s', fqtn)
          api.d.typeIndex[fqtn] = result
        }
        return typeIndexRef(fqtn)
      }
      return doc()
    },
  }
  return api
}

export function getFullyQualifiedTypeName(t: tsm.Type): string {
  // It can happen that a type has no symbol but does have alias symbol, for
  // example union types.
  const s = t.getSymbol()
  const as = t.getAliasSymbol()
  let typeName: string
  let sourceFile: tsm.SourceFile
  if (as) {
    typeName = as.getName()
    sourceFile = as.getDeclarations()[0].getSourceFile()
  } else if (s) {
    // todo what would get name be here then...?
    // typeName = sym.getName()
    sourceFile = s.getDeclarations()[0].getSourceFile()
    typeName = t.getText(undefined, tsm.ts.TypeFormatFlags.None)
  } else {
    throw new Error(
      `Given type ${t.getText()} has neither symbol nor alias symbol`
    )
  }
  const typePath = getPathFromProjectRoot(sourceFile)
  const fqtn = `("${typePath}").${typeName}`
  return fqtn
}

function getPathFromProjectRoot(sourceFile: tsm.SourceFile): string {
  const filePath = sourceFile.getFilePath()
  const fileDirPath = path.dirname(filePath)
  const modulePath = path.join(
    fileDirPath,
    sourceFile.getBaseNameWithoutExtension()
  )
  // todo relative to project root...
  return modulePath
}

// prettier-ignore
export type Node =
  | DocUnion
  | DocTypeIndexRef
  | DocTypePrimitive
  | DocTypeLiteral
  | DocTypeArray
  | DocTypeAlias
  | DocTypeInterface
  | DocTypeObject
  | DocTypeCallable
  | DocUnsupported
  // todo unused?
  | { kind: 'function'; signatures: DocSig[] }
  | { kind: 'callable_object'; signatures: DocSig[]; properties: DocProp[] } & DocTypeBase
  | { kind: 'callable_interface'; properties: DocProp[]; signatures: DocSig[] } & DocTypeBase

// prettier-ignore
export type IndexableNode =
  | DocTypeAlias
  | DocTypeInterface

export type DocModule = {
  name: string
  mainExport: null | Node
  namedExports: {
    name: string
    isTerm: boolean
    isType: boolean
    type: Node
  }[]
}

export type TypeIndex = Index<IndexableNode>

export type DocPackage = {
  modules: DocModule[]
  typeIndex: TypeIndex
}

type DocTypeBase = {}

// prettier-ignore
export type DocProp = { kind: 'prop'; name: string; type: Node }

export type DocTypeArray = { kind: 'array'; innerType: Node }

export function array(innerType: Node): DocTypeArray {
  return { kind: 'array', innerType }
}
// prettier-ignore
export type DocTypeLiteral = { kind: 'literal'; base: string } & DocTypeBase

export function literal(input: { name: string; base: string }): DocTypeLiteral {
  return { kind: 'literal', ...input }
}
// prettier-ignore
export type DocTypePrimitive = { kind: 'primitive', type: string } & DocTypeBase

export function prim(type: string): DocTypePrimitive {
  return { kind: 'primitive', type }
}
// prettier-ignore
export type DocTypeIndexRef = { kind: 'typeIndexRef', link: string } & DocTypeBase

export function typeIndexRef(link: string): DocTypeIndexRef {
  return { kind: 'typeIndexRef', link }
}
// prettier-ignore
export type DocTypeAlias = { kind: 'alias'; name: string, type: Node, } & DocTypeBase
// prettier-ignore
export function alias(input: { name: string; type: Node }): DocTypeAlias {
  return { kind: 'alias', ...input }
}
// prettier-ignore
export type DocTypeInterface = { kind: 'interface'; name: string; props: DocProp[] }
// prettier-ignore
export function inter(input: { name: string; props: DocProp[] }): DocTypeInterface {
  return { kind: 'interface', ...input}
}
// prettier-ignore
export function prop(input: { name: string, type: Node }): DocProp {
  return { kind: 'prop', ...input }
}
// prettier-ignore
export type DocTypeObject = { kind: 'object'; props: DocProp[] }
// prettier-ignore
export function obj(input: { props: DocProp[] }): DocTypeObject {
  return { kind: 'object', ...input }
}
// prettier-ignore
export type DocTypeCallable = { kind: 'callable', isOverloaded: boolean, hasProps:boolean, sigs: DocSig[], props: DocProp[] } & DocTypeBase
// prettier-ignore
export function callable(input: { sigs: DocSig[], props: DocProp[] }): DocTypeCallable {
  return { kind: 'callable', isOverloaded: input.sigs.length > 1, hasProps: input.props.length > 0, ...input }
}

export type DocSig = { kind: 'sig'; params: DocSigParam[]; return: Node }
// prettier-ignorp
export function sig(input: { params: DocSigParam[]; return: Node }): DocSig {
  return { kind: 'sig', ...input }
}
// prettier-ignore
export type DocSigParam = { kind:'sigParam', name: string; type: Node }
// prettier-ignorp
export function sigParam(input: { name: string; type: Node }): DocSigParam {
  return { kind: 'sigParam', ...input }
}
// prettier-ignore
export type DocUnsupported = { kind:'unsupported', checkerText: string }
// prettier-ignorp
export function unsupported(checkerText: string): DocUnsupported {
  return { kind: 'unsupported', checkerText }
}
// prettier-ignore
export type DocUnion = { kind:'union', isDiscriminated: boolean, discriminantProperties: null | string[], types: Node[] }
// prettier-ignorp
export function union(types: Node[]): DocUnion {
  const discriminantProperties = findDiscriminant(types)
  return {
    kind: 'union',
    isDiscriminated: discriminantProperties !== null,
    discriminantProperties,
    types,
  }
}

function findDiscriminant(nodes: Node[]): null | string[] {
  if (nodes.length === 0) return null
  if (nodes.length === 1) return null
  let possible: string[] = []
  let isLoop1 = true
  for (const n of nodes) {
    if (
      n.kind !== 'callable' &&
      n.kind !== 'interface' &&
      n.kind !== 'object'
    ) {
      return null
    }
    const props = n.props.map(p => p.name)
    if (isLoop1) {
      possible = props
      isLoop1 = false
    } else {
      possible = lo.intersection(possible, props)
    }
    if (possible.length === 0) return null
  }
  return possible
}
