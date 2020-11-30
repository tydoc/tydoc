export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)

  if (res.headers.get('content-type')?.includes('application/json')) {
    return res.json()
  }

  const text = await res.text()

  throw new Error(text)
}
