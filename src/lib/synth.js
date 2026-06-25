let audioCtx = null
let isMuted = localStorage.getItem('mg_muted') === 'true'

export function setMuted(muted) {
  isMuted = muted
  localStorage.setItem('mg_muted', String(muted))
}

export function getMuted() {
  return isMuted
}

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/**
 * Play a subtle low-frequency blip for cursor hovers
 */
export function playHoverSound() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    // Subtly slide frequency down: 140Hz -> 70Hz
    osc.frequency.setValueAtTime(140, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08)

    // Very quiet level (0.008) so it is non-intrusive on rapid hovers
    gain.gain.setValueAtTime(0.008, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  } catch {
    // Ignore context interaction warnings
  }
}

/**
 * Play a high-tech metallic blip for clicks
 */
export function playClickSound() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    // Quick click sweep: 880Hz -> 220Hz
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1)

    gain.gain.setValueAtTime(0.025, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  } catch {
    // Ignore context warnings
  }
}

/**
 * Play a cyber warning siren sweep (for lockdowns)
 */
export function playLockdownSound() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(110, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.3)
    osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.6)

    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.5)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(500, ctx.currentTime)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.6)
  } catch {
    // Ignore warnings
  }
}

/**
 * Play an ascending two-note success chime
 */
export function playSuccessSound() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    const gain2 = ctx.createGain()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08) // E5

    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16) // G5

    gain1.gain.setValueAtTime(0.015, ctx.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25)

    gain2.gain.setValueAtTime(0, ctx.currentTime)
    gain2.gain.setValueAtTime(0.015, ctx.currentTime + 0.16)
    gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)

    osc1.start()
    osc1.stop(ctx.currentTime + 0.3)
    osc2.start(ctx.currentTime + 0.16)
    osc2.stop(ctx.currentTime + 0.4)
  } catch {
    // Ignore warnings
  }
}

/**
 * Play a low mechanical confirm tone for ACCESS GRANTED
 */
export function playGrantedSound() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(164.81, ctx.currentTime) // E3
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3)

    gain.gain.setValueAtTime(0.015, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, ctx.currentTime)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.4)
  } catch {
    // Ignore warnings
  }
}

/**
 * Play a heavy mechanical clunk for vault transitions
 */
export function playTransitionSound() {
  if (isMuted) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(55, ctx.currentTime) // A1
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.2)

    gain.gain.setValueAtTime(0.02, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  } catch {
    // Ignore warnings
  }
}
