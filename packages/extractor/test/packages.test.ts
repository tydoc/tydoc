import * as fs from 'fs-jetpack'
import { fromPublished } from '../src/api/extractor/extract'
import { replaceInObjectValues } from './__utils'

test('can get EDD from "sponsorsme" package', async () => {
  const edd = await foo('sponsorsme')
  expect(edd).toMatchSnapshot()
})

test('can get EDD from "execa" package', async () => {
  const edd = await foo('execa')
  expect(edd).toMatchSnapshot()
})

async function foo(packageName: string) {
  const tmp = fs.tmpDir()
  const edd = await fromPublished({
    packageName: packageName,
    downloadDir: tmp.cwd(),
  })
  const eddWithStaticPaths = replaceInObjectValues(edd, tmp.cwd(), '/__root__')
  return eddWithStaticPaths
}
