import * as tsm from 'ts-morph'
import { inspect } from 'util'
import { casesHandled } from '../../utils'

/**
 * The root of documentation data.
 */
export interface Docs {
  terms: (DocFunction | DocVariable)[]
  /**
   * todo
   */
  types: (DocTypeAlias | DocInterface)[]
  typeIndex: Record<string, DocTypeAlias | DocInterface>
  hybrids: any[]
  length: number
}

interface DocsManager {
  add(docItem: DocItem): DocsManager
  getTypeDoc(name: string): null | DocTypeAlias | DocInterface
  addTypeDoc(docItem: DocTypeAlias | DocInterface): DocsManager
  data(): Docs
}

/**
 * Create a new set of docs.
 */
function createDocs(): DocsManager {
  const data: Docs = {
    terms: [],
    hybrids: [],
    types: [],
    typeIndex: {},
    length: 0,
  }

  const api: DocsManager = {
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
    getTypeDoc(name) {
      return data.typeIndex[name] ?? null
    },
    addTypeDoc(docItem) {
      data.typeIndex[docItem.name] = docItem
      return api
    },
    data() {
      return data
    },
  }

  return api
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

type TypeIndex = Record<string, DocItem>

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

function extractExportedInterface(
  docs: DocsManager,
  exportName: string,
  dec: tsm.InterfaceDeclaration
): void {
  extractInterface(exportName, docs, dec)
}

function extractInterface(
  exportName: null | string,
  docs: DocsManager,
  dec: tsm.InterfaceDeclaration
): void {
  if (docs.getTypeDoc(dec.getName())) return

  const docItem: DocInterface = {
    ...extractCommon(dec),
    kind: 'interface',
    languageLevel: 'type',
    exported: exportName ? { name: exportName } : null,
    text: dec.getText(),
    textWithJSDoc: dec.getFullText().trim(),
    name: dec.getName(),
    jsDoc: extractJSDoc(dec),
    properties: dec.getProperties().map(propSig => {
      const type = propSig.getType()
      if (type.isInterface()) {
        extractInterface(
          null,
          docs,
          type.getSymbol()!.getDeclarations()[0]! as tsm.InterfaceDeclaration
        )
      }
      const doc = {
        jsDoc: extractJSDoc(propSig),
        name: propSig.getName(),
        type: {
          name: type.getText(),
          isPrimitive: !type.isObject(),
        },
      }
      return doc
    }),
  }

  docs.addTypeDoc(docItem)
}

// function extractObject(
//   exportName: string,
//   docs: DocsManager,
//   node: tsm.ObjectLiteralExpression
// ) {
//   type.getProperties().map(prop => {})
//   docs.add({
//     ...extractCommon(dec),
//     kind: 'object',
//     jsDoc,
//     languageLevel: 'term',
//     name: dec.getName(),
//     text: dec.getText(),
//     textWithJSDoc: dec.getFullText(),
//     properties: initializer
//       .getType()
//       .getProperties()
//       .map(prop => {
//         return {
//           name: prop.getName(),
//           type: {
//             name: prop.getType().getText(),
//           },
//         }
//       }),
//   })
// }

/**
 * Extract docs from the given module.
 */
export function extractDocsFromModule(sourceFile: tsm.SourceFile): Docs {
  const exs = sourceFile.getExportedDeclarations()
  const docs = createDocs()

  for (const [name, decs] of exs) {
    const dec = decs[0]

    if (tsm.Node.isFunctionDeclaration(dec)) {
      const doc = extractFunction(dec) as DocFunction
      doc.name = name
      docs.add(doc)
      continue
    }

    if (tsm.Node.isInterfaceDeclaration(dec)) {
      extractExportedInterface(docs, name, dec)
      continue
    }

    if (tsm.Node.isTypeAliasDeclaration(dec)) {
      docs.add({
        ...extractCommon(dec),
        kind: 'typeAlias',
        languageLevel: 'type',
        exported: {
          name,
        },
        properties: dec
          .getType()
          .getProperties()
          .map(sym => {
            // todo easier to work with prop sig... see interface example
            const type = sym.getTypeAtLocation(dec)
            let jsDoc = null
            const valDec = sym.getValueDeclaration()
            if (valDec && tsm.Node.isPropertySignature(valDec)) {
              jsDoc = extractJSDoc(valDec)
            }
            return {
              jsDoc,
              name: sym.getName(),
              type: {
                name: type.getText(),
                isPrimitive: !type.isObject(),
              },
            }
          }),
        name,
        text: dec.getText(false),
        textWithJSDoc: dec.getText(true),
        jsDoc: extractJSDoc(dec),
      })
      continue
    }

    if (tsm.Node.isVariableDeclaration(dec)) {
      // jsDoc lives at var statement level
      const statement = dec.getParent().getParent()
      const jsDoc = tsm.Node.isVariableStatement(statement)
        ? extractJSDoc(statement)
        : null

      // If the variable is pointing to a function we will treat it like as if
      // it were a function declaration.
      const initializer = dec.getInitializer()
      if (initializer) {
        if (
          tsm.Node.isArrowFunction(initializer) ||
          tsm.Node.isFunctionExpression(initializer)
        ) {
          const doc = extractFunction(initializer) as DocFunction
          doc.name = name
          docs.add(doc)
          continue
        }
        // if (tsm.Node.isObjectLiteralExpression(initializer)) {
        //   extractObject(name, docs, initializer)
        //   continue
        // }
      }

      const typeName = dec.getType().getText()

      docs.add({
        ...extractCommon(dec),
        kind: 'variable',
        languageLevel: 'term',
        name,
        // type: type && extractTypeData(type),
        type: {
          name: typeName,
        },
        text: dec.getText(false),
        textWithJSDoc: dec.getText(true),
        jsDoc,
      })
      continue
    }

    // todo
    // casesHandled(declaration)

    throw new Error(
      `unknown kind of declaration or declaration scenario\n\n${inspect(dec)}`
    )
  }

  return docs.data()
}

// function extractObjectLiteral(node:tsm.object){}

/**
 * Extract doc data that is common to all doc items from the given declaration.
 */
function extractCommon(dec: tsm.ExportedDeclarations) {
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
function extractFunction(
  node: tsm.ArrowFunction | tsm.FunctionExpression | tsm.FunctionDeclaration
): Omit<DocFunction, 'name'> {
  // todo anything useful we can by revealing explicitly named function expressions?
  // let maybeName = ''
  // if (dec instanceof tsm.FunctionExpression) {
  //   maybeName = dec.getName() ?? ''
  // }

  let jsDoc = null
  if (tsm.Node.isFunctionDeclaration(node)) {
    jsDoc = extractJSDoc(node)
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
    if (maybeVarDec && tsm.Node.isVariableDeclaration(maybeVarDec)) {
      jsDoc = extractJSDoc(node)
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
    textWithJSDoc: node.getText(true),
    signature: {
      // todo bespoke, there are tools available in TS api to get signatures.
      // Check if they offer better solution. We use them for example in the
      // Nexus addToContext API. Check it out for reference.
      ...signatureData,
      text: renderSignature(signatureData),
    },
    jsDoc,
    ...extractCommon(node),
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
        return p.name + ': ' + p.type.name
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
function extractJSDoc(node: tsm.JSDocableNode): null | JSDocContent {
  const jsDocs = node.getJsDocs().map(doc => ({ source: doc.getInnerText() }))

  if (jsDocs.length === 0) return null
  if (jsDocs.length === 1) return { primary: jsDocs[0], additional: [] }

  return { primary: jsDocs.pop()!, additional: jsDocs }
}

function getTypeData(type: tsm.Type): TypeData {
  return {
    name: type.getText(undefined, tsm.ts.TypeFormatFlags.None),
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
