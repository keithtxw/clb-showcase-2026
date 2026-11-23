/** Every picture in src/assets (any subfolder), as the (compressed WebP) URL the scenes use. */
const IMAGE_URLS = Object.values(
  import.meta.glob<string>('../assets/**/*.{png,jpg,jpeg,webp}', {
    query: { webp: '' },
    import: 'default',
    eager: true,
  }),
)

/** Quietly downloads all the pictures shortly after page load so scenes never show blank pictures. */
export function preloadImages() {
  const queue = [...IMAGE_URLS]
  const loadNext = () => {
    const url = queue.shift()
    if (!url) return
    const img = new Image()
    img.onload = img.onerror = loadNext
    img.src = url
  }
  setTimeout(loadNext, 500)
}
