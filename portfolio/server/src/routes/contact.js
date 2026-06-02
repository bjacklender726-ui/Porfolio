import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  try {
    await pool.query(
      `INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)`,
      [name, email, message]
    )
    res.status(201).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al guardar mensaje' })
  }
})

export default router
