"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Plane } from "@react-three/drei"
import * as THREE from "three"

export function CharacterSilhouette() {
  const gojoRef = useRef<THREE.Mesh>(null!)
  const sukunaRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (gojoRef.current) {
      gojoRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2 - 6
      gojoRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05
    }
    if (sukunaRef.current) {
      sukunaRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 2 + 6
      sukunaRef.current.material.opacity = 0.1 + Math.cos(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <>
      {/* Gojo Silhouette */}
      <Plane ref={gojoRef} args={[3, 6]} position={[-6, 0, -5]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </Plane>

      {/* Sukuna Silhouette */}
      <Plane ref={sukunaRef} args={[3, 6]} position={[6, 0, -5]}>
        <meshBasicMaterial color="#ef4444" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </Plane>
    </>
  )
}
