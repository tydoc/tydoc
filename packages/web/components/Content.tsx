import React, { FC, useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Doc } from 'tydoc/types'

/* TypeIndex Context */

const TypeIndexContext = React.createContext<Doc.TypeIndex>({})

/* Component */

export const Package: FC = () => {
  const json = useJson(
    'https://tydoc-output.jasonkuhrt.vercel.app/tydoc.docs.json',
  )
  console.log({ json })

  if (json === undefined) {
    return <div>Loading...</div>
  }

  /* Data */

  // const types = json.typeIndex.values()

  /* View */

  return (
    <TypeIndexContext.Provider value={json.typeIndex}>
      <div className="">
        {/* Modules */}
        {json.modules.map((module) => (
          <Module key={module.name} module={module} />
        ))}

        {/* Types */}
        {}
      </div>
    </TypeIndexContext.Provider>
  )
}

type ModuleProps = {
  module: Doc.DocModule
}

function Module({ module }: ModuleProps) {
  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold und">{module.name}</h2>
        <p>{module.tsdoc?.summary}</p>
      </div>

      {/* Types */}
      <div>
        {module.namedExports.map((e) => (
          <div key={e.name} className="my-3">
            {/* Header */}
            <div key={e.name}>
              <h3 className="py-1 text-lg font-medium">{e.name}</h3>
            </div>

            {/* Type */}
            <div className="pt-2 inline rounded-md border border-gray-300 bg-gray-100 p-2">
              <Type node={e.type} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type TypeProps = { node: Doc.Node }

/**
 * Type recursively creates a representation of the provided type.
 */
function Type({ node }: TypeProps) {
  /* Context */
  const typeIndex = React.useContext(TypeIndexContext)

  /* Draw a type */
  switch (node.kind) {
    case 'primitive':
      return (
        <span className="font-mono font-medium text-green-700">
          {node.type}
        </span>
      )
    case 'typeIndexRef':
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

    case 'callable':
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
                    <Type node={param.type} />

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
              <Type node={sig.return} />
            </>
          ))}

          {/* Description */}
          {/* <p>{t.}</p> */}
        </div>
      )

    default:
      return <>TODO</>
  }
}

// function Params(props: React.PropsWithChildren<{}>) {
//   return <span>({props.children})</span>
// }

type CodeProps = { code: string }

function Code({ code }: CodeProps) {
  return (
    <div className="rounded-md overflow-hidden border border-gray-300 ">
      <SyntaxHighlighter language="typescript">{code}</SyntaxHighlighter>
    </div>
  )
}

/* Utility hooks */

function useJson(url: string) {
  const [json, setJson] = useState<Doc.DocPackage | undefined>(undefined)

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((r) => setJson(r))
  }, [url])

  return json
}
