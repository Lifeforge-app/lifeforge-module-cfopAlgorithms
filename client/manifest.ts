import { lazy } from 'react'

import { createForgeModule } from '@lifeforge/federation'

const { forgeAPI, ...manifest } = createForgeModule({
  routes: {
    '/': lazy(() => import('@')),
    '/f2l': lazy(() => import('@/pages/F2L')),
    '/oll': lazy(() => import('@/pages/OLL')),
    '/pll': lazy(() => import('@/pages/PLL'))
  }
})

export default manifest

export { forgeAPI }
