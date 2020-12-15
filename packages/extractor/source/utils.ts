import * as tsdoc from '@microsoft/tsdoc'
import dedent from 'dedent'
import * as tsm from 'ts-morph'
import { getTargetType } from './lib/ts-helpers'

export function isCallable(t: tsm.Type): boolean {
  return t.getCallSignatures().length > 0
}

export function hasAlias(t: tsm.Type): boolean {
  return t.getAliasSymbol() !== undefined
}

/**
 * Tell if the given type is primitive or not.
 */
export function isPrimitive(t: tsm.Type): boolean {
  return (
    t.getText() === 'never' ||
    t.getText() === 'void' ||
    t.isNull() ||
    t.isNumber() ||
    t.isString() ||
    t.isBoolean() ||
    t.isUndefined() ||
    t.isUnknown() ||
    t.isAny()
  )
}

export function isTypeLevelNode(node: tsm.Node): boolean {
  return (
    tsm.Node.isTypeAliasDeclaration(node) ||
    tsm.Node.isInterfaceDeclaration(node) ||
    tsm.Node.isPropertySignature(node)
  )
}

export function getNodeFromTypePreferingAlias(t: tsm.Type): null | tsm.Node {
  const as = t.getAliasSymbol()

  if (as) {
    const declarations = as.getDeclarations()
    if (declarations[0]) {
      return declarations[0]
    }
  }

  const s = t.getSymbol()
  if (s) {
    const declarations = s.getDeclarations()
    if (declarations[0]) {
      return declarations[0]
    }
  }

  return null
}

export function isTypeFromDependencies(t: tsm.Type): boolean {
  return getLocationKind(t) === 'dep'
}

type LocationKind = 'typeScriptCore' | 'typeScriptStandardLibrary' | 'dep' | 'app' | 'inline' | 'unknown'

export function getLocationKind(t: tsm.Type): LocationKind {
  if (isPrimitive(t)) {
    return 'typeScriptCore'
  }

  if (t.isLiteral()) {
    return 'inline'
  }

  // todo does the order of symbol we choose matter in case of both being present?
  const filePath = (t.getSymbol() ?? t.getAliasSymbol())?.getDeclarations()[0]?.getSourceFile().getFilePath()

  if (filePath) {
    if (filePath.includes('/node_modules/typescript/lib/')) return 'typeScriptStandardLibrary'
    if (filePath.includes('/node_modules/')) return 'dep'
    return 'app'
  }

  // todo is ok to consider all other cases as "inline" ?
  // example of valid case here is type of "{}" as return type from function like `() => {}`
  return 'inline'
}

export function dumpType(t: tsm.Type): void {
  console.error(renderDumpType(t))
}

export function renderDumpType(t: tsm.Type): string {
  // prettier-ignore
  return dedent`
    t.getText()                                          = ${t.getText()}
    t.getSymbol()?.getName()                             = ${t.getSymbol()?.getName()}
    t.compilerType.getFlags()                            = ${t.compilerType.getFlags()}
    (t.compilerType as tsm.ts.ObjectType)?.objectFlags   = ${(t.compilerType as tsm.ts.ObjectType)?.objectFlags}
    t.getAliasSymbol()?.getName()                        = ${t.getAliasSymbol()?.getName()}
    t.getApparentType().getText()                        = ${t.getApparentType().getText()}
    t.getSymbol()?.getDeclarations()?.[0]?.getKindName() = ${t.getSymbol()?.getDeclarations()?.[0]?.getKindName()}
    t.getSymbol()?.getDeclarations()?.[0]?.getText()     = ${indentBlockTail(59, t.getSymbol()?.getDeclarations()?.[0]?.getText() ?? 'undefined')}

    t.isAnonymous()                                      = ${t.isAnonymous()}
    t.isAny()                                            = ${t.isAny()}
    t.isInterface()                                      = ${t.isInterface()}
    t.isObject()                                         = ${t.isObject()}
    t.isArray()                                          = ${t.isArray()}
    t.isBoolean()                                        = ${t.isBoolean()}
    t.isBooleanLiteral()                                 = ${t.isBooleanLiteral()}
    t.isClass()                                          = ${t.isClass()}
    t.isClassOrInterface()                               = ${t.isClassOrInterface()}
    t.isEnum()                                           = ${t.isEnum()}

    t.getAliasTypeArguments().length}                    = ${t.getAliasTypeArguments().length}
    Boolean(t.getTargetType())                           = ${Boolean(t.getTargetType())}
    t.getTargetType() === t                              = ${t.getTargetType() === t}

    t.getText(undefined, tsm.ts.TypeFormatFlags.InTypeAlias)                           = ${t.getText(undefined, tsm.ts.TypeFormatFlags.InTypeAlias)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope)    = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseTypeOfFunction)                     = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseTypeOfFunction)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseFullyQualifiedType)                 = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseFullyQualifiedType)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.NoTruncation)                          = ${t.getText(undefined, tsm.ts.TypeFormatFlags.NoTruncation)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseStructuralFallback)                 = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseStructuralFallback)}

    Target Type?
    ------------
  ` + ((getTargetType(t)) ? '\n\n' + indentBlock(4, renderDumpType(getTargetType(t)!)) : '\n\n' + 'N/A')
}

function indentBlockTail(spaces: number, block: string) {
  return block.split('\n').join('\n' + createSpace(spaces))
}

function indentBlock(spaces: number, block: string) {
  if (spaces === 0) return block
  if (block.length === 0) return ''
  return createSpace(spaces) + indentBlockTail(spaces, block)
}

function createSpace(size: number): string {
  if (size === 0) return ''

  let space = ''
  while (space.length < size) {
    space += ' '
  }
  return space
}

export function dumpNode(n: tsm.Node): void {
  // prettier-ignore
  console.error(`
    n.getKindName()                         = ${n.getKindName()}
    n.getText()                             = ${n.getText()}
    n.getType().getText()                   = ${n.getType().getText()}
    n.getType().getSymbol()?.getName()      = ${n.getType().getSymbol()?.getName()}
    n.getType().getAliasSymbol()?.getName() = ${n.getType().getAliasSymbol()?.getName()}
    n.getType().getApparentType().getText() = ${n.getType().getApparentType().getText()}
  `)
}

export function renderTSDocNode(docNode: tsdoc.DocNode): string {
  let result: string = ''
  if (docNode) {
    if (docNode instanceof tsdoc.DocExcerpt) {
      result += docNode.content.toString()
    }
    for (const childNode of docNode.getChildNodes()) {
      result += renderTSDocNode(childNode)
    }
  }
  return result
}
