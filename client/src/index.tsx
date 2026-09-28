import { Link } from 'react-router'

import { Card, Grid, ModuleHeader, Text } from '@lifeforge/ui'

function CFOPAlgorithms() {
  return (
    <>
      <ModuleHeader />
      <Grid
        gap="lg"
        mt="lg"
        templateCols={{ base: 1, md: 2, lg: 3 }}
        width="100%"
      >
        {Object.entries({
          F2L: 'First Two Layers',
          OLL: 'Orientation of the Last Layer',
          PLL: 'Permutation of the Last Layer'
        }).map(([key, value]) => (
          <Card
            key={key}
            align="center"
            as={Link}
            justify="center"
            to={`/cfop-algorithms/${key.toLowerCase()}`}
          >
            <img
              alt={key}
              src={`/assets/apps/CFOPAlgorithms/landing-${key.toLowerCase()}.webp`}
              style={{ height: '12rem', marginBottom: '2rem', width: '12rem' }}
            />
            <Text
              align="center"
              as="h2"
              size="5xl"
              tracking="wider"
              weight="semibold"
            >
              {key}
            </Text>
            <Text align="center" as="p" color="muted" mt="sm" size="xl">
              {value}
            </Text>
          </Card>
        ))}
      </Grid>
    </>
  )
}

export default CFOPAlgorithms
