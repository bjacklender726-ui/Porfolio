import bcrypt from 'bcryptjs'
import pool from './src/db.js'

const destinations = [
  { name: 'Machu Picchu', country: 'Perú', description: 'Ciudadela inca en los Andes peruanos, una de las siete maravillas del mundo moderno.', image_url: '/images/machu-picchu.jpg' },
  { name: 'Torres del Paine', country: 'Chile', description: 'Parque nacional en la Patagonia chilena con montañas, glaciares y lagos.', image_url: '/images/torres-del-paine.jpg' },
  { name: 'Cartagena de Indias', country: 'Colombia', description: 'Ciudad colonial amurallada en la costa caribeña colombiana.', image_url: '/images/cartagena.jpg' },
  { name: 'Buenos Aires', country: 'Argentina', description: 'Capital argentina con rica cultura tanguera, gastronomía y arquitectura europea.', image_url: '/images/buenos-aires.jpg' },
]

const packages = [
  { destination_id: 1, name: 'Aventura Inca', price: 1299, duration_days: 7, description: 'Tour guiado por el Camino Inca hasta Machu Picchu.', max_people: 15 },
  { destination_id: 1, name: 'Express Cultural', price: 899, duration_days: 4, description: 'Visita rápida a Machu Picchu y Valle Sagrado.', max_people: 20 },
  { destination_id: 2, name: 'Patagonia Extrema', price: 2199, duration_days: 10, description: 'Trekking completo por el Parque Nacional Torres del Paine.', max_people: 12 },
  { destination_id: 3, name: 'Caribe Colonial', price: 799, duration_days: 5, description: 'Recorrido por el centro histórico y playas cercanas.', max_people: 25 },
  { destination_id: 4, name: 'Tango y Sabores', price: 1099, duration_days: 6, description: 'Experiencia gastronómica y shows de tango en Buenos Aires.', max_people: 20 },
]

const bookings = [
  { package_id: 1, customer_name: 'María García', email: 'maria@example.com', people: 2, travel_date: '2026-09-15', notes: 'Preferencia habitación doble' },
  { package_id: 3, customer_name: 'Carlos López', email: 'carlos@example.com', people: 1, travel_date: '2026-11-01', notes: '' },
]

export async function runSeed() {
  const adminPass = await bcrypt.hash('admin123', 10)

  await pool.query(`INSERT INTO users (name, email, password_hash, role)
    VALUES ('Admin', 'admin@viajeros.com', $1, 'admin')
    ON CONFLICT (email) DO NOTHING`, [adminPass])

  for (const d of destinations) {
    await pool.query(`INSERT INTO destinations (name, country, description, image_url)
      VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
      [d.name, d.country, d.description, d.image_url])
  }

  const destCount = await pool.query('SELECT COUNT(*) FROM destinations')
  if (destCount.rows[0].count == destinations.length.toString()) {
    for (const p of packages) {
      await pool.query(`INSERT INTO packages (destination_id, name, price, duration_days, description, max_people)
        VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`,
        [p.destination_id, p.name, p.price, p.duration_days, p.description, p.max_people])
    }

    for (const b of bookings) {
      await pool.query(`INSERT INTO bookings (package_id, customer_name, email, people, travel_date, notes)
        VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`,
        [b.package_id, b.customer_name, b.email, b.people, b.travel_date, b.notes])
    }
  }

  console.log('Seed completado: admin, destinos, paquetes y reservas insertados')
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('seed.js')
if (isMain) {
  runSeed().then(() => pool.end()).catch(() => pool.end())
}
