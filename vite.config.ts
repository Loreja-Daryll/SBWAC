import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages project sites (github.com/Loreja-Daryll/SBWAC)
  // — without this, all asset URLs (CSS, JS, images) resolve incorrectly
  // once deployed, since the site lives at /SBWAC/ not at the domain root.
  base: '/SBWAC/',
})
