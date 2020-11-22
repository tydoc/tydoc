import * as tsm from 'ts-morph'

const project = new tsm.Project({
  addFilesFromTsConfig: false,
  useInMemoryFileSystem: true,
  skipLoadingLibFiles: true,
})
const sourceFile = project.createSourceFile(
  'playground.ts',
  `
  `
)

const nodes = sourceFile.getChildren()
nodes.length //?
const node = nodes[0]
node.getKindName() //?
node.getText() //?
node.getLeadingCommentRanges().map((cr) => cr.getText())[0] //?
node.getChildren().length //?
node.getChildren()[0].getKindName() //?
node.getChildren()[1].getKindName() //?

// sourceFile.getChildren().forEach(n => {
//   n.getKindName() //?
//   n.getText() //?
//   n.getFullText() //?
//   n.getLeadingCommentRanges().map(cr => {
//     cr.getKind() //?
//     cr.getText() //?
//     cr.compilerObject.pos //?
//     cr.getEnd() //?
//     cr.getPos() //?
//     cr.getPos() //?
//   }) //?
//   if (n.getKindName() === 'EndOfFileToken') {
//     n.getFullText() //?
//   }
// })
