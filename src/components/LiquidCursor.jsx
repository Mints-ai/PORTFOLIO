import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function LiquidCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const [hoverType, setHoverType] = useState(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const blobX = useSpring(cursorX, springConfig)
  const blobY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setHoverType(target.getAttribute('data-cursor'))
      } else {
        setHoverType(null)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (isTouch) return null

  const isLink = hoverType === 'link'
  const isDrag = hoverType === 'drag'

  return (
    <>
      <svg className="hidden">
        <filter id="liquid-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
          <feBlend in="SourceGraphic" in2="liquid" />
        </filter>
      </svg>
      
      {/* 1:1 Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-beige-100 pointer-events-none z-[100]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isLink || isDrag ? 0 : 1
        }}
      />
      
      {/* Trailing Blob */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[99] mix-blend-difference"
        style={{
          x: prefersReducedMotion ? cursorX : blobX,
          y: prefersReducedMotion ? cursorY : blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: isLink ? 100 : isDrag ? 80 : 40,
          height: isLink ? 100 : isDrag ? 80 : 40,
          backgroundColor: '#fff',
          opacity: 1,
          filter: prefersReducedMotion ? 'none' : 'url(#liquid-filter)',
        }}
        animate={{
          scale: isLink ? 1 : isDrag ? 1 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {isDrag && (
          <span className="text-black font-mono text-xs font-bold uppercase pointer-events-none mix-blend-normal">Drag</span>
        )}
      </motion.div>
    </>
  )
}
