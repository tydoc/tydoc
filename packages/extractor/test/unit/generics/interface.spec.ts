describe('first type parameter', () => {
  it('the name', () => {
    const edd = ctx.extract2(/* ts */ `
      export interface Foo<T> {}
    `)
    expect(edd.getInterface('(a).Foo').typeParameters).toMatchSnapshot()
  })

  it('the primitive type default', () => {
    const edd = ctx.extract2(/* ts */ `
      export interface Foo<T = string> {}
    `)
    expect(edd.getInterface('(a).Foo').typeParameters).toMatchSnapshot()
  })

  it('the alias object type default is added to the type index and refererenced', () => {
    const edd = ctx.extract2(/* ts */ `
      export type Bar = { a: 1 }
      export interface Foo<T = Bar> {}
    `)
    expect(edd.getInterface('(a).Foo').typeParameters).toMatchSnapshot()
    expect(edd.getAlias('(a).Bar')).toMatchSnapshot()
  })

  it('the interface object type default is added to the type index and refererenced', () => {
    const edd = ctx.extract2(/* ts */ `
      export interface Bar { a: 1 }
      export interface Foo<T = Bar> {}
    `)
    expect(edd.getInterface('(a).Foo').typeParameters).toMatchSnapshot()
    expect(edd.getInterface('(a).Bar')).toMatchSnapshot()
  })
})
