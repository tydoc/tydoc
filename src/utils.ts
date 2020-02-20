import * as tsm from 'ts-morph'
import { inspect } from 'util'

export type ArrayOrVarg<T> = T[] | [T[]]

export type MaybeArray<T> = T | T[]

export type Index<T> = Record<string, T>

export type Thunk<T> = () => T

/**
 * Use this to make assertion at end of if-else chain that all members of a
 * union have been accounted for.
 */
export function casesHandled(x: never): never {
  throw new Error(`A case was not handled for value: ${x}`)
}

/**
 * Quick and dirty logging. Not for production.
 */
export function dump(...args: any[]) {
  const argsInspected = args.map(a => inspect(a, { depth: 20 }))
  console.error(...argsInspected)
}

export function dumpType(t: tsm.Type): void {
  // prettier-ignore
  console.error(`
    t.getText()                                      = ${t.getText()}
    t.getSymbol()?.getName()                         = ${t.getSymbol()?.getName()}
    t.getAliasSymbol()?.getName()                    = ${t.getAliasSymbol()?.getName()}
    t.getSymbol()?.getDeclarations()?.[0]?.getText() = ${t.getSymbol()?.getDeclarations()?.[0]?.getText()}
  `)
}
