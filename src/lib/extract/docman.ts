export interface Docman {
  d: DocPackage
}

/**
 * Create a new set of docs.
 */
export function create(): Docman {
  const data: DocPackage = {
    modules: [],
    typeIndex: {},
  }

  const api: Docman = {
    d: data,
  }

  return api
}

type docTypeBase = {
  name: string
}
type DocProp = { name: string; type: DocType }
type DocParam = { name: string; type: DocType }
type DocSig = { parameters: DocParam[]; return: DocType }
// prettier-ignore
export type DocTypePrimitive = { kind: 'primitive' } & docTypeBase
// prettier-ignore
export type DocTypeLiteral =   { kind: 'literal'; base: string } & docTypeBase
// prettier-ignore
export type DocTypeRef =       { kind: 'typeref' } & docTypeBase
// prettier-ignore
export type DocType =
  | DocTypeRef
  | DocTypePrimitive
  | DocTypeLiteral
  | { kind: 'function';           signatures: DocSig[] } & docTypeBase
  | { kind: 'callable';           signatures: DocSig[] } & docTypeBase
  | { kind: 'callable_object';    signatures: DocSig[]; properties: DocProp[] } & docTypeBase
  | { kind: 'callable_interface'; properties: DocProp[]; signatures: DocSig[] } & docTypeBase
  | { kind: 'object';             properties: DocProp[] } & docTypeBase
  | { kind: 'interface';          properties: DocProp[] } & docTypeBase
  | { kind: 'alias';              properties: DocProp[] } & docTypeBase
  | { kind: 'unknown';            } & docTypeBase
export type DocModule = {
  name: string
  mainExport: null | DocType
  namedExports: {
    name: string
    isTerm: boolean
    isType: boolean
    type: DocType
  }[]
}
export type TypeIndex = Record<string, DocType>
// export type DocPackage = {
//   modules: DocModule[]
//   typeIndex: TypeIndex
// }
export interface DocPackage {
  modules: DocModule[]
  typeIndex: TypeIndex
}

// interface JSDocBlock {
//   source: string
// }

// /**
//  * It is possible for multiple jsDoc blocks to appear in succession. When
//  * source code is authored that way, the jsDoc blocks _after_ the one closest
//  * to the code item appear here. For example:
//  *
//  *    /**
//  *     *   foo 2           <-- Goes into additional jsDoc blocks group
//  *     *\/
//  *    /**
//  *     *   foo 1           <-- Considered the primary jsDoc block
//  *     *\/
//  *     const a = 1
//  *
//  */
// interface JSDocContent {
//   /**
//    * The jsDoc block closest to the code.
//    */
//   primary: JSDocBlock
//   additional: JSDocBlock[]
// }
