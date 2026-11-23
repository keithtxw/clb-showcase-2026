import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { NavArrows } from './components/NavArrows'
import { SceneTransition } from './components/SceneTransition'
import { scenes } from './scenes'

export default function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const go = (to: number) => {
    if (to < 0 || to >= scenes.length) return
    setDirection(to > index ? 1 : -1)
    setIndex(to)
  }

  // Keyboard: → / PageDown for next, ← / PageUp for back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(index + 1)
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const { id, Component } = scenes[index]

  return (
    <main className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction}>
        <SceneTransition key={id} direction={direction}>
          <Component next={() => go(index + 1)} />
        </SceneTransition>
      </AnimatePresence>
      <NavArrows
        onBack={() => go(index - 1)}
        onNext={() => go(index + 1)}
        canBack={index > 0}
        canNext={index < scenes.length - 1}
      />
    </main>
  )
}
