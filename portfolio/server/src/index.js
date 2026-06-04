import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'
import pool from './db.js'
import projectsRouter from './routes/projects.js'
import contactRouter from './routes/contact.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/projects', projectsRouter)
app.use('/api/contact', contactRouter)

if (process.env.NODE_ENV !== 'production' || process.env.GRAFANA_PROXY) {
  app.use(
    '/grafana',
    createProxyMiddleware({
      target: process.env.GRAFANA_URL || 'http://pc-grafana:3000',
      changeOrigin: true,
    })
  )
}

const publicPath = join(__dirname, '..', 'public')
app.use(express.static(publicPath))
app.get('*', (_req, res) => {
  res.sendFile(join(publicPath, 'index.html'))
})

async function runMigrations() {
  const files = ['001_create_projects.sql', '002_create_contact_messages.sql']
  for (const file of files) {
    const sql = readFileSync(join(__dirname, '..', 'migrations', file), 'utf8')
    await pool.query(sql)
  }
  console.log('Migraciones aplicadas')
}

app.listen(PORT, async () => {
  try {
    await runMigrations()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  } catch (err) {
    console.error('Error al iniciar:', err)
  }
})
