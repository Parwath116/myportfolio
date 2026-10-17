import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' makes the build work on Netlify, GitHub Pages (project sites) or any static host.
export default defineConfig({
  base: './',
  plugins: [react()],
})
