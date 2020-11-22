import { FC, useEffect, useState } from 'react'
import { Doc } from 'tydoc/types'

export const Content: FC = () => {
  const json = useJson(
    'https://tydoc-output.jasonkuhrt.vercel.app/tydoc.docs.json',
  )
  console.log({ json })

  if (json === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="">
      {json.modules.map((m) => (
        <div>
          <div>
            <b>{m.name}</b>
          </div>
          <div>
            {m.namedExports.map((e) => (
              <>
                <div>{e.name}</div>
                <TypeCode expor={e} />
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const TypeCode: FC<{ expor: Doc.Expor }> = ({ expor }) => {
  const t = expor.type

  let content = ''

  if (t.kind === 'callable') {
    content = t.raw.typeText
  }

  return <pre className="p-2 break-words bg-gray-200 w-96">{content}</pre>
}

function useJson(url: string) {
  const [json, setJson] = useState<Doc.DocPackage | undefined>(undefined)

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((r) => setJson(r))
  }, [url])

  return json
}
