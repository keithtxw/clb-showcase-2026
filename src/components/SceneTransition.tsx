import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** Wraps a scene so it slides/fades in and out when the scene changes. */
export function SceneTransition({ children, direction }: { children: ReactNode; direction: 1 | -1 }) {
  return (
    <motion.div
      className="absolute inset-0 overflow-y-auto"
      initial={{ opacity: 0, x: 80 * direction, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -80 * direction, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      {children}
    </motion.div>
  )
}
