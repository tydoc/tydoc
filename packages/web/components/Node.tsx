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
      /* Functions */
      return (
        <div className="inline">
          {/* Overloads */}
          {node.sigs.map((sig, i) => (
            <span key={`${node.raw.typeText}-${i}`}>
              {/* Parameters */}
              <span>
                {`(`}
                {sig.params.map((param, i) => (
                  <span key={param.name} className="mx-1 font-mono">
                    {/* Parameter name */}
                    <span className="pr-1 font-normal">{param.name}:</span>

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

              <span className="px-2 font-mono">{`=>`}</span>
              {/* Return type */}
              <Node node={sig.return} />
            </span>
          ))}

          {/* Description */}
          {/* <p>{t.}</p> */}
        </div>
      )
    }

    case 'alias': {
      /* Forwards the rendering to the aliased module. */
      return <Node node={node.type} />
    }

    case 'object': {
      return (
        <span>
          {`{`}
          {node.props.map((param, i) => (
            <div key={param.name} className="mx-1 ml-5 font-mono">
              {/* Documentation */}
              <Documentation node={param.type} />
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
      )
    }

    case 'union': {
      return (
        <span>
          {node.types.map((type, i) => (
            <span key={`${node.types}`} className="mx-1 font-mono">
              {/* Parameter type */}
              <Node node={type} />

              {/* Separator */}
              {i < node.types.length - 1 && (
                <span className="ml-1 font-normal text-red-400">{`|`}</span>
              )}
            </span>
          ))}
        </span>
      )
    }

    case 'interface': {
      return (
        <span>
          {`{`}
          {node.props.map((param, i) => (
            <div key={param.name} className="mx-1 ml-5 font-mono">
              {/* Documentation */}
              {/* TODO need to remove regex bomb */}
              {/* <Documentation node={param.type} /> */}

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
      )
    }

    case 'literal': {
      return (
        <span className="font-mono font-medium text-yellow-500">
          {node.base}
        </span>
      )
    }

    default:
      // console.log(node.kind, node)
      // return <p>{JSON.stringify(node, null, 2)}</p>
      return <span>'unimplemented'</span>
  }
}

interface DocumentationProps {
  node: Doc.Node
}

const Documentation: FC<DocumentationProps> = ({ node }) => {
  // Data

  let docs: string | null | undefined = getDocumentationOfNode(node)
  docs = docs?.match(/(\/\*(?:.|\s)*)\*\//)?.[0]
  // docs?.match(/(\/\*(?:.|\s)*)\*\//)?.[0]

  // View

  return <div className="text-gray-500">{docs || ''}</div>
}

/**
 * Gets documentation from the given node by checking raw data.
 */
function getDocumentationOfNode(node: Doc.Node): string | null {
  switch (node.kind) {
    case 'object': {
      return node.raw.nodeFullText
    }

    case 'function': {
      return null
    }

    case 'union': {
      return null
    }

    case 'primitive': {
      return null
    }

    case 'literal': {
      return null
    }

    case 'alias': {
      return node.raw.nodeFullText
    }

    case 'interface': {
      return node.raw.nodeFullText
    }

    case 'callable': {
      return node.raw.nodeFullText
    }

    case 'array': {
      return null
    }

    case 'typeIndexRef': {
      return null
    }

    case 'unsupported': {
      return null
    }

    case 'intersection': {
      return null
    }

    case 'callable_object': {
      return node.raw.nodeFullText
    }

    case 'callable_interface': {
      return node.raw.nodeFullText
    }
  }
}
