import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import NoiseOverlay from '../components/NoiseOverlay'

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-bg-deep flex flex-col items-center justify-center overflow-hidden cursor-none">
      <Helmet>
        <title>404 Sector Not Found | Mints Global</title>
      </Helmet>
      <NoiseOverlay />
      
      {/* Glitch text container */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 text-center mix-blend-screen">
        <h1 className="font-display text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neon-green to-accent-gold/20 leading-none">
          404
        </h1>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-neon-green tracking-[0.3em] uppercase text-sm animate-pulse">
            [ ERROR_ACCESS_DENIED ]
          </p>
          <p className="font-body text-beige-300 text-lg max-w-md">
            The sector you are attempting to access does not exist in the current vault simulation.
          </p>
        </div>
        
        <div className="mt-8">
          <Link to="/" data-cursor="link" className="btn-cyber group">
            <span className="relative z-10">REBOOT SYSTEM</span>
            <div className="absolute inset-0 bg-neon-green/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Link>
        </div>
      </div>

      {/* Grid Background */}
      <div className="grid-overlay opacity-30" />
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-neon-green/5 to-transparent pointer-events-none" />
    </div>
  )
}
