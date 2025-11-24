import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    rollupNodePolyFill()
  ],
  resolve: {
    alias: {
      events: 'rollup-plugin-node-polyfills/polyfills/events'
    }
  },
  optimizeDeps: {
    include: ['events']
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()]
    }
  }
})
