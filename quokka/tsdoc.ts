import * as TSDoc from '@microsoft/tsdoc'
import { DocExcerpt, DocNode } from '@microsoft/tsdoc'

// https://github.com/microsoft/tsdoc/blob/master/api-demo/src/Formatter.ts
class Formatter {
  public static renderDocNode(docNode: DocNode): string {
    let result: string = ''
    if (docNode) {
      if (docNode instanceof DocExcerpt) {
        result += docNode.content.toString()
      }
      for (const childNode of docNode.getChildNodes()) {
        result += Formatter.renderDocNode(childNode)
      }
    }
    return result
  }

  public static renderDocNodes(docNodes: ReadonlyArray<DocNode>): string {
    let result: string = ''
    for (const docNode of docNodes) {
      result += Formatter.renderDocNode(docNode)
    }
    return result
  }
}

let source: string
let tsdocParser: TSDoc.TSDocParser
let content: TSDoc.DocComment
let parserContext: TSDoc.ParserContext

source = `
  /**
   *  ...some summary...
   * 
   * @remarks
   * 
   * ...some remarks...
   * 
   * @param foo -
   * 
   * ...about foo...
   * 
   * @param bar -
   * 
   * ...about bar...
   * 
   * @returns ...
   * 
   * @deprecated ...do not use this...
   * 
   * @privateRemarks ...internal eyes only...
   * 
   * @beta
   * @alpha
   */
`

tsdocParser = new TSDoc.TSDocParser()
parserContext = tsdocParser.parseString(source)
content = parserContext.docComment

parserContext.log.messages.map(m => [m.messageId, m.text]) //?
// content.emitAsTsdoc() //?
// content.summarySection //?

content.kind //?
content.modifierTagSet.isBeta() //?
content.modifierTagSet.isAlpha() //?
Formatter.renderDocNode(content.summarySection) //?
Formatter.renderDocNode(content.remarksBlock.content) //?
Formatter.renderDocNode(content.typeParams) //?
Formatter.renderDocNode(content.deprecatedBlock.content) //?
Formatter.renderDocNode(content.inheritDocTag) //?
content.params.blocks.forEach(p => {
  p.parameterName //?
  Formatter.renderDocNode(p.content) //?
})
Formatter.renderDocNode(content.privateRemarks.content) //?
content.customBlocks.forEach(cb => {
  Formatter.renderDocNode(cb.content) //?
})

// ----------------------------------

source = `
  /**
   * {@inheritDoc nexus#foo."bar-bar"}
   */
`

tsdocParser = new TSDoc.TSDocParser()
parserContext = tsdocParser.parseString(source)
content = parserContext.docComment

parserContext.log.messages.map(m => [m.messageId, m.text]) //?

const ref = content.inheritDocTag.declarationReference
ref.packageName //?
ref.importPath //?
ref.memberReferences.length //?
ref.memberReferences[0].kind //?
// 0
ref.memberReferences[0].hasDot //?
ref.memberReferences[0].memberIdentifier.kind //?
ref.memberReferences[0].memberIdentifier.hasQuotes //?
ref.memberReferences[0].memberIdentifier.identifier //?
ref.memberReferences[0].selector //?
// 1
ref.memberReferences[1].hasDot //?
ref.memberReferences[1].memberIdentifier.kind //?
ref.memberReferences[1].memberIdentifier.hasQuotes //?
ref.memberReferences[1].memberIdentifier.identifier //?
ref.memberReferences[1].selector //?
