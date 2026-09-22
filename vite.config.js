import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [tailwindcss(), react()],
  build: {
    // Three.js is only pulled in by the lazy 3D scenes, so keeping it in its
    // own chunk means the initial page load never pays for it.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
