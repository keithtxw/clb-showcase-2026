import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Import a picture as `foo.png?webp` to get a much smaller WebP version of it (the original PNG is untouched)
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has('webp')
          ? new URLSearchParams({ format: 'webp', quality: '80', w: '2000', withoutEnlargement: '' })
          : new URLSearchParams(),
    }),
  ],
})
