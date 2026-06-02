import pool from './src/db.js'

const projects = [
  {
    title: 'Proyecto Central',
    description: 'Monorepo con portfolio + proyectos desplegables con Docker y PostgreSQL.',
    tech_stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    github_url: 'https://github.com/bjacklender726-ui/Porfolio',
    featured: true,
  },
]

async function seed() {
  try {
    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects (title, description, tech_stack, github_url, featured)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [p.title, p.description, p.tech_stack, p.github_url, p.featured]
      )
    }
    console.log('Seed completado')
  } catch (err) {
    console.error('Error en seed:', err)
  } finally {
    await pool.end()
  }
}

seed()
