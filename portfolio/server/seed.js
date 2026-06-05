import pool from './src/db.js'

const projects = [
  {
    title: 'Viajeros',
    description: 'Sitio web de viajes con Astro, Express CRUD, autenticación JWT y panel admin.',
    tech_stack: ['Astro', 'Node.js', 'Express', 'PostgreSQL', 'Swagger', 'Docker'],
    github_url: '#',
    demo_url: 'http://localhost:4001',
    featured: true,
  },
]

export async function runSeed() {
  await pool.query('DELETE FROM projects')
  for (const p of projects) {
    await pool.query(
      `INSERT INTO projects (title, description, tech_stack, github_url, demo_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [p.title, p.description, p.tech_stack, p.github_url, p.demo_url || null, p.featured]
    )
  }
  console.log('Seed completado')
}

// Allow direct execution: node seed.js
const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('seed.js')
if (isMain) {
  runSeed().then(() => pool.end()).catch(() => pool.end())
}
