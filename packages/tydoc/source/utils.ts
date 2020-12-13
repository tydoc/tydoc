/**
 * Wrap a value in an array if it is not already an array.
 */
export function arrayify<T>(x: T): T extends Array<any> ? T : T[] {
  return Array.isArray(x) ? x : ([x] as any)
}

import * as path from 'path'

export function absolutify(rootDir: string, somePath: string): string {
  if (!path.isAbsolute(rootDir)) {
    throw new Error(`Cannot absolutify becuase the given rootDir is itself not absolute: ${rootDir}`)
  }
  if (path.isAbsolute(somePath)) {
    return somePath
  }
  return path.join(rootDir, somePath)
}
