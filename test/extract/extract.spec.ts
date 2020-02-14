it.todo('does not try to document builtins')
it.todo('documents types wrapped in arrays')
it.todo('documents callable interfaces')
it.todo('documents type aliases')

it('when there is an invalid type reference an error is thrown', () => {
  expect(() => {
    ctx.extract('export interface A { b: B }')
  }).toThrowErrorMatchingInlineSnapshot(`
    "[96ma.ts[0m:[93m2[0m:[93m6[0m - [91merror[0m[90m TS2304: [0mCannot find name 'B'.

    [7m2[0m   b: B;
    [7m [0m [91m     ~[0m
    "
  `)
})
