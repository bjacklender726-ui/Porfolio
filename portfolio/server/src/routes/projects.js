import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener proyectos' })
  }
})

export default router
