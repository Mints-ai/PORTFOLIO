import React, { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useVaultStore } from './store/useVaultStore'

import LiquidCursor from './components/LiquidCursor'
import LiquidWipe from './components/LiquidWipe'
import NoiseOverlay from './components/NoiseOverlay'
import Spotlight from './components/Spotlight'
import Navbar from './components/Navbar'

import Hero from './sections/Hero'
import Work from './sections/Work'
import ProductDemo from './sections/ProductDemo'
import SignalLog from './sections/SignalLog'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { playHoverSound, playClickSound } from './lib/synth'

gsap.registerPlugin(ScrollTrigger)

const SceneJourney = lazy(() => import('./three/SceneJourney'))

const SYSTEM_LOGS = [
  'VAULT SECURE // CORE STABLE',
  'MATRIX SHIFT: RESOLVED',
  'SCROLL STATE: DESCENDING',
  '3D ENVIRONMENT: READY',
  'REFRESH FREQ: 60HZ',
  'PORTAL ROUTE: DEEP VAULT',
  'RESONATOR POSTURE: 99.8%'
]

function HudOverlay() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [logIndex, setLogIndex] = useState(0)
  const [currentLogs, setCurrentLogs] = useState([])
  const { level, sectorId, accessGranted } = useVaultStore()

  useEffect(() => {
    const handleMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)

    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % SYSTEM_LOGS.length)
    }, 4000)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const newLog = `[${time}] ${SYSTEM_LOGS[logIndex]}`
    setCurrentLogs((prev) => [newLog, ...prev].slice(0, 3))
  }, [logIndex])

  return (
    <div className="fixed inset-0 z-[120] pointer-events-none font-mono text-[8px] text-accent-gold/45 p-6 hidden lg:flex flex-col justify-between mix-blend-screen">
      {/* Top corners - positioned below the Navbar to prevent overlap */}
      <div className="flex justify-between items-start mt-20">
        <div className="flex flex-col gap-1 border-l border-t border-accent-gold/20 p-2.5 bg-bg-deep/10 backdrop-blur-sm">
          <span className="text-neon-green font-bold animate-pulse">VAULT_LEVEL: {level}</span>
          <span>SECTOR_ID: {sectorId}</span>
          <span>SYS.RENDER: WEBGL2</span>
        </div>
        <div className="flex flex-col gap-1 border-r border-t border-accent-gold/20 p-2.5 text-right bg-bg-deep/10 backdrop-blur-sm">
          <span>VIEWPORT: {window.innerWidth} × {window.innerHeight}</span>
          <span>CURS.COORDS: X={coords.x} Y={coords.y}</span>
          <span className={accessGranted ? 'text-neon-green' : 'text-red-500'}>
            AUTH_STATE: {accessGranted ? 'GRANTED' : 'PENDING'}
          </span>
        </div>
      </div>

      {/* Bottom corners */}
      <div className="flex justify-between items-end mt-auto">
        <div className="flex flex-col gap-1 border-l border-b border-accent-gold/20 p-2.5 max-w-[200px] bg-bg-deep/10 backdrop-blur-sm">
          {currentLogs.map((log, i) => (
            <span key={i} className={i === 0 ? 'text-accent-gold/70 animate-pulse' : 'text-accent-gold/30'}>
              {log}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1 border-r border-b border-accent-gold/20 p-2.5 text-right bg-bg-deep/10 backdrop-blur-sm">
          <span>GRID.SPATIAL_LOCK: ON</span>
          <span>SYS.SECURE_POSTURE: 100%</span>
        </div>
      </div>
    </div>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error) { console.error('Canvas Error:', error) }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function App() {
  const containerRef = useRef(null)
  const { setLevel, setSectorId, accessGranted } = useVaultStore()

  useEffect(() => {
    // Lock scroll until iris opens
    if (!accessGranted) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [accessGranted])

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor="link"]')
      if (target) {
        playHoverSound()
      }
    }
    const handleClick = (e) => {
      const target = e.target.closest('[data-cursor="link"]')
      if (target) {
        playClickSound()
      }
    }
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Setup ScrollTrigger for Vault Levels to update HUD and Camera Rig
  useEffect(() => {
    const sections = gsap.utils.toArray('.vault-level')
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setLevel(section.dataset.level)
          setSectorId(section.dataset.sector)
        },
        onEnterBack: () => {
          setLevel(section.dataset.level)
          setSectorId(section.dataset.sector)
        }
      })
    })

    // Single global scroll trigger for the camera rig
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        useVaultStore.getState().setCameraProgress(self.progress)
        useVaultStore.getState().setScrollVelocity(self.getVelocity())
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [setLevel, setSectorId])

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden cursor-none bg-bg-deep">
        <NoiseOverlay />
        <Spotlight />
        <LiquidWipe />
        <LiquidCursor />
        <Navbar />
        <HudOverlay />

        {/* 3D Background — fixed behind content */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ErrorBoundary>
            <Canvas
              camera={{ position: [0, 0, 10], fov: 35 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <Suspense fallback={null}>
                <SceneJourney />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* HTML Content Overlay — sections rendered over the fixed 3D canvas */}
        <div className="relative z-10 flex flex-col">
          <div id="hero" className="vault-level min-h-screen pointer-events-auto" data-level="AUTH" data-sector="SEC-00">
            <Hero />
          </div>
          <div id="work-anchor" className="vault-level pointer-events-auto" data-level="CASE_FILES" data-sector="SEC-01">
            <Work />
          </div>
          <div id="products-anchor" className="vault-level pointer-events-auto" data-level="LIVE_OPS" data-sector="SEC-02">
            <ProductDemo />
          </div>
          <div id="signal-anchor" className="vault-level pointer-events-auto" data-level="SIGNAL_LOG" data-sector="SEC-03">
            <SignalLog />
          </div>
          <div id="contact" className="vault-level pointer-events-auto" data-level="UPLINK" data-sector="SEC-04">
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </ReactLenis>
  )
}

export default App
