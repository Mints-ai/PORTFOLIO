import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { playSuccessSound } from '../lib/synth'

gsap.registerPlugin(ScrollTrigger)

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Please enter a valid email"),
  details: z.string().min(10, "Please provide a bit more detail")
})

const DISPATCH_STEPS = [
  '[RESOLVING] Connecting to secure route to Mints Global dispatch matrix...',
  '[HANDSHAKE] Handshake established with mail-server cluster (SSL/TLS 1.3)...',
  '[OK] Session keys verified. Handshake completed.',
  '[SERIALIZE] Compiling request payload: JSON buffer generated successfully.',
  '[TRANSMIT] Encrypting content body and user metadata...',
  '[SEND] Dispatching data packet: 2,480 bytes transferred.',
  '[ACK] Payload acknowledged by gateway server. Ticket #MG-2026-X created.',
  '[SUCCESS] Dispatch completed! Response status 202 ACCEPTED.',
  '[OK] Closing secure tunnel. Thank you!'
]

function SuccessTerminal() {
  const [lines, setLines] = useState([])
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    let index = 0
    const addLine = () => {
      if (index < DISPATCH_STEPS.length) {
        setLines(prev => [...prev, DISPATCH_STEPS[index]])
        playSuccessSound()
        index++
        const delay = Math.random() * 400 + 200 // 200ms - 600ms
        setTimeout(addLine, delay)
      } else {
        setCompleted(true)
        playSuccessSound() // final double tone
      }
    }
    addLine()
  }, [])

  return (
    <div className="w-full h-full min-h-[360px] liquid-glass-panel p-6 bg-bg-deep/80 border-glass-border flex flex-col gap-3 font-mono text-xs text-beige-100 relative z-10">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-beige-300">DISPATCH_TERMINAL.EXE</span>
        <span className="text-[9px] text-accent-gold/60 animate-pulse">{completed ? 'COMPLETED' : 'TRANSMITTING'}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2 max-h-[260px] select-text">
        {lines.map((line, i) => {
          let colorClass = 'text-beige-300'
          if (line.includes('[SUCCESS]') || line.includes('[OK]')) colorClass = 'text-green-400 font-bold'
          else if (line.includes('[RESOLVING]') || line.includes('[TRANSMIT]') || line.includes('[SEND]')) colorClass = 'text-accent-gold'
          else if (line.includes('Handshake')) colorClass = 'text-beige-100'

          return (
            <div key={i} className={colorClass}>
              {line}
            </div>
          )
        })}
        {!completed && (
          <div className="text-accent-gold animate-pulse flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-3 bg-accent-gold inline-block animate-pulse" />
            <span>transmitting secure buffer packets...</span>
          </div>
        )}
      </div>

      {completed && (
        <div className="border-t border-white/5 pt-3 mt-auto flex justify-between items-center text-[10px] text-beige-300/40">
          <span>Connection closed safely.</span>
          <span>Mints Global Dispatch v2.0.1</span>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Form data:", data)
    setIsSubmitted(true)
  }

  useGSAP(() => {
    if (prefersReducedMotion) return

    gsap.from(".contact-content > *", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true
      }
    })
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] })

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 py-32 px-6 md:px-16 lg:px-24 bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 contact-content">
        
        {/* Left: Typography */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="font-display text-5xl md:text-7xl lg:text-[100px] text-beige-100 leading-[0.9] tracking-tight mb-8">
            Let's build<br/>the future.
          </h2>
          <p className="font-body text-beige-300 text-lg md:text-xl max-w-md">
            Whether it's a completely new platform or a massive refactoring of your current architecture, our team is ready to deliver.
          </p>
        </div>
 
        {/* Right: Form */}
        <div className="w-full lg:w-1/2 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs text-beige-300 uppercase tracking-wider">Your Name</label>
                  <input 
                    id="name"
                    type="text"
                    {...register('name')}
                    disabled={isSubmitting}
                    className="w-full bg-bg-elevated border border-glass-border rounded-lg px-4 py-3 text-beige-100 font-body placeholder:text-beige-300/50 focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                    placeholder="Jane Doe"
                    data-cursor="text"
                  />
                  {errors.name && <span className="text-red-400 text-sm mt-1">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs text-beige-300 uppercase tracking-wider">Email Address</label>
                  <input 
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={isSubmitting}
                    className="w-full bg-bg-elevated border border-glass-border rounded-lg px-4 py-3 text-beige-100 font-body placeholder:text-beige-300/50 focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                    placeholder="jane@example.com"
                    data-cursor="text"
                  />
                  {errors.email && <span className="text-red-400 text-sm mt-1">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="details" className="font-mono text-xs text-beige-300 uppercase tracking-wider">Project Details</label>
                  <textarea 
                    id="details"
                    {...register('details')}
                    disabled={isSubmitting}
                    rows="4"
                    className="w-full bg-bg-elevated border border-glass-border rounded-lg px-4 py-3 text-beige-100 font-body placeholder:text-beige-300/50 focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all resize-none"
                    placeholder="Tell us about your goals, timeline, and budget..."
                    data-cursor="text"
                  />
                  {errors.details && <span className="text-red-400 text-sm mt-1">{errors.details.message}</span>}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 px-8 py-4 bg-accent-gold text-bg-deep font-body font-medium rounded-lg flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                  data-cursor="link"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-bg-deep border-t-transparent rounded-full"
                    />
                  ) : "Submit Request"}
                </button>

              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full h-full"
              >
                <SuccessTerminal />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
