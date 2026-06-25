import React, { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

import { projects, ProjectModal } from '../sections/Work'
import { playTransitionSound } from '../lib/synth'

export default function Level01CaseFiles() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <group position={[0, 0, 0]}>
      {projects.map((project, index) => {
        const total = projects.length
        const zPos = 2 - (index / total) * 14
        const xPos = (index % 2 === 0 ? -1 : 1) * (1.5 + Math.random() * 0.5)
        const yPos = 0.6 + (Math.random() - 0.5) * 1.5
        const rotY = index % 2 === 0 ? Math.PI / 6 : -Math.PI / 6

        return (
          <group key={project.id} position={[xPos, yPos, zPos]} rotation={[0, rotY, 0]}>
            <Html transform occlude wrapperClass="case-file-html" distanceFactor={1.5}>
              <div 
                className="w-64 h-48 bg-bg-deep/80 border border-glass-border p-2 cursor-pointer hover:border-accent-gold transition-colors flex flex-col pointer-events-auto"
                onClick={() => {
                  setSelectedProject(project)
                  playTransitionSound()
                }}
              >
                <div className="w-full h-32 relative overflow-hidden">
                  <img src={project.image} className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100" />
                </div>
                <div className="mt-2 text-[10px] font-mono text-beige-100 uppercase truncate">
                  {project.title}
                </div>
                <div className="text-[8px] text-accent-gold">
                  {project.category}
                </div>
              </div>
            </Html>
          </group>
        )
      })}
      
      {/* The HTML modal is rendered inside an Html container that acts like a normal DOM overlay */}
      <Html wrapperClass="modal-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: selectedProject ? 'auto' : 'none' }}>
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Html>
    </group>
  )
}
