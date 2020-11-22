import * as tsm from 'ts-morph'
import { casesHandled } from '../../utils'

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
