import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '../store/scrollStore'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function FloatingShape({ position, rotation, geometry, material, speed, phase }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    // Anti-gravity drift
    meshRef.current.position.y = position[1] + Math.sin(t * speed + phase) * 0.5
    // Continuous rotation
    meshRef.current.rotation.x += 0.002
    meshRef.current.rotation.z += 0.003
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} geometry={geometry}>
      {material}
    </mesh>
  )
}

function SceneContents() {
  const groupRef = useRef()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { viewport, mouse } = useThree()
  const scrollProgress = useScrollStore((state) => state.progress)

  // Generate random shapes
  const shapes = useMemo(() => {
    const count = prefersReducedMotion ? 2 : 8
    const items = []
    const geos = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8),
      new THREE.CapsuleGeometry(0.5, 1, 4, 16),
    ]

    for (let i = 0; i < count; i++) {
      const geo = geos[Math.floor(Math.random() * geos.length)]
      items.push({
        id: i,
        geometry: geo,
        position: [
          (Math.random() - 0.5) * viewport.width * 1.5,
          (Math.random() - 0.5) * viewport.height * 1.5,
          (Math.random() - 0.5) * 5 - 2,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        speed: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '#F4ECDC' : '#C9A84C',
      })
    }
    return items
  }, [viewport.width, viewport.height, prefersReducedMotion])

  const materialBeige = useMemo(() => <MeshTransmissionMaterial color="#F4ECDC" roughness={0.2} thickness={1} ior={1.2} transmission={0.9} />, [])
  const materialGold = useMemo(() => <MeshTransmissionMaterial color="#C9A84C" roughness={0.2} thickness={1} ior={1.2} transmission={0.9} />, [])

  useFrame(() => {
    if (!groupRef.current) return
    
    // Scroll depth and rotation
    const targetZ = scrollProgress * 5
    const targetRotY = scrollProgress * Math.PI * 0.5
    
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)

    if (!prefersReducedMotion) {
      // Pointer parallax
      const targetX = (mouse.x * viewport.width) / 10
      const targetY = (mouse.y * viewport.height) / 10
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.02)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.02)
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        prefersReducedMotion ? (
           <mesh key={shape.id} position={shape.position} rotation={shape.rotation} geometry={shape.geometry}>
             <meshStandardMaterial color={shape.color} roughness={0.2} metalness={0.8} />
           </mesh>
        ) : (
          <FloatingShape 
            key={shape.id} 
            {...shape} 
            material={shape.color === '#F4ECDC' ? materialBeige : materialGold} 
          />
        )
      ))}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#C9A84C" />
      <Environment preset="city" />
    </group>
  )
}

export default function AmbientScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-bg-deep">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContents />
      </Canvas>
    </div>
  )
}
