it('prop refing another interface causes other to be in the type index', () => {
  const docs = ctx.extract(`
        export interface A { b: B }
        interface B {}
      `)
  expect(docs).toMatchObject({
    typeIndex: {
      '("/a").A': {},
      '("/a").B': {},
    },
  })
})
it('prop refing another interface is linked to other with a type index ref', () => {
  const docs = ctx.extract(`
        export interface A { b: B }
        interface B {}
      `)
  expect(docs).toMatchObject({
    typeIndex: {
      '("/a").A': {
        props: [
          { name: 'b', type: { kind: 'typeIndexRef', link: '("/a").B' } },
        ],
      },
    },
  })
})
it('prop inlining structure causes strcture to be documented inline', () => {
  const docs = ctx.extract(`
      export interface A { b: { c: boolean }}
    `)
  expect(docs).toMatchObject({
    typeIndex: {
      '("/a").A': {
        props: [
          {
            name: 'b',
            type: { props: [{ name: 'c', type: { type: 'boolean' } }] },
          },
        ],
      },
    },
  })
})
describe('inline structure', () => {
  const docs = ctx.extract(`
      export interface A { b: { c: boolean }}
    `)
  it('is considered inline and of kind object (not interface)', () => {
    expect(docs).toMatchObject({
      typeIndex: {
        '("/a").A': {
          props: [{ name: 'b', type: { kind: 'object', props: [{}] } }],
        },
      },
    })
  })
  it('does not register in the type index', () => {
    expect(Object.keys(docs.typeIndex)).toEqual(['("/a").A'])
  })
})

describe('can be a named export', () => {
  it('shows up as a named export', () => {
    const docs = ctx.extract(`export interface A {}`)
    expect(docs.modules[0].namedExports).toMatchObject([{ name: 'A' }])
  })
  it('has its type added to the type index', () => {
    const docs = ctx.extract(`export interface Foo {}`)
    expect(docs).toMatchObject({ typeIndex: { '("/a").Foo': {} } })
  })
  it('references the type index', () => {
    const docs = ctx.extract(`export interface Foo {}`)
    expect(docs.modules[0].namedExports).toMatchObject([
      { name: 'Foo', type: { kind: 'typeIndexRef', link: '("/a").Foo' } },
    ])
  })
})
