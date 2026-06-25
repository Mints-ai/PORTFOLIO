import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CameraRig from './CameraRig'
import { useVaultStore } from '../store/useVaultStore'


gsap.registerPlugin(ScrollTrigger)

function HexIrisPanel({ index, material }) {
  const groupRef = useRef()
  const { grantAccess, accessGranted } = useVaultStore()
  const angle = (index * Math.PI * 2) / 6
  
  // Animation state
  const [openProgress, setOpenProgress] = useState(0)

  // Create a triangular panel
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(2.5, 4.33)
    shape.lineTo(-2.5, 4.33)
    shape.lineTo(0, 0)

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()
    return geo
  }, [])

  useEffect(() => {
    // Fixed 4-second animation to open the iris
    const tl = gsap.to({ p: 0 }, {
      p: 1,
      duration: 3.5, // 3.5 seconds opening
      delay: 0.5, // Wait a moment before opening
      ease: 'power3.inOut',
      onUpdate: function() {
        setOpenProgress(this.targets()[0].p)
      },
      onComplete: () => {
        if (index === 0 && !accessGranted) {
          grantAccess() // Unlock scroll and parallax
        }
      }
    })
    return () => tl.kill()
  }, [index, accessGranted, grantAccess])

  useFrame(() => {
    if (!groupRef.current) return
    
    // Iris opens by translating outward and rotating slightly
    const openDist = openProgress * 8
    const rot = openProgress * Math.PI * 0.5

    groupRef.current.position.x = Math.cos(angle) * (1.5 + openDist)
    groupRef.current.position.y = Math.sin(angle) * (1.5 + openDist)
    
    // Counter-rotate as they open
    groupRef.current.rotation.z = angle + Math.PI / 2 + (index % 2 === 0 ? rot : -rot)
  })

  return (
    <mesh ref={groupRef} geometry={geometry}>
      {material}
      {/* Edge highlight */}
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#00FF9D" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  )
}

function HexIris() {
  const materialGold = useMemo(() => <MeshTransmissionMaterial color="#C9A84C" roughness={0.1} thickness={2} ior={1.5} transmission={0.9} resolution={256} samples={4} />, [])
  const groupRef = useRef()

  return (
    <group ref={groupRef} position={[0, 0, 2]}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <HexIrisPanel key={i} index={i} material={materialGold} />
      ))}
    </group>
  )
}

function VaultWalls() {
  // Placeholder vault geometry. We'll extend this in other files.
  return (
    <group>
      {/* Create levels of the vault as massive rings/shafts */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[0, -i * 5 + 5, -i * 2 - 5]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[18, 1, 16, 64]} />
          <meshStandardMaterial color="#08140C" metalness={0.8} roughness={0.2} />
          {/* Neon accent rings */}
          <mesh position={[0, 0, 1.1]}>
            <torusGeometry args={[17.5, 0.05, 16, 64]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#C9A84C" : "#00FF9D"} transparent opacity={0.4} />
          </mesh>
        </mesh>
      ))}
    </group>
  )
}

function Particles({ count = 300 }) {
  const pointsRef = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50 // Spread vertically for the descent
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 15 // Spread along Z for the new flight path
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A84C"
        size={0.06}
        sizeAttenuation={true}
        transparent
        opacity={0.35}
      />
    </points>
  )
}

export default function SceneJourney() {
  const groupRef = useRef()

  return (
    <>
      <CameraRig />
      <group ref={groupRef}>
        <HexIris />
        <VaultWalls />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={2} color="#C9A84C" />
        <directionalLight position={[0, -10, 5]} intensity={1} color="#00FF9D" />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#08140C" />
        
        <Environment preset="night" />
        <Particles count={300} />
      </group>
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
      </EffectComposer>
    </>
  )
}
