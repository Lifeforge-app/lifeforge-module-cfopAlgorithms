import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  routes: {
    '/': lazy(() => import('@')),
    '/f2l': lazy(() => import('@/pages/F2L')),
    '/oll': lazy(() => import('@/pages/OLL')),
    '/pll': lazy(() => import('@/pages/PLL'))
  }
} satisfies ModuleConfig
