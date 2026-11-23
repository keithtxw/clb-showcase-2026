# CLB Showcase 2026 🏎️

A simple, bright, in-person touch game for 3-year-olds. Two scenes, five questions each.

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · Motion (animations)

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run lint
```

## The scenes

0. **Intro** – "Game time" with a big Start button.
1. **Hidden picture** – one big picture sits behind a 4x4 grid of coloured tiles. Each tap pops a tile off and
   reveals that section. Reveal them all (or press "I know!") to see the answer. 6 pictures, one per question, the last a bonus.
2. **Race track** – tap a lane's GO! to send its car zooming across (it can be repeated). Each lane is faster than the last. The children name the colour.
3. **Find the items** – a title screen with Start, then big pictures (beach, train station, market fair). Click an item and a circle draws round it; the list at the bottom greys out as items are found.

Use the big ◀ ▶ arrow buttons (or the keyboard arrow keys) to move between scenes.

## Game settings

Questions, grid items and cars live in `src/config/gameConfig.ts`.

## Grid pictures

Drop a PNG named after each question's `id` into `src/assets/grid/` (for example `elephant.png`) and it replaces that
question's emoji placeholder. Use a square picture, since it is cut into a 4x4 grid. Pictures are served as compressed WebP and preloaded automatically.

## Adding a scene

1. Create `src/scenes/MyScene.tsx`.
2. Register it in order in `src/scenes/index.ts`.
