import React, { FC } from 'react'
import { Doc } from 'tydoc/types'

import { Node } from './Node'

interface TypeProps {
  type: Doc.IndexableNode
}

export const Type: FC<TypeProps> = ({ type }) => {
  return (
    <div id={type.name} className="py-3 w-full">
      <h3 className="font-mono text-xl">{type.name}</h3>

      <div className="mt-2 rounded-md border border-gray-300 bg-gray-100 py-2 pl-2 pr-20 flex">
        <Node node={type} />
      </div>
      {/* <CodeBlock code={type.raw.nodeText} /> */}
    </div>
  )
}
