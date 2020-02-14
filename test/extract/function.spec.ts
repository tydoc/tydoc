describe('can be a named export', () => {
  const docs = ctx.extract(`export function fa () {}`)
  it('shows up as a named export', () => {
    expect(docs.modules[0].namedExports).toMatchObject([
      { name: 'fa', type: { kind: 'function' } },
    ])
  })
  it('is not added to the type index', () => {
    expect(docs.typeIndex).toEqual({})
  })
})

describe('parameters', () => {
  it('names are documented', () => {
    const docs = ctx.extract(`export function fa (pa: boolean, pb: string) {}`)
    expect(docs).toMatchObject({
      modules: [
        {
          namedExports: [
            {
              type: {
                signatures: [{ parameters: [{ name: 'pa' }, { name: 'pb' }] }],
              },
            },
          ],
        },
      ],
    })
  })
  it('of primitive types are documented inline', () => {
    const docs = ctx.extract(`export function fa (pa: boolean, pb: string) {}`)
    expect(docs).toMatchObject({
      modules: [
        {
          namedExports: [
            {
              type: {
                signatures: [
                  {
                    parameters: [
                      { name: 'pa', type: { name: 'boolean' } },
                      { name: 'pb', type: { name: 'string' } },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    })
  })
  describe('refed interfaces', () => {
    const docs = ctx.extract(`
        export function fa (a: A) {}
        interface A {}
      `)
    it('cause the interface type to be added to the type index', () => {
      expect(docs).toMatchObject({
        typeIndex: {
          '("/a").A': {},
        },
      })
    })
    it('ref the interface in the type index', () => {
      expect(docs).toMatchObject({
        modules: [
          {
            namedExports: [
              {
                type: {
                  signatures: [
                    { parameters: [{ type: { name: '("/a").A' } }] },
                  ],
                },
              },
            ],
          },
        ],
      })
    })
    it('inline interfaces are documented inline', () => {
      const docs = ctx.extract(
        `export function fa (pa: { a: boolean, b: {} }) {}`
      )
      expect(docs).toMatchObject({
        modules: [
          {
            namedExports: [
              {
                type: {
                  signatures: [
                    {
                      parameters: [
                        {
                          name: 'pa',
                          type: {
                            properties: [
                              {
                                name: 'a',
                                type: { kind: 'primitive', name: 'boolean' },
                              },
                              {
                                name: 'b',
                                type: { kind: 'object', properties: [] },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      })
    })
    it('refed/inline mixes are handled accordingly', () => {
      const docs = ctx.extract(
        `
          export function fa (pa: { a: { a2: A2 }, b: { b2: string } }) {}
          interface A2 {}
          `
      )
      expect(docs).toMatchObject({
        typeIndex: {
          '("/a").A2': {},
        },
        modules: [
          {
            namedExports: [
              {
                type: {
                  signatures: [
                    {
                      parameters: [
                        {
                          name: 'pa',
                          type: {
                            properties: [
                              {
                                name: 'a',
                                type: {
                                  properties: [
                                    {
                                      name: 'a2',
                                      type: {
                                        kind: 'typeref',
                                        name: '("/a").A2',
                                      },
                                    },
                                  ],
                                },
                              },
                              {
                                name: 'b',
                                type: {
                                  properties: [
                                    { name: 'b2', type: { name: 'string' } },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      })
    })
  })
})

describe('return', () => {
  it('if no return type specified, assumes void', () => {
    const docs = ctx.extract(`export function fa () {}`)
    expect(docs.modules[0].namedExports).toMatchObject([
      {
        type: {
          signatures: [{ return: { kind: 'primitive', name: 'void' } }],
        },
      },
    ])
  })
  it('if inlining structure, does not add to the type index', () => {
    const docs = ctx.extract(`
      export function fa (): { a: string } {
        return { a: '' }
      }
    `)
    expect(docs.typeIndex).toEqual({})
  })
  it('if refing an interface, brings interface into the type index', () => {
    const docs = ctx.extract(`
        export function fa (): A {
          return {}
        }
        interface A {}
      `)
    expect(docs).toMatchObject({
      typeIndex: { '("/a").A': {} },
      modules: [
        {
          namedExports: [
            {
              type: {
                signatures: [{ return: { kind: 'typeref', name: '("/a").A' } }],
              },
            },
          ],
        },
      ],
    })
  })
  it.todo('if no return type specified, uses the type inferred by TS')
})

describe('when type-lifted by TS typeof then treated as if inline', () => {
  it.todo('todo')
})

describe('overloads ', () => {
  it.todo('todo')
})
