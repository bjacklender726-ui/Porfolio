import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard.jsx'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section
      id="projects"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Proyectos
      </h2>

      {loading && (
        <p style={{ textAlign: 'center', color: '#9ca3af' }}>Cargando proyectos...</p>
      )}

      {!loading && projects.length === 0 && (
        <p style={{ textAlign: 'center', color: '#9ca3af' }}>
          No hay proyectos aún. Conéctame a la base de datos y ejecuta el seed.
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}

export default Projects
