import * as tsm from 'ts-morph'

const project = new tsm.Project({
  useInMemoryFileSystem: true,
})

const sourceFile = project.createSourceFile(
  'a.ts',
  `
    type SettingsData = Readonly<{}>
    
    export type Settings = {
      original: SettingsData
  }
  `
)

// prettier-ignore
sourceFile.getExportedDeclarations().forEach(d => {
  let t = d[0].getType()
  t.getText() //?
  t.getProperties().forEach(p => {
    const d = p.getDeclarations()[0]
    d.getText() //?
    d.getKindName() //?
    if (tsm.Node.isPropertySignature(d)) {
      d.getStructure().name //?
      d.getStructure().type //?
      d.getTypeNode() instanceof tsm.TypeReferenceNode //?
      d.getTypeNode().getKindName() //?
      d.getTypeNode().getText() //?
      d.getTypeNode().getType().getText() //?
    }
    d.getSymbol().getName() //?
    d.getType().getText() //?
    d.getType().getSymbol().getName() //?
    d.getType().getSymbol().getName() //?
    d.getType().getAliasSymbol().getName() //?
    // p.getDeclaredType(p.getDeclarations()[0].getType().getSymbol())
  })
})
