import React from 'react'
import { Meta } from '@storybook/react'

import { Package } from '../components/Content'
import { graphQLRequestTypes } from './fixtures'

export default {
  title: 'Package',
  component: Package,
} as Meta

export const Default = () => <Package docPackage={graphQLRequestTypes} />
