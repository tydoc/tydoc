import Debug from 'debug'
import * as path from 'path'
import * as tsm from 'ts-morph'
import * as Docman from './docman'

const debug = Debug('extract')

interface Options {
  entrypoints: string[]
  project?: tsm.Project
}

/**
 * Recursively extract docs from the given project starting from the exports of
 * the given list of entrypoint modules. Everything that is reachable from the
 * exports will be considered part of the API.
 */
export function extractDocsFromProject(opts: Options): Docman.DocPackage {
  const project =
    opts.project ??
    new tsm.Project({
      tsConfigFilePath: path.join(process.cwd(), 'tsconfig.json'),
    })

  // If the project is in a bad state don't bother trying to extract docs from it
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length) {
    const message = project.formatDiagnosticsWithColorAndContext(diagnostics)
    throw new Error(message)
  }

  const sourceFiles = project.getSourceFiles()
  if (sourceFiles.length === 0) {
    throw new Error('No source files found in project to document.')
  }
  debug(
    'found project source files ',
    sourceFiles.map(sf => sf.getFilePath())
  )

  const sourceFileEntrypoints = []
  for (const findEntryPoint of opts.entrypoints) {
    const sf = sourceFiles.find(
      sf => sf.getBaseNameWithoutExtension() === findEntryPoint
    )
    if (!sf) {
      throw new Error(
        `Given entrypoint not found in project: ${findEntryPoint}`
      )
    }
    sourceFileEntrypoints.push(sf)
  }

  const docman = Docman.create()
  sourceFileEntrypoints.forEach(sf => {
    extractDocsFromModule(docman, sf)
  })

  return docman.d
}

/**
 * Recursively extract docs starting from exports of the given module.
 * Everything that is reachable will be considered.
 */
export function extractDocsFromModule(
  docman: Docman.Docman,
  sourceFile: tsm.SourceFile
): Docman.DocPackage {
  const mod = {
    name: sourceFile.getBaseNameWithoutExtension(),
    // absoluteFilePath: sourceFile.getFilePath(),
    // projectRelativeFilePath: 'todo', // todo
    mainExport: null,
    namedExports: [],
  } as Docman.DocModule

  for (const ex of sourceFile.getExportedDeclarations()) {
    const exportName = ex[0]
    const n = ex[1][0] // todo why multiple?
    const typeDoc = extractDocsFromNode(docman, 0, true, false, n)
    const isType = isNodeAtTypeLevel(n)
    if (exportName === 'default') {
      mod.mainExport = typeDoc
    } else {
      mod.namedExports.push({
        name: exportName,
        type: typeDoc,
        isType: isType,
        isTerm: !isType,
      })
    }
    // extractDocsFromExportedNode(docman, [exportName, n])
  }

  docman.d.modules.push(mod)
  return docman.d
}

/**
 * Extract doc from the node. Recurses into linked nodes until a terminal is hit
 * (e.g. boolean, string)
 */
function extractDocsFromNode(
  docman: Docman.Docman,
  depth: number,
  isAPIExport: boolean,
  inlineMode: boolean,
  n: tsm.Node
): Docman.DocType {
  const debug = isAPIExport ? Debug('extract:export') : Debug('extract:visible')
  debug('start doc %s ', n.getKindName())

  // todo hack...
  if (depth > 3) {
    debug('depth limit reached')
    return { kind: 'unknown', name: '?' }
  }

  const t = n.getType()
  const fqtn = getFullyQualifiedTypeName(t)
  debug('type is %s', fqtn)
  const isTerm = tsm.Node.isFunctionDeclaration(n)

  if (isPrimitive(t)) {
    debug('done doc %s (primitive)', fqtn)
    return extractTypeDocFromPrimitive(n)
  }
  if (isLiteral(t)) {
    debug('done doc %s (literal)', fqtn)
    return extractTypeDocFromLiteral(n)
  }
  if (docman.d.typeIndex[fqtn]) {
    debug('done doc %s (already in type index)', fqtn)
    return {
      kind: 'typeref',
      name: fqtn,
    }
  }

  if (!isTerm) {
    if (fqtn === '__INLINE__') {
      if (inlineMode === false) {
        debug('enter inline mode')
        inlineMode = true
      }
    } else {
      if (inlineMode === true) {
        debug('exit inline mode')
        inlineMode = false
      }
    }
  }

  if (!isTerm && !inlineMode) {
    debug('enter name into type index -> %s', fqtn)
    docman.d.typeIndex[fqtn] = {} as any
  }

  const sigs = t.getCallSignatures()
  const props = t.getProperties()
  const doc = {
    name: fqtn,
    kind: tsm.Node.isInterfaceDeclaration(n)
      ? 'interface'
      : tsm.Node.isFunctionDeclaration(n)
      ? 'function'
      : tsm.Node.isArrowFunction(n)
      ? 'function'
      : tsm.Node.isTypeAliasDeclaration(n)
      ? 'alias'
      : t.isObject()
      ? 'object'
      : 'unknown',
    properties: props.map(p => {
      debug('start property %j', p.getName())
      const nNext = p.getDeclarations()[0]
      if (nNext === undefined) {
        debug('failed to get next node from property')
        return {
          name: p.getName(),
          type: {},
        }
      }
      return {
        name: p.getName(),
        type: extractDocsFromNode(docman, depth + 1, false, inlineMode, nNext),
      }
    }),
    signatures: sigs.map(sig => {
      return {
        parameters: sig.getParameters().map(param => {
          debug('start callable parameter %j', param.getName(), {
            declaredType: param.getDeclaredType().getText(),
            typeAtLocation: param.getTypeAtLocation(n).getText(),
            typeViaDeclaration: param
              .getDeclarations()[0]
              .getType()
              .getText(),
            typeViaSymbol: param
              .getDeclarations()[0]
              .getType()
              .getSymbol()
              ?.getName(),
          })
          return {
            name: param.getName(),
            type: extractDocsFromNode(
              docman,
              depth + 1,
              false,
              inlineMode,
              param.getDeclarations()[0]
            ),
          }
        }),
        // todo
        return: extractReturnType(sig),
      }
    }),
  } as Docman.DocType

  // - exported terms never go into the type index
  // - inline types never go into the type index
  if (!(isAPIExport && isTerm) && !inlineMode) {
    debug('done doc %s (hydrate name in Index addition)', fqtn)
    docman.d.typeIndex[fqtn] = doc
    return {
      kind: 'typeref',
      name: fqtn,
    }
  }

  return doc

  /**
   * Extract the return type. If the node is a function and the function does
   * not have an explicit return type annotation then the type will attempt to
   * be inferred (todo, currently assumes void).
   */
  function extractReturnType(sig: tsm.Signature): Docman.DocType {
    debug('start callable return')
    const returnS = sig.getReturnType().getSymbol()
    // return symbol can be undefined when function does not have an explicit
    // return type annotation.
    if (returnS === undefined) {
      // todo try to get the inferred type from the function
      return { kind: 'primitive', name: 'void' }
    } else {
      return extractDocsFromNode(
        docman,
        depth + 1,
        false,
        inlineMode,
        returnS.getDeclarations()[0]
      )
    }
  }
}

function getFullyQualifiedTypeName(t: tsm.Type): string {
  // exploring type text rendering
  // dump(t.getApparentType())
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.NoTruncation))
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.UseFullyQualifiedType))
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.UseStructuralFallback))
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.WriteOwnNameForAnyLike))
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.InElementType))
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.None))
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope))
  // dump(t.getText(n, tsm.ts.TypeFormatFlags.MultilineObjectLiterals))

  // dump(t.getText(undefined, tsm.ts.TypeFormatFlags.NoTruncation))
  // dump(t.getText(undefined, tsm.ts.TypeFormatFlags.UseFullyQualifiedType))
  // dump(t.getText(undefined, tsm.ts.TypeFormatFlags.UseStructuralFallback))
  // dump(t.getText(undefined, tsm.ts.TypeFormatFlags.WriteOwnNameForAnyLike))
  // dump(t.getText(undefined, tsm.ts.TypeFormatFlags.InElementType))
  // dump(t.getText(undefined, tsm.ts.TypeFormatFlags.None))
  // dump(
  //   t.getText(
  //     undefined,
  //     tsm.ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
  //   )
  // )
  // dump(t.getText(undefined, tsm.ts.TypeFormatFlags.MultilineObjectLiterals))
  const sym = t.getSymbol()
  if (!sym) {
    debug('no symbol, considering this type to be inline')
    return '__INLINE__'
  }

  let typeName: string

  const aliasSym = t.getAliasSymbol()
  if (aliasSym) {
    typeName = aliasSym.getName()
  } else if (sym.getName() === '__type') {
    debug(
      'type has no alias symbol and its own symbol is named "__type", so considering it to be inline'
    )
    return '__INLINE__'
  } else {
    // todo what would get name be here then...?
    // typeName = sym.getName()
    typeName = t.getText(undefined, tsm.ts.TypeFormatFlags.None)
  }

  const sourceFile = sym.getDeclarations()[0].getSourceFile()
  const filePath = sourceFile.getFilePath()
  const fileDirPath = path.dirname(filePath)
  const qualifyPath = path.join(
    fileDirPath,
    sourceFile.getBaseNameWithoutExtension()
  )
  const fqtn = `("${qualifyPath}").${typeName}`
  return fqtn
}

// function extractTerminalOrRefTypeDocFromNode(docman: any, n: tsm.Node): {}

function extractTypeDocFromLiteral(n: tsm.Node): Docman.DocTypeLiteral {
  const t = tsm.Node.isSignaturedDeclaration(n)
    ? n.getReturnType()
    : n.getType()
  return {
    kind: 'literal',
    name: t.getText(),
    base: t.getBaseTypeOfLiteralType().getText(),
  }
}

function extractTypeDocFromPrimitive(n: tsm.Node): Docman.DocTypePrimitive {
  const t = tsm.Node.isSignaturedDeclaration(n)
    ? n.getReturnType()
    : n.getType()
  return {
    kind: 'primitive',
    name: t.getText(),
  }
}

function isInline(t: tsm.Type): boolean {}

// function isTerminalType(t: tsm.Type): boolean {
//   return t.isLiteral() || isPrimitive(t) || t.isAny()
// }

function isLiteral(t: tsm.Type): boolean {
  return t.isLiteral()
}
/**
 * Tell if the given type is primitive or not.
 */
function isPrimitive(t: tsm.Type): boolean {
  return (
    t.getText() === 'void' ||
    t.isNull() ||
    t.isNumber() ||
    t.isString() ||
    t.isBoolean() ||
    t.isUndefined() ||
    t.isUnknown()
  )
}

// function getTypeInfo(tn: tsm.Type | tsm.Node): Docman.TypeInfo {
//   const t = isNode(tn) ? tn.getType() : tn
//   return {
//     name: getTypeName(tn),
//     isPrim: isPrimitive(t),
//     isRef: !(isPrimitive(t) || t.isLiteral()),
//     isLit: t.isLiteral(),
//     isCallable: false, // todo
//   }
// }

// function getTypeName(
//   tn: tsm.Type | tsm.Node
//   // | tsm.TypeAliasDeclaration
//   // | tsm.InterfaceDeclaration
//   // | tsm.PropertySignature
//   // | tsm.ParameterDeclaration
// ): string {
//   if (isNode(tn)) {
//     if (tsm.Node.isParameterDeclaration(tn)) {
//       const struct = tn.getStructure()
//       if (isUndefined(struct.type)) {
//         return 'unknown'
//       } else if (isString(struct.type)) {
//         return struct.type
//       } else {
//         // typeName = struct.type(new tsm.CodeBlockWriter()) // todo
//         return 'unknown'
//       }
//     }
//     if (tsm.Node.isTypeAliasDeclaration(tn)) {
//       // todo code comment why symvol would be undefined
//       const s = tn.getSymbol()
//       if (s) {
//         return s.getName()
//       }
//     }
//     if (tsm.Node.isInterfaceDeclaration(tn)) {
//       return tn.getName()
//     }
//     if (tsm.Node.isPropertySignature(tn)) {
//       const struct = tn.getStructure()
//       if (isUndefined(struct.type)) {
//         return 'unknown'
//       } else if (isString(struct.type)) {
//         return struct.type
//       } else {
//         // typeName = struct.type(new tsm.CodeBlockWriter()) // todo
//         return 'unknown'
//       }
//     }
//   }

//   return tn.getText(undefined, tsm.ts.TypeFormatFlags.None)
// }

// function isTypeCallable(t: tsm.Type): boolean {
//   return t.getCallSignatures().length > 0
// }

function isNodeAtTypeLevel(node: tsm.Node) {
  return (
    tsm.Node.isTypeAliasDeclaration(node) ||
    tsm.Node.isInterfaceDeclaration(node) ||
    tsm.Node.isPropertySignature(node)
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
