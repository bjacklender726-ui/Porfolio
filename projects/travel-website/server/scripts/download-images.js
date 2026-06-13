import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')

const images = [
  {
    file: 'machu-picchu.jpg',
    url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1000',
  },
  {
    file: 'torres-del-paine.jpg',
    url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1000',
  },
  {
    file: 'cartagena.jpg',
    url: 'https://images.unsplash.com/photo-1589553438787-18ba0b2e9904?w=1000',
  },
  {
    file: 'buenos-aires.jpg',
    url: 'https://images.unsplash.com/photo-1612295797482-50d9d2adfce0?w=1000',
  },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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

async function downloadImages() {
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
      console.log(`  ✓ ${img.file} descargado`)
      count++
    } catch (err) {
      console.error(`  ✗ ${img.file}: ${err.message}`)
    }
  }
  console.log(`\nImágenes descargadas: ${count} nuevas, ${images.length - count - (images.length - Object.keys(images).length)} existentes`)
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('download-images.js')
if (isMain) {
  downloadImages().catch(() => process.exit(1))
}

export default downloadImages
