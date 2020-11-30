import Link from 'next/link'
import React, { FC } from 'react'
import { Layout } from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <ul>
        <ListEl link="/npm/types/graphql-request" name="graphql-request" />
        <ListEl link="/npm/src_index/swrv" name="swrv" />
        <ListEl
          link="/npm/src_index/@tony_win2win/common"
          name="@tony_win2win/common"
        />
      </ul>
    </Layout>
  )
}

const ListEl: FC<{ link: string; name: string }> = ({ link, name }) => (
  <li>
    <Link href={link}>
      <a className="">{name}</a>
    </Link>
  </li>
)
