import createDebug from 'debug'
import * as path from 'path'
import * as tsm from 'ts-morph'
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
