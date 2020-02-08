import * as fsjp from 'fs-jetpack'
import * as Prettier from 'prettier'
import * as jsde from '../src'

function createContextt() {
  const fs = fsjp.cwd(
    '/tmp/' +
      Math.random()
        .toString()
        .slice(2)
  )

  function extractDocsFromModuleAtPath(
    source: string
  ): ReturnType<typeof jsde.extractDocsFromModuleAtPath> {
    const filePath = fs.path('testFile.ts')
    fs.write(filePath, Prettier.format(source, { parser: 'typescript' }))
    const result = jsde.extractDocsFromModuleAtPath(filePath)
    return JSON.parse(
      JSON.stringify(result).replace(
        /filePath":"[^"]*"/g,
        'filePath":"__dynamic__"'
      )
    )
  }

  return {
    fs,
    extractDocsFromModuleAtPath,
    extractVariables(source: string) {
      return extractDocsFromModuleAtPath(source) as jsde.DocVariable[]
    },
  }
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
