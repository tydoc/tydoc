import { fromPublished } from '../../source'

test('can get EDD from "sponsorsme" package', async () => {
  const epd = await fromPublished({
    packageName: 'sponsorsme',
    packageVersion: '1.0.1',
  })
  expect(epd.docs).toMatchSnapshot()
})

test('can get EDD from "execa" package', async () => {
  const epd = await fromPublished({
    packageName: 'execa',
    packageVersion: '4.1.0',
  })
  expect(epd.docs).toMatchSnapshot()
})
