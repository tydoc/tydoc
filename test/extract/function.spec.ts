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

it('signature text does not render param types in fully qualified style (import("...").<...>)', () => {
  expect(
    ctx.given(
      `
        import { A } from './b'
        export function foo (a: A) {}
      `,
      `
        export interface A {}
      `
    )
  ).toMatchSnapshot()
})

it.todo('sig param type from dep is is qualified if option set so')
it.todo(
  'sig param type in qualified style shows path relative to package root basd on real package main setting'
)
it.todo(
  "sig param type in qualified style that is of dep's main module shows only the package name"
)
it.todo(
  'externally visible types from deps make those types part of the api type index'
)
it.todo(
  'if two types from different modules would conflict in the type index then they are qualified by module name pascal-case named'
)

it('signature text does render param types in fully qualified style (import("...").<...>) for types from dependencies', () => {
  expect(
    ctx.given(
      `
        import { SourceFile } from 'ts-morph'
        export function foo (a: SourceFile) {}
      `
    )
  ).toMatchSnapshot()
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
