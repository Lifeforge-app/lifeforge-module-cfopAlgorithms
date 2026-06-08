import { lazy } from 'react'

import { createForgeModuleClient } from '@lifeforge/federation'

const { forgeAPI, ...manifest } = createForgeModuleClient({
  routes: {
    '/': lazy(() => import('@')),
    '/f2l': lazy(() => import('@/pages/F2L')),
    '/oll': lazy(() => import('@/pages/OLL')),
    '/pll': lazy(() => import('@/pages/PLL'))
  }
})

export default manifest

export { forgeAPI }
