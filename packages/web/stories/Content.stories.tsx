import React from 'react'
import { Meta } from '@storybook/react'

import { Package } from '../components/Content'

export default {
  title: 'Package',
  component: Package,
} as Meta

export const Default = () => (
  <Package
    github="https://github.com/prisma-labs/graphql-request"
    entrypoint="types"
  />
)
