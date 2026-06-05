import { Router } from 'express'
import pool from '../db.js'

const router = Router()

/**
 * @openapi
 * /destinations:
 *   get:
 *     summary: Listar todos los destinos
 *     tags: [Destinos]
 *     responses:
 *       200:
 *         description: Array de destinos
 *   post:
 *     summary: Crear un destino
 *     tags: [Destinos]
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
 *       201:
 *         description: Destino creado
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

router.post('/', async (req, res) => {
  try {
    const { name, country, description, image_url } = req.body
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
