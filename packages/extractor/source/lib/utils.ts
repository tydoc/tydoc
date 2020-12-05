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

type CustomDumper = (...args: any[]) => boolean

declare global {
  function registerDumper(detector: CustomDumper): void
}

const registeredCustomDumpers: CustomDumper[] = []

global.registerDumper = (customDumper: CustomDumper) => {
  registeredCustomDumpers.push(customDumper)
}

/**
 * Quick and dirty logging. Not for production.
 */
export function dump(...args: any[]) {
  const didDump = registeredCustomDumpers.find((customDumper) => {
    return customDumper(...args)
  })

  if (didDump) {
    return
  }

  const argsInspected = args.map((a) => inspect(a, { depth: 20 }))
  console.error(...argsInspected)
}

export function indexBy<T extends object>(items: T[], property: keyof T | ((item: T) => string)): Index<T> {
  const index = {} as any
  for (const item of items) {
    if (typeof property === 'function') {
      index[property(item)] = item
    } else {
      index[item[property]] = item
    }
  }
  return index
}

/**
 * Wrap a value in an array if it is not already an array.
 */
export function arrayify<T>(x: T): T extends Array<any> ? T : T[] {
  return Array.isArray(x) ? x : ([x] as any)
}

export function lookupOrThrow<T>(index: Index<T>, key: string): T {
  const val = index[key]

  if (val === undefined) {
    const keyCount = Object.keys(index).length
    throw new Error(
      `Failed to lookup "${key}" in the given index (${keyCount} keys) because there was no such key.`
    )
  }

  return val
}
