export type Index<T> = Record<string, T>

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
