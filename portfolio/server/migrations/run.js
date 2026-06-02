import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import pool from '../src/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const migrations = [
  '001_create_projects.sql',
  '002_create_contact_messages.sql',
]

async function run() {
  try {
    for (const file of migrations) {
      const sql = readFileSync(join(__dirname, file), 'utf8')
      await pool.query(sql)
      console.log(`Migración aplicada: ${file}`)
    }
    console.log('Todas las migraciones completadas')
  } catch (err) {
    console.error('Error en migración:', err)
  } finally {
    await pool.end()
  }
}

run()
