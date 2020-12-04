import { Doc } from '@tydoc/extractor/types'
import React, { FC } from 'react'
import { CodeBlock } from './CodeBlock'
import { Node } from './Node'

interface TypeProps {
  type: Doc.IndexableNode
}

export const Type: FC<TypeProps> = ({ type }) => {
  return (
    <div id={type.name} className="py-3 w-full">
      {/* Heading */}
      <div>
        <h3 className="font-mono text-xl">
          <span>{type.kind}</span>
          {type.name}
        </h3>
      </div>

      {/* {type.tsdoc?.raw} */}

      {/* Spec */}
      <CodeBlock>
        <Node node={type} />
      </CodeBlock>
      {/* <CodeBlock code={type.raw.nodeText} /> */}
    </div>
  )
}
