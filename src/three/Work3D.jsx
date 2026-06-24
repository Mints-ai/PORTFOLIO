import React, { useRef, useState } from 'react'
import { Text, Image, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const projects = [
  { id: 1, title: 'Quantum OS', category: 'Product Design', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1024&auto=format&fit=crop', position: [-3, 0, 0] },
  { id: 2, title: 'Aura Protocol', category: 'Web3 Platform', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1024&auto=format&fit=crop', position: [3, 0, 0] },
  { id: 3, title: 'Synergy App', category: 'Mobile App', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1024&auto=format&fit=crop', position: [-3, -5, 0] },
  { id: 4, title: 'Lumina', category: 'Brand Identity', url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1024&auto=format&fit=crop', position: [3, -5, 0] }
]

function ProjectCard({ project }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth hover rotation
      const targetScale = hovered ? 1.05 : 1
      const targetZ = hovered ? 1 : 0
      
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1)
      
      // Slight floating motion
      groupRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2 + project.id) * 0.002
    }
  })

  return (
    <group 
      ref={groupRef} 
      position={project.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => alert(`Clicked ${project.title}`)}
    >
      <Image 
        url={project.url} 
        transparent 
        opacity={hovered ? 1 : 0.8}
        scale={[4, 5]} 
      />
      <Text
        position={[0, -3, 0.1]}
        fontSize={0.4}
        color="#F4ECDC"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
      >
        {project.title}
      </Text>
      <Text
        position={[0, -3.5, 0.1]}
        fontSize={0.2}
        color="#C9A84C"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
      >
        {project.category}
      </Text>
    </group>
  )
}

export default function Work3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Text
        position={[0, 4, 0]}
        fontSize={1}
        color="#C9A84C"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
      >
        Selected Case Studies
      </Text>
      {projects.map(p => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </group>
  )
}
