import { defineConfig } from 'astro/config'

export default defineConfig({
  outDir: './dist',
  publicDir: './public',
  server: { port: 4321 },
})
