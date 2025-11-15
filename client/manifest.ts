import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'CFOP Algorithms',
  icon: 'tabler:cube',
  routes: {
    '/': lazy(() => import('@')),
    '/f2l': lazy(() => import('@/pages/F2L')),
    '/oll': lazy(() => import('@/pages/OLL')),
    '/pll': lazy(() => import('@/pages/PLL'))
  },
  category: 'Information'
} satisfies ModuleConfig
