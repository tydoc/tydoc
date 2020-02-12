import * as tsm from 'ts-morph'
import { casesHandled, dump } from '../../utils'
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
    const n = exdec[1][0] // todo why multiple?
    const docExport = {} as Docman.DocExport
    docExport.exportName = exportName
    if (exportName === 'default') {
      mod.exported.hasMain = true
      docExport.isMain = true
    } else {
      docExport.isMain = false
    }
    if (isTypeLevel(n)) {
      mod.exported.types.push(docExport)
      docExport.typeName = getTypeName(n)
      extractDocsFromVisibleNode(docman, n)
    } else {
      const t = n.getType()
      mod.exported.terms.push(docExport)
      docExport.type = getTypeInfo(t)
      if (docExport.type.isRef) {
        extractDocsFromVisibleNode(docman, n)
      }
    }
  }
  return docman.data()
}

function extractDocsFromVisibleNode(docman: Docman.Docman, n: tsm.Node) {
  const typeName = getTypeName(n)
  const t = n.getType()
  // const sigs = n.getCallSignatures()
  const props = t.getProperties()
  // if (docman.data().typeIndex[typeName]) return
  if (isTerminalType(t)) {
    docman.data().typeIndex[typeName] = true as any
    docman.data().typeIndex[typeName] = getTypeInfo(t)
    return
  }
  // if (isTypeCallable(n)) return
  // If there is no symbol it means there is no name which means it is not
  // documentable as a standalone thing.
  // if (!n.getSymbol()) return
  docman.data().typeIndex[typeName] = true as any
  docman.data().typeIndex[typeName] = {
    name: typeName,
    // nameApparent: n.getApparentType().getText(),
    // target: n.getTargetType()?.getText(),
    // symbol: n.getSymbol()?.getName(),
    // isAlias: n.getSymbol()?.isAlias(),
    // valDec: n
    //   .getSymbol()
    //   ?.getValueDeclaration()
    //   ?.getText(),
    // isCallable: isTypeCallable(n),
    properties: props.map(propSym => {
      const sig = propSym.getDeclarations()[0] as  // todo why multiple?
        | tsm.MethodSignature
        | tsm.PropertySignature
      let readonly: boolean
      let optional: boolean
      let propName: string
      let typeName: string

      extractDocsFromVisibleNode(docman, sig)
      if (tsm.Node.isPropertySignature(sig)) {
        const struct = sig.getStructure()
        propName = struct.name
        optional = struct.hasQuestionToken ?? false
        readonly = struct.isReadonly ?? false
        return {
          name: propName,
          type: getTypeInfo(sig),
          optional: optional,
          readonly: readonly,
        }
      } else if (tsm.Node.isMethodSignature(sig)) {
        const struct = sig.getStructure()
        propName = struct.name
        optional = struct.hasQuestionToken ?? false
        readonly = false
        return {
          name: propName,
          type: {
            // todo, is the signature info...
            name: 'todo',
            isCallable: true, // todo
            isPrim: false,
            isLit: false,
            isRef: false,
          },
          optional: optional,
          readonly: readonly,
        }
      } else {
        casesHandled(sig)
      }
    }),

    // signatures: sigs.map(sig => {
    //   const params = sig.getParameters()
    //   const returnType = sig.getReturnType()
    //   const returnTypeName = getTypeName(returnType)
    //   // extractDocsFromVisibleType(docman, returnType)
    //   return {
    //     parameters: params.map(param => {
    //       // todo why multiple declarations?
    //       const paramName = param.getName()
    //       const paramType = param.getTypeAtLocation(param.getDeclarations()[0])
    //       const paramTypeName = getTypeName(paramType)
    //       // extractDocsFromVisibleType(docman, paramType)
    //       return {
    //         name: paramName,
    //         type: paramTypeName,
    //       }
    //     }),
    //     returns: returnTypeName,
    //   }
    // }),
  } as any
}

function isTerminalType(t: tsm.Type): boolean {
  return t.isLiteral() || isPrimitive(t)
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

function getTypeInfo(tn: tsm.Type | tsm.Node): Docman.TypeInfo {
  const t = isNode(tn) ? tn.getType() : tn
  return {
    name: getTypeName(tn),
    isPrim: isPrimitive(t),
    isRef: !(isPrimitive(t) || t.isLiteral()),
    isLit: t.isLiteral(),
  }
}

function getTypeName(tn: tsm.Type | tsm.Node): string {
  if (isNode(tn)) {
    dump(tn.getKindName())
    dump(tn.getText())
    dump(tn.getType().getText())
    if (tsm.Node.isTypeAliasDeclaration(tn)) {
      const s = tn.getSymbol()
      if (s) {
        return s.getName()
      }
    }
    if (tsm.Node.isInterfaceDeclaration(tn)) {
      return tn.getName()
    }
    if (tsm.Node.isPropertySignature(tn)) {
      const struct = tn.getStructure()
      if (isUndefined(struct.type)) {
        return 'unknown'
      } else if (isString(struct.type)) {
        return struct.type
      } else {
        // typeName = struct.type(...) // todo
        return 'unknown'
      }
    }
  }
  return tn.getText(undefined, tsm.ts.TypeFormatFlags.None)
}

function isTypeCallable(t: tsm.Type): boolean {
  return t.getCallSignatures().length > 0
}

function isTypeLevel(node: tsm.Node) {
  return (
    tsm.Node.isTypeAliasDeclaration(node) ||
    tsm.Node.isInterfaceDeclaration(node)
  )
}

function isNode(x: unknown): x is tsm.Node {
  return x instanceof tsm.Node
}

function isString(x: unknown): x is string {
  return typeof x === 'string'
}

function isUndefined(x: unknown): x is undefined {
  return x === undefined
}
