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
 *         user_id: { type: integer }
 *         customer_name: { type: string }
 *         email: { type: string }
 *         people: { type: integer }
 *         travel_date: { type: string, format: date }
 *         notes: { type: string }
 *         status: { type: string, enum: [confirmada, cancelada] }
 *         created_at: { type: string, format: date-time }
 *       required: [package_id, customer_name, email, people, travel_date]
 */

function bookingQuery(whereClause, params) {
  return pool.query(`
    SELECT b.*, p.name AS package_name, p.price, p.duration_days, p.max_people,
           d.name AS destination_name, d.country
    FROM bookings b
    JOIN packages p ON p.id = b.package_id
    JOIN destinations d ON d.id = p.destination_id
    ${whereClause}
    ORDER BY b.travel_date ASC
  `, params)
}

/**
 * @openapi
 * /bookings/my-bookings:
 *   get:
 *     summary: Obtener mis reservas (usuario autenticado)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array de reservas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: No autenticado
 */
router.get('/my-bookings', authenticate, async (req, res) => {
  try {
    const result = await bookingQuery('WHERE b.user_id = $1', [req.user.id])
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener reservas' })
  }
})

/**
 * @openapi
 * /bookings:
 *   get:
 *     summary: Listar todas las reservas (admin)
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
    const result = await bookingQuery('', [])
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
    const result = await bookingQuery('WHERE b.id = $1', [req.params.id])
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
    let user_id = null
    const header = req.headers.authorization
    if (header) {
      try {
        const jwt = (await import('jsonwebtoken')).default
        const decoded = jwt.verify(header.replace('Bearer ', ''), process.env.JWT_SECRET || 'viajeros-secret-dev')
        user_id = decoded.id
      } catch {}
    }
    const result = await pool.query(
      `INSERT INTO bookings (package_id, customer_name, email, people, travel_date, notes, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [package_id, customer_name, email, people, travel_date, notes, user_id]
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
 *     summary: Modificar mi reserva (fecha, personas, notas)
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
 *               travel_date: { type: string, format: date }
 *               people: { type: integer, minimum: 1 }
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
 *       403:
 *         description: No eres el dueño de esta reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { travel_date, people, notes } = req.body
    const owner = await pool.query('SELECT user_id, status FROM bookings WHERE id = $1', [req.params.id])
    if (!owner.rows.length) return res.status(404).json({ error: 'Reserva no encontrada' })
    if (owner.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'No puedes modificar una reserva que no te pertenece' })
    }
    if (owner.rows[0].status === 'cancelada') {
      return res.status(400).json({ error: 'No puedes modificar una reserva cancelada' })
    }
    const result = await pool.query(
      `UPDATE bookings SET travel_date = COALESCE($1, travel_date), people = COALESCE($2, people), notes = COALESCE($3, notes)
       WHERE id = $4 RETURNING *`,
      [travel_date, people, notes, req.params.id]
    )
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
 *     summary: Cancelar mi reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reserva cancelada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No eres el dueño de esta reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const owner = await pool.query('SELECT user_id, status FROM bookings WHERE id = $1', [req.params.id])
    if (!owner.rows.length) return res.status(404).json({ error: 'Reserva no encontrada' })
    if (owner.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'No puedes cancelar una reserva que no te pertenece' })
    }
    if (owner.rows[0].status === 'cancelada') {
      return res.status(400).json({ error: 'La reserva ya está cancelada' })
    }
    const result = await pool.query(
      `UPDATE bookings SET status = 'cancelada' WHERE id = $1 RETURNING *`,
      [req.params.id]
    )
    res.json({ message: 'Reserva cancelada', booking: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al cancelar reserva' })
  }
})

export default router