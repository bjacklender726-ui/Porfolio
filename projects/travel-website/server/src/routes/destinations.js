import { Router } from 'express'
import pool from '../db.js'
import { authenticate, adminOnly } from '../middleware/auth.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     Destination:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         name: { type: string }
 *         country: { type: string }
 *         description: { type: string }
 *         image_url: { type: string }
 *         created_at: { type: string, format: date-time }
 *       required: [name, country]
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /destinations:
 *   get:
 *     summary: Listar todos los destinos
 *     tags: [Destinos]
 *     responses:
 *       200:
 *         description: Array de destinos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Destination'
 */
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM destinations ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener destinos' })
  }
})

/**
 * @openapi
 * /destinations/{id}:
 *   get:
 *     summary: Obtener un destino por ID
 *     tags: [Destinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Datos del destino
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destination'
 *       404:
 *         description: Destino no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM destinations WHERE id = $1', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Destino no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener destino' })
  }
})

/**
 * @openapi
 * /destinations:
 *   post:
 *     summary: Crear un destino
 *     tags: [Destinos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, country]
 *             properties:
 *               name: { type: string }
 *               country: { type: string }
 *               description: { type: string }
 *               image_url: { type: string, format: uri }
 *     responses:
 *       201:
 *         description: Destino creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destination'
 *       401:
 *         description: No autenticado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, country, description, image_url } = req.body
    if (!name || !country) {
      return res.status(400).json({ error: 'Nombre y país son requeridos' })
    }
    const result = await pool.query(
      'INSERT INTO destinations (name, country, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, country, description, image_url]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al crear destino' })
  }
})

/**
 * @openapi
 * /destinations/{id}:
 *   put:
 *     summary: Actualizar un destino
 *     tags: [Destinos]
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
 *               name: { type: string }
 *               country: { type: string }
 *               description: { type: string }
 *               image_url: { type: string }
 *     responses:
 *       200:
 *         description: Destino actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destination'
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Destino no encontrado
 */
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, country, description, image_url } = req.body
    const result = await pool.query(
      `UPDATE destinations SET name = $1, country = $2, description = $3, image_url = $4 WHERE id = $5 RETURNING *`,
      [name, country, description, image_url, req.params.id]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Destino no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al actualizar destino' })
  }
})

/**
 * @openapi
 * /destinations/{id}:
 *   delete:
 *     summary: Eliminar un destino
 *     tags: [Destinos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Destino eliminado
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Destino no encontrado
 */
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM destinations WHERE id = $1 RETURNING id', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Destino no encontrado' })
    res.json({ message: 'Destino eliminado' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al eliminar destino' })
  }
})

export default router
