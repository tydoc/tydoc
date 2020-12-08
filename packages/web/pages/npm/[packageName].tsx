import { Layout } from '.../../../components/Layout'
import * as Tydoc from '@tydoc/extractor'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import React, { FC } from 'react'
import { Package } from '../../components/Package'
import { defineStaticProps } from '../../utils/next'

export const getStaticProps = defineStaticProps(async (context) => {
  const packageName = context.params!.packageName as string
  const edd = await Tydoc.fromPublished({
    packageName,
  })

  return {
    props: {
      docPackage: edd,
      npmInfo: {
        name: packageName,
        'dist-tags': {
          latest: '0.0.0-todo.1',
        },
        versions: '0.0.0-todo.1',
      },
    },
    revalidate: 60 * 5, // every 5min
  }
})

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    // fallback: 'blocking',
    fallback: true,
  }
}

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  docPackage,
  npmInfo,
}) => {
  if (docPackage === undefined || npmInfo === undefined) {
    return <div>Loading ...</div>
  }

  const inverseDistTags = Object.entries(npmInfo['dist-tags']).reduce(
    (acc, [tag, version]) => {
      acc[version] ??= []
      acc[version]!.push(tag)
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
            {npmInfo.name}
          </div>

          {/* Version */}
          <select
            id="location"
            className="block py-2 pl-3 pr-10 ml-4 text-base leading-6 border-gray-300 rounded-md form-select focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue={npmInfo['dist-tags'].latest}
          >
            {Object.entries(npmInfo.versions).map(([version]) => (
              <option key={version} value={version}>
                {version}
                {inverseDistTags[version]
                  ? ` (${inverseDistTags[version]!.join(', ')})`
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
