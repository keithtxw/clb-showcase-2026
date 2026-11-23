import { motion } from 'motion/react'

function Arrow({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
  label: string
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`
        fixed bottom-4 z-50 flex h-20 w-20 items-center justify-center rounded-full border-b-8 text-5xl font-bold
        text-white shadow-2xl
        ${direction === 'left' ? 'left-4' : 'right-4'}
        ${disabled ? 'cursor-default border-gray-400 bg-gray-300 opacity-40' : 'cursor-pointer border-purple-800 bg-grape'}
      `}
      whileHover={disabled ? undefined : { scale: 1.12 }}
      whileTap={disabled ? undefined : { scale: 0.9, y: 6 }}
    >
      {direction === 'left' ? '◀' : '▶'}
    </motion.button>
  )
}

/** Big, chunky arrows for moving between scenes. */
export function NavArrows({
  onBack,
  onNext,
  canBack,
  canNext,
}: {
  onBack: () => void
  onNext: () => void
  canBack: boolean
  canNext: boolean
}) {
  return (
    <>
      <Arrow direction="left" onClick={onBack} disabled={!canBack} label="Previous scene" />
      <Arrow direction="right" onClick={onNext} disabled={!canNext} label="Next scene" />
    </>
  )
}
