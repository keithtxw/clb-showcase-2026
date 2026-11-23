import { FIND_ROUNDS } from '../config/gameConfig'
import { FindRound } from './FindItemsScene'

/** Scene 5: the train station picture, straight into the picture (the title screen already showed for the beach). */
export function FindStationScene() {
  return <FindRound round={FIND_ROUNDS.find((r) => r.id === 'train-station')!} />
}
