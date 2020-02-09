import * as Prettier from 'prettier'
import * as tsm from 'ts-morph'
import * as jsde from '../src'

function createContextt() {
  const project = new tsm.Project({
    addFilesFromTsConfig: false,
    useInMemoryFileSystem: true,
    skipLoadingLibFiles: true,
  })

  const api = {
    given(source: string) {
      const sourceFormatted = Prettier.format(source, { parser: 'typescript' })
      const sourceFile = project.createSourceFile('test.ts', sourceFormatted, {
        overwrite: true,
      })
      return jsde.extractDocsFromModule(sourceFile)
    },
    givenVariables(source: string) {
      return api.given(source) as {
        terms: jsde.DocVariable[]
        types: any
        terms_and_types: any
      }
    },
  }

  return api
}

declare global {
  export const createContext: typeof createContextt
  namespace NodeJS {
    interface Global {
      createContext: typeof createContextt
    }
  }
}

global.createContext = createContextt
