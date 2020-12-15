import * as tsm from 'ts-morph'

const exps = new tsm.Project({ useInMemoryFileSystem: true })
  .createSourceFile(
    'example.ts',
    `
      export type Generic<T> = {}
      export const foo: Generic<string> = {}
      export const bar: string = ''
    `
  )
  .getExportedDeclarations()

exps.get('Generic')[0].getType().getTargetType() //?
exps.get('foo')[0].getType().getTargetType() === exps.get('Generic')[0].getType() //?
exps.get('bar')[0].getType().getTargetType() === undefined //?
