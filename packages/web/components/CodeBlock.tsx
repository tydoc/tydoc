import React, { FC } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

type CodeProps = { code: string }

/**
 * Highlights the given code.
 */
export const CodeBlock: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="pt-2 rounded-md border border-gray-300 bg-gray-100 p-2">
      <pre>{children}</pre>
    </div>
    // <div className="rounded-md overflow-hidden border border-gray-300 ">
    //   <SyntaxHighlighter language="typescript">{code}</SyntaxHighlighter>
    // </div>
  )
}
