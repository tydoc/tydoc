import { useRouter } from 'next/router'
import { FC } from 'react'
import { Layout } from 'web/components/Layout'

const Post: FC = () => {
  const router = useRouter()
  const { pkg } = router.query

  return <Layout>Post: {pkg}</Layout>
}

export default Post
