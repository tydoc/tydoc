import { useRouter } from 'next/router'
import { FC } from 'react'
import { Layout } from 'web/components/Layout'

const Post: FC = () => {
  const router = useRouter()
  const { orgPkg } = router.query

  return <Layout>Org Package: {orgPkg}</Layout>
}

export default Post
