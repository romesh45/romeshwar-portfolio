import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1100,   // three-vendor (Three.js + R3F + Drei) is ~1MB — expected
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('three') || id.includes('@react-three')) return 'three-vendor'
          if (id.includes('framer-motion') || id.includes('gsap'))   return 'motion-vendor'
          if (id.includes('node_modules/react') || id.includes('react-dom') || id.includes('react-router')) return 'react-vendor'
        },
      },
    },
  },
})
