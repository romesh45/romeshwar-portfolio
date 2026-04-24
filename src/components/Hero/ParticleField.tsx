import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 600
const CONNECTION_DISTANCE = 0.9
const MOUSE_RADIUS = 1.4
const MOUSE_STRENGTH = 0.35

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)
  const mouse = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  // Initial positions
  const initPositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  // Velocities for drift
  const velocities = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.002
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }
    return arr
  }, [])

  // Current positions (mutable)
  const positions = useMemo(() => new Float32Array(initPositions), [initPositions])

  // Colors: mix violet and cyan
  const colors = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random()
      if (t < 0.5) {
        // neon-violet #7B61FF
        arr[i * 3] = 0.482; arr[i * 3 + 1] = 0.38; arr[i * 3 + 2] = 1.0
      } else if (t < 0.75) {
        // cyber-cyan #00D9FF
        arr[i * 3] = 0.0; arr[i * 3 + 1] = 0.851; arr[i * 3 + 2] = 1.0
      } else {
        // star-white
        arr[i * 3] = 0.9; arr[i * 3 + 1] = 0.9; arr[i * 3 + 2] = 0.9
      }
    }
    return arr
  }, [])

  // Line geometry (pre-allocate max segments)
  const MAX_LINES = 2000
  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 6), [])
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 6), [])

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    return geo
  }, [linePositions, lineColors])

  // Track mouse in world space
  useThree(({ gl }) => {
    const canvas = gl.domElement
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1
      mouse.current.x = nx * 7
      mouse.current.y = ny * 4
    }
    canvas.addEventListener('mousemove', onMove)
    return () => canvas.removeEventListener('mousemove', onMove)
  })

  useFrame(() => {
    // Update particle positions with drift + mouse repulsion
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const xi = i * 3, yi = i * 3 + 1, zi = i * 3 + 2

      positions[xi] += velocities[xi]
      positions[yi] += velocities[yi]
      positions[zi] += velocities[zi]

      // Wrap around edges
      if (positions[xi] > 7) positions[xi] = -7
      if (positions[xi] < -7) positions[xi] = 7
      if (positions[yi] > 4) positions[yi] = -4
      if (positions[yi] < -4) positions[yi] = 4

      // Mouse attraction/repulsion
      const dx = positions[xi] - mouse.current.x
      const dy = positions[yi] - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_RADIUS && dist > 0.01) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_STRENGTH
        positions[xi] += (dx / dist) * force
        positions[yi] += (dy / dist) * force
      }
    }

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry
      const posAttr = geo.attributes.position as THREE.BufferAttribute
      posAttr.array = positions
      posAttr.needsUpdate = true
    }

    // Recalculate lines
    let lineCount = 0
    for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINES - 1; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineCount < MAX_LINES - 1; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < CONNECTION_DISTANCE) {
          const alpha = 1 - d / CONNECTION_DISTANCE
          const li = lineCount * 6
          linePositions[li] = positions[i * 3]
          linePositions[li + 1] = positions[i * 3 + 1]
          linePositions[li + 2] = positions[i * 3 + 2]
          linePositions[li + 3] = positions[j * 3]
          linePositions[li + 4] = positions[j * 3 + 1]
          linePositions[li + 5] = positions[j * 3 + 2]
          // Color: violet-tinted, alpha via color intensity
          const c = alpha * 0.5
          lineColors[li] = c * 0.482; lineColors[li + 1] = c * 0.38; lineColors[li + 2] = c * 1.0
          lineColors[li + 3] = c * 0.482; lineColors[li + 4] = c * 0.38; lineColors[li + 5] = c * 1.0
          lineCount++
        }
      }
    }

    if (linesRef.current) {
      const posAttr = lineGeo.attributes.position as THREE.BufferAttribute
      const colAttr = lineGeo.attributes.color as THREE.BufferAttribute
      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
      linesRef.current.geometry.setDrawRange(0, lineCount * 2)
    }
  })

  const pointGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  return (
    <>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.35} depthWrite={false} />
      </lineSegments>
    </>
  )
}
