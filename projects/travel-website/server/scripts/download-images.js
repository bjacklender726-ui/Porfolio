import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')

const images = [
  { file: 'machu-picchu.jpg', url: 'https://picsum.photos/seed/machupicchu/800/600' },
  { file: 'torres-del-paine.jpg', url: 'https://picsum.photos/seed/torresdelpaine/800/600' },
  { file: 'cartagena.jpg', url: 'https://picsum.photos/seed/cartagena/800/600' },
  { file: 'buenos-aires.jpg', url: 'https://picsum.photos/seed/buenosaires/800/600' },
  { file: 'hero-1.jpg', url: 'https://picsum.photos/seed/hero1/1600/900' },
  { file: 'hero-2.jpg', url: 'https://picsum.photos/seed/hero2/1600/900' },
  { file: 'hero-3.jpg', url: 'https://picsum.photos/seed/hero3/1600/900' },
  { file: 'hero-4.jpg', url: 'https://picsum.photos/seed/hero4/1600/900' },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Viajeros/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => {
        writeFileSync(dest, Buffer.concat(chunks))
        resolve()
      })
      res.on('error', reject)
    }).on('error', reject)
  })
}

export default async function downloadImages() {
  if (!existsSync(imagesDir)) {
    mkdirSync(imagesDir, { recursive: true })
  }

  let count = 0
  for (const img of images) {
    const dest = join(imagesDir, img.file)
    if (existsSync(dest)) {
      console.log(`  ✓ ${img.file} ya existe`)
      continue
    }
    try {
      console.log(`  ↓ ${img.file}...`)
      await download(img.url, dest)
      const stats = existsSync(dest) ? 'ok' : 'error'
      console.log(`  ✓ ${img.file} (${stats})`)
      count++
    } catch (err) {
      console.error(`  ✗ ${img.file}: ${err.message}`)
    }
  }
  console.log(`\nImágenes: ${count} nuevas descargadas`)
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('download-images.js')
if (isMain) {
  downloadImages().then(() => process.exit(0)).catch(() => process.exit(1))
}
