import { FIND_ROUNDS } from '../config/gameConfig'
import { FindRound } from './FindItemsScene'

/** Scene 6: the market fair picture. */
export function FindMarketScene() {
  return <FindRound round={FIND_ROUNDS.find((r) => r.id === 'market-fair')!} />
}
