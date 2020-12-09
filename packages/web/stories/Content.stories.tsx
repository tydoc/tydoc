import { Meta } from '@storybook/react'
import React from 'react'
import { Package } from '../components/Package'
import { graphQLRequestTypes } from './fixtures'

export default {
  title: 'Package',
  component: Package,
} as Meta

export const Default = () => <Package docs={graphQLRequestTypes} />
