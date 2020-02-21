import Debug from 'debug'
import * as lo from 'lodash'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { Index, Thunk } from '../../utils'
import { hasAlias, isPrimitive, isTypeLevelNode } from './utils'

const debug = Debug('tydoc:doc')

interface Settings {
  /**
   * Absolute path to the source root. This should match the path that rootDir
   * resolves to from the project's tsconfig.json.
   */
  sourceRoot: string
}

/**
 * Create a new set of docs.
 */
export class Manager {
  constructor(public settings: Settings) {}

  data: DocPackage = {
    modules: [],
    typeIndex: {},
  }

  isIndexable(t: tsm.Type): boolean {
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
  }

  isIndexed(name: string): boolean {
    return this.data.typeIndex[name] !== undefined
  }

  getFromIndex(name: string): Node {
    return this.data.typeIndex[name]
  }

  getFQTN(t: tsm.Type): string {
    return getFQTNFromType(this.settings.sourceRoot, t)
  }

  indexTypeAliasNode(n: tsm.TypeAliasDeclaration, doc: Thunk<Node>): Node {
    const fqtn = getFQTNFromTypeAliasNode(this.settings.sourceRoot, n)
    this.data.typeIndex[fqtn] = {} as any
    const result = doc() as IndexableNode
    this.data.typeIndex[fqtn] = result
    return typeIndexRef(fqtn)
  }

  indexTypeIfApplicable(t: tsm.Type, doc: Thunk<Node>) {
    if (this.isIndexable(t)) {
      const fqtn = getFQTNFromType(this.settings.sourceRoot, t)
      if (!this.isIndexed(fqtn)) {
        // register then hydrate, this prevents infinite loops
        debug('provisioning entry in type index: %s', fqtn)
        this.data.typeIndex[fqtn] = {} as any
        const result = doc() as IndexableNode
        debug('hydrating entry in type index: %s', fqtn)
        this.data.typeIndex[fqtn] = result
      }
      return typeIndexRef(fqtn)
    }
    return doc()
  }
}

export function getFQTNFromTypeAliasNode(
  sourceRoot: string,
  n: tsm.TypeAliasDeclaration
): string {
  const typePath = getPathFromSourceRoot(sourceRoot, n.getSourceFile())
  const fqtn = formatFQTN(typePath, n.getName())
  return fqtn
}

export function getFQTNFromType(sourceRoot: string, t: tsm.Type): string {
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
  const typePath = getPathFromSourceRoot(sourceRoot, sourceFile)
  const fqtn = formatFQTN(typePath, typeName)
  return fqtn
}

function formatFQTN(typePath: string, typeName: string): string {
  return `(${typePath}).${typeName}`
}

function getPathFromSourceRoot(
  sourceRoot: string,
  sourceFile: tsm.SourceFile
): string {
  const filePath = sourceFile.getFilePath()
  const fileDirPath = path.dirname(filePath)
  const modulePath = path.join(
    fileDirPath,
    sourceFile.getBaseNameWithoutExtension()
  )
  // todo relative to project root...
  return path.relative(sourceRoot, modulePath)
}

// prettier-ignore
export type Node =
  | DocTypeUnion
  | DocTypePrimitive
  | DocTypeLiteral
  | DocTypeAlias
  | DocTypeInterface
  | DocTypeCallable
  | DocTypeArray
  | DocTypeObject
  | DocTypeIndexRef
  | DocUnsupported
  | DocTypeIntersection
  // todo unused?
  | { kind: 'function'; signatures: DocSig[] }
  | { kind: 'callable_object'; signatures: DocSig[]; properties: DocProp[] } & Raw
  | { kind: 'callable_interface'; properties: DocProp[]; signatures: DocSig[] } & Raw

// prettier-ignore
export type IndexableNode =
  | DocTypeAlias
  | DocTypeInterface

export type TypeNode =
  | DocTypeUnion
  | DocTypeIntersection
  | DocTypePrimitive
  | DocTypeLiteral
  | DocTypeAlias
  | DocTypeInterface
  | DocTypeCallable
  | DocTypeArray
  | DocTypeObject

//
// Node Features
//

export type JSDoc = {
  jsdoc: null | { raw: string; tags: { name: string; text: string }[] }
}

export type Raw = {
  raw: {
    typeText: string
    nodeText: string
    nodeFullText: string
  }
}

export type TypeIndex = Index<IndexableNode>

//
// Export Node
//

export type Expor = {
  kind: 'export'
  name: string
  isTerm: boolean
  isType: boolean
  type: Node
}

type ExporInput = { type: Node; name: string; node: tsm.ExportedDeclarations }

export function expor(input: ExporInput): Expor {
  const isType = isTypeLevelNode(input.node)
  return {
    kind: 'export',
    name: input.name,
    type: input.type,
    isType: isType,
    isTerm: !isType,
  }
}

//
// Module Node
//

export type DocModule = JSDoc & {
  kind: 'module'
  name: string
  mainExport: null | Node
  namedExports: Expor[]
}

type ModInput = {
  name: string
  mainExport?: null | Node
  namedExports?: Expor[]
  jsdoc: JSDoc['jsdoc']
  location: {
    absoluteFilePath: string
    // projectRelativeFilePath: string // todo
  }
}

export function mod(input: ModInput): DocModule {
  return {
    kind: 'module',
    mainExport: null,
    namedExports: [],
    ...input,
  }
}

export function modFromSourceFile(sourceFile: tsm.SourceFile): DocModule {
  return mod({
    name: sourceFile.getBaseNameWithoutExtension(),
    jsdoc: extractModuleLevelJSDoc(sourceFile),
    location: {
      absoluteFilePath: sourceFile.getFilePath(),
    },
  })
}

/**
 * Extract leading JSDoc that pertains to the module as a whole.
 *
 * Leading JSDoc is considered for the module if it is following by nothing,
 * imports, or a node that has its own JSDoc annotation (or any other kind of
 * comment, actually). A non-import node that does not have its own JSDoc would
 * cause the one leading the module to be its doc.
 */
function extractModuleLevelJSDoc(sf: tsm.SourceFile): JSDoc['jsdoc'] {
  const syntaxList = sf.getChildren()[0]

  if (!tsm.Node.isSyntaxList(syntaxList)) {
    throw new Error(
      `First node of module is not a syntax list. This case is not supported. The node type was ${syntaxList.getKindName()}`
    )
  }

  // Empty syntax list check above should guarnatee a value here
  const firstSyntax = syntaxList.getChildren()[0]

  if (
    // Empty file
    syntaxList.getText() === '' ||
    // Import/export nodes
    tsm.Node.isImportDeclaration(firstSyntax) ||
    tsm.Node.isExportDeclaration(firstSyntax) ||
    // If there are multiple comment blocks then assume the first is for the
    // module and the later one(s) are for the node.
    syntaxList.getLeadingCommentRanges().length > 1
  ) {
    const comment = syntaxList.getLeadingCommentRanges()[0]
    if (comment) {
      return {
        raw: comment.getText(),
        tags: [], // todo
      }
    }
  }

  return null
}

//
// Package node
//

export type DocPackage = {
  modules: DocModule[]
  typeIndex: TypeIndex
}

// prettier-ignore
export type DocProp = { kind: 'prop'; name: string; type: Node }

export type DocTypeArray = { kind: 'array'; innerType: Node }

export function array(innerType: Node): DocTypeArray {
  return { kind: 'array', innerType }
}
// prettier-ignore
export type DocTypeLiteral = { kind: 'literal'; base: string }

export function literal(input: { name: string; base: string }): DocTypeLiteral {
  return { kind: 'literal', ...input }
}
// prettier-ignore
export type DocTypePrimitive = { kind: 'primitive', type: string }

export function prim(type: string): DocTypePrimitive {
  return { kind: 'primitive', type }
}

/**
 * A link to the type index. All named types go into the type index. When a type
 * or export includes a named type, rather than documenting it inline, a
 * reference to the type index is created.
 *
 */
export type DocTypeIndexRef = {
  kind: 'typeIndexRef'
  /**
   * An identifier that can be used to lookup the type in the type index.
   *
   * @example
   *
   * ```ts
   * docs.typeIndex[typeIndexRef.link]
   * ```
   */
  link: string
}

export function typeIndexRef(link: string): DocTypeIndexRef {
  return { kind: 'typeIndexRef', link }
}
// prettier-ignore
export type DocTypeAlias = { kind: 'alias'; name: string, type: Node  } & Raw
type AliasInput = Omit<DocTypeAlias, 'kind'>
// prettier-ignore
export function alias(input: AliasInput): DocTypeAlias {
  return { kind: 'alias', ...input }
}
// prettier-ignore
export type DocTypeInterface = { kind: 'interface'; name: string; props: DocProp[] } & Raw & JSDoc
// prettier-ignore
type InterInput = Omit<DocTypeInterface, 'kind'>
// prettier-ignore
export function inter(input: InterInput): DocTypeInterface {
  return { kind: 'interface', ...input}
}
// prettier-ignore
export function prop(input: { name: string, type: Node }): DocProp {
  return { kind: 'prop', ...input }
}
// prettier-ignore
export type DocTypeObject = { kind: 'object'; props: DocProp[] } & Raw
// prettier-ignore
type objInput = Omit<DocTypeObject, 'kind'>
// prettier-ignore
export function obj(input: objInput ): DocTypeObject {
  return { kind: 'object', ...input }
}
// prettier-ignore
export type DocTypeCallable = { kind: 'callable', isOverloaded: boolean, hasProps:boolean, sigs: DocSig[], props: DocProp[] } & Raw
// prettier-ignore
type callableInput = Omit<DocTypeCallable, 'kind' | 'isOverloaded' | 'hasProps'>
// prettier-ignore
export function callable(input: callableInput): DocTypeCallable {
  return { kind: 'callable', isOverloaded: input.sigs.length > 1, hasProps: input.props.length > 0, ...input }
}

export type DocSig = { kind: 'sig'; params: DocSigParam[]; return: Node }
// prettier-ignore
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
export type DocUnsupported = { kind:'unsupported' } & Raw
// prettier-ignorp
export function unsupported(raw: Raw): DocUnsupported {
  return { kind: 'unsupported', ...raw }
}

//
// Intersection Node
//

export type DocTypeIntersection = { kind: 'intersection'; types: Node[] } & Raw

type IntersectionInput = Omit<DocTypeIntersection, 'kind'>

export function intersection(input: IntersectionInput): DocTypeIntersection {
  return { kind: 'intersection', ...input }
}

//
// Union Node
//

// prettier-ignore
export type DocTypeUnion = { kind:'union', isDiscriminated: boolean, discriminantProperties: null | string[], types: Node[] } & Raw

type UnionInput = { types: Node[] } & Raw

export function union(input: UnionInput): DocTypeUnion {
  const discriminantProperties = findDiscriminant(input.types)
  return {
    kind: 'union',
    isDiscriminated: discriminantProperties !== null,
    discriminantProperties,
    ...input,
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
