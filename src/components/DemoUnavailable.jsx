import React from 'react'

export default function DemoUnavailable({ onRetry }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-bg-surface/50 text-center p-8 border border-glass-border">
      <div className="w-16 h-16 rounded-full bg-bg-elevated flex items-center justify-center mb-4 border border-glass-border">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-beige-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="font-display text-2xl text-beige-100 mb-2">Demo Unavailable</h3>
      <p className="font-body text-beige-300 mb-6 max-w-sm">
        We couldn't load the live environment. It might be blocked by a network setting or currently offline.
      </p>
      <div className="flex gap-4">
        {onRetry && (
          <button onClick={onRetry} className="px-4 py-2 font-body text-sm rounded bg-glass-fill border border-glass-border hover:bg-white/5 text-beige-100 transition-colors">
            Retry Connection
          </button>
        )}
        <button className="px-4 py-2 font-body text-sm rounded bg-accent-gold text-bg-deep hover:bg-beige-100 transition-colors" data-cursor="link">
          Book Live Walkthrough
        </button>
      </div>
    </div>
  )
}
