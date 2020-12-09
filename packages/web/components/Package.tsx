import { Doc } from '@tydoc/extractor/types'
import React, { FC } from 'react'
import { Heading } from './Heading'
import { Module } from './Module'
import { Type } from './Type'
import { TypeIndexContext } from './TypeIndexContext'

export interface Props {
  docs: Doc.Package
}

/**
 * Displays package.
 */
export const Package: FC<Props> = ({ docs }) => {
  /* Data */

  const types = Object.values(docs.typeIndex)

  /* View */

  return (
    <TypeIndexContext.Provider value={docs.typeIndex}>
      <div className="">
        {/* Modules */}
        <div>
          <Heading>Modules</Heading>

          {docs.modules.map((module) => (
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
