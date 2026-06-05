import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'viajeros-secret-dev'

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length) return res.status(400).json({ error: 'Email ya registrado' })
    const hash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role',
      [name, email, hash]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al registrar' })
  }
})

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Token JWT
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (!result.rows.length) return res.status(401).json({ error: 'Credenciales inválidas' })
    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' })
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Obtener usuario actual
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario
 */
router.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization
    if (!header) return res.status(401).json({ error: 'Token requerido' })
    const decoded = jwt.verify(header.replace('Bearer ', ''), JWT_SECRET)
    const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' })
  }
})

export default router
