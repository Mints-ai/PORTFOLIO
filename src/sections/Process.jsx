import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { id: '01', title: 'Discover', desc: 'We dive deep into your business, your audience, and the problem space to find the signal in the noise.', icon: '🔍' },
  { id: '02', title: 'Strategize', desc: 'Mapping out architecture, user journeys, and technical choices before a single line of code is written.', icon: '🗺️' },
  { id: '03', title: 'Design & Develop', desc: 'Crafting liquid UI and engineering scalable systems in rapid, iterative sprints.', icon: '⚡' },
  { id: '04', title: 'Launch & Optimize', desc: 'Deploying to production, monitoring performance, and fine-tuning the experience.', icon: '🚀' },
]

export default function Process() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion) return

    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      // Desktop: Horizontal Pin
      const track = trackRef.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + track.scrollWidth,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(progressBarRef.current, { scaleX: self.progress })
          }
        }
      })

      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none"
      })

      return () => {
        // mm cleanup handles scrollTrigger kills
      }
    })

    mm.add("(max-width: 767px)", () => {
      // Mobile: Vertical Stagger Fade
      gsap.from('.process-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      })
      
      gsap.set(progressBarRef.current, { display: 'none' })
    })

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] })

  return (
    <section id="process" ref={sectionRef} className="relative z-10 bg-transparent overflow-hidden pointer-events-auto h-auto md:h-screen">
      
      {/* Progress Bar (Desktop only) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-glass-border z-20 hidden md:block">
        <div ref={progressBarRef} className="w-full h-full bg-accent-gold origin-left scale-x-0" />
      </div>

      <div className="pt-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto md:absolute md:top-0 md:left-0 md:w-full md:pointer-events-none z-10">
        <p className="font-mono text-accent-gold uppercase tracking-widest text-sm mb-4">How We Work</p>
        <h2 className="font-display text-4xl md:text-5xl text-beige-100">The Process</h2>
      </div>

      {/* Horizontal Track / Mobile Vertical Stack */}
      <div 
        ref={trackRef} 
        className="flex flex-col md:flex-row md:h-screen md:items-center px-6 md:px-0 pt-12 md:pt-0 pb-24 md:pb-0 gap-8 md:gap-0 w-full md:w-max"
      >
        {/* Offset padding for desktop so the first card isn't underneath the title */}
        <div className="hidden md:block flex-shrink-0 w-16 lg:w-[400px]" />

        {steps.map((step) => (
          <div 
            key={step.id} 
            className="process-card flex-shrink-0 md:w-[60vw] lg:w-[45vw] md:px-6 lg:px-8"
          >
            <div className="relative p-8 md:p-12 rounded-2xl bg-bg-elevated border border-glass-border overflow-hidden h-full md:aspect-[16/10] flex flex-col justify-end">
              
              <div className="absolute -top-10 -right-6 font-display text-[150px] md:text-[200px] leading-none text-transparent opacity-20 pointer-events-none select-none" style={{ WebkitTextStroke: '2px var(--color-beige-100)' }}>
                {step.id}
              </div>

              <div className="relative z-10">
                <span className="text-4xl mb-6 block">{step.icon}</span>
                <h3 className="font-display text-2xl md:text-4xl text-beige-100 mb-4">{step.title}</h3>
                <p className="font-body text-beige-300 md:text-lg max-w-md">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Padding card at the end for desktop */}
        <div className="hidden md:block flex-shrink-0 w-[40vw] lg:w-[50vw]" />
      </div>
    </section>
  )
}
