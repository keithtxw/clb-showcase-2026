import { motion } from 'motion/react'
import { useState } from 'react'
import { TitleScreen, type Floater } from '../components/TitleScreen'
import { FIND_ROUNDS, type FindRound as FindRoundConfig } from '../config/gameConfig'
import { playCheer } from '../lib/sound'

/** Pictures dropped in src/assets/find-images/<id>.png, keyed by id */
const PICTURES: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('../assets/find-images/*.png', { query: { webp: '' }, import: 'default', eager: true }),
  ).map(([path, url]) => [
    path
      .split('/')
      .pop()!
      .replace(/\.png$/, ''),
    url,
  ]),
)

const FLOATERS: Floater[] = [
  ['🔍', 8, 14, 5.5, 0],
  ['🧸', 82, 12, 5, 0.4],
  ['🍎', 12, 68, 5, 0.8],
  ['⚽', 80, 66, 5, 0.2],
  ['🧩', 44, 6, 4.5, 0.6],
  ['🎩', 46, 82, 5, 1],
]

/** Scene 4: "Find the items". A title screen, then a big picture for the children to search. */
export function FindItemsScene() {
  const [started, setStarted] = useState(false)

  if (!started) {
    return (
      <TitleScreen
        title="Find the items"
        floaters={FLOATERS}
        background="bg-linear-to-b from-[#0b3d3a] via-[#0f766e] to-[#1d4ed8]"
        onStart={() => setStarted(true)}
      />
    )
  }

  return <FindRound round={FIND_ROUNDS[0]} />
}

/** Room kept under the picture for the list of items to find */
const BAR_HEIGHT = '6rem'

/** A big picture. Click an item's area and a circle draws itself round it. */
export function FindRound({ round }: { round: FindRoundConfig }) {
  const [found, setFound] = useState<Set<number>>(new Set())

  const find = (i: number) => {
    if (found.has(i)) return
    playCheer()
    setFound((s) => new Set(s).add(i))
  }

  return (
    <div className="flex h-full min-h-[600px] flex-col items-center justify-center bg-[#fdebb9]">
      <motion.div
        className="relative"
        style={{
          aspectRatio: `${round.width} / ${round.height}`,
          width: `min(100vw, calc((100svh - ${BAR_HEIGHT}) * ${round.width} / ${round.height}))`,
        }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={PICTURES[round.id]} alt="Find the items" className="h-full w-full" draggable={false} />

        {/* Circles are drawn in the picture's own pixel space, so they stay on the items at any screen size */}
        <svg viewBox={`0 0 ${round.width} ${round.height}`} className="absolute inset-0 h-full w-full">
          {round.items.map((item, i) => (
            <g key={item.name}>
              {found.has(i) && (
                <>
                  {/* White outline underneath so the circle stands out on any colour */}
                  <motion.ellipse
                    cx={item.x}
                    cy={item.y}
                    rx={item.rx}
                    ry={item.ry}
                    fill="none"
                    stroke="white"
                    strokeWidth={20}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <motion.ellipse
                    cx={item.x}
                    cy={item.y}
                    rx={item.rx}
                    ry={item.ry}
                    fill="none"
                    stroke="#ff2d6f"
                    strokeWidth={10}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </>
              )}
              {/* Invisible tap target over the item */}
              <ellipse
                cx={item.x}
                cy={item.y}
                rx={item.rx}
                ry={item.ry}
                fill="transparent"
                className={found.has(i) ? '' : 'cursor-pointer'}
                onClick={() => find(i)}
              />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* What to find. Items are greyed out once found. Side padding keeps clear of the ◀ ▶ arrows. */}
      <div className="flex flex-wrap items-center justify-center gap-3 px-28" style={{ height: BAR_HEIGHT }}>
        {round.items.map((item, i) => (
          <motion.div
            key={item.name}
            animate={found.has(i) ? { scale: 0.92 } : { scale: 1 }}
            className={`flex items-center rounded-full border-4 px-6 py-2 text-3xl font-bold shadow-md transition-colors ${
              found.has(i) ? 'border-gray-300 bg-gray-200 text-gray-400 line-through' : 'border-white bg-white text-ink'
            }`}
          >
            {item.name}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
