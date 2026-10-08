import { Box, Card, Flex, Text } from '@lifeforge/ui'

import { algsetAlgs } from '../../algorithms/PLL'
import { type DEFAULT_CUBE } from '../../functions/genCube'
import Cube from './Cube'

function AlgEntry({
  cube,
  index
}: {
  cube: typeof DEFAULT_CUBE
  index: number
}) {
  const algs = algsetAlgs[index]

  if (!algs) return null

  return (
    <Card align="center" as="li" direction="row" gap="xl" justify="between">
      <Flex align="center" gap="xl">
        <Cube arrows={algs.arrows} cube={cube} />
        <Box>
          <Text as="h4" color="primary" size="lg" weight="semibold">
            {algs.name}
          </Text>
          <Text size="xl">{algs.alg[0]}</Text>
        </Box>
      </Flex>
      <Text
        color="muted"
        display={{ sm: 'block', base: 'none' }}
        mr="xl"
        size="xl"
      >
        {algs.group}
      </Text>
    </Card>
  )
}

export default AlgEntry
