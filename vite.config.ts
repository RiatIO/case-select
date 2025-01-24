import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test APIs like `describe` and `it`
    environment: 'jsdom', // Simulates a browser-like environment
    setupFiles: './src/setupTests.ts', // Path to the setup file
  },
})
