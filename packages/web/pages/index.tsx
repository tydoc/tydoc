import Link from 'next/link'
import React, { FC } from 'react'
import { Layout } from 'web/components/Layout'

export default function Home() {
  return (
    <Layout>
      <ul>
        <ListEl link="/npm/types/graphql-request" name="graphql-request" />
        <ListEl link="/npm/src_index/swrv" name="swrv" />
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
