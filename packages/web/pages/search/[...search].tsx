import { Layout } from '.../../../components/Layout'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { fetchDocPackage, SearchResponseData } from 'web/utils/docs'
import { Package } from '../../components/Package'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let data: undefined | SearchResponseData
  const packageName = getPackageNameFromUrl(ctx.req.url)
  const version = ctx.query['v']
  if (packageName) {
    data = await fetchDocPackage({
      packageName,
      version: typeof version === 'string' ? version : undefined,
    })
  }
  return {
    props: { data: data ?? null }, // will be passed to the page component as props
  }
}
function getPackageNameFromUrl(url?: string){
  const packageName = url?.replace('/search/', '').split('?')[0]
  return packageName
}
const Page: FC<{ data?: SearchResponseData }> = ({ data }) => {
  const router = useRouter()
  if (!data || !data.docPackage || !data.npmInfo) {
    return <div>Loading ...</div>
  }
  function handleVersionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    router.push({
      query: { search: typeof router.query.search === 'string' ? [router.query.search] :  router.query.search, v: event.target.value },
    })
  }
  const inverseDistTags = Object.entries(data.npmInfo['dist-tags']).reduce(
    (acc, [tag, version]) => {
      acc[version] ??= []
      acc[version]?.push(tag)
      return acc
    },
    {} as { [version: string]: string[] },
  )

  return (
    <Layout>
      {/* Package */}
      <div className="px-6 py-8">
        {/* Package information */}
        <div className="flex items-center">
          {/* Name */}
          <div className="h-full px-3 py-2 font-mono font-bold leading-6 text-gray-700 bg-gray-200 border border-gray-200 rounded-md">
            {data.npmInfo.name}
          </div>

          {/* Version */}
          <select
            onChange={handleVersionChange}
            id="location"
            className="block py-2 pl-3 pr-10 ml-4 text-base leading-6 border-gray-300 rounded-md form-select focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue={router.query.v || data.npmInfo['dist-tags'].latest}
          >
            {Object.entries(data.npmInfo.versions).map(([version]) => (
              <option key={version} value={version}>
                {version}
                {inverseDistTags[version]
                  ? ` (${inverseDistTags[version]?.join(', ')})`
                  : ''}
              </option>
            ))}
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
          <Package docPackage={data.docPackage} />
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
