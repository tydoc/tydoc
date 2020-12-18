import * as tsdoc from '@microsoft/tsdoc'
import dedent from 'dedent'
import * as tsm from 'ts-morph'
import { getGenericType, getLocationKind, getSymbol } from './lib/ts-helpers'

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

    getLocationKind(t)                                                        = ${getLocationKind(t)}
    t.getSymbol()?.getDeclarations()?.[0]?.getSourceFile().getFilePath()      = ${getSymbol(t)?.getDeclarations()?.[0]?.getSourceFile().getFilePath()}
    t.getAliasSymbol()?.getDeclarations()?.[0]?.getSourceFile().getFilePath() = ${t.getAliasSymbol()?.getDeclarations()?.[0]?.getSourceFile().getFilePath()}

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

    Exotic getText()
    ----------------
    t.getText(undefined, tsm.ts.TypeFormatFlags.InTypeAlias)                           = ${t.getText(undefined, tsm.ts.TypeFormatFlags.InTypeAlias)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope)    = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseTypeOfFunction)                     = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseTypeOfFunction)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseFullyQualifiedType)                 = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseFullyQualifiedType)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.NoTruncation)                          = ${t.getText(undefined, tsm.ts.TypeFormatFlags.NoTruncation)}
    t.getText(undefined, tsm.ts.TypeFormatFlags.UseStructuralFallback)                 = ${t.getText(undefined, tsm.ts.TypeFormatFlags.UseStructuralFallback)}

    Generic?
    --------
    Boolean(t.getTargetType())                                        = ${Boolean(t.getTargetType())}
    t.getTargetType() === t                                           = ${t.getTargetType() === t}

    Type Arguments?
    ---------------
    t.getTypeArguments().length}                                      = ${t.getTypeArguments().length}
    t.getTypeArguments().map(arg => arg.getText()).join(', ')         = ${t.getTypeArguments().map(arg => arg.getText()).join(', ')}
    t.getAliasTypeArguments().length}                                 = ${t.getAliasTypeArguments().length}
    t.getAliasTypeArguments().map(arg => arg.getText()).join(', ')    = ${t.getAliasTypeArguments().map(arg => arg.getText()).join(', ')}

    Generic Target?
    ---------------
  ` + ((getGenericType(t)) ? '\n\n' + indentBlock(4, renderDumpType(getGenericType(t)!)) : '\n\n' + 'N/A')
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
