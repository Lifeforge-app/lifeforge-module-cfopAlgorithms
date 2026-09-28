import { useNavigate } from 'react-router'

import {
  Box,
  Card,
  Flex,
  GoBackButton,
  Stack,
  Text,
  colorWithOpacity
} from '@lifeforge/ui'

import { algsetAlgs, algsetScrambles } from '../../algorithms/OLL'
import { DEFAULT_CUBE, applyMoves } from '../../functions/genCube'

const getCellColor = (isYellow: boolean) =>
  isYellow ? 'yellow-500' : ({ base: 'bg-400', dark: 'bg-700' } as const)

function CFOPF2L() {
  const navigate = useNavigate()

  return (
    <>
      <Stack as="header" gap="xs">
        <GoBackButton
          onClick={() => {
            navigate('/cfop-algorithms')
          }}
        />
        <Flex align="center" as="h1" gap="sm">
          <img
            alt="OLL"
            src="/assets/apps/CFOPAlgorithms/landing-oll.webp"
            style={{ height: '4rem', width: '4rem' }}
          />
          <Text size={{ base: '2xl', sm: '3xl' }} weight="semibold">
            Orientation of the Last Layer
          </Text>
        </Flex>
      </Stack>
      <Stack as="ul" gap="sm" my="xl">
        {algsetScrambles.map((algset, index) => {
          let cube = DEFAULT_CUBE
          cube = applyMoves(cube, algset[0])

          return (
            <Card
              key={index}
              align="center"
              as="li"
              direction="row"
              gap="xl"
              justify="between"
            >
              <Flex align="center" gap="xl">
                <Box
                  bg={{
                    base: colorWithOpacity('bg-200', '70%'),
                    dark: colorWithOpacity('bg-800', '50%')
                  }}
                  p="sm"
                  r="md"
                >
                  <Flex direction="column" style={{ gap: '0.125rem' }}>
                    <Flex style={{ gap: '0.125rem' }}>
                      <Box height="1.25rem" width="1.25rem" />
                      {cube.back[0].reverse().map((col, i) => (
                        <Flex
                          key={i}
                          align="end"
                          height="1.25rem"
                          width="1.25rem"
                        >
                          <Box
                            bg={getCellColor(col === 'Y')}
                            height="0.25rem"
                            r="full"
                            width="1.25rem"
                          />
                        </Flex>
                      ))}
                      <Box height="1.25rem" width="1.25rem" />
                    </Flex>
                    {cube.top.map((row, i) => (
                      <Flex key={i} style={{ gap: '0.125rem' }}>
                        <Flex height="1.25rem" justify="end" width="1.25rem">
                          <Box
                            bg={getCellColor(cube.left[0][i] === 'Y')}
                            height="1.25rem"
                            r="full"
                            width="0.25rem"
                          />
                        </Flex>
                        {row.map((col, i) => (
                          <Box
                            key={i}
                            bg={getCellColor(col === 'Y')}
                            height="1.25rem"
                            r="sm"
                            width="1.25rem"
                          />
                        ))}
                        <Flex height="1.25rem" justify="start" width="1.25rem">
                          <Box
                            bg={getCellColor(cube.right[0][2 - i] === 'Y')}
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
                        <Flex
                          key={i}
                          align="start"
                          height="1.25rem"
                          width="1.25rem"
                        >
                          <Box
                            bg={getCellColor(col === 'Y')}
                            height="0.25rem"
                            r="full"
                            width="1.25rem"
                          />
                        </Flex>
                      ))}
                      <Box height="1.25rem" width="1.25rem" />
                    </Flex>
                  </Flex>
                </Box>
                <Text size="xl">{algsetAlgs[index].alg[0]}</Text>
              </Flex>
              <Text
                color="muted"
                display={{ sm: 'block', base: 'none' }}
                mr="xl"
                size="xl"
              >
                {algsetAlgs[index].group}
              </Text>
            </Card>
          )
        })}
      </Stack>
    </>
  )
}

export default CFOPF2L
