import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { playSuccessSound } from '../lib/synth'

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
  const [lines, setLines] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeoutId;
    const addLine = () => {
      if (index < DISPATCH_STEPS.length) {
        const nextStep = DISPATCH_STEPS[index];
        setLines((prev) => [...prev, nextStep]);
        playSuccessSound();
        index++;
        const delay = Math.random() * 400 + 200;
        timeoutId = setTimeout(addLine, delay);
      } else {
        setCompleted(true);
        playSuccessSound();
      }
    };
    addLine();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col gap-3 font-mono text-xs text-beige-100">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 select-text">
        {lines.map((line, i) => {
          if (!line) return null;
          let colorClass = "text-beige-300";
          if (line.includes("[SUCCESS]") || line.includes("[OK]")) colorClass = "text-neon-green font-bold";
          else if (line.includes("[RESOLVING]") || line.includes("[TRANSMIT]") || line.includes("[SEND]")) colorClass = "text-accent-gold";
          else if (line.includes("Handshake")) colorClass = "text-beige-100";

          return (
            <div key={i} className={colorClass}>
              {line}
            </div>
          );
        })}
        {!completed && (
          <div className="text-accent-gold animate-pulse flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-3 bg-accent-gold inline-block animate-pulse" />
            <span>transmitting secure buffer packets...</span>
          </div>
        )}
      </div>

      {completed && (
        <div className="border-t border-white/5 pt-4 mt-auto flex justify-between items-center text-[10px] text-beige-300/40">
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
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Form data:", data)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="relative z-10 min-h-screen py-24 px-6 md:px-16 lg:px-24 flex items-center justify-center pointer-events-auto bg-bg-deep">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-accent-gold">Level 04 // Uplink</span>
        </div>

        {/* Terminal Window */}
        <div className="w-full min-h-[500px] bg-black/80 border border-glass-border liquid-glass-panel rounded-sm flex flex-col shadow-2xl relative overflow-hidden">
          
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-black/50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-beige-300 font-mono">ENCRYPTED_UPLINK.SH</span>
            <span className="text-[10px] text-accent-gold/60 font-mono">PORT 443</span>
          </div>

          <div className="flex-1 p-6 md:p-8 flex flex-col relative z-10">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-8 h-full font-mono text-sm"
                >
                  <div className="text-accent-gold mb-4">
                    <p>{'>'} INITIATING SECURE HANDSHAKE...</p>
                    <p>{'>'} ENTER IDENTIFICATION AND DIRECTIVE PARAMETERS.</p>
                  </div>

                  <div className="flex flex-col gap-1 group">
                    <label htmlFor="name" className="text-beige-300 uppercase tracking-widest flex gap-2 items-center">
                      <span className="text-accent-gold">{'>'}</span> IDENT_STRING (Name)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30">$</span>
                      <input 
                        id="name"
                        type="text"
                        {...register('name')}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-b border-white/10 focus:border-accent-gold py-2 text-neon-green placeholder:text-white/10 focus:outline-none transition-all"
                        placeholder="guest_user"
                        data-cursor="text"
                      />
                    </div>
                    {errors.name && <span className="text-red-400 text-xs mt-1">ERR: {errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1 group">
                    <label htmlFor="email" className="text-beige-300 uppercase tracking-widest flex gap-2 items-center">
                      <span className="text-accent-gold">{'>'}</span> RETURN_NODE (Email)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30">$</span>
                      <input 
                        id="email"
                        type="email"
                        {...register('email')}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-b border-white/10 focus:border-accent-gold py-2 text-neon-green placeholder:text-white/10 focus:outline-none transition-all"
                        placeholder="node@network.com"
                        data-cursor="text"
                      />
                    </div>
                    {errors.email && <span className="text-red-400 text-xs mt-1">ERR: {errors.email.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1 group flex-1">
                    <label htmlFor="details" className="text-beige-300 uppercase tracking-widest flex gap-2 items-center">
                      <span className="text-accent-gold">{'>'}</span> TRANSMISSION_PAYLOAD (Details)
                    </label>
                    <div className="flex items-start gap-2 h-full">
                      <span className="text-white/30 mt-2">$</span>
                      <textarea 
                        id="details"
                        {...register('details')}
                        disabled={isSubmitting}
                        className="w-full h-32 bg-transparent border-b border-white/10 focus:border-accent-gold py-2 text-neon-green placeholder:text-white/10 focus:outline-none transition-all resize-none"
                        placeholder="ENTER DIRECTIVE..."
                        data-cursor="text"
                      />
                    </div>
                    {errors.details && <span className="text-red-400 text-xs mt-1">ERR: {errors.details.message}</span>}
                  </div>

                  <div className="flex justify-end mt-auto pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-black transition-colors uppercase tracking-widest text-xs flex items-center gap-2 disabled:opacity-50"
                      data-cursor="link"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 border border-current border-t-transparent rounded-full"
                          />
                          ENCRYPTING...
                        </>
                      ) : (
                        <>
                          EXECUTE <span className="text-[10px]">./transmit.sh</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col"
                >
                  <SuccessTerminal />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
        </div>
      </div>
    </section>
  )
}
