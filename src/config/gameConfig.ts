/**
 * All the game content lives here. Edit this file to change the pictures, questions and cars.
 */

/* ---------- Scene 1: the hidden picture ---------- */

export interface HiddenPicture {
  /** Also the picture's file name: drop `src/assets/grid/<id>.png (or .jpg)` and it replaces the emoji placeholder. */
  id: string
  /** What the picture shows, revealed at the end ("It's a Cat!") */
  answer: string
  /** Stand-in shown behind the tiles until the real picture is added */
  emoji: string
  /** Colour behind the placeholder emoji */
  background: string
  /** Marks an extra question with a "Bonus" badge */
  bonus?: boolean
}

/** The questions, in order: one hidden picture each, covered by a 4x4 grid of tiles. */
export const GRID_QUESTIONS: HiddenPicture[] = [
  { id: 'elephant', answer: 'Elephant', emoji: '🐘', background: '#ffe9a8' },
  { id: 'cat', answer: 'Cat', emoji: '🐱', background: '#c9f0ff' },
  { id: 'plane', answer: 'Airplane', emoji: '✈️', background: '#d6f5c9' },
  { id: 'train', answer: 'Train', emoji: '🚂', background: '#ffd6e5' },
  { id: 'ferris-wheel', answer: 'Ferris wheel', emoji: '🎡', background: '#e3d6ff' },
  { id: 'lsc-church', answer: 'Church', emoji: '⛪', background: '#ffd6e5', bonus: true },
]

/** What the host asks for each picture */
export const GRID_PROMPT = 'What is behind?'

/** The cover-tile colour for each question, in order: every tile in a question is the same colour. */
export const TILE_COLORS = ['#ff5d8f', '#ffd23f', '#3bc1ff', '#4cd964', '#a66bff', '#ff9f1c']

/* ---------- Scene 2: the race track ---------- */

export interface RaceCar {
  /** Also the picture's file name: `src/assets/racing-cars/<id>-car.png` */
  id: string
  /** Colour name of the car */
  name: string
  /** Seconds to zoom across the screen once (smaller = faster) */
  seconds: number
}

/** 5 cars, one per lane, top to bottom. */
export const RACE_CARS: RaceCar[] = [
  { id: 'orange', name: 'Orange', seconds: 2 },
  { id: 'blue', name: 'Blue', seconds: 1.5 },
  { id: 'yellow', name: 'Yellow', seconds: 1 },
  { id: 'green', name: 'Green', seconds: 0.5 },
  { id: 'purple', name: 'Purple', seconds: 0.35 },
]

/** The question shown above the track */
export const RACE_PROMPT = 'What is the colour of the car? 🏎️'

/* ---------- Scene 4: find the items ---------- */

export interface FindItem {
  name: string
  /** Centre and half-width / half-height of the circle, in pixels of the picture's own size */
  x: number
  y: number
  rx: number
  ry: number
}

export interface FindRound {
  /** Also the picture's file name: `src/assets/find-images/<id>.png` */
  id: string
  /** The picture's own size in pixels (the item positions below are measured on this) */
  width: number
  height: number
  /** The things to find; each gets a circle drawn round it */
  items: FindItem[]
}

/** The pictures the children search through, in order. */
export const FIND_ROUNDS: FindRound[] = [
  {
    id: 'beach',
    width: 1672,
    height: 941,
    items: [
      { name: 'Balloons', x: 720, y: 172, rx: 112, ry: 100 },
      { name: 'Umbrella', x: 1428, y: 212, rx: 262, ry: 150 },
      { name: 'Ice-cream', x: 466, y: 122, rx: 128, ry: 80 },
      { name: 'Sandcastle', x: 662, y: 712, rx: 185, ry: 148 },
      { name: 'Crab', x: 1217, y: 795, rx: 66, ry: 60 },
    ],
  },
  {
    id: 'train-station',
    width: 1672,
    height: 941,
    items: [
      { name: 'Clock', x: 1382, y: 135, rx: 100, ry: 98 },
      { name: 'Teddy bear', x: 400, y: 693, rx: 80, ry: 64 },
      { name: 'Dustbin', x: 1422, y: 695, rx: 115, ry: 145 },
      { name: 'Bird', x: 1270, y: 460, rx: 68, ry: 60 },
      { name: 'Policeman', x: 272, y: 538, rx: 150, ry: 250 },
    ],
  },
  {
    id: 'market-fair',
    width: 1672,
    height: 941,
    items: [
      { name: 'Cat', x: 1200, y: 678, rx: 80, ry: 50 },
      { name: 'Cookies', x: 332, y: 735, rx: 72, ry: 42 },
      { name: 'Banana', x: 100, y: 268, rx: 95, ry: 58 },
      { name: 'Balloon', x: 1167, y: 78, rx: 64, ry: 80 },
      { name: 'Blue bag', x: 1395, y: 712, rx: 80, ry: 88 },
      { name: 'Windmill', x: 619, y: 290, rx: 142, ry: 62 },
    ],
  },
]
