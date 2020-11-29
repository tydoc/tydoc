
function normalizeTmpDir(str: string) {
  return str.replace(/\/tmp\/([a-z0-9]+)\//g, '/tmp/dir/')
}
const serializer = {
  test(value: any) {
    return typeof value === 'string' || value instanceof Error
  },
  serialize(value: any) {
    const message =
      typeof value === 'string'
        ? value
        : value instanceof Error
        ? value.message
        : ''
    return normalizeTmpDir(message)
  },
}

module.exports = serializer
