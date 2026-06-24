import React from 'react'
import { motion } from 'framer-motion'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/mintsglobal',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mintsglobal',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Main Website',
    href: 'https://www.mintsglobal.ae',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 bg-bg-deep overflow-hidden pointer-events-auto" style={{ borderTop: '1px solid rgba(245,237,221,0.06)' }}>
      {/* Grid overlay */}
      <div className="grid-overlay opacity-25" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), rgba(0,255,157,0.2), rgba(201,168,76,0.4), transparent)' }} />

      {/* Background orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,1) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 w-full relative z-10 pt-20 pb-0">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  border: '1px solid rgba(201,168,76,0.4)',
                  background: 'rgba(201,168,76,0.07)',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                }}
              >
                <span className="font-mono text-accent-gold text-sm font-bold">MG</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-beige-100 tracking-wider block leading-none">MINTS GLOBAL</span>
                <span className="font-mono text-[8px] text-accent-gold/40 tracking-widest uppercase">Digital Studio · Dubai</span>
              </div>
            </div>
            <p className="font-body text-beige-300/70 text-sm max-w-xs leading-relaxed mb-6">
              Digital agency crafting premium brand identities, web experiences, and enterprise software for visionary clients worldwide.
            </p>

            {/* Neon status badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded border"
              style={{ borderColor: 'rgba(0,255,157,0.2)', background: 'rgba(0,255,157,0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-neon-pulse"
                style={{ background: 'var(--color-neon-green)', boxShadow: '0 0 6px var(--color-neon-green)' }} />
              <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: 'var(--color-neon-green)' }}>
                Accepting Projects
              </span>
            </div>
          </div>

          {/* Connect column */}
          <div>
            <span className="section-label mb-6 block">Connect</span>
            <div className="flex flex-col gap-4">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-beige-300/60 hover:text-accent-gold transition-all duration-300"
                >
                  <span className="w-8 h-8 rounded flex items-center justify-center border border-glass-border group-hover:border-accent-gold/40 transition-colors duration-300 text-beige-300/40 group-hover:text-accent-gold">
                    {s.icon}
                  </span>
                  {s.label}
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* CTA column */}
          <div>
            <div
              className="p-6 rounded-xl h-full flex flex-col"
              style={{
                background: 'rgba(201,168,76,0.04)',
                border: '1px solid rgba(201,168,76,0.18)',
                position: 'relative',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-gold/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-gold/20" />

              <p className="font-mono text-[8px] uppercase tracking-widest text-accent-gold mb-2">Start a Project</p>
              <p className="font-body text-beige-200 text-sm mb-6 leading-relaxed flex-1">
                Ready to build something remarkable? Let's create together.
              </p>
              <a
                href="https://www.mintsglobal.ae/#contact"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="btn-glow btn-glow-gold w-full justify-center"
              >
                Get in Touch ↗
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), rgba(0,255,157,0.15), rgba(201,168,76,0.35), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-8">
          <p className="font-mono text-[9px] text-beige-300/35 tracking-widest uppercase">
            © {new Date().getFullYear()} Mints Global. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-[8px] text-beige-300/25 tracking-widest uppercase">
            <span>Dubai, UAE</span>
            <span className="w-1 h-1 rounded-full bg-accent-gold/30" />
            <span>Crafted with precision</span>
          </div>
        </div>
      </div>

      {/* Massive wordmark */}
      <div className="relative w-full flex justify-center pointer-events-none select-none translate-y-1/3">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontSize: '12vw',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.06)',
          }}
        >
          MINTS GLOBAL
        </motion.div>
      </div>
    </footer>
  )
}
