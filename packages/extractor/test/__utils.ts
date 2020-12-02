export function replaceInObjectValues<T>(obj: T, searchTerm: string, replacementTerm: string): T {
  // hacky implementation, would replace keys too etc.
  return JSON.parse(replaceAll(JSON.stringify(obj), searchTerm, replacementTerm))
}

export function replaceAll(content: string, searchTerm: string, repalcement: string) {
  let contentWithReplacements = content
  while (contentWithReplacements.includes(searchTerm)) {
    contentWithReplacements = contentWithReplacements.replace(searchTerm, repalcement)
  }
  return contentWithReplacements
}
