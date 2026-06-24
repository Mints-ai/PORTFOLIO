import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import LiquidCursor from './components/LiquidCursor'
import LiquidWipe from './components/LiquidWipe'
import NoiseOverlay from './components/NoiseOverlay'
import Spotlight from './components/Spotlight'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Work from './sections/Work'
import ProductDemo from './sections/ProductDemo'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { playHoverSound, playClickSound } from './lib/synth'

const SceneJourney = lazy(() => import('./three/SceneJourney'))

const SYSTEM_LOGS = [
  'SYSTEM OK // CORE STABLE',
  'MATRIX SHIFT: RESOLVED',
  'SCROLL STATE: PASSIVE',
  '3D ENVIRONMENT: READY',
  'REFRESH FREQ: 60HZ',
  'PORTAL ROUTE: MAIN',
  'RESONATOR POSTURE: 99.8%'
]

function HudOverlay() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [logIndex, setLogIndex] = useState(0)
  const [currentLogs, setCurrentLogs] = useState([])

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
    <div className="fixed inset-0 z-[120] pointer-events-none font-mono text-[8px] text-accent-gold/45 p-6 hidden lg:flex flex-col justify-between">
      {/* Top corners - positioned below the Navbar to prevent overlap */}
      <div className="flex justify-between items-start mt-20">
        <div className="flex flex-col gap-1 border-l border-t border-accent-gold/20 p-2.5">
          <span>SYS.LATENCY: 4.8ms</span>
          <span>SYS.FPS: 60.00</span>
          <span>SYS.RENDER: WEBGL2</span>
        </div>
        <div className="flex flex-col gap-1 border-r border-t border-accent-gold/20 p-2.5 text-right">
          <span>VIEWPORT: {window.innerWidth} × {window.innerHeight}</span>
          <span>CURS.COORDS: X={coords.x} Y={coords.y}</span>
        </div>
      </div>

      {/* Bottom corners */}
      <div className="flex justify-between items-end mt-auto">
        <div className="flex flex-col gap-1 border-l border-b border-accent-gold/20 p-2.5 max-w-[200px]">
          {currentLogs.map((log, i) => (
            <span key={i} className={i === 0 ? 'text-accent-gold/70 animate-pulse' : 'text-accent-gold/30'}>
              {log}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1 border-r border-b border-accent-gold/20 p-2.5 text-right">
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

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden cursor-none bg-bg-deep">
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
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <SceneJourney />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* HTML Content Overlay */}
      <div className="relative z-10 flex flex-col">
        <div id="hero">
          <Hero />
        </div>
        <div id="work-anchor">
          <Work />
        </div>
        <div id="products-anchor">
          <ProductDemo />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
