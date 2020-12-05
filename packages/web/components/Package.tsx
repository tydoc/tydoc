import { Doc } from '@tydoc/extractor/types'
import React, { FC } from 'react'
import { Heading } from './Heading'
import { Module } from './Module'
import { Type } from './Type'
import { TypeIndexContext } from './TypeIndexContext'

export interface PackageProps {
  docPackage: Doc.DocPackage
}

/**
 * Displays package.
 */
export const Package: FC<PackageProps> = ({ docPackage }) => {
  /* Data */

  const types = Object.values(docPackage.typeIndex)

  /* View */

  return (
    <TypeIndexContext.Provider value={docPackage.typeIndex}>
      <div className="">
        {/* Modules */}
        <div>
          <Heading>Modules</Heading>

          {docPackage.modules.map((module) => (
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
