import { useNavigate } from 'react-router'

import { Flex, GoBackButton, Stack, Text } from '@lifeforge/ui'

import { algsetScrambles } from '../../algorithms/PLL'
import { DEFAULT_CUBE, applyMoves } from '../../functions/genCube'
import AlgEntry from './AlgEntry'

function CFOPPLL() {
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
            alt="PLL"
            src="/assets/apps/CFOPAlgorithms/landing-pll.webp"
            style={{ height: '4rem', width: '4rem' }}
          />
          <Text size={{ base: '2xl', sm: '3xl' }} weight="semibold">
            Permutation of the Last Layer
          </Text>
        </Flex>
      </Stack>
      <Stack as="ul" gap="sm" my="xl">
        {algsetScrambles.map((algset, index) => {
          let cube = DEFAULT_CUBE
          cube = applyMoves(cube, algset[0])

          return <AlgEntry key={index} cube={cube} index={index} />
        })}
      </Stack>
    </>
  )
}

export default CFOPPLL
