import React, { useEffect, useState } from 'react'
import { Doc } from 'tydoc/types'

import { Heading } from './Heading'
import { Module } from './Module'
import { Node } from './Node'
import { Type } from './Type'
import { TypeIndexContext } from './TypeIndexContext'

export interface PackageProps {
  github: string
  entrypoint: string
}

/**
 * Displays package.
 */
export function Package({ github, entrypoint }: PackageProps): JSX.Element {
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
            <Type key={`typeindex-${type.name}`} type={type} />
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
