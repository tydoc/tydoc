import * as fs from 'fs-jetpack'
import { fromPublished } from '../src/api/extractor/extract'
import { replaceInObjectValues } from './__utils'

test('can get EDD from "sponsorsme" package', async () => {
  const edd = await doFromPublished('sponsorsme', '1.0.1')
  expect(edd).toMatchSnapshot()
})

test('can get EDD from "execa" package', async () => {
  const edd = await doFromPublished('execa', '4.1.0')
  expect(edd).toMatchSnapshot()
})

async function doFromPublished(packageName: string, packageVersion: string) {
  const tmp = fs.tmpDir()
  const edd = await fromPublished({
    packageName,
    packageVersion,
    downloadDir: tmp.cwd(),
  })
  const eddWithStaticPaths = replaceInObjectValues(edd, tmp.cwd(), '/__root__')
  return eddWithStaticPaths
}
