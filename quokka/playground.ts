import * as tsm from 'ts-morph'

const project = new tsm.Project({
  addFilesFromTsConfig: false,
  useInMemoryFileSystem: true,
  skipLoadingLibFiles: true,
})
const sourceFile = project.createSourceFile(
  'playground.ts',
  `
    // bee
    export type a = {
      /**
       * flip
       */
      a: string,
      b: number
      c: C
    }
    type C = {
      d: number,
      e: string
    }
  `
)

// sourceFile.print()
// sourceFile.getExportedDeclarations()

const typeIndex = {}

for (const [k, vs] of sourceFile.getExportedDeclarations()) {
  const v = vs[0]
  v.getText() //?
  v.getFullText() //?
  v.getType()
    .getProperties()
    .map(p => p.getName()) //?
  v.getType()
    .getProperties()
    .map(p => {
      // todo if not scalar then add to type index
      const propSig = p.getDeclarations()[0]
      let jsDoc = null
      if (propSig instanceof tsm.PropertySignature) {
        jsDoc = propSig.getJsDocs() //?
      }
      const fieldName = p.getName()
      const fieldType = p.getTypeAtLocation(v)
      return {
        name: fieldName,
        jsDoc,
        // jsDoc: fieldType.js,
        type: {
          name: fieldType.getText(),
          isPrimitive: !fieldType.isObject(),
        },
      }
    }) //?
}
