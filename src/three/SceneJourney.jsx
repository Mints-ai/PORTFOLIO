import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

function AbstractShape({ position, rotation, geometry, material, speed, phase, color }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    // Slow drift
    groupRef.current.position.y = position[1] + Math.sin(t * speed + phase) * 0.2
    // Continuous rotation
    groupRef.current.rotation.x += 0.001 * speed
    groupRef.current.rotation.z += 0.002 * speed
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Glass Inner Shape */}
      <mesh geometry={geometry}>
        {material}
      </mesh>
      {/* Sci-fi wireframe shell scaled slightly up */}
      <mesh geometry={geometry} scale={1.03}>
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.12} 
        />
      </mesh>
    </group>
  )
}

function Particles({ count = 120 }) {
  const pointsRef = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008
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

function Grid3D() {
  const planeRef = useRef()
  useFrame((state) => {
    if (planeRef.current) {
      planeRef.current.rotation.z = state.clock.getElapsedTime() * 0.01
    }
  })
  return (
    <mesh ref={planeRef} position={[0, -12, -8]} rotation={[-Math.PI / 2.3, 0, 0]}>
      <planeGeometry args={[120, 120, 40, 40]} />
      <meshBasicMaterial color="#1E3D27" wireframe transparent opacity={0.12} />
    </mesh>
  )
}

export default function SceneJourney() {
  const groupRef = useRef()
  const { viewport } = useThree()
  
  // Track mouse for parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Create geometric objects for the background journey
  const shapes = useMemo(() => {
    const items = []
    const geos = [
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.TorusKnotGeometry(1.2, 0.4, 64, 8),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TetrahedronGeometry(1.5, 0),
      new THREE.SphereGeometry(1, 32, 32)
    ]

    for (let i = 0; i < 8; i++) {
      const geo = geos[Math.floor(Math.random() * geos.length)]
      items.push({
        id: i,
        geometry: geo,
        position: [
          (Math.random() - 0.5) * viewport.width * 1.5,
          -Math.random() * viewport.height * 2 + viewport.height / 2, 
          (Math.random() - 0.5) * 8 - 4,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        speed: 0.1 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.3 ? '#1E3D27' : '#C9A84C',
      })
    }
    return items
  }, [viewport.width, viewport.height])

  // Optimized MeshTransmissionMaterial for performance while still looking like glass
  const materialGreen = useMemo(() => <MeshTransmissionMaterial color="#1E3D27" roughness={0.2} thickness={1.5} ior={1.5} transmission={0.9} resolution={256} samples={4} />, [])
  const materialGold = useMemo(() => <MeshTransmissionMaterial color="#C9A84C" roughness={0.3} thickness={1} ior={1.2} transmission={0.8} resolution={256} samples={4} />, [])

  useEffect(() => {
    const handleScroll = () => {
      if (groupRef.current) {
        const scrollY = window.scrollY
        const maxScroll = document.body.scrollHeight - window.innerHeight
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0
        
        groupRef.current.rotation.y = progress * Math.PI * 0.5
        groupRef.current.rotation.x = progress * Math.PI * 0.1
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Apply mouse parallax
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mousePosition.x * 0.5, 0.05)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mousePosition.y * 0.5, 0.05)
    }
  })

  return (
    <>
      <group ref={groupRef}>
        {shapes.map((shape) => (
          <Float key={shape.id} speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <AbstractShape 
              {...shape} 
              material={shape.color === '#1E3D27' ? materialGreen : materialGold} 
            />
          </Float>
        ))}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#C9A84C" />
        <directionalLight position={[-5, 0, -5]} intensity={1} color="#1E3D27" />
        <Environment preset="city" />
        <Particles count={150} />
        <Grid3D />
      </group>
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
      </EffectComposer>
    </>
  )
}
