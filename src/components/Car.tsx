import { motion } from 'motion/react'

/** Streaks trailing behind the car: [top %, length %, delay s] */
const STREAKS = [
  [18, 70, 0],
  [38, 100, 0.08],
  [58, 80, 0.16],
  [78, 60, 0.04],
] as const

/** A racing car picture with speed streaks trailing behind it and a little bounce. Faces right. */
export function Car({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <motion.div
      className={`relative flex ${className}`}
      animate={{ y: [0, -3, 0, -2, 0] }}
      transition={{ duration: 0.25, repeat: Infinity, ease: 'linear' }}
    >
      {/* Speed lines, drawn to the left (behind) the car */}
      <div className="pointer-events-none absolute top-0 right-[92%] h-full w-[70%]">
        {STREAKS.map(([top, length, delay]) => (
          <motion.div
            key={top}
            className="absolute right-0 h-[5%] rounded-full bg-white"
            style={{ top: `${top}%`, width: `${length}%`, originX: 1 }}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 0.28, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <img src={src} alt={alt} className="relative h-full w-auto max-w-[30vw] drop-shadow-xl" draggable={false} />
    </motion.div>
  )
}
