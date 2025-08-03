"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

export function CursedEnergyField() {
  const ref = useRef<THREE.Points>(null!)
  const particleCount = 800

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Create swirling pattern
      const radius = Math.random() * 15 + 5
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 20

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      // Alternate between blue (Gojo) and red (Sukuna) energy
      if (Math.random() > 0.5) {
        // Blue cursed energy
        colors[i * 3] = 0.2 // R
        colors[i * 3 + 1] = 0.6 // G
        colors[i * 3 + 2] = 1.0 // B
      } else {
        // Red cursed energy
        colors[i * 3] = 1.0 // R
        colors[i * 3 + 1] = 0.2 // G
        colors[i * 3 + 2] = 0.2 // B
      }
    }

    return { positions, colors }
  }, [particleCount])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </Points>
  )
}
