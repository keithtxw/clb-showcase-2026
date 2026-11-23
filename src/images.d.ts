/** Pictures imported with the `?webp` suffix (see vite.config.ts) give back the URL of a compressed WebP. */
declare module '*?webp' {
  const src: string
  export default src
}
