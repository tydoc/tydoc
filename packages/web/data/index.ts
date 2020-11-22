import * as tydoc from 'maticzav-tydoc'
import * as tsm from 'ts-morph'
import * as path from 'path'
import * as fs from 'fs-extra'

const pkg = path.resolve(__dirname, './package/ink')

const project = new tsm.Project({
  tsConfigFilePath: path.resolve(pkg, './tsconfig.json'),
  compilerOptions: {
    skipLibCheck: true,
  },
  useInMemoryFileSystem: true,
})

/* Extract Package Information */

const spec = tydoc.fromProject({
  entrypoints: ['src/index'],
  packageMainEntrypoint:
    'schickling/code/tydoc-web/data/package/ink/build/index.js',
  project: project as any,
  prjDir: pkg,
  readSettingsFromJSON: true,
})

console.log(spec.typeIndex)
