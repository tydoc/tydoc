it('union types are extracted', () => {
  expect(
    ctx.extract(`
      export type A = 1 | 2
    `)
  ).toMatchSnapshot()
})

describe('if union members share a common property name then union is considered a discriminant union', () => {
  it('alias object', () => {
    expect(
      ctx.extract(`
        export type A = B | C
        type B = { b: 2; kind: 'B' }
        type C = { c: 3; kind: 'C' }
      `)
    ).toMatchSnapshot()
  })

  it('interface', () => {
    expect(
      ctx.extract(`
        export type A = B | C
        interface B { b: 2; kind: 'B' }
        interface C { c: 3; kind: 'C' }
      `)
    ).toMatchSnapshot()
  })
})

describe('if union members share multiple common properties then all are captured as discriminants', () => {
  it('alias object', () => {
    expect(
      ctx.extract(`
        export type A = B | C
        type B = { b: 2; kind1: 'B1'; kind2: 'B2' }
        type C = { c: 3; kind1: 'C1'; kind2: 'C2' }
      `)
    ).toMatchSnapshot()
  })

  it('interface', () => {
    expect(
      ctx.extract(`
        export type A = B | C
        interface B { b: 2; kind1: 'B1'; kind2: 'B2' }
        interface C { c: 3; kind1: 'C1'; kind2: 'C2' }
      `)
    ).toMatchSnapshot()
  })
})
