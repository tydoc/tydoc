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
    markdown(opts: jsde.RenderMarkdownOptions, ...sources: string[]) {
      return jsde.renderMarkdown(api.given(...sources), opts)
    },
    /**
     * Pass a set of synthetic source files. The first source is considered the
     * entrypoint. Files are named by alphabet letters, starting from "a",
     * incrementing toward "z".
     */
    given(...sources: string[]) {
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      const sourcesFormatted = sources.map(source =>
        Prettier.format(source, { parser: 'typescript' })
      )
      const sourceFiles = sourcesFormatted
        .map(source => [letters.shift()!, source])
        .map(([moduleName, source]) =>
          project.createSourceFile(`${moduleName}.ts`, source, {
            overwrite: true,
          })
        )
      const entrypoint = sourceFiles[0]
      return jsde.extractDocsFromModule(entrypoint)
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
