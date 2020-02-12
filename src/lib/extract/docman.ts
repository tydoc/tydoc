import { casesHandled } from '../../utils'

export interface Docman {
  add(docItem: DocItem): Docman
  getType(name: string): null | DocTypeAlias | DocInterface
  addType(docItem: DocTypeAlias | DocInterface): Docman
  data(): Docs
}

/**
 * Create a new set of docs.
 */
export function create(): Docman {
  const data: Docs = {
    modules: [],
    terms: [],
    hybrids: [],
    types: [],
    typeIndex: {},
    length: 0,
  }

  const api: Docman = {
    /**
     * Add a doc item to docs.
     */
    add(doc) {
      data[
        doc.languageLevel === 'term'
          ? 'terms'
          : doc.languageLevel === 'type'
          ? 'types'
          : doc.languageLevel === 'hybrid'
          ? 'hybrids'
          : casesHandled(doc.languageLevel)
      ].push(doc)
      data.length++
      return api
    },
    getType(name) {
      return data.typeIndex[name] ?? null
    },
    addType(docItem) {
      data.typeIndex[docItem.name] = docItem
      return api
    },
    data() {
      return data
    },
  }

  return api
}

export interface DocModule {
  /**
   * Is this module the main one of the package. The main package module is the
   * one the package is configured with inside package.json `main` property.
   */
  isMain: boolean
  name: string
  absoluteFilePath: string
  projectRelativeFilePath: string
  exported: {
    /**
     * Tell whether this module has a default export or not.
     */
    hasMain: boolean
    types: DocExport[]
    terms: DocExport[]
  }
}

export interface DocExport {
  isMain: boolean
  name: string
  type: string
}

/**
 * Structured documentation data.
 */
export interface Docs {
  modules: DocModule[]
  terms: (DocFunction | DocVariable)[]
  types: (DocTypeAlias | DocInterface)[]
  typeIndex: Record<string, DocTypeAlias | DocInterface>
  hybrids: any[]
  length: number
}

interface JSDocBlock {
  source: string
}

/**
 * It is possible for multiple jsDoc blocks to appear in succession. When
 * source code is authored that way, the jsDoc blocks _after_ the one closest
 * to the code item appear here. For example:
 *
 *    /**
 *     *   foo 2           <-- Goes into additional jsDoc blocks group
 *     *\/
 *    /**
 *     *   foo 1           <-- Considered the primary jsDoc block
 *     *\/
 *     const a = 1
 *
 */
interface JSDocContent {
  /**
   * The jsDoc block closest to the code.
   */
  primary: JSDocBlock
  additional: JSDocBlock[]
}

interface TypeData {
  name: string
}

// todo separate concepts exported vs not exported
// term
// exported term
// type
// exported type
// hybrid
// exported hybrid

interface DocBase {
  name: string
  jsDoc: null | JSDocContent
  text: string
  textWithJSDoc: string
  /**
   * This is about if the item is from the JavaScript language or the TypeScript
   * type system. "term" refers to JavaScript values. "type" refers to
   * TypeSript types. "hybrid" refers to constructs span both levels, such as classes.
   */
  languageLevel: 'term' | 'type' | 'hybrid'
  sourceLocation: {
    filePath: string
    fileLine: number
  }
}

type SignatureData = {
  parameters: { name: string; type: TypeData }[]
  return: TypeData
}

export interface DocFunction extends DocBase {
  kind: 'function'
  signature: SignatureData & {
    text: string
  }
}

export interface DocVariable extends DocBase {
  kind: 'variable'
  type: TypeData
}

export interface DocTypeAlias extends DocBase {
  kind: 'typeAlias'
  exported: null | { name: string }
  properties: {
    jsDoc: null | JSDocContent
    name: string
    type: { name: string }
  }[]
}

export interface DocInterface extends DocBase {
  kind: 'interface'
  exported: null | { name: string }
  properties: {
    jsDoc: null | JSDocContent
    name: string
    type: {
      name: string
    }
  }[]
}

export interface DocObject extends DocBase {
  kind: 'object'
  properties: { name: string; type: TypeData }[]
}

export type DocItem =
  | DocObject
  | DocFunction
  | DocVariable
  | DocTypeAlias
  | DocInterface
