import React from 'react'
import { Meta } from '@storybook/react'

import { Package } from '../components/Content'

export default {
  title: 'Content',
  component: Package,
} as Meta

export const Default = () => <Package />
