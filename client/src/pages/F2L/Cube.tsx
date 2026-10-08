import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const RED = 0xef4444

const ORANGE = 0xf97316

const YELLOW = 0xfacc15

const GREEN = 0x22c55e

const BLUE = 0x0ea5e9

const WHITE = 0xffffff

const GRAY = 0x404040

type Sticker = 'r' | 'o' | 'y' | 'g' | 'b' | 'w' | '-'

type Row = [Sticker, Sticker, Sticker]

type Face = [Row, Row, Row]

type Side = [Face, Face, Face]

const COLORS: Record<Sticker, number> = {
  r: RED,
  o: ORANGE,
  y: YELLOW,
  g: GREEN,
  b: BLUE,
  w: WHITE,
  '-': GRAY
}

function Cube({ pattern }: { pattern: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current === null) return

    const side: Side = pattern.split(' ').map(
      face =>
        [
          [face[0], face[1], face[2]],
          [face[3], face[4], face[5]],
          [face[6], face[7], face[8]]
        ] as Face
    ) as Side

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()

    renderer.setClearColor(0xffffff, 0)
    renderer.setSize(72, 72)
    renderer.setPixelRatio(window.devicePixelRatio)
    ref.current.appendChild(renderer.domElement)

    const cubeSize = 0.6

    const edgeThickness = 0.04

    const borderColor = 0x000000

    const rubiksCube = new THREE.Group()

    function createMaterials(
      x: number,
      y: number,
      z: number
    ): THREE.Material[] {
      const materials = [
        new THREE.MeshBasicMaterial({ color: GRAY }),
        new THREE.MeshBasicMaterial({ color: GRAY }),
        new THREE.MeshBasicMaterial({ color: GRAY }),
        new THREE.MeshBasicMaterial({ color: GRAY }),
        new THREE.MeshBasicMaterial({ color: GRAY }),
        new THREE.MeshBasicMaterial({ color: GRAY })
      ]

      for (const i of [0, 1, 2] as const) {
        for (const j of [0, 1, 2] as const) {
          if (x === 2 - i && y === 2 && z === j) {
            materials[2] = new THREE.MeshBasicMaterial({
              color: COLORS[side[2][i][j]]
            })
          }
        }
      }

      for (const i of [0, 1, 2] as const) {
        for (const j of [0, 1, 2] as const) {
          if (x === j && y === 2 - i && z === 2) {
            materials[4] = new THREE.MeshBasicMaterial({
              color: COLORS[side[1][i][j]]
            })
          }
        }
      }

      for (const i of [0, 1, 2] as const) {
        for (const j of [0, 1, 2] as const) {
          if (x === 0 && y === 2 - i && z === j) {
            materials[1] = new THREE.MeshBasicMaterial({
              color: COLORS[side[0][i][j]]
            })
          }
        }
      }

      return materials
    }

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)

          const materials = createMaterials(x, y, z)

          const cube = new THREE.Mesh(geometry, materials)

          const borderGeometry = new THREE.BoxGeometry(
            cubeSize + edgeThickness * 2,
            cubeSize + edgeThickness * 2,
            cubeSize + edgeThickness * 2
          )

          const borderMaterial = new THREE.MeshBasicMaterial({
            color: borderColor,
            side: THREE.BackSide
          })

          const border = new THREE.Mesh(borderGeometry, borderMaterial)

          const edgeMaterial = new THREE.MeshBasicMaterial({
            color: borderColor
          })

          cube.position.set(
            (x - 1) * (cubeSize + edgeThickness * 2),
            (y - 1) * (cubeSize + edgeThickness * 2),
            (z - 1) * (cubeSize + edgeThickness * 2)
          )
          border.position.copy(cube.position)

          rubiksCube.add(cube)
          rubiksCube.add(border)

          if (x === 0 && z === 2) {
            const edgeGeometry = new THREE.BoxGeometry(
              edgeThickness,
              cubeSize + edgeThickness,
              edgeThickness
            )

            const edge = new THREE.Mesh(edgeGeometry, edgeMaterial)

            edge.position.set(-cubeSize / 2, 0, cubeSize / 2)
            edge.position.add(cube.position)
            rubiksCube.add(edge)
          }

          if (y === 2 && z === 2) {
            const edgeGeometry = new THREE.BoxGeometry(
              cubeSize + edgeThickness,
              edgeThickness,
              edgeThickness
            )

            const edge = new THREE.Mesh(edgeGeometry, edgeMaterial)

            edge.position.set(0, cubeSize / 2, cubeSize / 2)
            edge.position.add(cube.position)
            rubiksCube.add(edge)
          }

          if (y === 2 && x === 0) {
            const edgeGeometry = new THREE.BoxGeometry(
              edgeThickness,
              edgeThickness,
              cubeSize + edgeThickness
            )

            const edge = new THREE.Mesh(edgeGeometry, edgeMaterial)

            edge.position.set(-cubeSize / 2, cubeSize / 2, 0)
            edge.position.add(cube.position)
            rubiksCube.add(edge)
          }
        }
      }
    }

    rubiksCube.rotation.x = Math.PI / 5
    rubiksCube.rotation.y = Math.PI / 4

    scene.add(rubiksCube)

    camera.position.z = 5

    renderer.render(scene, camera)

    return () => {
      scene.remove(rubiksCube)
      renderer.dispose()

      ref.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={ref} />
}

export default Cube
