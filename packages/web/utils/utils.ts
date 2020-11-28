export async function getJson<T>(url: string): Promise<T> {
  return fetch(url).then((_) => _.json())
}
