let docs: any

it('can be self recursive', () => {
  const docs = ctx.extract(`
    export type A = { a: A }
  `)
  expect(docs).toMatchSnapshot()
})

it('can be recursive within inline objects', () => {
  expect(
    ctx.extract(`
      export type A = { a: { aa: B }}
      export type B = { b: { bb: A }}
    `)
  ).toMatchSnapshot()
})

describe('can be a named export', () => {
  beforeAll(() => {
    docs = ctx.extract(`export type A = {}`)
  })
  it('shows up as a named export', () => {
    expect(docs).toMatchObject({
      modules: [{ namedExports: [{ name: 'A' }] }],
    })
  })
  it('its type is added to the type index', () => {
    expect(docs).toMatchObject({
      typeIndex: { '("/a").A': { kind: 'alias' } },
    })
  })
  it('refs the type index entry', () => {
    expect(docs).toMatchObject({
      modules: [
        {
          namedExports: [{ type: { kind: 'typeIndexRef', link: '("/a").A' } }],
        },
      ],
    })
  })
})

it('can be a return type ref', () => {
  expect(
    ctx.extract(`
      export function fa (): A               { return undefined as any }
             type A = { b: B      }
      export type B = { a: string }
    `)
  ).toMatchSnapshot()
})

describe('can be a parameter type ref', () => {
  beforeAll(() => {
    // docs = ctx.extract(`
    //   export function withA (b: B)          { return undefined as any }
    //          type B = { a: A }
    //   export type A = { b: B }
    // `)
  })
  it.todo('type gets added to type indx')
  it.todo('parameter refs the type index')
})

describe('lists', () => {
  it.todo('can be a list')
})
