import pool from './src/db.js'

const projects = [
  {
    title: 'Proyecto Central',
    description: 'Monorepo con portfolio + proyectos desplegables con Docker y PostgreSQL.',
    tech_stack: ['React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    github_url: 'https://github.com/bjacklender726-ui/Porfolio',
    featured: true,
  },
  {
    title: 'Viajeros',
    description: 'Sitio web de viajes con Astro, Express CRUD, autenticación JWT y panel admin.',
    tech_stack: ['Astro', 'Node.js', 'Express', 'PostgreSQL', 'Swagger', 'Docker'],
    github_url: '#',
    demo_url: 'http://localhost:4001',
    featured: true,
  },
  {
    title: 'API REST Template',
    description: 'Template de API REST con Express, autenticación JWT y PostgreSQL.',
    tech_stack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    github_url: '#',
    featured: false,
  },
  {
    title: 'App de Tareas',
    description: 'Aplicación full-stack de gestión de tareas con React y Node.js.',
    tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    github_url: '#',
    featured: false,
  },
]

async function seed() {
  try {
    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects (title, description, tech_stack, github_url, demo_url, featured)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`,
        [p.title, p.description, p.tech_stack, p.github_url, p.demo_url || null, p.featured]
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
