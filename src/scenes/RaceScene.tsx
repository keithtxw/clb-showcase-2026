import { motion } from 'motion/react'
import { useState } from 'react'
import { Car } from '../components/Car'
import { QuestionBanner } from '../components/QuestionBanner'
import { RACE_CARS, RACE_PROMPT, type RaceCar } from '../config/gameConfig'
import { playFlip } from '../lib/sound'

/** Car pictures dropped in src/assets/racing-cars/<id>-car.png, keyed by car id */
const CAR_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('../assets/racing-cars/*-car.png', {
      query: { webp: '' },
      import: 'default',
      eager: true,
    }),
  ).map(([path, url]) => [
    path
      .split('/')
      .pop()!
      .replace(/-car\.png$/, ''),
    url,
  ]),
)

function Lane({
  car,
  running,
  onLaunch,
  onFinish,
}: {
  car: RaceCar
  running: boolean
  onLaunch: () => void
  onFinish: () => void
}) {
  return (
    <div
      onClick={running ? undefined : onLaunch}
      className={`relative flex-1 border-y-4 border-dashed border-white/50 ${running ? '' : 'cursor-pointer'}`}
    >
      {/* Start light: tap the lane to send its car. It comes back once the car has finished, so it can be repeated. */}
      {!running && (
        <motion.div
          className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-3xl font-bold text-ink shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          🚦 GO!
        </motion.div>
      )}

      {/* The car only exists while it is zooming across */}
      {running && (
        <motion.div
          className="absolute top-1/2 left-0 h-[80%] -translate-y-1/2"
          initial={{ x: '-50vw' }}
          animate={{ x: '110vw' }}
          transition={{ duration: car.seconds, ease: 'linear' }}
          onAnimationComplete={onFinish}
        >
          <Car src={CAR_IMAGES[car.id]} alt={`${car.name} car`} className="h-full" />
        </motion.div>
      )}
    </div>
  )
}

/**
 * Scene 2: tap a lane's GO! to send its car zooming across. Each lane is faster than the one above.
 * When the car has gone, GO! comes back so it can be sent again.
 */
export function RaceScene() {
  const [running, setRunning] = useState<Set<string>>(new Set())

  const setCarRunning = (id: string, on: boolean) =>
    setRunning((s) => {
      const next = new Set(s)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })

  return (
    <div className="flex h-full min-h-[600px] flex-col bg-linear-to-b from-sky to-grass pt-4 pb-24">
      <QuestionBanner bannerKey="race">{RACE_PROMPT}</QuestionBanner>

      {/* The track */}
      <div className="relative my-4 flex min-h-0 flex-1 flex-col overflow-hidden border-y-8 border-white bg-slate-600">
        {RACE_CARS.map((car) => (
          <Lane
            key={car.id}
            car={car}
            running={running.has(car.id)}
            onLaunch={() => {
              playFlip()
              setCarRunning(car.id, true)
            }}
            onFinish={() => setCarRunning(car.id, false)}
          />
        ))}
      </div>
    </div>
  )
}
