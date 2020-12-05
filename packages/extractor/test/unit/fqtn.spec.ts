describe('two different type aliases named the same co-exist in the type index via their differing FQTN', () => {
  it('types in shallow entrypoint modules ', () => {
    expect(
      ctx.extract(
        `
        import * as A from './b'
        import * as B from './c'

        export const a:A.Foo = { a: 1 }
        export const b:B.Foo = { b: 2 }
      `,
        `
        export type Foo = { a: 1 }
      `,
        `
        export type Foo = { b: 2 }
      `
      )
    ).toMatchObject({
      typeIndex: {
        '(b).Foo': {},
        '(c).Foo': {},
      },
    })
  })

  it('types in deep entrypoint modules', () => {
    expect(
      ctx.extract(
        `
        import * as A from './foo/bar/qux/b'
        import * as B from './tim/buk/too/c'

        export const a:A.Foo = { b: 2 }
        export const b:B.Foo = { c: 3 }
      `,
        {
          modulePathUnderSource: 'foo/bar/qux',
          content: 'export type Foo = { b: 2 }',
        },
        {
          modulePathUnderSource: 'tim/buk/too',
          content: 'export type Foo = { c: 3 }',
        }
      )
    ).toMatchObject({
      typeIndex: {
        '(foo/bar/qux/b).Foo': {},
        '(tim/buk/too/c).Foo': {},
      },
    })
  })
  it('types in shallow non-entrypoint modules', () => {
    expect(
      ctx.extract(
        `
        import * as A from './foo/bar/qux/b'
        import * as B from './tim/buk/too/c'

        export const a:A.Foo = { b: 2 }
        export const b:B.Foo = { c: 3 }
      `,
        {
          isEntrypoint: false,
          modulePathUnderSource: 'foo/bar/qux',
          content: 'export type Foo = { b: 2 }',
        },
        {
          isEntrypoint: false,
          modulePathUnderSource: 'tim/buk/too',
          content: 'export type Foo = { c: 3 }',
        }
      )
    ).toMatchObject({
      typeIndex: {
        '(foo/bar/qux/b).Foo': {},
        '(tim/buk/too/c).Foo': {},
      },
    })
  })
})
