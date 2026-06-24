import React, { useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const logos = [1, 2, 3, 4, 5, 6, 7, 8] // placeholders

function MarqueeItem({ children }) {
  // w-40 = 160px, mx-8 = 64px (32px left + 32px right). Total width = 224px
  return (
    <div className="flex-shrink-0 mx-8 flex items-center justify-center w-40 h-16 rounded liquid-glass-panel">
      {children}
    </div>
  )
}

export default function TrustStrip() {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const baseVelocity = -1 // Negative = move left
  const x = useMotionValue(0)

  // Use wrap function to loop content seamlessly
  useAnimationFrame((time, delta) => {
    if (prefersReducedMotion) return
    
    if (!isHovered) {
      let currentX = x.get() + baseVelocity * (delta / 16)
      const setWidth = 8 * 224 // 8 items * 224px per item
      
      // Ensure smooth wrap
      if (currentX <= -setWidth) {
        currentX += setWidth
      } else if (currentX > 0) {
        currentX -= setWidth
      }
      
      x.set(currentX)
    }
  })

  // Counters
  const counterRef1 = useRef(null)
  const counterRef2 = useRef(null)
  const counterRef3 = useRef(null)
  const statsContainerRef = useRef(null)
  const marqueeRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion) {
      if (counterRef1.current) counterRef1.current.innerText = "120"
      if (counterRef2.current) counterRef2.current.innerText = "98"
      if (counterRef3.current) counterRef3.current.innerText = "24"
      gsap.set([marqueeRef.current, statsContainerRef.current], { opacity: 1, y: 0 })
      return
    }

    gsap.to(marqueeRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: "top 85%",
        once: true
      }
    })

    gsap.to(statsContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: statsContainerRef.current,
        start: "top 85%",
        once: true
      }
    })

    const targets = [
      { ref: counterRef1, end: 120 },
      { ref: counterRef2, end: 98 },
      { ref: counterRef3, end: 24 }
    ]

    targets.forEach((target) => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target.end,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsContainerRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (target.ref.current) {
            target.ref.current.innerText = Math.round(obj.val)
          }
        }
      })
    })
  }, { scope: statsContainerRef, dependencies: [prefersReducedMotion] })

  return (
    <section className="relative z-10 py-24 pointer-events-auto bg-transparent overflow-hidden">
      
      {/* Marquee */}
      <div 
        ref={marqueeRef}
        className="w-full flex pb-20 border-b border-glass-border opacity-0 translate-y-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="drag"
      >
        <motion.div 
          className="flex whitespace-nowrap will-change-transform"
          style={{ x }}
        >
          {/* Render enough sets to cover screen and wrap seamlessly */}
          {[...logos, ...logos, ...logos].map((num, i) => (
            <MarqueeItem key={i}>
              <span className="font-mono text-beige-300 opacity-50">LOGO {num}</span>
            </MarqueeItem>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <div ref={statsContainerRef} className="max-w-7xl mx-auto px-6 md:px-16 pt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left opacity-0 translate-y-10">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-5xl md:text-6xl text-accent-gold">
            <span ref={counterRef1}>0</span>+
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest text-beige-300">Projects Delivered</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-5xl md:text-6xl text-accent-gold">
            <span ref={counterRef2}>0</span>%
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest text-beige-300">Client Retention</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-5xl md:text-6xl text-accent-gold">
            <span ref={counterRef3}>0</span>/7
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest text-beige-300">Support Available</p>
        </div>
      </div>

    </section>
  )
}
