import createDebug from 'debug'
import * as path from 'path'
import * as tsm from 'ts-morph'
import { renderDumpType } from '../utils'
import { casesHandled, Index, indexBy } from './utils'

/**
 * Express a filter for diagnostic errors.
 *
 * An array of filters means to ignore only certain errors. It can be one of three things:
 *
 * 1. regular expression to match against the error code
 * 2. the name of an error category
 * 3. regular expression to match against the file path from which the error arises
 *
 * You can also combine a file path with either error code or error category.
 *
 * Regular expressions are applied case-insensitive.
 *
 * Array items share an OR semantic.
 *
 * @example { path: '/foo/bar/.*' }
 * @example { code: '2\d{2}5' }
 * @example { category: 'error' }
 * @example { path: '/foo/bar/.*', code '24.*' }
 */
export type DiagnosticFilter =
  | { path?: string; code?: string }
  | { path?: string; category?: DiagnosticCategoryString }

export type DiagnosticCategoryString = 'error' | 'message' | 'warning' | 'suggestion'

/**
 *
 */
export function applyDiagnosticFilters(diagnosticFilters: DiagnosticFilter[], diagnostics: tsm.Diagnostic[]) {
  let diagnosticsNotIgnored: tsm.Diagnostic[] = []

  for (const diagnostic of diagnostics) {
    for (const f of diagnosticFilters) {
      if (
        'category' in f &&
        f.category &&
        diagnostic.getCategory() === stringLiteralToDiagnosticCategory(f.category)
      ) {
        break
      }
      if ('code' in f && f.code && diagnostic.getCode().toString().match(new RegExp(f.code, 'i'))) {
        break
      }
      if (f.path && diagnostic.getSourceFile()?.getFilePath().toString().match(new RegExp(f.path, 'i'))) {
        break
      }
      diagnosticsNotIgnored.push(diagnostic)
    }
  }

  return diagnosticsNotIgnored
}

function stringLiteralToDiagnosticCategory(dc: DiagnosticCategoryString): tsm.DiagnosticCategory {
  if (dc === 'error') return tsm.DiagnosticCategory.Error
  if (dc === 'message') return tsm.DiagnosticCategory.Message
  if (dc === 'suggestion') return tsm.DiagnosticCategory.Suggestion
  if (dc === 'warning') return tsm.DiagnosticCategory.Warning
  casesHandled(dc)
}

/**
 * Get the discriminant union properties if any of the given types.
 *
 * Requires to be a discriminant union property are:
 *
 * 1. Property name common to all types given
 * 2. Is a literal type
 * 3. Type is not same as any other same-named property among items
 *
 * @remarks
 *
 * This is a re-implementation of:
 *
 * isDiscriminantProperty
 * findDiscriminantProperties
 *
 * found in:
 *
 * https://raw.githubusercontent.com/microsoft/TypeScript/master/src/compiler/checker.ts
 *
 * which might be surfaced in ts-morph one day:
 *
 * https://github.com/dsherret/ts-morph/issues/880
 *
 */
export function getDiscriminantPropertiesOfUnionMembers(
  members: tsm.Type[]
): (tsm.PropertySignature | tsm.MethodSignature)[] {
  const membersLiteralProperties = members.map((m) => {
    return getProperties(m).filter((p) => {
      return p.getType().isLiteral()
    })
  })

  // if any member has no properties than cannot be a discriminant union
  const firstPropertylessMember = membersLiteralProperties.find((member) => member.length === 0)

  if (firstPropertylessMember) {
    return []
  }

  const membersLiteralPropertiesByName = membersLiteralProperties.map((m) => indexBy(m, (p) => p.getName()))

  const commonLiteralDistinctPropertiesByName: Index<tsm.PropertySignature | tsm.MethodSignature> = {}

  for (const memberLiteralProperties of membersLiteralPropertiesByName) {
    membersLiteralPropertiesByName.shift()
    for (const literalProperty of Object.values(memberLiteralProperties)) {
      if (commonLiteralDistinctPropertiesByName[literalProperty.getName()]) {
        continue
      }

      for (const otherMemberLiteralProperties of membersLiteralPropertiesByName) {
        const otherLiteralProperty = otherMemberLiteralProperties[literalProperty.getName()]
        if (otherLiteralProperty) {
          if (!isSameLiteralTypes(literalProperty.getType(), otherLiteralProperty.getType())) {
            commonLiteralDistinctPropertiesByName[literalProperty.getName()] = literalProperty
          }
        }
      }
    }
  }
  return Object.values(commonLiteralDistinctPropertiesByName)
}

function isSameLiteralTypes(t1: tsm.Type, t2: tsm.Type): boolean {
  if (!t1.isLiteral()) return false
  if (!t2.isLiteral()) return false
  return t1.getText() === t2.getText()
}

/**
 * Get the properties of a type, if any. This may return methods or non-methods.
 *
 * @remarks
 *
 * Overloadeds are discarding, taking only the first declaration found.
 */
export function getProperties(t: tsm.Type): (tsm.PropertySignature | tsm.MethodSignature)[] {
  if (t.isTuple()) {
    // Tuple's are considered objects but their properties like "0" have no declarations
    return []
  }

  return t
    .getProperties()
    .map((p) => {
      const node = p.getDeclarations()[0] as tsm.PropertySignature | tsm.MethodSignature | undefined

      if (!node) {
        debug(
          `Failed to get all properties for type "${t.getText()}". No declarations present for property "${p.getName()}" `
        )
      }

      return node
    })
    .filter((maybeProperty): maybeProperty is tsm.PropertySignature | tsm.MethodSignature => {
      return maybeProperty !== undefined
    })
}

const debug = createDebug('ts-helpers')

/**
 * Return the first declaration of the symbol, ignoring all others and throwing if no declaration can be found.
 *
 * @remarks
 *
 * TS has the concept of overloading. For example a function with multiple signatures.
 */
export function getFirstDeclarationOrThrow(symbol: tsm.Symbol): tsm.Node {
  const decs = symbol.getDeclarations()
  const dec = decs[0]
  if (!dec) {
    throw new Error(
      `Failed to get first declaration for symbol "${symbol.getName()}" because it had no declarations.`
    )
  }
  return dec
}

/**
 * A variant of getTargetType method that only returns if the gotten type is
 * different than the given type. Works around https://github.com/dsherret/ts-morph/issues/904.
 */
export function getGenericType(t: tsm.Type) {
  const targetType = t.getTargetType()
  return targetType === t ? undefined : targetType
}

/**
 * Get the module path of the given source file. The difference from a file path
 * is that a module path does not have a file extension and is always in posix format.
 */
export function getSourceFileModulePath(sf: tsm.SourceFile): string {
  const moduleName = sf.getBaseNameWithoutExtension()
  /**
   * If an index.* module then drop it as Node will infer it
   */
  const moduleNameForPath = moduleName === 'index' ? '' : moduleName

  return path.posix.join(path.dirname(sf.getFilePath()), moduleNameForPath)
}

/**
 * Get the name of the type (or throw).
 *
 * First consider the alias symbol, if any. Then consider the symbol.
 *
 * If None present, then throw.
 */
export function getNameOrThrow(t: tsm.Type): string {
  const aliasSymbol = t.getAliasSymbol()

  if (aliasSymbol) return aliasSymbol.getName()

  const symbol = t.getSymbol()

  if (symbol) return symbol.getName()

  throw new Error(`The given type has no name:\n\n${renderDumpType(t)}`)
}

/**
 * Get the source file of the type (or throw).
 *
 * Type must have a symbol and at least one declaration.
 *
 * If not, throws.
 */
export function getSourceFileOrThrow(t: tsm.Type) {
  const symbol = getSymbolOrThrow(t)
  return getFirstDeclarationOrThrow(symbol).getSourceFile()
}

/**
 * Get the symbol of the type (or throw).
 *
 * First consider the alias symbol, if any. Then consider the symbol.
 *
 * If None present, then throw.
 */
export function getSymbolOrThrow(t: tsm.Type) {
  const symbol = getSymbol(t)

  if (symbol) return symbol

  throw new Error(`The given type has no symbol:\n\n${renderDumpType(t)}`)
}

/**
 * Get the symbol of the type.
 *
 * First consider the alias symbol, if any. Then consider the symbol.
 */
export function getSymbol(t: tsm.Type): null | tsm.Symbol {
  // It can happen that a type has no symbol but does have alias symbol, for
  // example union types.
  const aliasSymbol = t.getAliasSymbol()

  if (aliasSymbol) return aliasSymbol

  const symbol = t.getSymbol()

  if (symbol) return symbol

  return null
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

export function isTypeFromDependencies(t: tsm.Type): boolean {
  return getLocationKind(t) === 'dep'
}

export function isTypeFromApp(t: tsm.Type): boolean {
  return getLocationKind(t) === 'app'
}

export function isTypeFromInline(t: tsm.Type): boolean {
  return getLocationKind(t) === 'inline'
}

export function isTypeFromStandardLibrary(t: tsm.Type): boolean {
  return getLocationKind(t) === 'typeScriptStandardLibrary'
}

export function isTypeFromTypeScriptCore(t: tsm.Type): boolean {
  return getLocationKind(t) === 'typeScriptCore'
}

export function isTypeFromUnknown(t: tsm.Type): boolean {
  return getLocationKind(t) === 'unknown'
}

export function isCallable(t: tsm.Type): boolean {
  return t.getCallSignatures().length > 0
}

export function hasAlias(t: tsm.Type): boolean {
  return t.getAliasSymbol() !== undefined
}

/**
 * Get the type arguemnts this type passed to its generic, if any.
 *
 * If the type is an alias then looks for alias type arguments.
 *
 * Otherwise looks for interface/class type arguments.
 */
export function getTypeArgs(t: tsm.Type) {
  if (hasAlias(t)) {
    return t.getAliasTypeArguments()
  }

  return t.getTypeArguments()
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
