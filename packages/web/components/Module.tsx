import React from 'react'

import { Doc } from 'tydoc/types'

import { Node } from './Node'

type ModuleProps = {
  module: Doc.DocModule
}

export function Module({ module }: ModuleProps) {
  return (
    <div>
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold und">{module.name}</h3>
        <p>{module.tsdoc?.raw}</p>
      </div>

      {/* Types */}
      <div>
        {module.namedExports.map((e) => (
          <NamedExport key={e.name} export={e} />
        ))}
      </div>
    </div>
  )
}

type NamedExportProps = {
  export: Doc.Expor
}

function NamedExport(props: NamedExportProps) {
  /* Data */
  const { name, type } = props.export

  /* View */
  return (
    <div className="my-3">
      {/* Header */}
      <div>
        <h4 className="py-1 text-lg font-medium">{name}</h4>
      </div>

      {/* Type */}
      <div className="pt-2 inline rounded-md border border-gray-300 bg-gray-100 p-2">
        <Node node={type} />
      </div>
    </div>
  )
}
