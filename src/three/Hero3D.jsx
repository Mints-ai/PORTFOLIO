import React, { useRef } from 'react'
import { Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Hero3D({ position = [0, 0, 0] }) {
  const meshRef = useRef()
  const textGroupRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Large abstract glass shape behind text */}
        <mesh ref={meshRef} position={[0, 0, -2]}>
          <torusKnotGeometry args={[3, 1, 100, 16]} />
          <MeshTransmissionMaterial 
            color="#1E3D27" 
            roughness={0.2} 
            thickness={2} 
            ior={1.5} 
            transmission={1} 
            transparent={true}
          />
        </mesh>
      </Float>

      <group ref={textGroupRef} position={[0, 0, 0]}>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.8}
          color="#F4ECDC"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
        >
          We build futuristic
        </Text>
        <Text
          position={[0, 0, 0]}
          fontSize={1.2}
          color="#C9A84C"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
        >
          digital experiences
        </Text>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.8}
          color="#F4ECDC"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
        >
          that defy gravity.
        </Text>
      </group>
    </group>
  )
}
