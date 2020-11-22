import { FC, useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Doc } from 'tydoc/types'

export const Package: FC = () => {
  const json = useJson(
    'https://tydoc-output.jasonkuhrt.vercel.app/tydoc.docs.json',
  )
  console.log({ json })

  if (json === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="">
      {/* Modules */}
      {json.modules.map((module) => (
        <Module key={module.name} module={module} typeIndex={json.typeIndex} />
      ))}
    </div>
  )
}

type ModuleProps = {
  module: Doc.DocModule
  typeIndex: Doc.TypeIndex
}

function Module({ module, typeIndex }: ModuleProps) {
  return (
    <div>
      {/* Header */}
      <div>
        <b>{module.name}</b>
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
            <Type node={e.type} typeIndex={typeIndex} />
          </div>
        ))}
      </div>
    </div>
  )
}

type TypeProps = { node: Doc.Node; typeIndex: Doc.TypeIndex }

function Type({ node, typeIndex }: TypeProps) {
  /* Draw a type */
  switch (node.kind) {
    case 'typeIndexRef':
      const type = typeIndex[node.link]!
      return (
        <div className="">
          {/* Type */}
          <Code code={type.raw.typeText} />

          {/* Description */}
          {/* <p>{t.}</p> */}
        </div>
      )

    case 'callable':
      return (
        <div className="">
          {/* Type */}
          <Code code={node.raw.typeText} />

          {/* Description */}
          {/* <p>{t.}</p> */}
        </div>
      )

    default:
      return <> </>
  }
}

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
