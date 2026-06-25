import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SIGNAL_CLIENTS = [
  { name: 'TRIZONE', sector: 'Corporate Services', freq: '124.8', stability: '99.9%' },
  { name: 'PEDAL', sector: 'Cycling Hub', freq: '88.4', stability: '98.5%' },
  { name: 'GARDEN VILLE', sector: 'Real Estate', freq: '102.1', stability: '99.4%' },
  { name: 'HAYA RESTAURANT', sector: 'F&B', freq: '94.2', stability: '97.8%' }
]

export default function SignalLog() {
  const containerRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 relative z-10 pointer-events-auto text-beige-100">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent-gold">Level 03 // Signal Log</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">
            Active <span className="text-shimmer">Transmissions</span>
          </h2>
          <p className="font-body text-beige-300 text-sm md:text-base max-w-lg mt-4">
            Live-feed social media intelligence. Real-time metric waveforms and engagement stability tracking for top-tier operational clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {SIGNAL_CLIENTS.map((client, i) => (
            <motion.div 
              key={client.name}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="liquid-glass-panel border-glass-border p-6 flex flex-col gap-6 relative overflow-hidden group hover:border-accent-gold/40 transition-colors"
            >
              {/* Background Waveform Grid */}
              <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.1) 50%, transparent)' }}>
                {Array.from({ length: 40 }).map((_, j) => (
                  <div key={j} className="h-full w-[2px] bg-accent-gold/50 mx-px" style={{ transform: `scaleY(${Math.random() * 0.8 + 0.2})` }} />
                ))}
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="font-display font-bold text-xl tracking-wide uppercase text-white">{client.name}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-beige-300">{client.sector}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-[10px] uppercase text-neon-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                    LIVE
                  </span>
                  <span className="font-number text-sm font-bold text-accent-gold">{client.freq} MHz</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10 mt-auto pt-8 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-beige-300">
                  <span>Signal Stability</span>
                  <span>{client.stability}</span>
                </div>
                <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: client.stability }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                    className="h-full bg-accent-gold"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
