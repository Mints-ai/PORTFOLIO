import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Spotlight() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const prefersReducedMotion = usePrefersReducedMotion()

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (prefersReducedMotion) return
    const updateMouse = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [mouseX, mouseY, prefersReducedMotion])

  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(201, 168, 76, 0.1), transparent 40%)`

  if (prefersReducedMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-30"
      style={{ background }}
    />
  )
}

