import React, { FC } from 'react'
import { Doc } from 'tydoc/types'

import { useTypeIndex } from './TypeIndexContext'

type NodeProps = { node: Doc.Node }

/**
 * Type recursively creates a representation of the provided type.
 */
export const Node: FC<NodeProps> = ({ node }) => {
  /* Context */
  const typeIndex = useTypeIndex()

  /* Draw a type */
  switch (node.kind) {
    case 'primitive': {
      return (
        <span className="font-mono font-medium text-green-700">
          {node.type}
        </span>
      )
    }

    case 'typeIndexRef': {
      /* 
      References a type to the index that you may click and hover to get additional information.
      */
      const type = typeIndex[node.link]!

      return (
        <a href={`#${type.name}`}>
          <span className="font-mono font-medium text-blue-600">
            {type.raw.typeText}
          </span>
        </a>
      )
    }

    case 'callable': {
      return (
        <div className="inline">
          {/* Overloads */}
          {node.sigs.map((sig) => (
            <>
              {/* Parameters */}
              <span>
                {`(`}
                {sig.params.map((param, i) => (
                  <span key={param.name} className="font-mono mx-1">
                    {/* Parameter name */}
                    <span className="font-normal pr-1">{param.name}:</span>

                    {/* Parameter type */}
                    <Node node={param.type} />

                    {/* Separator */}
                    {i < sig.params.length - 1 && (
                      <span className="font-normal">{`,`}</span>
                    )}
                  </span>
                ))}
                {`)`}
              </span>

              <span className="font-mono px-2">{`=>`}</span>
              {/* Return type */}
              <Node node={sig.return} />
            </>
          ))}

          {/* Description */}
          {/* <p>{t.}</p> */}
        </div>
      )
    }

    case 'alias': {
      /* Forwards the rendering to the aliased module. */
      return (
        <>
          <Node node={node.type} />
        </>
      )
    }

    case 'object': {
      return (
        <>
          {/* Parameters */}
          <span>
            {`{`}
            {node.props.map((param, i) => (
              <div key={param.name} className="font-mono ml-5 mx-1">
                {/* Documentation */}
                <div className="text-gray-500">/* docs */</div>
                {/* Type declaration */}
                <div>
                  {/* Parameter name */}
                  <span className="font-normal">{param.name}</span>
                  <span className="pr-2 text-indigo-600-700">:</span>

                  {/* Parameter type */}
                  <Node node={param.type} />

                  {/* Separator */}
                  {i < node.props.length - 1 && (
                    <span className="font-normal">{`,`}</span>
                  )}
                </div>
              </div>
            ))}
            {`}`}
          </span>
        </>
      )
    }

    case 'union': {
      return (
        <>
          {/* Parameters */}
          <span>
            {node.types.map((type, i) => (
              <div key={`${node.types}`} className="font-mono ml-5 mx-1">
                {/* Parameter type */}
                <Node node={type} />

                {/* Separator */}
                {i < node.types.length - 1 && (
                  <span className="font-normal text-red-400">{`|`}</span>
                )}
              </div>
            ))}
          </span>
        </>
      )
    }

    default:
      console.log(node.kind, node)
      // return <p>{JSON.stringify(node, null, 2)}</p>
      return <span>'todo'</span>
  }
}
