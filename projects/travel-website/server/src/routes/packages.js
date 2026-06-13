import { Router } from 'express'
import pool from '../db.js'
import { authenticate, adminOnly } from '../middleware/auth.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         destination_id: { type: integer }
 *         name: { type: string }
 *         price: { type: number }
 *         duration_days: { type: integer }
 *         description: { type: string }
 *         max_people: { type: integer }
 *         created_at: { type: string, format: date-time }
 *         destination_name: { type: string }
 *         country: { type: string }
 *       required: [destination_id, name, price, duration_days]
 */

/**
 * @openapi
 * /packages:
 *   get:
 *     summary: Listar todos los paquetes
 *     tags: [Paquetes]
 *     responses:
 *       200:
 *         description: Array de paquetes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 */
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, d.name AS destination_name, d.country
      FROM packages p
      JOIN destinations d ON d.id = p.destination_id
      ORDER BY p.created_at DESC
    `)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener paquetes' })
  }
})

/**
 * @openapi
 * /packages/{id}:
 *   get:
 *     summary: Obtener un paquete por ID
 *     tags: [Paquetes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos del paquete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       404:
 *         description: Paquete no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, d.name AS destination_name, d.country
      FROM packages p
      JOIN destinations d ON d.id = p.destination_id
      WHERE p.id = $1
    `, [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Paquete no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener paquete' })
  }
})

/**
 * @openapi
 * /packages:
 *   post:
 *     summary: Crear un paquete
 *     tags: [Paquetes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [destination_id, name, price, duration_days]
 *             properties:
 *               destination_id: { type: integer }
 *               name: { type: string }
 *               price: { type: number }
 *               duration_days: { type: integer }
 *               description: { type: string }
 *               max_people: { type: integer }
 *     responses:
 *       201:
 *         description: Paquete creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       401:
 *         description: No autenticado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { destination_id, name, price, duration_days, description, max_people } = req.body
    if (!destination_id || !name || price === undefined || !duration_days) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }
    const result = await pool.query(
      `INSERT INTO packages (destination_id, name, price, duration_days, description, max_people)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [destination_id, name, price, duration_days, description, max_people]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al crear paquete' })
  }
})

/**
 * @openapi
 * /packages/{id}:
 *   put:
 *     summary: Actualizar un paquete
 *     tags: [Paquetes]
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
 *               destination_id: { type: integer }
 *               name: { type: string }
 *               price: { type: number }
 *               duration_days: { type: integer }
 *               description: { type: string }
 *               max_people: { type: integer }
 *     responses:
 *       200:
 *         description: Paquete actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Paquete no encontrado
 */
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { destination_id, name, price, duration_days, description, max_people } = req.body
    const result = await pool.query(
      `UPDATE packages SET destination_id = $1, name = $2, price = $3, duration_days = $4, description = $5, max_people = $6
       WHERE id = $7 RETURNING *`,
      [destination_id, name, price, duration_days, description, max_people, req.params.id]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Paquete no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al actualizar paquete' })
  }
})

/**
 * @openapi
 * /packages/{id}:
 *   delete:
 *     summary: Eliminar un paquete
 *     tags: [Paquetes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Paquete eliminado
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Paquete no encontrado
 */
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM packages WHERE id = $1 RETURNING id', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Paquete no encontrado' })
    res.json({ message: 'Paquete eliminado' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al eliminar paquete' })
  }
})

export default router
