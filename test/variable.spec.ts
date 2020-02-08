const ctx = createContext()

it('extracts docs', () => {
  expect(
    ctx.extractDocsFromModuleAtPath(
      `
        export const a = 1
      `
    )
  ).toMatchSnapshot()
})

it('extracts the type name', () => {
  const result = ctx.extractVariables(
    `
      export const a = 1
      export const b:number = 1
      export let c = 1
      export const d = 'foo'
      export let e = 'foo'
    `
  )
  expect(result.shift()!.type.name).toEqual('1')
  expect(result.shift()!.type.name).toEqual('number')
  expect(result.shift()!.type.name).toEqual('number')
  expect(result.shift()!.type.name).toEqual('"foo"')
  expect(result.shift()!.type.name).toEqual('string')
})

describe('jsdoc', () => {
  it('is null when no jsDoc is present', () => {
    expect(
      ctx.extractDocsFromModuleAtPath(
        `
          export const a = 1
        `
      )[0].jsDoc
    ).toBeNull()
  })

  it('extracts doc from a variable statement', () => {
    expect(
      ctx.extractDocsFromModuleAtPath(
        `
          /**
           * primary
           */
          export const a = 1
        `
      )[0].jsDoc!.primary
    ).toMatchSnapshot()
  })

  it('splits multiple jsDoc blocks by primary and additional (closest to code is primary)', () => {
    expect(
      ctx.extractDocsFromModuleAtPath(
        `
          /**
           * additional 2
           */
          /**
           * additional 1
           */
          /**
           * primary
           */
          export const a = 1
        `
      )[0].jsDoc
    ).toMatchSnapshot()
  })

  it('whitespace and comments between multiple jsDoc blocks are ignored', () => {
    expect(
      ctx.extractDocsFromModuleAtPath(
        `
          /**
           * additional 2
           */

           // boo 2

          /**
           * additional 1
           */

           // boo 1

          /**
           * primary
           */
          export const a = 1
        `
      )[0].jsDoc
    ).toMatchSnapshot()
  })

  it.todo('keeps malformed jsdoc in raw form')
})
