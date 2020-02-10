it('extracts docs', () => {
  expect(
    ctx.given(
      `
        export function a() {}
        export function b(a:boolean) {}
        export function c(a:string): number {}
      `
    )
  ).toMatchSnapshot()
})

it('treats a variable declaration initialized to a function as a function', () => {
  expect(
    ctx.given(`
      export const foo = function () {}
    `)
  ).toMatchSnapshot()
})

it('treats a variable declaration initialized to an arrow function as a function', () => {
  expect(
    ctx.given(`
      export const foo = () => {}
    `)
  ).toMatchSnapshot()
})

it('if function expression given name different than variable, is ignored', () => {
  expect(
    ctx.given(`
      export const foo = function foo2 () {}
    `).terms[0].name
  ).toEqual('foo')
})

describe('jsdoc', () => {
  it('is null when no jsDoc is present', () => {
    expect(
      ctx.given(
        `
          export function a() {}
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
          export function a() {}
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
          export function a() {}
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
          export function a() {}
        `
      ).terms[0].jsDoc
    ).toMatchSnapshot()
  })

  it.todo('keeps malformed jsdoc in raw form')
})
