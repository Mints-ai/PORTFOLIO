import React, { useRef } from 'react'
import { useScroll, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Hero3D from './Hero3D'
import Work3D from './Work3D'

export default function ScrollJourney() {
  const groupRef = useRef()
  const scroll = useScroll()

  // We place Hero at Y=0, Work at Y=-15.
  // When scroll progresses from 0 to 1, we move the group up by 15 units.
  const SECTION_SPACING = 15
  
  useFrame(() => {
    if (!groupRef.current || !scroll) return
    
    // scroll.offset goes from 0 to 1
    const yOffset = scroll.offset * SECTION_SPACING
    
    // Smooth lerp for the y position
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, yOffset, 0.1)
  })

  return (
    <>
      <group ref={groupRef}>
        <Hero3D position={[0, 0, 0]} />
        <Work3D position={[0, -SECTION_SPACING, 0]} />
        
        {/* We can add more sections here like Services3D at -SECTION_SPACING * 2 */}
      </group>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#C9A84C" />
      <directionalLight position={[-5, 0, -5]} intensity={1} color="#1E3D27" />
      <Environment preset="city" />
    </>
  )
}
