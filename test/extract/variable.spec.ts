it('extracts docs', () => {
  expect(
    ctx.given(
      `
        export const a = 1
      `
    )
  ).toMatchSnapshot()
})

it('extracts the type name', () => {
  const result = ctx.givenVariables(
    `
      export const a = 1
      export const b:number = 1
      export let c = 1
      export const d = 'foo'
      export let e = 'foo'
    `
  )
  expect(result.terms.map(d => d.type.name)).toEqual([
    '1',
    'number',
    'number',
    '"foo"',
    'string',
  ])
})

describe('jsdoc', () => {
  it('is null when no jsDoc is present', () => {
    expect(
      ctx.given(
        `
          export const a = 1
        `
      ).terms[0].jsDoc
    ).toBeNull()
  })

  it('extracts doc from a variable statement', () => {
    expect(
      ctx.given(
        `
          /**
           * primary
           */
          export const a = 1
        `
      ).terms[0].jsDoc!.primary
    ).toMatchSnapshot()
  })

  it('splits multiple jsDoc blocks by primary and additional (closest to code is primary)', () => {
    expect(
      ctx.given(
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
      ).terms[0].jsDoc
    ).toMatchSnapshot()
  })

  it('whitespace and comments between multiple jsDoc blocks are ignored', () => {
    expect(
      ctx.given(
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
      ).terms[0].jsDoc
    ).toMatchSnapshot()
  })

  it.todo('keeps malformed jsdoc in raw form')
})
