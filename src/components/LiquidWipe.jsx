import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function LiquidWipe() {
  const [isPresent, setIsPresent] = useState(true)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    // Hide the preloader after a short delay
    const timer = setTimeout(() => {
      setIsPresent(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  if (prefersReducedMotion) {
    return (
      <AnimatePresence>
        {isPresent && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] bg-bg-deep flex items-center justify-center"
          >
            <span className="font-mono text-beige-100">Loading...</span>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isPresent && (
        <motion.div 
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 1.2 }} // Wait for path animation to finish
        >
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <motion.path
              fill="var(--color-beige-100)"
              initial={{ d: "M 0 0 L 100 0 L 100 100 L 0 100 Z" }}
              animate={{ 
                d: [
                  "M 0 0 L 100 0 L 100 100 L 0 100 Z", 
                  "M 0 50 Q 50 100 100 50 L 100 100 L 0 100 Z", 
                  "M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z"
                ] 
              }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
                times: [0, 0.5, 1]
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
