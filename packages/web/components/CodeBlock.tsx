import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

type CodeProps = { code: string }

/**
 * Highlights the given code.
 */
export default function CodeBlock({ code }: CodeProps) {
  return (
    <div className="rounded-md overflow-hidden border border-gray-300 ">
      <SyntaxHighlighter language="typescript">{code}</SyntaxHighlighter>
    </div>
  )
}
