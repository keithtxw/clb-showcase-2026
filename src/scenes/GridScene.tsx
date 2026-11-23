import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { BigButton } from '../components/BigButton'
import { Confetti } from '../components/Confetti'
import { QuestionBanner } from '../components/QuestionBanner'
import { GRID_PROMPT, GRID_QUESTIONS, TILE_COLORS } from '../config/gameConfig'
import { playCheer, playFlip } from '../lib/sound'

/** Pictures dropped in src/assets/grid/<id>.png (or .jpg), keyed by id. Missing ones fall back to a big emoji. */
const PICTURES: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('../assets/grid/*.{png,jpg,jpeg,webp}', {
      query: { webp: '' },
      import: 'default',
      eager: true,
    }),
  ).map(([path, url]) => [
    path
      .split('/')
      .pop()!
      .replace(/\.(png|jpe?g|webp)$/, ''),
    url,
  ]),
)

const TILE_COUNT = 16

/**
 * Scene 1: one big picture hidden behind a 4x4 grid of coloured tiles. Each tap pops a tile away and reveals
 * that section of the picture. Reveal them all (or press "I know!") to see the answer.
 */
export function GridScene() {
  const [question, setQuestion] = useState(0)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const finished = question >= GRID_QUESTIONS.length
  const current = finished ? null : GRID_QUESTIONS[question]
  const done = revealed.size === TILE_COUNT

  // Cheer when the last tile comes off (including via "I know!")
  useEffect(() => {
    if (done) playCheer()
  }, [done])

  const reveal = (i: number) => {
    if (revealed.has(i)) return
    playFlip()
    setRevealed((s) => new Set(s).add(i))
  }

  const revealAll = () => setRevealed(new Set(Array.from({ length: TILE_COUNT }, (_, i) => i)))

  const nextQuestion = () => {
    setRevealed(new Set())
    setQuestion((q) => q + 1)
  }

  const restart = () => {
    setRevealed(new Set())
    setQuestion(0)
  }

  const picture = current ? PICTURES[current.id] : undefined
  return (
    <div className="relative isolate flex h-full min-h-[600px] flex-col items-center justify-center gap-4 bg-linear-to-b from-sky via-sky to-sunny/70">
      {/* Confetti bursts behind the picture once it is fully revealed */}
      {done && <Confetti key={question} />}

      <div className="relative z-10">
        {current?.bonus && (
          <motion.div
            className="absolute -top-5 -right-8 z-10 rounded-full border-4 border-white bg-candy px-4 py-1 text-2xl font-bold text-white shadow-lg"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          >
            🌟 BONUS
          </motion.div>
        )}
        <QuestionBanner bannerKey={question}>{finished ? '🎉 Well done! 🎉' : <>{GRID_PROMPT} 🤔</>}</QuestionBanner>
      </div>

      {current && (
        <>
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative aspect-square h-[min(92vw,calc(100svh-17rem))] overflow-hidden rounded-3xl border-8 border-white shadow-2xl">
              {/* The main picture, behind everything */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: current.background }}
              >
                {picture ? (
                  <img src={picture} alt={current.answer} className="h-full w-full object-cover" draggable={false} />
                ) : (
                  <span className="text-[min(45vh,45vw)] leading-none">{current.emoji}</span>
                )}
              </div>

              {/* The cover tiles, 4x4: tapping one pops it off */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                {Array.from({ length: TILE_COUNT }, (_, i) => (
                  <div key={i} className="relative">
                    <AnimatePresence>
                      {!revealed.has(i) && (
                        <motion.button
                          onClick={() => reveal(i)}
                          aria-label="Reveal this part"
                          className="absolute inset-0 flex cursor-pointer items-center justify-center border-4 border-white/80 text-4xl font-bold text-white sm:text-6xl"
                          style={{ backgroundColor: TILE_COLORS[question % TILE_COLORS.length] }}
                          exit={{ scale: 0, rotate: 90, opacity: 0, transition: { duration: 0.35 } }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ?
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex h-20 items-center">
            {done ? (
              <BigButton onClick={nextQuestion} size="md">
                {question === GRID_QUESTIONS.length - 1 ? 'Finish 🏁' : 'Next picture ➡️'}
              </BigButton>
            ) : (
              <BigButton onClick={revealAll} size="md" color="blue">
                I know! 🙋
              </BigButton>
            )}
          </div>
        </>
      )}

      {finished && (
        <div className="flex items-center">
          <BigButton onClick={restart} size="md">
            Play again 🔄
          </BigButton>
        </div>
      )}
    </div>
  )
}
