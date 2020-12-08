import Link from 'next/link'
import React, { FC } from 'react'
import { Layout } from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <ul>
        <ListEl link="/npm/setset" name="setset" />
        <ListEl link="/npm/floggy" name="floggy" />
        <ListEl link="/npm/execa" name="execa" />
        <ListEl link="/npm/sponsorsme" name="sponsorsme" />
        <ListEl link="/npm/swrv" name="swrv" />
        <ListEl link="/npm/@tony_win2win/common" name="@tony_win2win/common" />
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
