import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useVaultStore } from '../store/useVaultStore'

const WAYPOINTS = [
  { progress: 0.00, pos: [0, 0, 6], lookAt: [0, 0, 0], fov: 42, ease: "none" }, // Hero Start
  { progress: 0.15, pos: [0, 0, 6], lookAt: [0, 0, 0], fov: 42, ease: "none" }, // Hero Hold (Iris opening)
  { progress: 0.20, pos: [0, 0.4, 4.2], lookAt: [0, 0, -2], fov: 45, ease: "power2.inOut" }, // Enter Level 01
  { progress: 0.40, pos: [0, 0.6, -10], lookAt: [0, 0.6, -14], fov: 48, ease: "none" }, // Level 01 End
  { progress: 0.45, pos: [0, -0.5, -10], lookAt: [0, -0.5, -13], fov: 46, ease: "power1.inOut" }, // Enter Level 02
  { progress: 0.65, pos: [0, -0.5, -21], lookAt: [0, -0.5, -25], fov: 44, ease: "none" }, // Level 02 End
  { progress: 0.70, pos: [0, 1, -21], lookAt: [0, 1.5, -25], fov: 46, ease: "power1.inOut" }, // Enter Level 03
  { progress: 0.85, pos: [0, 1.4, -25], lookAt: [0, 1.2, -28], fov: 46, ease: "none" }, // Level 03 End
  { progress: 1.00, pos: [0, 14, -16], lookAt: [0, 0, -16], fov: 50, ease: "power3.inOut" } // Uplink
]

export default function CameraRig() {
  const { camera } = useThree()
  const { cameraProgress, accessGranted, activeBay } = useVaultStore()
  
  // Create persistent objects to avoid instantiation in useFrame
  const currentPos = useRef(new THREE.Vector3(0, 0, 6))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const targetPos = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = window.innerWidth < 760
  
  // Parallax tracking
  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Process waypoints
  useFrame((state, delta) => {
    // 1. Base interpolation from waypoints
    let wpStart = WAYPOINTS[0]
    let wpEnd = WAYPOINTS[WAYPOINTS.length - 1]
    
    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      if (cameraProgress >= WAYPOINTS[i].progress && cameraProgress <= WAYPOINTS[i+1].progress) {
        wpStart = WAYPOINTS[i]
        wpEnd = WAYPOINTS[i+1]
        break
      }
    }
    
    // Calculate local progress between the two active waypoints
    const range = wpEnd.progress - wpStart.progress
    let localProgress = range === 0 ? 0 : (cameraProgress - wpStart.progress) / range
    
    // Apply GSAP easing mapped to the segment
    if (wpEnd.ease !== "none") {
      const easeFn = gsap.parseEase(wpEnd.ease)
      localProgress = easeFn(localProgress)
    }

    // Set base targets
    targetPos.current.set(
      THREE.MathUtils.lerp(wpStart.pos[0], wpEnd.pos[0], localProgress),
      THREE.MathUtils.lerp(wpStart.pos[1], wpEnd.pos[1], localProgress),
      THREE.MathUtils.lerp(wpStart.pos[2], wpEnd.pos[2], localProgress)
    )

    targetLookAt.current.set(
      THREE.MathUtils.lerp(wpStart.lookAt[0], wpEnd.lookAt[0], localProgress),
      THREE.MathUtils.lerp(wpStart.lookAt[1], wpEnd.lookAt[1], localProgress),
      THREE.MathUtils.lerp(wpStart.lookAt[2], wpEnd.lookAt[2], localProgress)
    )

    let targetFov = THREE.MathUtils.lerp(wpStart.fov, wpEnd.fov, localProgress)
    if (isMobile) targetFov += 6

    // 2. Modifiers: Level 02 active bay focus
    if (activeBay !== null) {
      // Assuming activeBay maps to an ID indicating focus. Push Z forward and lower FOV
      targetPos.current.z -= 1.2
      targetFov = 38
    }

    // 3. Modifiers: Parallax and Bobbing
    if (accessGranted && !isMobile) {
      targetPos.current.x += mousePosition.x * 0.18
      targetPos.current.y += mousePosition.y * 0.12
    }
    
    // Signal Log (Level 03) Bobbing (active around progress 0.70 to 0.85)
    if (cameraProgress >= 0.7 && cameraProgress <= 0.85) {
      targetPos.current.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.15
    }

    // 4. Smooth Application
    currentPos.current.lerp(targetPos.current, 0.05)
    currentLookAt.current.lerp(targetLookAt.current, 0.05)
    
    camera.position.copy(currentPos.current)
    camera.lookAt(currentLookAt.current)
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05)
    camera.updateProjectionMatrix()
  })

  return null
}
