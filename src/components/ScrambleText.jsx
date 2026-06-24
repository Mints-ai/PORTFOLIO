import React, { useEffect, useRef, useState, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}|/'

/**
 * ScrambleText — Animates text by cycling through random characters
 * before "decoding" to the real letters, letter by letter.
 *
 * Props:
 *   text       {string}  — The final text to reveal
 *   delay      {number}  — Delay in ms before animation starts
 *   duration   {number}  — Total duration in ms for full reveal
 *   className  {string}
 *   onComplete {fn}      — Callback when done
 */
export default function ScrambleText({
  text = '',
  delay = 0,
  duration = 1400,
  className = '',
  onComplete,
}) {
  const [displayed, setDisplayed] = useState(() => {
    return text
      .split('')
      .map((c) => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join('')
  })
  const frameRef = useRef(null)
  const startedRef = useRef(false)
  const containerRef = useRef(null)

  const scramble = useCallback(() => {
    const total = text.length
    // Stagger: each char finishes at a different time
    // char i finishes at  (i / total) * duration
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      let result = ''

      for (let i = 0; i < total; i++) {
        const charFinish = (i / total) * duration
        if (elapsed >= charFinish) {
          // This char has settled
          result += text[i]
        } else {
          // Still scrambling — random char, but space stays space
          result += text[i] === ' '
            ? ' '
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }

      setDisplayed(result)

      if (elapsed < duration) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayed(text)
        onComplete?.()
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [text, duration, onComplete])

  useEffect(() => {
    // Use IntersectionObserver so it fires when element enters viewport
    const el = containerRef.current
    if (!el) return

    let timer = null

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          timer = setTimeout(scramble, delay)
          obs.disconnect() // We only need to trigger once
        }
      },
      { threshold: 0 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (timer) clearTimeout(timer)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [scramble, delay])

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {displayed}
    </span>
  )
}
