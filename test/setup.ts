import * as Prettier from 'prettier'
import * as tsm from 'ts-morph'
import * as jsde from '../src'

interface SourceSpec {
  anEntrypoint: boolean
  content: string
}

function createContextt() {
  const project = new tsm.Project({
    compilerOptions: {
      rootDir: './src',
      outDir: './dist',
    },
    addFilesFromTsConfig: false,
    useInMemoryFileSystem: true,
  })

  const api = {
    markdown(
      opts: jsde.RenderMarkdownOptions,
      ...sources: (string | SourceSpec)[]
    ) {
      return jsde.renderMarkdown(api.extract(...sources), opts)
    },
    /**
     * Pass a set of synthetic source files. The first source is considered the
     * entrypoint. Files are named by alphabet letters, starting from "a",
     * incrementing toward "z".
     */
    extract(...sources: (string | SourceSpec)[]) {
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      const entrypoints = ['a']
      for (const source of sources) {
        const content = typeof source === 'string' ? source : source.content
        const contentPretty = Prettier.format(content, { parser: 'typescript' })
        const moduleName = letters.shift()!
        if (typeof source === 'object' && source.anEntrypoint) {
          entrypoints.push(moduleName)
        }
        project.createSourceFile(`./src/${moduleName}.ts`, contentPretty, {
          overwrite: true,
        })
      }
      return jsde.fromProject({
        entrypoints: entrypoints,
        project: project,
        prjDir: '/',
        readSettingsFromJSON: false,
        packageMainEntrypoint: project.compilerOptions.get().outDir + '/a.js',
      })
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
