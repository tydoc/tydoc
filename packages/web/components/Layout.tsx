import Link from 'next/link'
import React, { FC } from 'react'
import { icons, logos } from './svg'

export const Layout: FC = ({ children }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center w-full px-6 text-white bg-blue-500 h-14">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center">
            <logos.TSLogo />
            <div className="ml-1 font-medium">TyDoc</div>
          </a>
        </Link>

        {/* Searchbar */}
        <div className="flex-1 mx-6">
          <div className="relative text-gray-700 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <icons.Search className="w-5 h-5 text-gray-400" />
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

      {children}
      <div>
        <a href="https:/www.vercel.com" target="_blank">
          <logos.Vercel className="h-8" />
        </a>
      </div>
    </div>
  )
}
