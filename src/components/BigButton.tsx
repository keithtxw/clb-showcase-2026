import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const SIZES = {
  md: 'border-b-4 px-6 py-3 text-2xl',
  lg: 'border-b-8 px-12 py-6 text-4xl',
  xl: 'border-b-8 px-16 py-8 text-5xl',
}

/** Colours for the answer states. `idle` is the standard yellow button. */
const STATES = {
  idle: 'bg-sunny text-night border-orange-500',
  right: 'bg-green-400 text-night border-green-700',
  wrong: 'bg-red-500 text-white border-red-800',
}

/** Colour options while a button is idle (answer states above override it). */
const COLORS = {
  yellow: STATES.idle,
  blue: 'bg-blue-500 text-white border-blue-800',
}

/** Chunky, bouncy button sized for small fingers. */
export function BigButton({
  children,
  onClick,
  size = 'lg',
  state = 'idle',
  color = 'yellow',
  disabled = false,
  className = '',
  pulse = true,
}: {
  children: ReactNode
  onClick: () => void
  size?: keyof typeof SIZES
  /** Answer feedback: yellow by default, green when right, red when wrong (and shakes) */
  state?: keyof typeof STATES
  /** Colour while idle (yellow by default) */
  color?: keyof typeof COLORS
  disabled?: boolean
  className?: string
  /** Keep gently pulsing while idle (default). Turn off for buttons that sit still. */
  pulse?: boolean
}) {
  const active = !disabled && state === 'idle'
  const colors = state === 'idle' ? COLORS[color] : STATES[state]
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full font-bold shadow-2xl ${SIZES[size]} ${colors} ${
        disabled ? '' : 'cursor-pointer'
      } ${className}`}
      animate={state === 'wrong' ? { x: [0, -8, 8, -8, 0] } : active && pulse ? { scale: [1, 1.07, 1] } : { scale: 1 }}
      transition={
        state === 'wrong'
          ? { duration: 0.3 }
          : pulse
            ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
            : undefined
      }
      whileHover={
        active ? { scale: 1.15, rotate: -2, transition: { type: 'spring', stiffness: 500, damping: 25 } } : undefined
      }
      whileTap={active ? { scale: 0.92, y: 6, transition: { type: 'spring', stiffness: 500, damping: 25 } } : undefined}
    >
      {children}
    </motion.button>
  )
}
