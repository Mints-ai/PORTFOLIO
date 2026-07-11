import React, { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import NoiseOverlay from './NoiseOverlay'

export default function Preloader() {
  const { progress } = useProgress()
  const [hide, setHide] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setHide(true)
      }, 800) // slight delay to show 100%
      return () => clearTimeout(timer)
    }
  }, [progress])

  if (hide) return null

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-deep transition-opacity duration-1000 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <NoiseOverlay />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h2 className="font-mono text-neon-green text-sm tracking-[0.2em] uppercase animate-pulse">
          [ SYSTEM BOOTING ]
        </h2>
        
        {/* Progress Bar Container */}
        <div className="w-64 h-1 border border-neon-green/30 bg-black overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-neon-green transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="font-mono text-neon-green/60 text-xs mt-2">
          {Math.round(progress)}% LOADED
        </p>
      </div>
      
      {/* Grid Background */}
      <div className="grid-overlay opacity-20 pointer-events-none" />
    </div>
  )
}
