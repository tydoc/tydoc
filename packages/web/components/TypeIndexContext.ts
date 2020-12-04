import { Doc } from '@tydoc/extractor/types'
import React from 'react'

/**
 * TypeIndex provides a list of all types used in package.
 */
export const TypeIndexContext = React.createContext<Doc.TypeIndex>({})

/**
 * Utility hook to use TypeIndexContext.
 */
export function useTypeIndex() {
  let typeIndex = React.useContext(TypeIndexContext)
  return typeIndex
}
