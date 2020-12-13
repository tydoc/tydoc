import { Layout } from '.../../../components/Layout'
import * as Tydoc from '@tydoc/extractor'
import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Package } from '../../components/Package'
import { defineStaticProps } from '../../utils/next'
import { parsedUrlToString, parseUrl } from '../../utils/url-parser'

export const getStaticProps = defineStaticProps(async (context) => {
  const url = `/npm/${(context.params!.path! as string[]).join('/')}`
  const parsedUrl = parseUrl(url)
  if (parsedUrl.error) {
    throw parsedUrl.error
  }
  const { pkg, org, tag, version, module } = parsedUrl.value

  const packageName = org ? `${org}/${pkg}` : pkg
  const epd = await Tydoc.fromPublished({
    packageName,
    packageVersion: version ?? undefined,
  })

  return {
    props: {
      epd,
      parsedUrl: parsedUrl.value,
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
  epd,
  parsedUrl,
}) => {
  if (!epd) {
    return <div>Loading ...</div>
  }

  const inverseDistTags = Object.entries(epd.metadata['dist-tags']).reduce(
    (acc, [tag, version]) => {
      acc[version] ??= []
      acc[version]!.push(tag)
      return acc
    },
    {} as { [version: string]: string[] },
  )

  const versionMetadata = epd.metadata.versions[
    epd.metadata['dist-tags'].latest
  ]!

  const versionPublishedDate = new Date(
    epd.metadata.time[epd.metadata['dist-tags'].latest]!,
  )

  const versionTags = Object.entries(epd.metadata['dist-tags'])
    .filter(([tag, semver]) => {
      return semver === versionMetadata.version
    })
    .map(([tag, _]) => tag)

  const router = useRouter()

  return (
    <Layout>
      {/* Package */}
      <div className="px-6 py-8">
        {/* Package information */}
        <div className="flex items-center">
          {/* Name */}
          <div className="h-full px-3 py-2 font-mono font-bold leading-6 text-gray-700 bg-gray-200 border border-gray-200 rounded-md">
            {epd.metadata.name}
          </div>

          {/* Version */}
          <select
            id="location"
            className="block py-2 pl-3 pr-10 ml-4 text-base leading-6 border-gray-300 rounded-md form-select focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue={epd.metadata['dist-tags'].latest}
            onChange={(e) =>
              router.push(
                parsedUrlToString({
                  ...parsedUrl,
                  version: e.target.value as any,
                }),
              )
            }
          >
            {Object.entries(epd.metadata.versions).map(([version]) => (
              <option key={version} value={version}>
                {version}
                {inverseDistTags[version]
                  ? ` (${inverseDistTags[version]!.join(', ')})`
                  : ''}
              </option>
            ))}
          </select>

          {/* Tags */}
          {versionTags.map((tag) => (
            <div
              key={tag}
              className="inline-flex ml-2 items-center px-2.5 py-1 rounded-md text-sm font-medium leading-5 bg-blue-500 text-white"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Meta */}
        <div className="flex my-3 text-sm divide-gray-700">
          <div title={versionPublishedDate.toString()}>
            Published:{' '}
            <strong>{versionPublishedDate.toLocaleDateString()}</strong>
          </div>
          <div className="mx-2">|</div>
          <div>License: {versionMetadata.license}</div>
        </div>

        {/* Content */}
        <div className="flex">
          <SideNav />
          <Package docs={epd.docs} />
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
