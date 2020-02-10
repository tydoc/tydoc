import * as tsm from 'ts-morph'
import { inspect } from 'util'
import { casesHandled } from './utils'

/**
 * The root of documentation data.
 */
export interface Docs {
  terms: (DocFunction | DocVariable)[]
  types: DocTypeAlias[]
  hybrids: any[]
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
  properties: {
    jsDoc: null | JSDocContent
    name: string
    type: { name: string }
  }[]
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
    const docs = extractDocsFromFunction(dec) as DocFunction
    docs.name = name
    return docs
  }

  if (dec instanceof tsm.TypeAliasDeclaration) {
    return {
      kind: 'typeAlias',
      languageLevel: 'type',
      properties: dec
        .getType()
        .getProperties()
        .map(p => {
          const type = p.getTypeAtLocation(dec)
          let jsDoc = null
          const valDec = p.getValueDeclarationOrThrow()
          if (valDec instanceof tsm.PropertySignature) {
            jsDoc = getJSDocContent(valDec)
          }
          return {
            jsDoc,
            name: p.getName(),
            type: {
              name: type.getText(),
              isPrimitive: !type.isObject(),
            },
          }
        }),
      name,
      text: dec.getText(false),
      jsDoc: getJSDocContent(dec),
      ...extractCommonDocDataFromDeclaration(dec),
    }
  }

  if (dec instanceof tsm.VariableDeclaration) {
    // If the variable is pointing to a function we will treat it like as if
    // it were a function declaration.
    const initializer = dec.getInitializer()
    if (initializer) {
      if (
        initializer instanceof tsm.ArrowFunction ||
        initializer instanceof tsm.FunctionExpression
      ) {
        const docs = extractDocsFromFunction(initializer) as DocFunction
        docs.name = name
        return docs
      }
    }

    // jsDoc lives at var statement level
    const statement = dec.getParent().getParent()
    const jsDoc =
      statement instanceof tsm.VariableStatement
        ? getJSDocContent(statement)
        : null
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
      jsDoc,
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
  node: tsm.ArrowFunction | tsm.FunctionExpression | tsm.FunctionDeclaration
): Omit<DocFunction, 'name'> {
  // todo anything useful we can by revealing explicitly named function expressions?
  // let maybeName = ''
  // if (dec instanceof tsm.FunctionExpression) {
  //   maybeName = dec.getName() ?? ''
  // }

  let jsDoc = null
  if (node instanceof tsm.FunctionDeclaration) {
    jsDoc = getJSDocContent(node)
  } else {
    // An ArrowFunction or FunctionExpression can be within an exported
    // variable. jsDoc lives at the variable statement level. Try to find it.
    //
    // The ast scenario supported here is:
    //    var statement > var dec list > var dec > (arrow func|func exp)
    //
    const maybeVarDec = node
      .getParent()
      .getParent()
      ?.getParent()
    if (maybeVarDec instanceof tsm.VariableDeclaration) {
      jsDoc = getJSDocContent(node)
    }
  }

  const signatureData = {
    parameters: node
      .getParameters()
      .map(p => ({ name: p.getName(), type: getTypeData(p.getType()) })),
    return: getTypeData(node.getReturnType()),
  }

  const doc = {
    kind: 'function',
    languageLevel: 'term',
    text: node.getText(false),
    signature: {
      // todo bespoke, there are tools available in TS api to get signatures.
      // Check if they offer better solution. We use them for example in the
      // Nexus addToContext API. Check it out for reference.
      ...signatureData,
      text: renderSignature(signatureData),
    },
    jsDoc,
    ...extractCommonDocDataFromDeclaration(node),
  } as Omit<DocFunction, 'name'>

  return doc
}

/**
 * Render signature for the given signature data.
 */
function renderSignature(sig: SignatureData): string {
  let s = ''

  s += '('
  if (sig.parameters.length > 0) {
    s += sig.parameters
      .map(p => {
        return p.name + ':' + p.type.name
      })
      .join(', ')
  }
  s += ')'

  s += ` => ${sig.return.name}`

  return s
}

/**
 * Extract JSDoc from node. Tease apart primary block from additional blocks.
 */
function getJSDocContent(node: tsm.JSDocableNode): null | JSDocContent {
  const jsDocs = node.getJsDocs().map(doc => ({ source: doc.getInnerText() }))

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
