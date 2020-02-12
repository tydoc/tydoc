import * as tsm from 'ts-morph'
import * as Docman from './docman'

/**
 * Extract docs from the module found at the given file path.
 */
export function extractDocsFromModuleAtPath(filePath: string): Docman.Docs {
  const project = new tsm.Project({ addFilesFromTsConfig: true })
  project.addSourceFileAtPathIfExists(filePath)
  const source = project.getSourceFile(filePath)
  if (!source) {
    throw new Error(`No file at ${filePath}`)
  }
  // todo hoist to higher level, extractDocsFromProject
  const docman = Docman.create()
  return extractDocsFromModule(docman, source)
}

export function extractDocsFromModule(
  docman: Docman.Docman,
  sourceFile: tsm.SourceFile
): Docman.Docs {
  const docs = docman.data()
  const mod = {} as Docman.DocModule
  docs.modules.push(mod)
  mod.name = sourceFile.getBaseNameWithoutExtension()
  mod.exported = { hasMain: false, terms: [], types: [] }
  mod.absoluteFilePath = sourceFile.getFilePath()
  mod.projectRelativeFilePath = 'todo'
  const exDeclarations = sourceFile.getExportedDeclarations()

  for (const exdec of exDeclarations) {
    const exportName = exdec[0]
    const node = exdec[1][0] // todo why multiple?
    const docExport = {} as Docman.DocExport
    docExport.name = exportName
    if (exportName === 'default') {
      mod.exported.hasMain = true
      docExport.isMain = true
    } else {
      docExport.isMain = false
    }
    if (isTypeLevel(node)) {
      mod.exported.types.push(docExport)
    } else {
      mod.exported.terms.push(docExport)
      docExport.type = getTypeName(node.getType())
    }
    extractDocsFromVisibleType(docman, node.getType())
  }
  return docman.data()
}

function extractDocsFromVisibleType(docman: Docman.Docman, type: tsm.Type) {
  const typeName = getTypeName(type)
  const sigs = type.getCallSignatures()
  const props = type.getProperties()
  if (docman.data().typeIndex[typeName]) return
  if (isPrimitive(type)) return
  if (isCallable(type)) return
  // If there is no symbol it means there is no name which means it is not
  // documentable as a standalone thing.
  if (!type.getSymbol()) return
  docman.data().typeIndex[typeName] = true as any
  docman.data().typeIndex[typeName] = {
    name: typeName,
    nameApparent: type.getApparentType().getText(),
    target: type.getTargetType()?.getText(),
    symbol: type.getSymbol()?.getName(),
    isAlias: type.getSymbol()?.isAlias(),
    valDec: type
      .getSymbol()
      ?.getValueDeclaration()
      ?.getText(),
    isCallable: isCallable(type),
    properties: props.map(propSym => {
      const sig = propSym.getDeclarations()[0] as  // todo why multiple?
        | tsm.MethodSignature
        | tsm.PropertySignature
      const type = sig.getType()
      let propName
      let typeName
      if (tsm.Node.isPropertySignature(sig)) {
        const struct = sig.getStructure()
        propName = struct.name
        typeName = struct.type
      } else {
        const struct = sig.getStructure()
        propName = struct.name
        typeName = 'todo' // todo
      }
      // if (type.getSymbol()?.getName() === undefined) {
      //   dump(sig.getStructure())
      // }
      extractDocsFromVisibleType(docman, type)
      return {
        name: propName,
        type: typeName,
      }
    }),

    signatures: sigs.map(sig => {
      const params = sig.getParameters()
      const returnType = sig.getReturnType()
      const returnTypeName = getTypeName(returnType)
      // extractDocsFromVisibleType(docman, returnType)
      return {
        parameters: params.map(param => {
          // todo why multiple declarations?
          const paramName = param.getName()
          const paramType = param.getTypeAtLocation(param.getDeclarations()[0])
          const paramTypeName = getTypeName(paramType)
          // extractDocsFromVisibleType(docman, paramType)
          return {
            name: paramName,
            type: paramTypeName,
          }
        }),
        returns: returnTypeName,
      }
    }),
  } as any
}

/**
 * Tell if the given type is primitive or not.
 */
function isPrimitive(type: tsm.Type): boolean {
  return (
    type.isNull() ||
    type.isNumber() ||
    type.isString() ||
    type.isBoolean() ||
    type.isUndefined() ||
    type.isUnknown()
  )
}

function getTypeName(t: tsm.Type | tsm.TypeNode): string {
  return t.getText(undefined, tsm.ts.TypeFormatFlags.None)
}

function isCallable(t: tsm.Type): boolean {
  return t.getCallSignatures().length > 0
}

function isTypeLevel(node: tsm.Node) {
  return (
    tsm.Node.isTypeAliasDeclaration(node) ||
    tsm.Node.isInterfaceDeclaration(node)
  )
}
