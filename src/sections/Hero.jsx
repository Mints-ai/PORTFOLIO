import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useVaultStore } from '../store/useVaultStore'
import { playGrantedSound } from '../lib/synth'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const { grantAccess, accessGranted } = useVaultStore()

  const [authText, setAuthText] = useState('')
  const fullAuthText = 'AUTHENTICATING… ACCESS GRANTED'

  // Fade out auth level as we scroll down into the vault
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const yMotion = useTransform(scrollYProgress, [0, 0.8], [0, -100])

  useEffect(() => {
    if (accessGranted) {
      playGrantedSound()
      
      // Typewriter effect
      let i = 0
      const interval = setInterval(() => {
        setAuthText(fullAuthText.substring(0, i + 1))
        i++
        if (i === fullAuthText.length) clearInterval(interval)
      }, 50)

      return () => clearInterval(interval)
    } else {
      setAuthText('')
    }
  }, [accessGranted])

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: prefersReducedMotion ? 1 : opacity, y: prefersReducedMotion ? 0 : yMotion }}
      className="relative z-10 min-h-screen flex flex-col justify-center items-center pointer-events-auto"
    >
      <div className="flex flex-col items-center justify-center text-center mt-32">
        <h1 className="font-display font-extrabold text-white text-6xl md:text-8xl tracking-tight mb-6">
          MINTS <span className="text-shimmer">GLOBAL</span>
        </h1>
        
        <div className="h-12 flex items-center justify-center">
          {accessGranted ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="font-mono text-neon-green text-sm md:text-xl tracking-[0.2em] uppercase font-bold bg-bg-deep/50 px-6 py-2 rounded border border-neon-green/30"
            >
              {authText}
            </motion.div>
          ) : (
            <div className="font-mono text-accent-gold/50 text-sm md:text-xl tracking-[0.2em] uppercase animate-pulse">
              AWAITING BIOMETRIC OVERRIDE
            </div>
          )}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 flex flex-col items-center gap-3"
      >
        <span className="font-accent text-[8px] uppercase tracking-[0.35em] text-accent-gold/40">Initiate Descent</span>
        <div className="w-px h-16 bg-gradient-to-b from-accent-gold/60 to-transparent" />
      </motion.div>
    </motion.section>
  )
}
