import pg from 'pg'
const { Pool } = pg

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'admin123',
}

const dbName = process.env.DB_NAME || 'travel_db'

async function ensureDatabase() {
  const adminPool = new Pool({ ...config, database: 'postgres' })
  try {
    const res = await adminPool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName])
    if (res.rowCount === 0) {
      await adminPool.query(`CREATE DATABASE "${dbName}"`)
      console.log(`Base de datos "${dbName}" creada`)
    }
  } finally {
    await adminPool.end()
  }
}

const pool = new Pool({ ...config, database: dbName })

export { pool as default, ensureDatabase }
