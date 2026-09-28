import { useNavigate } from 'react-router'

import {
  Box,
  Card,
  Flex,
  GoBackButton,
  Grid,
  Stack,
  Text,
  colorWithOpacity
} from '@lifeforge/ui'

import Cube from './Cube'

const sections: Array<{
  name: React.ReactElement | string
  subsections: Array<{
    name: React.ReactElement | string
    subsubsections: Array<{
      name: React.ReactElement | string
      desc?: React.ReactElement | string
      algs: Array<{
        alg: string[]
        warn?: number[]
        pattern: string
      }>
    }>
  }>
}> = [
  {
    name: 'BASIC F2L',
    subsections: [
      {
        name: '1A. Both pieces are on top.',
        subsubsections: [
          {
            name: (
              <>
                White sticker facing{' '}
                <Text as="span" color="primary">
                  Up
                </Text>
              </>
            ),
            algs: [
              {
                alg: ["U2 (R U R') U (R U' R')", "y F R U2 R' F'"],
                pattern: '--grr-rr- r---gg-gg ---r----w'
              },
              {
                alg: ["y U2 (L' U' L) U' (L' U L)", "F' L' U2 L F"],
                pattern: '--grr-rr- r---gg-gg -g------w'
              },
              {
                alg: ["U (R U2 R') U (R U' R')"],
                pattern: '--grr-rr- r---gg-gg -r------w'
              },
              {
                alg: ["y U' (L' U2 L) U' (L' U L)"],
                pattern: '--grr-rr- r---gg-gg ---g----w'
              },
              {
                alg: [
                  "U (R U' R') U' (R U' R' U R U' R')",
                  "U (F R' F' R) U (R U R')",
                  "U2 (L F' L' F) (R U R')",
                  "y U L' U' (L2 F' L' F) (L' U L)",
                  "y F' (U' L' U L) F (L' U L)",
                  "y' U2 R U' R' U' S R' S'"
                ],
                warn: [2, 5],
                pattern: '-ggrr-rr- r---gg-gg -------rw'
              },
              {
                alg: [
                  "y U' (L' U L) U (L' U L U' L' U L)",
                  "y U' (F' L F L') U' (L' U' L)",
                  "y U2 (R F' R' F) (L' U' L)",
                  "U' R U (R2' F R F') (R U' R')",
                  "F (U R U' R') F' (R U' R')",
                  "y2 U2 L' U L U S' L S"
                ],
                warn: [2, 5],
                pattern: '--grr-rr- rr--gg-gg -----g--w'
              },
              {
                alg: ["(R U2 R') U' (R U R')"],
                pattern: '--grr-rr- rg--gg-gg -----r--w'
              },
              {
                alg: ["y (L' U2 L) U (L' U' L)"],
                pattern: '-rgrr-rr- r---gg-gg -------gw'
              }
            ]
          },
          {
            name: (
              <>
                White sticker facing{' '}
                <Text as="span" color="primary">
                  Side / Front
                </Text>
              </>
            ),
            desc: (
              <>
                Stickers on the U face are{' '}
                <Text as="span" color="primary">
                  different
                </Text>
              </>
            ),
            algs: [
              {
                alg: ["(R U R')"],
                pattern: '--rrr-rr- w---gg-gg -r------g'
              },
              {
                alg: ["y (L' U' L)"],
                pattern: '--wrr-rr- g---gg-gg ---g----r'
              },
              {
                alg: [
                  "U' (R U R') U (R U R')",
                  "U2 (R U' R') U' (R U R')",
                  "R' U R2 U R'"
                ],
                warn: [2],
                pattern: '--rrr-rr- w---gg-gg ---r----g'
              },
              {
                alg: [
                  "y U (L' U' L) U' (L' U' L)",
                  "y U2 (L' U L) U (L' U' L)",
                  "y L U' L2' U' L"
                ],
                warn: [2],
                pattern: '--wrr-rr- g---gg-gg -g------r'
              },
              {
                alg: [
                  "R' U2 R2 U R2' U R",
                  "(R U' R') U (R U' R') U2 (R U' R')",
                  "R' U2 R2 U R'",
                  "y U L' U2 L U' y' R U R'"
                ],
                warn: [2],
                pattern: '-grrr-rr- w---gg-gg -------rg'
              },
              {
                alg: [
                  "y L U2 L2' U' L2 U' L'",
                  "y (L' U L) U' (L' U L) U2 (L' U L)",
                  "y L U2 L2' U' L",
                  "U' (R U2 R') U y (L' U' L)"
                ],
                warn: [2],
                pattern: '--wrr-rr- gr--gg-gg -----g--r'
              },
              {
                alg: ["U' (R U' R') U (R U R')"],
                pattern: '--rrr-rr- wg--gg-gg -----r--g'
              },
              {
                alg: ["y U (L' U L) U' (L' U' L)"],
                pattern: '-rwrr-rr- g---gg-gg -------gr'
              }
            ]
          }
        ]
      }
    ]
  }
]

function CFOPF2L(): React.ReactElement {
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
            alt="F2L"
            src="/assets/apps/CFOPAlgorithms/landing-f2l.webp"
            style={{ height: '4rem', width: '4rem' }}
          />
          <Text size={{ base: '2xl', sm: '3xl' }} weight="semibold">
            First Two Layers
          </Text>
        </Flex>
      </Stack>
      {sections.map((section, i) => (
        <Stack key={`section-${i + 1}`} as="section" gap="sm" my="xl">
          <Text
            align="center"
            as="p"
            color="primary"
            size="lg"
            tracking="wider"
            weight="semibold"
          >
            SECTION {i + 1}
          </Text>
          <Text
            align="center"
            as="h2"
            size="4xl"
            tracking="widest"
            weight="semibold"
          >
            {section.name}
          </Text>
          {section.subsections.map((subsection, j) => (
            <Stack key={`subsection-${j + 1}`} gap="xl">
              <Text
                align="center"
                as="h3"
                pt="xl"
                size="2xl"
                tracking="wider"
                weight="semibold"
              >
                {subsection.name}
              </Text>
              {subsection.subsubsections.map((subsubsection, k) => (
                <Box key={`subsubsection-${k + 1}`}>
                  <Text
                    as="h4"
                    pt="md"
                    size="2xl"
                    tracking="wider"
                    weight="semibold"
                  >
                    {subsubsection.name}
                  </Text>
                  <Text as="p" color="muted" mt="sm" size="lg">
                    {subsubsection.desc}
                  </Text>
                  <Grid as="ul" gap="sm" mt="md" templateCols={{ sm: 2 }}>
                    {subsubsection.algs.map(({ alg, pattern, warn }, i) => (
                      <Card
                        key={i}
                        align="center"
                        as="li"
                        direction="row"
                        gap="lg"
                      >
                        <Box
                          shadow
                          bg={{
                            base: 'bg-100',
                            dark: colorWithOpacity('bg-800', '50%')
                          }}
                          p="xs"
                          pb="sm"
                          r="md"
                        >
                          <Cube pattern={pattern} />
                        </Box>
                        <Stack gap="sm">
                          {alg.map((a, j) => (
                            <Text
                              key={a}
                              color={warn?.includes(j) ? 'red-400' : undefined}
                              size="lg"
                              weight="medium"
                            >
                              {a}
                            </Text>
                          ))}
                        </Stack>
                      </Card>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Stack>
          ))}
        </Stack>
      ))}
    </>
  )
}

export default CFOPF2L
