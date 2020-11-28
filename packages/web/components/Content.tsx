import React, { useEffect, useState } from 'react'
import { DocPackage } from 'tydoc/dist/api/extractor/doc'
import { Doc } from 'tydoc/types'

import { Heading } from './Heading'
import { Module } from './Module'
import { Node } from './Node'
import { Type } from './Type'
import { TypeIndexContext } from './TypeIndexContext'

export interface PackageProps {
  docPackage: DocPackage
}

/**
 * Displays package.
 */
export function Package({ docPackage }: PackageProps): JSX.Element {
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
