import { Router } from 'express'
import pool from '../db.js'

const router = Router()

/**
 * @openapi
 * /bookings:
 *   get:
 *     summary: Listar todas las reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Array de reservas
 *   post:
 *     summary: Crear una reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               package_id: { type: integer }
 *               customer_name: { type: string }
 *               email: { type: string }
 *               people: { type: integer }
 *               travel_date: { type: string, format: date }
 *               notes: { type: string }
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, p.name AS package_name, d.name AS destination_name
      FROM bookings b
      JOIN packages p ON p.id = b.package_id
      JOIN destinations d ON d.id = p.destination_id
      ORDER BY b.created_at DESC
    `)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener reservas' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { package_id, customer_name, email, people, travel_date, notes } = req.body
    const result = await pool.query(
      `INSERT INTO bookings (package_id, customer_name, email, people, travel_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [package_id, customer_name, email, people, travel_date, notes]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al crear reserva' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING id', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json({ message: 'Reserva cancelada' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al cancelar reserva' })
  }
})

export default router
