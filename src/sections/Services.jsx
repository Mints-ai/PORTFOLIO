import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { id: '01', title: 'Digital Product Design', desc: 'User-centric interfaces that feel intuitive and look premium.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop' },
  { id: '02', title: 'Web3 & Blockchain', desc: 'Decentralized applications built for scale and security.', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop' },
  { id: '03', title: 'Creative Engineering', desc: 'Front-end development pushing the limits of WebGL and motion.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop' },
  { id: '04', title: 'Brand Identity', desc: 'Visual systems that communicate authority and innovation.', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop' },
  { id: '05', title: 'Growth Strategy', desc: 'Data-driven conversion optimization and technical SEO.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop' },
]

export default function Services() {
  const [activeRow, setActiveRow] = useState(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const containerRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  const xVelocity = useVelocity(mouseX)
  const rotate = useTransform(xVelocity, [-1000, 1000], [-15, 15], { clamp: true })

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useGSAP(() => {
    if (prefersReducedMotion) return

    gsap.from(".service-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true
      }
    })

    gsap.from(".service-row", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".service-list",
        start: "top 80%",
        once: true
      }
    })
  }, { scope: containerRef, dependencies: [prefersReducedMotion] })

  const handleMouseMove = (e) => {
    if (!isDesktop || prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section id="services" className="relative z-10 py-24 px-6 md:px-16 lg:px-24 pointer-events-auto bg-transparent overflow-hidden" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="max-w-7xl mx-auto relative">
        
        <div className="mb-16 service-header">
          <h2 className="font-display text-4xl md:text-5xl text-beige-100 mb-4">Our Expertise</h2>
          <p className="font-body text-beige-300 max-w-xl">We blend strategic thinking with uncompromised craft to deliver exceptional digital experiences.</p>
        </div>

        <div className="flex flex-col border-t border-glass-border relative service-list" onMouseLeave={() => setActiveRow(null)}>
          {services.map((service, index) => {
            const isActive = activeRow === index
            const isDimmed = activeRow !== null && !isActive

            return (
              <div 
                key={service.id}
                className="service-row group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-glass-border cursor-pointer transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.4 : 1 }}
                onMouseEnter={() => setActiveRow(index)}
                data-cursor="link"
              >
                <div className="absolute bottom-0 left-0 h-[1px] bg-accent-gold w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10" />

                <div className="flex items-start md:items-center gap-6 md:gap-12 w-full md:w-auto mb-4 md:mb-0">
                  <span className="font-mono text-accent-gold text-lg shrink-0 mt-1 md:mt-0">{service.id}</span>
                  <h3 
                    className={`font-display text-3xl md:text-5xl transition-all duration-300 ease-out ${
                      isActive ? 'text-accent-gold translate-x-2' : 'text-beige-100 translate-x-0'
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-8 justify-between w-full md:w-auto md:justify-end ml-14 md:ml-0">
                  <p className="font-body text-beige-300 text-sm md:text-base max-w-xs">{service.desc}</p>
                  <motion.div 
                    className={`w-10 h-10 rounded-full border border-glass-border flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-accent-gold border-accent-gold text-bg-deep' : 'bg-transparent text-beige-300'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>

        {!prefersReducedMotion && isDesktop && (
          <motion.div 
            className="absolute top-0 left-0 w-[400px] aspect-[4/3] rounded-xl overflow-hidden pointer-events-none z-50 shadow-2xl"
            style={{ 
              x, 
              y,
              rotate,
              translateX: '-50%',
              translateY: '-50%',
              opacity: activeRow !== null ? 1 : 0,
              scale: activeRow !== null ? 1 : 0.8
            }}
            transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3, type: "spring" } }}
          >
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                style={{ 
                  backgroundImage: `url(${service.image})`,
                  opacity: activeRow === index ? 1 : 0 
                }}
              />
            ))}
          </motion.div>
        )}
        
      </div>
    </section>
  )
}
