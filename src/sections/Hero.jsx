import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import ScrambleText from '../components/ScrambleText'

/* ── Animated count-up number ── */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = Date.now()
        const tick = () => {
          const p = Math.min((Date.now() - t0) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(ease * target))
          if (p < 1) requestAnimationFrame(tick); else setCount(target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{count}</span>
}

/* ── Infinite ticker marquee ── */
const tickerItems = [
  'Web Development', 'Brand Identity', 'UI/UX Design', 'Product Photography',
  'Enterprise Software', 'Digital Marketing', 'Mobile Apps', 'E-Commerce',
  'Logo & Branding', 'SEO & Growth', '3D Experiences', 'Motion Design',
]

function Ticker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="ticker-wrap py-4 my-12 relative" style={{ borderTop: '1px solid rgba(245,237,221,0.07)', borderBottom: '1px solid rgba(245,237,221,0.07)' }}>
      <div className="ticker-track">
        {items.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const stats = [
  { value: 21, label: 'Projects',   suffix: '+' },
  { value: 4,  label: 'Products',   suffix: '' },
  { value: 5,  label: 'Years',      suffix: '+' },
  { value: 12, label: 'Industries', suffix: '' },
]

/* ── Animated headline line — slide up + scramble ── */
function HeadlineLine({ text, delay = 0, isGold = false, scrambleDuration = 1200 }) {
  const [slid, setSlid] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setSlid(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div className="overflow-hidden pb-2">
      <motion.div
        initial={{ y: '108%', skewY: 2, opacity: 0 }}
        animate={slid ? { y: '0%', skewY: 0, opacity: 1 } : {}}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="will-change-transform"
      >
        {isGold ? (
          <span className="text-shimmer">
            <ScrambleText text={text} delay={delay + 100} duration={scrambleDuration} />
          </span>
        ) : (
          <span className="text-beige-100">
            <ScrambleText text={text} delay={delay + 100} duration={scrambleDuration} />
          </span>
        )}
      </motion.div>
    </div>
  )
}

/* ── Floating orb background ── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Primary warm orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          top: '-10%', right: '-5%',
          opacity: 0.055,
          background: 'radial-gradient(circle, rgba(201,168,76,1) 0%, rgba(201,120,40,0.3) 40%, transparent 70%)',
          animation: 'orb-drift 20s ease-in-out infinite',
        }}
      />
      {/* Secondary cool orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          bottom: '5%', left: '-5%',
          opacity: 0.04,
          background: 'radial-gradient(circle, rgba(0,255,157,1) 0%, rgba(0,100,60,0.3) 40%, transparent 70%)',
          animation: 'orb-drift 25s ease-in-out infinite reverse',
          animationDelay: '5s',
        }}
      />
      {/* Accent orb */}
      <div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          top: '40%', left: '35%',
          opacity: 0.035,
          background: 'radial-gradient(circle, rgba(201,168,76,1) 0%, transparent 70%)',
          animation: 'floatSlow 15s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const opacity  = useTransform(scrollY, [0, 600], [1, 0])
  const yMotion  = useTransform(scrollY, [0, 600], [0, -80])
  const scrollIO = useTransform(scrollY, [0, 100], [1, 0])

  const lines = [
    { text: 'Selected', delay: 800,  gold: false, scrambleDuration: 1100 },
    { text: 'Works &',  delay: 1050, gold: false, scrambleDuration: 900  },
    { text: 'Demos.',   delay: 1300, gold: true,  scrambleDuration: 1000 },
  ]

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: prefersReducedMotion ? 1 : opacity, y: prefersReducedMotion ? 0 : yMotion }}
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pointer-events-auto overflow-hidden"
    >
      {/* Background decoration */}
      <div className="grid-overlay opacity-60 pointer-events-none" />
      <FloatingOrbs />

      {/* HUD Corner decorations */}
      <div className="absolute top-24 left-6 md:left-16 lg:left-24 pointer-events-none" style={{ width: 32, height: 32, borderTop: '1px solid rgba(201,168,76,0.25)', borderLeft: '1px solid rgba(201,168,76,0.25)' }} />
      <div className="absolute top-24 right-6 md:right-16 lg:right-24 pointer-events-none" style={{ width: 32, height: 32, borderTop: '1px solid rgba(201,168,76,0.25)', borderRight: '1px solid rgba(201,168,76,0.25)' }} />
      <div className="absolute bottom-16 left-6 md:left-16 lg:left-24 pointer-events-none" style={{ width: 32, height: 32, borderBottom: '1px solid rgba(201,168,76,0.15)', borderLeft: '1px solid rgba(201,168,76,0.15)' }} />
      <div className="absolute bottom-16 right-6 md:right-16 lg:right-24 pointer-events-none" style={{ width: 32, height: 32, borderBottom: '1px solid rgba(201,168,76,0.15)', borderRight: '1px solid rgba(201,168,76,0.15)' }} />

      {/* Vertical accent lines */}
      <div className="absolute top-0 left-1/3 w-px h-full pointer-events-none hidden lg:block"
           style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.05), transparent)' }} />
      <div className="absolute top-0 right-1/4 w-px h-full pointer-events-none hidden lg:block"
           style={{ background: 'linear-gradient(180deg, transparent, rgba(245,237,221,0.025), transparent)' }} />

      <div className="max-w-[1400px] w-full mt-20 relative z-10">

        {/* ── Live badge ── */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="glass-gold flex items-center gap-3 px-5 py-2.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold" />
            </span>
            <span className="font-accent text-accent-gold tracking-[0.3em] text-[9px] font-medium uppercase">
              Mints Global · Showcase 2025–26
            </span>
          </div>

          {/* Neon "Live Portfolio" tag */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded"
            style={{
              border: '1px solid rgba(0,255,157,0.2)',
              background: 'rgba(0,255,157,0.05)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-neon-pulse"
              style={{ background: 'var(--color-neon-green)', boxShadow: '0 0 6px var(--color-neon-green)' }}
            />
            <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: 'var(--color-neon-green)' }}>
              Live Portfolio
            </span>
          </motion.div>
        </motion.div>

        {/* ── Headline ── */}
        <h1
          className="font-display font-extrabold leading-[0.88] tracking-tight mb-0"
          style={{ fontSize: 'clamp(3.2rem, 10vw, 12rem)' }}
        >
          {prefersReducedMotion
            ? (
              <>
                <div className="text-beige-100">Selected</div>
                <div className="text-beige-100">Works &</div>
                <div className="text-shimmer">Demos.</div>
              </>
            )
            : lines.map((line, i) => (
              <HeadlineLine
                key={i}
                text={line.text}
                delay={line.delay}
                isGold={line.gold}
                scrambleDuration={line.scrambleDuration}
              />
            ))
          }
        </h1>

        {/* ── Ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <Ticker />
        </motion.div>

        {/* ── Bottom row: description + stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.85, ease: [0.16,1,0.3,1] }}
          className="flex flex-col lg:flex-row gap-12 items-start lg:items-end"
        >
          {/* Description + CTA */}
          <div className="max-w-sm">
            <p className="font-body text-beige-300 text-lg leading-relaxed mb-8 font-light">
              An interactive archive of product demos, branding identities, and web experiences engineered by Mints Global.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                data-cursor="link"
                className="btn-glow btn-glow-gold"
              >
                <span>Explore Work</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                data-cursor="link"
                className="btn-glow btn-glow-outline"
              >
                Our Products
              </button>
            </div>
          </div>

          {/* Stat cards — using inline styles to avoid Tailwind class issues */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:ml-auto w-full lg:w-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 + i * 0.1 }}
                style={{
                  position: 'relative',
                  padding: '20px 24px',
                  minWidth: 100,
                  border: '1px solid rgba(245,237,221,0.08)',
                  background: 'rgba(8,20,12,0.7)',
                  backdropFilter: 'blur(40px)',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  transition: 'border-color 0.4s, box-shadow 0.4s',
                }}
                whileHover={{
                  borderColor: 'rgba(201,168,76,0.3)',
                  boxShadow: '0 0 30px rgba(201,168,76,0.12)',
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
                }} />
                {/* Corner accents */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderTop: '1px solid rgba(201,168,76,0.35)', borderRight: '1px solid rgba(201,168,76,0.35)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, borderBottom: '1px solid rgba(201,168,76,0.2)', borderLeft: '1px solid rgba(201,168,76,0.2)' }} />

                <div className="font-number text-3xl font-bold text-accent-gold mb-1 leading-none">
                  {prefersReducedMotion ? s.value : <CountUp target={s.value} />}{s.suffix}
                </div>
                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-beige-300 leading-none" style={{ opacity: 0.5 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : scrollIO }}
        className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-3"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 56, background: 'linear-gradient(180deg, rgba(201,168,76,0.7), transparent)' }}
        />
        <span className="font-accent text-[8px] uppercase tracking-[0.35em]" style={{ color: 'rgba(185,172,141,0.4)' }}>Scroll</span>
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 right-6 md:right-16 font-accent text-[9px] tracking-widest"
        style={{ color: 'rgba(185,172,141,0.22)' }}
      >
        © 2025–26 MINTS GLOBAL
      </motion.p>
    </motion.section>
  )
}
