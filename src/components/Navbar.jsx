import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { getMuted, setMuted } from '../lib/synth'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [muted, setMutedState] = useState(getMuted())

  const toggleMute = () => {
    const nextMuted = !muted
    setMuted(nextMuted)
    setMutedState(nextMuted)
  }
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60))
    return unsub
  }, [scrollY])

  // Track active section for nav highlighting
  useEffect(() => {
    const sections = ['hero', 'work', 'products', 'contact']
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id || 'hero')
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const links = [
    { label: 'Work', href: '#work', section: 'work' },
    { label: 'Products', href: '#products', section: 'products' },
    { label: 'Contact', href: '#contact', section: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between pointer-events-auto"
      style={{ padding: '18px 24px' }}
    >
      {/* Background panel */}
      <motion.div
        className="absolute inset-0 mx-3 md:mx-6 rounded-xl transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? 'rgba(5,13,8,0.88)' : 'rgba(5,13,8,0)',
          backdropFilter: scrolled ? 'blur(60px) saturate(200%)' : 'blur(0px)',
          boxShadow: scrolled ? '0 0 0 1px rgba(245,237,221,0.07), 0 16px 40px -8px rgba(0,0,0,0.5)' : 'none',
        }}
        style={{ borderStyle: 'solid' }}
      />

      {/* Top accent line when scrolled */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute top-0 left-3 md:left-6 right-3 md:right-6 h-px rounded-t-xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
        />
      )}

      {/* Logo */}
      <a href="#" className="relative z-10 flex items-center gap-3 group" data-cursor="link">
        <div
          className="w-9 h-9 rounded border flex items-center justify-center transition-all duration-400 group-hover:border-accent-gold/70 group-hover:bg-accent-gold/15"
          style={{
            borderColor: 'rgba(201,168,76,0.4)',
            background: 'rgba(201,168,76,0.08)',
            clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
          }}
        >
          <span className="font-mono text-accent-gold text-xs font-bold">MG</span>
        </div>
        <div className="hidden sm:block">
          <span className="font-display font-bold text-beige-100 text-sm tracking-[0.15em] block leading-none">
            MINTS GLOBAL
          </span>
          <span className="font-mono text-[7px] text-accent-gold/50 tracking-[0.3em] uppercase">
            Digital Studio
          </span>
        </div>
      </a>

      {/* Desktop Links */}
      <div className="relative z-10 hidden md:flex items-center gap-8">
        {links.map((link) => {
          const isActive = link.section && activeSection === link.section
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              data-cursor="link"
              className="relative font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 group"
              style={{ color: isActive ? '#C9A84C' : 'rgba(185,172,141,0.8)' }}
            >
              {link.label}
              {/* Active underline */}
              <span
                className="absolute -bottom-1 left-0 right-0 h-px transition-all duration-400"
                style={{
                  background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
              {/* Hover underline */}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-x-0 group-hover:scale-x-100" />
            </a>
          )
        })}

        <button
          onClick={toggleMute}
          className="text-beige-300 hover:text-accent-gold transition-colors font-mono text-[9px] uppercase tracking-widest flex items-center gap-2"
          data-cursor="link"
        >
          {!muted ? (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-11 5.77v6h4l5 5v-16l-5 5h-4z"/>
              </svg>
              <span>Sound On</span>
            </>
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
              <span>Muted</span>
            </>
          )}
        </button>

        <a
          href="https://www.mintsglobal.ae"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="btn-glow btn-glow-gold !py-2 !px-5 !text-[8px] !rounded-sm"
          style={{
            clipPath: 'polygon(4px 0%, calc(100% - 0px) 0%, 100% 4px, 100% 100%, calc(100% - 4px) 100%, 0% 100%, 0% calc(100% - 0px), 0% 4px)',
          }}
        >
          Main Site ↗
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="relative z-10 md:hidden flex flex-col gap-[5px] p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        data-cursor="link"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block h-[1.5px] bg-beige-100"
            style={{ width: i === 1 ? '14px' : '20px' }}
            animate={{
              rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
              y: menuOpen ? (i === 0 ? 6.5 : i === 2 ? -6.5 : 0) : 0,
              opacity: menuOpen && i === 1 ? 0 : 1,
              width: menuOpen ? '20px' : (i === 1 ? '14px' : '20px'),
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-3 right-3 mt-3 p-6 flex flex-col gap-4 md:hidden rounded-xl"
            style={{
              background: 'rgba(5,13,8,0.95)',
              backdropFilter: 'blur(60px)',
              border: '1px solid rgba(245,237,221,0.08)',
              boxShadow: '0 0 0 1px rgba(201,168,76,0.08), 0 24px 60px -12px rgba(0,0,0,0.7)',
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />

            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
                data-cursor="link"
                className="font-mono text-[10px] uppercase tracking-widest text-beige-200 hover:text-accent-gold transition-colors flex items-center gap-3"
              >
                <span className="w-3 h-px bg-accent-gold/40" />
                {link.label}
              </a>
            ))}
            <div className="h-px bg-glass-border mt-2" />
            <button
              onClick={toggleMute}
              className="text-beige-300 hover:text-accent-gold transition-colors font-mono text-[9px] uppercase tracking-widest flex items-center gap-3 py-2 pl-4"
              data-cursor="link"
            >
              {!muted ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-11 5.77v6h4l5 5v-16l-5 5h-4z"/>
                  </svg>
                  <span>Sound On</span>
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                  <span>Muted</span>
                </>
              )}
            </button>
            <div className="h-px bg-glass-border mt-1" />
            <a
              href="https://www.mintsglobal.ae"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="btn-glow btn-glow-gold text-center justify-center !text-[9px]"
            >
              Visit Main Site ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
