import bcrypt from 'bcryptjs'
import pool from './src/db.js'

async function seed() {
  try {
    const hash = await bcrypt.hash('admin123', 10)
    await pool.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
      ['Admin Viajeros', 'admin@viajeros.com', hash, 'admin']
    )

    const dests = await pool.query(`
      INSERT INTO destinations (name, country, description, image_url) VALUES
        ('París', 'Francia', 'La ciudad del amor, con su icónica Torre Eiffel, el Louvre y encantadores cafés al aire libre.', '/images/paris.jpg'),
        ('Tokio', 'Japón', 'Donde la tradición milenaria se encuentra con la tecnología más avanzada. Templos, sushi y neon.', '/images/tokio.jpg'),
        ('Cusco', 'Perú', 'Puerta de entrada a Machu Picchu, ciudad imperial con calles empedradas y cultura viva.', '/images/cusco.jpg'),
        ('Santorini', 'Grecia', 'Casas blancas con cúpulas azules frente al mar Egeo. Atardeceres inolvidables.', '/images/santorini.jpg')
      ON CONFLICT DO NOTHING RETURNING id
    `)

    const destIds = dests.rows

    if (destIds.length > 0) {
      await pool.query(`
        INSERT INTO packages (destination_id, name, price, duration_days, description, max_people) VALUES
          ($1, 'París Esencial', 899.99, 5, 'Recorrido por los principales atractivos de París con hotel 4 estrellas.', 20),
          ($2, 'Tokio Experience', 1299.99, 7, 'Sumérgete en la cultura japonesa con guía local y transporte incluido.', 15),
          ($3, 'Ruta Inca', 749.99, 6, 'Descubre el Valle Sagrado y llega a Machu Picchu en tren panorámico.', 12),
          ($4, 'Santorini Romance', 1099.99, 4, 'Escapada romántica con cena al atardecer y tour en barco.', 10)
      `)
    }

    console.log('Seed completado')
  } catch (err) {
    console.error('Error en seed:', err)
  } finally {
    await pool.end()
  }
}

seed()
