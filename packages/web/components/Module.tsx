import React from 'react'

import { Doc } from 'tydoc/types'

import Node from './Node'

type ModuleProps = {
  module: Doc.DocModule
}

export default function Module({ module }: ModuleProps) {
  return (
    <div>
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold und">{module.name}</h3>
        <p>{module.tsdoc?.summary}</p>
      </div>

      {/* Types */}
      <div>
        {module.namedExports.map((e) => (
          <div key={e.name} className="my-3">
            {/* Header */}
            <div key={e.name}>
              <h4 className="py-1 text-lg font-medium">{e.name}</h4>
            </div>

            {/* Type */}
            <div className="pt-2 inline rounded-md border border-gray-300 bg-gray-100 p-2">
              <Node node={e.type} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
