import React, { FC } from 'react'
import { twoslasher } from '@typescript/twoslash'

type PlaygroundProps = {
  code: string
}

const code = `
let a = 2
`

export const Playground: FC<PlaygroundProps> = ({}) => {
  // const report = twoslasher(code, 'ts', {

  // })
  return <div>{code}</div>
}
