import React, { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { id: 1, quote: "They didn't just build our app; they completely re-engineered how our users interact with data. It feels like magic.", name: "Sarah Jenkins", role: "CTO, Nexus Tech", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
  { id: 2, quote: "The most fluid and responsive interface I've ever used. The attention to micro-interactions sets them apart.", name: "David Chen", role: "Founder, Aura Protocol", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  { id: 3, quote: "Working with this studio was a paradigm shift for our internal team. They delivered ahead of schedule and beyond expectations.", name: "Elena Rodriguez", role: "VP Engineering, Synergy", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" },
  { id: 4, quote: "Their technical architecture is as beautiful as their UI design. Truly a rare combination of skills.", name: "Marcus Thorne", role: "Director, Lumina Arts", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" }
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    prefersReducedMotion ? [] : [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  useGSAP(() => {
    if (prefersReducedMotion) return

    gsap.from(".testimonial-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true
      }
    })

    gsap.from(".testimonial-carousel", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true
      }
    })
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] })

  return (
    <section ref={sectionRef} className="relative z-10 py-32 pointer-events-auto overflow-hidden bg-transparent">
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-bg-elevated)_0%,_transparent_70%)] blur-3xl"
          animate={prefersReducedMotion ? {} : {
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-bg-deep)_0%,_transparent_70%)] blur-3xl"
          animate={prefersReducedMotion ? {} : {
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-16 text-center testimonial-header">
        <p className="font-mono text-accent-gold uppercase tracking-widest text-sm mb-4">Client Feedback</p>
        <h2 className="font-display text-4xl md:text-5xl text-beige-100">Don't just take our word for it.</h2>
      </div>

      {/* Carousel */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-0 testimonial-carousel">
        <div className="overflow-hidden" ref={emblaRef} data-cursor="drag">
          <div className="flex -ml-4 md:-ml-6 touch-pan-y">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="flex-none w-full md:w-[70%] lg:w-[60%] pl-4 md:pl-6 min-w-0"
              >
                <div className="h-full liquid-glass-panel rounded-2xl p-8 md:p-12 flex flex-col justify-between transition-colors hover:bg-glass-fill/80">
                  <div className="mb-8">
                    <svg className="w-10 h-10 text-accent-gold opacity-50 mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L16.41 14.53H11v-9.5h9.5V21zM2.017 21L4.41 14.53H-1v-9.5h9.5V21z" />
                    </svg>
                    <p className="font-display text-xl md:text-2xl text-beige-100 leading-snug">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-glass-border">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-beige-100">{testimonial.name}</h4>
                      <p className="font-body text-sm text-beige-300">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'bg-accent-gold scale-125' 
                  : 'bg-glass-border hover:bg-beige-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              data-cursor="link"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
