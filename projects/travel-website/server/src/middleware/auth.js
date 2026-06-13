import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'viajeros-secret-dev'

export function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header) {
    return res.status(401).json({ error: 'Token requerido' })
  }
  try {
    const decoded = jwt.verify(header.replace('Bearer ', ''), JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

export function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acción solo para administradores' })
  }
  next()
}
