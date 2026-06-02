const skills = [
  'React', 'JavaScript', 'Node.js', 'Express',
  'PostgreSQL', 'Docker', 'Git', 'HTML/CSS',
]

function About() {
  return (
    <section
      id="about"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Sobre mí
      </h2>

      <p
        style={{
          color: '#6b7280',
          fontSize: '1.125rem',
          lineHeight: 1.8,
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        Soy desarrollador full-stack apasionado por crear aplicaciones web
        funcionales y bien diseñadas. Me gusta trabajar con tecnologías modernas
        y mantener un flujo de trabajo ordenado con Git y Docker.
        Este portfolio es el centro de todos mis proyectos.
      </p>

      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Tecnologías
      </h3>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
        }}
      >
        {skills.map(s => (
          <span
            key={s}
            style={{
              background: '#e5e7eb',
              color: '#374151',
              padding: '0.4rem 1rem',
              borderRadius: 999,
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}

export default About
