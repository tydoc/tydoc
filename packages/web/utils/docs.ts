import { fromPublished } from '@tydoc/extractor'
import { Doc } from '@tydoc/extractor/types'
import { NPM } from 'web/utils/types'
import { getJson } from 'web/utils/utils'

export type SearchResponseData = {
  docPackage: Doc.DocPackage
  npmInfo: NPM.Response
}


export async function fetchDocPackage({
  packageName,
}: {
  packageName: string
}): Promise<SearchResponseData> {
  const npmInfo = await getJson<NPM.Response>(
    `https://registry.npmjs.org/${packageName}`,
  )

  const [, ghOwner, ghName] = npmInfo?.repository?.url.match(
    /github\.com\/(.+)\/(.+)\.git$/,
  )!

  const github = `https://github.com/${ghOwner}/${ghName}`
  const docPackage = await fromPublished({
    packageName: packageName,
  })

  return { docPackage, npmInfo }
}
