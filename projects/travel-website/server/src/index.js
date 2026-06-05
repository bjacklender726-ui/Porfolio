import express from 'express'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import pool, { ensureDatabase } from './db.js'
import authRouter from './routes/auth.js'
import destinationsRouter from './routes/destinations.js'
import packagesRouter from './routes/packages.js'
import bookingsRouter from './routes/bookings.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4001
const JWT_SECRET = process.env.JWT_SECRET || 'viajeros-secret-dev'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Viajeros API',
      version: '0.1.0',
      description: 'API REST del sitio de viajes Viajeros',
    },
    servers: [{ url: `/api` }],
  },
  apis: [join(__dirname, 'routes', '*.js')],
})

app.use(cors())
app.use(express.json())
app.use('/images', express.static(join(__dirname, '..', 'public', 'images')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/auth', authRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/packages', packagesRouter)
app.use('/api/bookings', bookingsRouter)

const publicPath = join(__dirname, '..', 'public')
app.use(express.static(publicPath))

// Dynamic routes: serve the static detail page template
app.get('/destinations/:id', (_req, res) => {
  res.sendFile(join(publicPath, 'destinations', 'detail', 'index.html'))
})
app.get('/packages/:id', (_req, res) => {
  res.sendFile(join(publicPath, 'packages', 'detail', 'index.html'))
})

// SPA fallback: all other unmatched routes serve index.html
app.get('*', (_req, res) => {
  res.sendFile(join(publicPath, 'index.html'))
})

async function runMigrations() {
  const files = ['001_create_tables.sql']
  for (const file of files) {
    const sql = await import('fs').then(f => f.readFileSync(join(__dirname, '..', 'migrations', file), 'utf8'))
    await pool.query(sql)
  }
  console.log('Migraciones aplicadas')
}

app.listen(PORT, async () => {
  try {
    await ensureDatabase()
    await runMigrations()
    console.log(`Viajeros API corriendo en http://localhost:${PORT}`)
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`)
  } catch (err) {
    console.error('Error al iniciar:', err)
  }
})
