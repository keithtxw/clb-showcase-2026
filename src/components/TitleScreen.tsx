import { motion } from 'motion/react'
import { BigButton } from './BigButton'

/** [emoji, left %, top %, size rem, bob delay s] */
export type Floater = readonly [string, number, number, number, number]

/** A big bouncy title, a Start button and emojis bobbing around the edges. */
export function TitleScreen({
  title,
  floaters,
  background,
  onStart,
  buttonLabel = 'Start',
}: {
  title: string
  floaters: readonly Floater[]
  /** Tailwind background classes, e.g. a gradient */
  background: string
  onStart: () => void
  buttonLabel?: string
}) {
  return (
    <div
      className={`relative flex h-full min-h-[600px] flex-col items-center justify-center gap-12 overflow-hidden ${background}`}
    >
      {floaters.map(([emoji, left, top, size, delay]) => (
        <motion.span
          key={emoji}
          aria-hidden
          className="absolute leading-none select-none"
          style={{ left: `${left}%`, top: `${top}%`, fontSize: `${size}rem` }}
          animate={{ y: [0, -24, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.h1
        className="relative z-10 px-6 text-center text-7xl font-bold text-white drop-shadow-[0_6px_0_rgba(255,93,143,0.7)] sm:text-9xl"
        initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {title}
      </motion.h1>

      <motion.div
        className="relative z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.6 }}
      >
        <BigButton onClick={onStart} size="xl">
          {buttonLabel}
        </BigButton>
      </motion.div>
    </div>
  )
}
