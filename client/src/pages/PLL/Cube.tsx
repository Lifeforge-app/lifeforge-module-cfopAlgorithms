import { useEffect, useRef } from 'react'

import { Box, Flex, colorWithOpacity } from '@lifeforge/ui'

import { type DEFAULT_CUBE } from '../../functions/genCube'

const COLORS = {
  Y: 'yellow-500',
  R: 'red-500',
  O: 'orange-500',
  G: 'green-500',
  B: 'blue-500',
  W: 'bg-50'
} as const

function Cube({
  cube,
  arrows
}: {
  cube: typeof DEFAULT_CUBE
  arrows: Array<{
    s1: { n: number }
    s2: { n: number }
  }>
}) {
  const refs = useRef<Array<HTMLElement | null>>(Array(9).map(() => null))
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!refs.current.every(Boolean) || containerRef.current === null) return

    for (const { s1, s2 } of arrows) {
      const start = refs.current[s1.n]

      const end = refs.current[s2.n]

      if (start == null || end == null) return

      const endRect = end.getBoundingClientRect()

      const startRect = start.getBoundingClientRect()

      const angle = Math.atan2(
        endRect.top - startRect.top,
        endRect.left - startRect.left
      )

      const length = Math.sqrt(
        (endRect.top - startRect.top) ** 2 +
          (endRect.left - startRect.left) ** 2
      )

      const arrowLine = document.createElement('div')

      arrowLine.style.position = 'absolute'
      arrowLine.style.width = `${length}px`
      arrowLine.style.height = '2px'
      arrowLine.style.backgroundColor = 'black'
      arrowLine.style.zIndex = '1'
      arrowLine.style.left = `${start.offsetLeft + 8}px`
      arrowLine.style.top = `${start.offsetTop + 8}px`
      arrowLine.style.transform = `rotate(${angle}rad)`
      arrowLine.style.transformOrigin = 'left'
      containerRef.current.appendChild(arrowLine)

      for (let i = 0; i < 2; i++) {
        const arrowHeadLeft = document.createElement('div')

        arrowHeadLeft.style.position = 'absolute'
        arrowHeadLeft.style.width = '6px'
        arrowHeadLeft.style.height = '2px'
        arrowHeadLeft.style.backgroundColor = 'black'
        arrowHeadLeft.style.borderRadius = '2px'
        arrowHeadLeft.style.zIndex = '1'
        arrowHeadLeft.style.left = `${end.offsetLeft + 8}px`
        arrowHeadLeft.style.top = `${end.offsetTop + 8}px`
        arrowHeadLeft.style.transform = `rotate(${
          angle + (i === 0 ? -1 : 1) * (3 / 4) * Math.PI
        }rad)`
        arrowHeadLeft.style.transformOrigin = 'left'
        containerRef.current.appendChild(arrowHeadLeft)
      }

      const smallRect = document.createElement('div')

      smallRect.style.position = 'absolute'
      smallRect.style.width = '2px'
      smallRect.style.height = '2px'
      smallRect.style.backgroundColor = 'black'
      smallRect.style.zIndex = '1'
      smallRect.style.left = `${end.offsetLeft + 7}px`
      smallRect.style.top = `${end.offsetTop + 8}px`
      smallRect.style.transform = `rotate(${angle + (3 / 4) * Math.PI}rad)`
      containerRef.current.appendChild(smallRect)
    }
  }, [arrows])

  return (
    <Box
      bg={{
        base: colorWithOpacity('bg-200', '70%'),
        dark: colorWithOpacity('bg-800', '50%')
      }}
      p="sm"
      r="md"
    >
      <Flex
        ref={containerRef}
        direction="column"
        position="relative"
        style={{ gap: '0.125rem' }}
      >
        <Flex style={{ gap: '0.125rem' }}>
          <Box height="1.25rem" width="1.25rem" />
          {cube.back[0].reverse().map((col, i) => (
            <Flex key={i} align="end" height="1.25rem" width="1.25rem">
              <Box bg={COLORS[col]} height="0.25rem" r="full" width="1.25rem" />
            </Flex>
          ))}
          <Box height="1.25rem" width="1.25rem" />
        </Flex>
        {cube.top.map((row, i) => (
          <Flex key={i} style={{ gap: '0.125rem' }}>
            <Flex height="1.25rem" justify="end" width="1.25rem">
              <Box
                bg={COLORS[cube.left[0][i] as keyof typeof COLORS]}
                height="1.25rem"
                r="full"
                width="0.25rem"
              />
            </Flex>
            {row.map((col, j) => (
              <Box
                key={j}
                ref={el => {
                  refs.current[i * 3 + j] = el
                }}
                bg={col === 'Y' ? 'yellow-500' : 'bg-700'}
                height="1.25rem"
                r="sm"
                width="1.25rem"
              />
            ))}
            <Flex height="1.25rem" justify="start" width="1.25rem">
              <Box
                bg={COLORS[cube.right[0][2 - i] as keyof typeof COLORS]}
                height="1.25rem"
                r="full"
                width="0.25rem"
              />
            </Flex>
          </Flex>
        ))}
        <Flex style={{ gap: '0.125rem' }}>
          <Box height="1.25rem" width="1.25rem" />
          {cube.front[0].map((col, i) => (
            <Flex key={i} align="start" height="1.25rem" width="1.25rem">
              <Box bg={COLORS[col]} height="0.25rem" r="full" width="1.25rem" />
            </Flex>
          ))}
          <Box height="1.25rem" width="1.25rem" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Cube
