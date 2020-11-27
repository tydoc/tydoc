import React, { FC, useEffect, useState } from 'react'

import { Doc } from 'tydoc/types'
import CodeBlock from './CodeBlock'

import Heading from './Heading'
import Module from './Module'
import Node from './Node'
import { TypeIndexContext } from './TypeIndexContext'

/* TypeIndex Context */

/* Component */

export const Package: FC<{
  github: string
  entrypoint: string
}> = ({ github, entrypoint }) => {
  const json = useJson(
    `https://tydoc-source-proxy.vercel.app/api?github=${github}&entrypoint=${entrypoint}`,
  )
  console.log({ json })

  if (json === undefined) {
    return <div>Loading...</div>
  }

  /* Data */

  const types = Object.values(json.typeIndex)

  /* View */

  return (
    <TypeIndexContext.Provider value={json.typeIndex}>
      <div className="">
        {/* Modules */}
        <div>
          <Heading>Modules</Heading>

          {json.modules.map((module) => (
            <Module key={`modules-${module.name}`} module={module} />
          ))}
        </div>

        {/* Types */}
        <div className="pt-5">
          <Heading>Types</Heading>

          {types.map((type) => (
            <div key={`typeindex-${type.name}`} id={type.name} className="py-3">
              <h3 className="font-mono text-xl">{type.name}</h3>
              <Node node={type} />
              {/* <CodeBlock code={type.raw.nodeText} /> */}
            </div>
          ))}
        </div>
      </div>
    </TypeIndexContext.Provider>
  )
}

/* Utility hooks */

function useJson(url: string) {
  const [json, setJson] = useState<Doc.DocPackage | undefined>(undefined)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(url)
      if (res.headers.get('content-type')?.includes('application/json')) {
        const _ = await res.json()
        setJson(_)
      } else {
        const text = await res.text()
        throw new Error(text)
      }
    })()
  }, [url])

  return json
}
