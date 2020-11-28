import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'
import { Package } from '../components/Content'
import { Search, TSLogo, Vercel } from '../components/svg'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { github = null, entrypoint = null } = context.query

  return {
    props: { github, entrypoint },
  }
}

export default function Home({
  github,
  entrypoint,
}: {
  github?: string
  entrypoint?: string
}) {
  if (!github) {
    return <div>No query param "github=[string]" provided</div>
  }

  if (!entrypoint) {
    return <div>No query param "entrypoint=[string]" provided</div>
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center w-full px-6 text-white bg-blue-500 h-14">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center">
            <TSLogo />
            <div className="ml-1 font-medium">TyDoc</div>
          </a>
        </Link>

        {/* Searchbar */}
        <div className="flex-1 mx-6">
          <div className="relative text-gray-700 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:ring-opacity-50 form-input sm:text-sm sm:leading-5"
              placeholder="Search for a package"
            />
          </div>
        </div>
        <div className="grid grid-flow-col gap-4 font-medium">
          <a href="https://github.com/prisma-labs/tydoc" target="_blank">
            GitHub
          </a>
          <a href="https://github.com/prisma-labs/tydoc" target="_blank">
            About
          </a>
        </div>
      </div>

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
      <div>
        <a href="https:/www.vercel.com" target="_blank">
          <Vercel className="h-8" />
        </a>
      </div>
    </div>
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
