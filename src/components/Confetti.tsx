import { motion } from 'motion/react'
import { useState } from 'react'

const COLORS = ['#ff5d8f', '#ffd23f', '#3bc1ff', '#4cd964', '#a66bff', '#ff9f1c', '#ffffff']

/** A colourful burst from the middle of the screen that then rains down. Sits behind whatever is drawn after it. */
export function Confetti({ count = 140 }: { count?: number }) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2
      const power = 30 + Math.random() * 55 // how far it bursts, in vmin
      return {
        id: i,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
        size: 26 + Math.random() * 30,
        burstX: Math.cos(angle) * power,
        burstY: Math.sin(angle) * power - 10,
        driftX: (Math.random() - 0.5) * 20,
        spin: (Math.random() - 0.5) * 1440,
        duration: 3.5 + Math.random() * 2.5,
        delay: Math.random() * 0.25,
      }
    }),
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: p.round ? '50%' : 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: [`0vmin`, `${p.burstX}vmin`, `${p.burstX + p.driftX}vmin`],
            y: ['0vmin', `${p.burstY}vmin`, '90vmin'],
            rotate: p.spin,
            scale: [0, 1, 1],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            times: [0, 0.3, 1],
            ease: 'easeOut',
            // Stay fully solid until the last quarter, then fade
            opacity: { duration: p.duration, delay: p.delay, times: [0, 0.75, 1] },
          }}
        />
      ))}
    </div>
  )
}
