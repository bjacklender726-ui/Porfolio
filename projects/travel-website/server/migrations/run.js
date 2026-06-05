import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import pool from '../src/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const files = ['001_create_tables.sql']

async function run() {
  for (const file of files) {
    const sql = readFileSync(join(__dirname, file), 'utf8')
    await pool.query(sql)
    console.log(`Migración aplicada: ${file}`)
  }
  await pool.end()
}

run().catch(err => { console.error(err); process.exit(1) })
