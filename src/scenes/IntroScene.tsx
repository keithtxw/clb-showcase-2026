import { TitleScreen, type Floater } from '../components/TitleScreen'
import type { SceneProps } from './index'

const FLOATERS: Floater[] = [
  ['🎈', 8, 14, 5, 0],
  ['🏎️', 82, 12, 5.5, 0.4],
  ['🐘', 12, 68, 6, 0.8],
  ['🎡', 80, 66, 6, 0.2],
  ['✈️', 44, 6, 4.5, 0.6],
  ['🚂', 46, 82, 5, 1],
]

/** The first scene: a friendly title and a big Start button. */
export function IntroScene({ next }: SceneProps) {
  return (
    <TitleScreen
      title="Game time"
      floaters={FLOATERS}
      background="bg-linear-to-b from-[#1b1145] via-[#3a1f8a] to-[#1e3a8a]"
      onStart={next}
    />
  )
}
