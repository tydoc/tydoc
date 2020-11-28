import React from 'react'

export function Heading(props: React.PropsWithChildren<{}>) {
  return (
    <div className="py-1">
      <h2 className="text-3xl">{props.children}</h2>
    </div>
  )
}
