import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { DocPackage } from 'tydoc/dist/api/extractor/doc'
import { Package } from '../../components/Content'
import { Layout } from '../../components/Layout'
import { defineStaticProps } from '../../utils/next'
import { NPM } from '../../utils/types'
import { getJson } from '../../utils/utils'

export const getStaticProps = defineStaticProps(async (context) => {
  const docPackage = await fetchDocPackage({ packageName: 'swrv' })
  console.log({ docPackage })

  return {
    props: { docPackage },
  }
})

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  docPackage,
}) => {
  const router = useRouter()
  const { pkg } = router.query

  if (docPackage === undefined) {
    return <div>Loading ...</div>
  }

  return (
    <Layout>
      {/* Package */}
      <div className="px-6 py-8">
        {/* Package information */}
        <div className="flex items-center">
          {/* Name */}
          <div className="h-full px-3 py-2 font-mono font-bold leading-6 text-gray-700 bg-gray-200 border border-gray-200 rounded-md">
            ink
          </div>

          {/* Version */}
          <select
            id="location"
            className="block py-2 pl-3 pr-10 ml-4 text-base leading-6 border-gray-300 rounded-md form-select focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue="3.0.8"
          >
            <option>3.0.0</option>
            <option>3.0.8</option>
          </select>

          {/* Tags */}
          <div className="inline-flex ml-2 items-center px-2.5 py-1 rounded-md text-sm font-medium leading-5 bg-blue-500 text-white">
            latest
          </div>
        </div>

        {/* Meta */}
        <div className="flex my-3 text-sm divide-gray-700">
          <div>
            Published: <strong>Jul 31, 2020</strong>
          </div>
          <div className="mx-2">|</div>
          <div>License: MIT</div>
        </div>

        {/* Content */}
        <div className="flex">
          <SideNav />
          <Package docPackage={docPackage} />
        </div>
      </div>
    </Layout>
  )
}

export default Page

const SideNav: FC = () => (
  <div className="flex flex-col w-56 mr-8">
    <SideNavItem name="README" url="#" />
    <SideNavItem name="Documentation" url="#" active />
  </div>
)

const SideNavItem: FC<{ name: string; url: string; active?: boolean }> = ({
  name,
  url,
  active = false,
}) => (
  <a href={url} className={`p-4 ${active ? 'bg-gray-200' : ''}`}>
    {name}
  </a>
)

async function fetchDocPackage({
  packageName,
  organization,
}: {
  packageName: string
  organization?: string
}): Promise<DocPackage> {
  const fullPackageName = organization
    ? `${organization}/${packageName}`
    : packageName
  const npmResponse = await getJson<NPM.Response>(
    `https://registry.npmjs.org/${fullPackageName}`,
  )

  // console.log({ packageInfo: npmResponse })

  const [, ghOwner, ghName] = npmResponse.repository.url.match(
    /github\.com\/(.+)\/(.+)\.git$/,
  )!

  const github = `https://github.com/${ghOwner}/${ghName}`
  const entrypoint = 'src/index'
  const docPackage = await getJson<DocPackage>(
    `https://tydoc-source-proxy.vercel.app/api?github=${github}&entrypoint=${entrypoint}`,
  )

  return docPackage
}
