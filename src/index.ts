import * as tsm from 'ts-morph'
import { inspect } from 'util'

export function extractDocsFromModuleAtPath(filePath: string) {
  const project = new tsm.Project({ addFilesFromTsConfig: true })

  project.addSourceFileAtPathIfExists(filePath)

  const source = project.getSourceFile(filePath)

  if (!source) {
    throw new Error(`No file at ${filePath}`)
  }

  return extractDocsAndTypesFromSourceFile(source)
}

export function extractDocsAndTypesFromSourceFile(sourceFile: tsm.SourceFile) {
  const exs = sourceFile.getExportedDeclarations()

  const docs = []
  for (const [name, declarations] of exs) {
    docs.push(extractDocsFromDeclaration(name, declarations[0]))
  }

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

type TypeData = {
  name: string
}

interface DocBase {
  name: string
  jsDoc: null | JSDocContent
  text: string
  /**
   * This is about if the item is from the JavaScript language or the TypeScript
   * type system. "term" refers to JavaScript values. "type" refers to
   * TypeSript type. Some constructs span both levels, such as classes.
   */
  languageLevel: 'term' | 'type' | 'term_and_type'
  t?: any
  sourceLocation: {
    filePath: string
    fileLine: number
  }
}

export interface DocFunction extends DocBase {
  kind: 'function'
  signature: {
    parameters: any[]
    return: any
  }
}

export interface DocVariable extends DocBase {
  kind: 'variable'
  type: TypeData
}

export interface DocTypeAlias extends DocBase {
  kind: 'typeAlias'
}

type DocItem = DocFunction | DocVariable | DocTypeAlias

function extractDocsFromDeclaration(
  name: string,
  declaration: tsm.ExportedDeclarations
): DocItem {
  const sourceFile = declaration.getSourceFile()
  const filePath = sourceFile.getFilePath()
  const fileLine = declaration.getStartLineNumber()
  const commonDocData = {
    sourceLocation: {
      filePath,
      fileLine,
    },
  }

  if (declaration instanceof tsm.FunctionDeclaration) {
    return {
      kind: 'function',
      languageLevel: 'term',
      name,
      text: declaration.getText(false),
      signature: {
        parameters: declaration.getParameters().map(
          // p => `name: ${p.getName()} - type:
          // ${extractTypeData(p.getType())}`
          p => ({ name: p.getName(), type: getTypeData(p.getType()) })
        ),
        return: declaration.getReturnType().getText(),
      },
      jsDoc: getJSDocContent(declaration),
      ...commonDocData,
    }
  }

  if (declaration instanceof tsm.VariableDeclaration) {
    // A variable declaration is within a variable declaration list is inside a
    // variable statement. JSDoc lives at the variable statement level.
    const ctx = declaration.getParent().getParent()
    if (ctx instanceof tsm.VariableStatement) {
      const typeName = declaration.getType().getText()
      // const initializer = declaration.getInitializer()
      // const type = initializer && initializer.getType()
      return {
        kind: 'variable',
        languageLevel: 'term',
        name,
        // type: type && extractTypeData(type),
        type: {
          name: typeName,
        },
        text: declaration.getText(false),
        jsDoc: getJSDocContent(ctx),
        ...commonDocData,
      }
    }
  }

  if (declaration instanceof tsm.TypeAliasDeclaration) {
    return {
      kind: 'typeAlias',
      languageLevel: 'type',
      name,
      text: declaration.getText(false),
      jsDoc: getJSDocContent(declaration),
      ...commonDocData,
    }
  }

  // todo
  // casesHandled(declaration)

  throw new Error(
    `unknown kind of declaration or declaration scenario\n\n${inspect(
      declaration
    )}`
  )
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

// const docs = extractDocsFromModuleAtPath(
//   '/Users/jasonkuhrt/projects/nexus/nexus-future/src/index.ts'
// )

// show(docs) //?+

// function show(x: any) {
//   return inspect(x, { depth: null })
// }
