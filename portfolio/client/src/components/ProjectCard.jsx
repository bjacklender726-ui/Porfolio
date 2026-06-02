function ProjectCard({ project }) {
  return (
    <article
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '1.5rem',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {project.image_url && (
        <img
          src={project.image_url}
          alt={project.title}
          style={{
            width: '100%',
            height: 180,
            objectFit: 'cover',
            borderRadius: 8,
            marginBottom: '1rem',
          }}
        />
      )}

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        {project.title}
      </h3>

      <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {project.tech_stack?.map(t => (
          <span
            key={t}
            style={{
              background: '#eff6ff',
              color: '#2563eb',
              padding: '0.2rem 0.7rem',
              borderRadius: 999,
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.9rem',
              color: '#2563eb',
              fontWeight: 500,
            }}
          >
            GitHub →
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.9rem',
              color: '#059669',
              fontWeight: 500,
            }}
          >
            Demo →
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
