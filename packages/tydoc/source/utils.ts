/**
 * Wrap a value in an array if it is not already an array.
 */
export function arrayify<T>(x: T): T extends Array<any> ? T : T[] {
  return Array.isArray(x) ? x : ([x] as any)
}
