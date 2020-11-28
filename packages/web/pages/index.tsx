import { GetServerSideProps } from 'next'
import React, { FC } from 'react'
import { Layout } from 'web/components/Layout'
import { Package } from '../components/Content'

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context,
) => {
  const { github = null, entrypoint = null } = context.query

  return {
    props: {
      github: github as string | null,
      entrypoint: entrypoint as string | null,
    },
  }
}

interface HomeProps {
  github: string | null
  entrypoint: string | null
}

export default function Home({ github, entrypoint }: HomeProps) {
  if (!github) {
    return <div>No query param "github=[string]" provided</div>
  }

  if (!entrypoint) {
    return <div>No query param "entrypoint=[string]" provided</div>
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
          <Package {...{ github, entrypoint }} />
        </div>
      </div>
    </Layout>
  )
}

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
