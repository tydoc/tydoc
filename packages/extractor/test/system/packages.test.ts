import { fromPublished } from '../../source'

test('can get EPD from "sponsorsme" package', async () => {
  const epd = await fromPublished({
    packageName: 'sponsorsme',
    packageVersion: '1.0.1',
  })
  expect(epd).toMatchSnapshot()
})

test('can get EPD from "execa" package', async () => {
  const epd = await fromPublished({
    packageName: 'execa',
    packageVersion: '4.1.0',
  })
  expect(epd).toMatchSnapshot()
})
