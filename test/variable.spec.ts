import '../src'
const ctx = createContext()

describe('jsdoc', () => {
  it('is null when no jsDoc is present', () => {
    expect(
      ctx.extractDocsAndTypesFromModuleAtPath(
        `
          export const a = 1
        `
      )[0].jsDoc
    ).toBeNull()
  })

  it('extracts doc from a variable statement', () => {
    expect(
      ctx.extractDocsAndTypesFromModuleAtPath(
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
      ctx.extractDocsAndTypesFromModuleAtPath(
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
      ctx.extractDocsAndTypesFromModuleAtPath(
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
