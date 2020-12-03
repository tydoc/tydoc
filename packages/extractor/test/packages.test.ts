import { fromPublished } from '../src/api/extractor/extract'

test('can get EDD from "sponsorsme" package', async () => {
  const edd = await fromPublished({
    packageName: 'sponsorsme',
    packageVersion: '1.0.1',
  })
  expect(edd).toMatchSnapshot()
})

test('can get EDD from "execa" package', async () => {
  const edd = await fromPublished({
    packageName: 'execa',
    packageVersion: '4.1.0',
  })
  expect(edd).toMatchSnapshot()
})
