import { parseUrl, ParsedPath } from './url-parser'

describe('url-parser', () => {
  it('should parse /npm/setset', () => {
    const result = parseUrl('/npm/setset')
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual<ParsedPath>({
      source: 'npm',
      org: null,
      package: 'setset',
      version: null,
      tag: null,
      module: null,
    })
  })

  it('should parse /npm/setset/v/1.0.0', () => {
    const result = parseUrl('/npm/setset/v/1.0.0')
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual<ParsedPath>({
      source: 'npm',
      org: null,
      package: 'setset',
      version: '1.0.0',
      tag: null,
      module: null,
    })
  })

  it('should parse /npm/setset/t/dev', () => {
    const result = parseUrl('/npm/setset/t/dev')
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual<ParsedPath>({
      source: 'npm',
      org: null,
      package: 'setset',
      version: null,
      tag: 'dev',
      module: null,
    })
  })

  it('should parse /npm/@prisma/client', () => {
    const result = parseUrl('/npm/@prisma/client')
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual<ParsedPath>({
      source: 'npm',
      org: '@prisma',
      package: 'client',
      version: null,
      tag: null,
      module: null,
    })
  })

  it('should parse /npm/@prisma/client/v/1.0.0', () => {
    const result = parseUrl('/npm/@prisma/client/v/1.0.0')
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual<ParsedPath>({
      source: 'npm',
      org: '@prisma',
      package: 'client',
      version: '1.0.0',
      tag: null,
      module: null,
    })
  })

  it('should parse /npm/@prisma/client/t/dev', () => {
    const result = parseUrl('/npm/@prisma/client/t/dev')
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual<ParsedPath>({
      source: 'npm',
      org: '@prisma',
      package: 'client',
      version: null,
      tag: 'dev',
      module: null,
    })
  })

  it('should parse /npm/@effect-ts/core/t/dev/m/Classic/Either', () => {
    const result = parseUrl('/npm/@effect-ts/core/t/dev/m/Classic/Either')
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual<ParsedPath>({
      source: 'npm',
      org: '@effect-ts',
      package: 'core',
      version: null,
      tag: 'dev',
      module: 'Classic/Either',
    })
  })
})
