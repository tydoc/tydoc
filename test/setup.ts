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
    markdown(source: string) {
      return jsde.renderMarkdown(api.given(source))
    },
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
        hybrids: any
        length: number
      }
    },
  }

  return api
}

const ctxx = createContextt()

declare global {
  export const createContext: typeof createContextt
  export const ctx: typeof ctxx
  namespace NodeJS {
    interface Global {
      createContext: typeof createContextt
      ctx: typeof ctxx
    }
  }
}

Object.assign(global, {
  createContext: createContextt,
  ctx: ctxx,
})
