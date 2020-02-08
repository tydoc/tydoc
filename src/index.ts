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
  printed: string
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

type DocItem = DocFunction | DocVariable

function extractDocsFromDeclaration(
  name: string,
  declaration: tsm.ExportedDeclarations
): DocItem {
  const sourceFile = declaration.getSourceFile()
  const filePath = sourceFile.getFilePath()
  const fileLine = declaration.getStartLineNumber()

  if (declaration instanceof tsm.FunctionDeclaration) {
    return {
      kind: 'function',
      name,
      printed: declaration.print(),
      signature: {
        parameters: declaration.getParameters().map(
          // p => `name: ${p.getName()} - type:
          // ${extractTypeData(p.getType())}`
          p => ({ name: p.getName(), type: getTypeData(p.getType()) })
        ),
        return: declaration.getReturnType().getText(),
      },
      jsDoc: getJSDocContent(declaration),
      sourceLocation: {
        filePath,
        fileLine,
      },
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
        name,
        // type: type && extractTypeData(type),
        type: {
          name: typeName,
        },
        printed: declaration.print(),
        jsDoc: getJSDocContent(ctx),
        sourceLocation: {
          filePath,
          fileLine,
        },
      }
    }
  }

  throw new Error(
    `unknown kind of declaration or declaration scenario ${inspect(
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
