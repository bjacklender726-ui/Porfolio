import { Router } from 'express'
import pool from '../db.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         package_id: { type: integer }
 *         customer_name: { type: string }
 *         email: { type: string }
 *         people: { type: integer }
 *         travel_date: { type: string, format: date }
 *         notes: { type: string }
 *         created_at: { type: string, format: date-time }
 *       required: [package_id, customer_name, email, people, travel_date]
 */

/**
 * @openapi
 * /bookings:
 *   get:
 *     summary: Listar todas las reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Array de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
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

/**
 * @openapi
 * /bookings/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, p.name AS package_name, d.name AS destination_name
      FROM bookings b
      JOIN packages p ON p.id = b.package_id
      JOIN destinations d ON d.id = p.destination_id
      WHERE b.id = $1
    `, [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener reserva' })
  }
})

/**
 * @openapi
 * /bookings:
 *   post:
 *     summary: Crear una reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [package_id, customer_name, email, people, travel_date]
 *             properties:
 *               package_id: { type: integer }
 *               customer_name: { type: string }
 *               email: { type: string }
 *               people: { type: integer, minimum: 1 }
 *               travel_date: { type: string, format: date }
 *               notes: { type: string }
 *     responses:
 *       201:
 *         description: Reserva creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', async (req, res) => {
  try {
    const { package_id, customer_name, email, people, travel_date, notes } = req.body
    if (!package_id || !customer_name || !email || !people || !travel_date) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }
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

/**
 * @openapi
 * /bookings/{id}:
 *   put:
 *     summary: Actualizar una reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
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
 *       200:
 *         description: Reserva actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { package_id, customer_name, email, people, travel_date, notes } = req.body
    const result = await pool.query(
      `UPDATE bookings
       SET package_id = $1, customer_name = $2, email = $3, people = $4, travel_date = $5, notes = $6
       WHERE id = $7 RETURNING *`,
      [package_id, customer_name, email, people, travel_date, notes, req.params.id]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al actualizar reserva' })
  }
})

/**
 * @openapi
 * /bookings/{id}:
 *   delete:
 *     summary: Cancelar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reserva cancelada
 *       404:
 *         description: Reserva no encontrada
 */
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
