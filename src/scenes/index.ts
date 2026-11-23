import type { ComponentType } from 'react'
import { FindItemsScene } from './FindItemsScene'
import { FindMarketScene } from './FindMarketScene'
import { FindStationScene } from './FindStationScene'
import { GridScene } from './GridScene'
import { IntroScene } from './IntroScene'
import { RaceScene } from './RaceScene'

export interface SceneProps {
  /** Go to the next scene */
  next: () => void
}

export interface Scene {
  id: string
  Component: ComponentType<SceneProps>
}

/** Add new scenes here, in play order. */
export const scenes: Scene[] = [
  { id: 'intro', Component: IntroScene },
  { id: 'grid', Component: GridScene },
  { id: 'race', Component: RaceScene },
  { id: 'find-items', Component: FindItemsScene },
  { id: 'find-items-2', Component: FindStationScene },
  { id: 'find-items-3', Component: FindMarketScene },
]
