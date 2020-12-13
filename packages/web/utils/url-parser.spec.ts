import { parseUrl } from './url-parser'

describe('url-parser', () => {
  it('should work', () => {
    const result = parseUrl('test')
    expect(result).toEqual('test')
  })
})
