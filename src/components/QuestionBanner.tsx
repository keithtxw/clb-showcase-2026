import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** The question at the top of a scene. */
export function QuestionBanner({
  children,
  bannerKey,
}: {
  children: ReactNode
  /** Changes with each question so the banner bounces in again */
  bannerKey: string | number
}) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={bannerKey}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
        className="rounded-full bg-white px-10 py-3 text-center text-4xl font-bold shadow-xl sm:text-5xl"
      >
        {children}
      </motion.div>
    </div>
  )
}
