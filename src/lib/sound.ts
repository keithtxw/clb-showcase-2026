let ctx: AudioContext | null = null

function getCtx() {
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, start: number, length: number, type: OscillatorType, volume: number) {
  const c = getCtx()
  const t0 = c.currentTime + start
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(volume, t0)
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + length)
  osc.connect(gain).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + length)
}

/** Happy rising chime for a right answer (synthesised, no audio file needed). */
export function playCheer() {
  ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.3, 'triangle', 0.18))
}

/** Soft, gentle "boop" for a try-again (deliberately not harsh). */
export function playOops() {
  tone(300, 0, 0.18, 'sine', 0.15)
  tone(240, 0.12, 0.25, 'sine', 0.15)
}

/** Tiny pop when a tile flips. */
export function playFlip() {
  tone(660, 0, 0.1, 'sine', 0.1)
}
