import * as tsm from 'ts-morph'
import { inspect } from 'util'
import { casesHandled } from './utils'

/**
 * The root of documentation data.
 */
export interface Docs {
  terms: DocItem[]
  types: DocItem[]
  hybrids: DocItem[]
  length: number
}

/**
 * Create a new set of docs.
 */
function createDocs(): Docs {
  return {
    terms: [],
    hybrids: [],
    types: [],
    length: 0,
  }
}

/**
 * Add a doc item to docs.
 */
function addDoc(docs: Docs, doc: DocItem): Docs {
  docs[
    doc.languageLevel === 'term'
      ? 'terms'
      : doc.languageLevel === 'type'
      ? 'types'
      : doc.languageLevel === 'hybrid'
      ? 'hybrids'
      : casesHandled(doc.languageLevel)
  ].push(doc)
  docs.length++
  return docs
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

interface DocBase {
  name: string
  jsDoc: null | JSDocContent
  text: string
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

export interface DocFunction extends DocBase {
  kind: 'function'
  signature: {
    parameters: { name: string; type: TypeData }[]
    return: TypeData
  }
}

export interface DocVariable extends DocBase {
  kind: 'variable'
  type: TypeData
}

export interface DocTypeAlias extends DocBase {
  kind: 'typeAlias'
}

export type DocItem = DocFunction | DocVariable | DocTypeAlias

/**
 * Extract docs from the module found at the given file path.
 */
export function extractDocsFromModuleAtPath(filePath: string) {
  const project = new tsm.Project({ addFilesFromTsConfig: true })

  project.addSourceFileAtPathIfExists(filePath)

  const source = project.getSourceFile(filePath)

  if (!source) {
    throw new Error(`No file at ${filePath}`)
  }

  return extractDocsFromModule(source)
}

/**
 * Extract docs from the given module.
 */
export function extractDocsFromModule(sourceFile: tsm.SourceFile): Docs {
  const exs = sourceFile.getExportedDeclarations()
  const docs = createDocs()

  for (const [name, declarations] of exs) {
    const doc = extractDocsFromDeclaration(name, declarations[0])
    addDoc(docs, doc)
  }

  return docs
}

/**
 * Extracts docs from the given declaration.
 */
function extractDocsFromDeclaration(
  name: string,
  dec: tsm.ExportedDeclarations
): DocItem {
  if (dec instanceof tsm.FunctionDeclaration) {
    return {
      kind: 'function',
      languageLevel: 'term',
      name,
      text: dec.getText(false),
      signature: {
        parameters: dec.getParameters().map(
          // p => `name: ${p.getName()} - type:
          // ${extractTypeData(p.getType())}`
          p => ({ name: p.getName(), type: getTypeData(p.getType()) })
        ),
        return: getTypeData(dec.getReturnType()),
      },
      jsDoc: getJSDocContent(dec),
      ...extractCommonDocDataFromDeclaration(dec),
    }
  }

  if (dec instanceof tsm.VariableDeclaration) {
    // A variable declaration is within a variable declaration list is inside a
    // variable statement. JSDoc lives at the variable statement level.
    const ctx = dec.getParent().getParent()
    if (ctx instanceof tsm.VariableStatement) {
      // If the variable is pointing to a function we will treat it like as if
      // it were a function declaration.
      const initializer = dec.getInitializer()
      if (
        initializer &&
        (initializer instanceof tsm.ArrowFunction ||
          initializer instanceof tsm.FunctionExpression)
      ) {
        const docs = extractDocsFromFunction(initializer) as DocFunction
        docs.jsDoc = getJSDocContent(ctx)
        docs.name = docs.name || name
        return docs
      }

      // const type = initializer && initializer.getType()
      const typeName = dec.getType().getText()
      return {
        kind: 'variable',
        languageLevel: 'term',
        name,
        // type: type && extractTypeData(type),
        type: {
          name: typeName,
        },
        text: dec.getText(false),
        jsDoc: getJSDocContent(ctx),
        ...extractCommonDocDataFromDeclaration(dec),
      }
    }
  }

  if (dec instanceof tsm.TypeAliasDeclaration) {
    return {
      kind: 'typeAlias',
      languageLevel: 'type',
      name,
      text: dec.getText(false),
      jsDoc: getJSDocContent(dec),
      ...extractCommonDocDataFromDeclaration(dec),
    }
  }

  // todo
  // casesHandled(declaration)

  throw new Error(
    `unknown kind of declaration or declaration scenario\n\n${inspect(dec)}`
  )
}

/**
 * Extract doc data that is common to all doc items from the given declaration.
 */
function extractCommonDocDataFromDeclaration(dec: tsm.ExportedDeclarations) {
  const sourceFile = dec.getSourceFile()
  const filePath = sourceFile.getFilePath()
  const fileLine = dec.getStartLineNumber()
  const commonDocData = {
    sourceLocation: {
      filePath,
      fileLine,
    },
  }
  return commonDocData
}

/**
 * Extract docs from the given Function like node. This does not quite return
 * full doc data because jsDoc is kept on variable declarations and name should
 * be the exported one not the maybe-present explicit function expression name.
 */
function extractDocsFromFunction(
  node: tsm.ArrowFunction | tsm.FunctionExpression
): Omit<DocFunction, 'name' | 'jsDoc'> {
  // todo anything useful we can by revealing explicitly named function expressions?
  // let maybeName = ''
  // if (dec instanceof tsm.FunctionExpression) {
  //   maybeName = dec.getName() || ''
  // }
  return {
    kind: 'function',
    languageLevel: 'term',
    text: node.getText(false),
    signature: {
      parameters: node
        .getParameters()
        .map(p => ({ name: p.getName(), type: getTypeData(p.getType()) })),
      return: getTypeData(node.getReturnType()),
    },
    ...extractCommonDocDataFromDeclaration(node),
  }
}

/**
 * Extract JSDoc from node. Tease apart primary block from additional blocks.
 */
function getJSDocContent(node: tsm.JSDocableNode): null | JSDocContent {
  const jsDocs = node.getJsDocs().map(doc => ({ source: doc.getFullText() }))

  if (jsDocs.length === 0) return null
  if (jsDocs.length === 1) return { primary: jsDocs[0], additional: [] }

  return { primary: jsDocs.pop()!, additional: jsDocs }
}

function getTypeData(type: tsm.Type): TypeData {
  return {
    name: type.getText(),
  }
}

// type TypeMetaData = {
//   text: string
//   properties: {
//     name: string
//     type: any // todo TypeMetaData
//   }[]
// }

// function extractTypeData(type: tsm.Type<tsm.ts.Type>): TypeMetaData {
//   const properties = type.getApparentProperties()
//   return {
//     text: type.getText(),
//     properties: properties.map(p => ({
//       name: p.getName(),
//       type: extractTypeData(p.getDeclaredType()),
//     })),
//   }
// }
