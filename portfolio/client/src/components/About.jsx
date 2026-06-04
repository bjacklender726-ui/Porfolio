const skills = [
  { name: 'React', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'Node.js', level: 80 },
  { name: 'Express', level: 75 },
  { name: 'PostgreSQL', level: 70 },
  { name: 'Docker', level: 65 },
  { name: 'Git', level: 85 },
  { name: 'HTML/CSS', level: 95 },
]

const stats = [
  { value: '8+', label: 'Tecnologías' },
  { value: '3', label: 'Proyectos' },
  { value: '1+', label: 'Año exp.' },
]

function About() {
  return (
    <section
      id="about"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
      }}
    >
      <h2>Sobre mí</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start',
        marginTop: '2rem',
      }} className="about-grid">
        <div>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '1.125rem',
            lineHeight: 1.8,
          }}>
            Soy desarrollador full-stack apasionado por crear aplicaciones web
            funcionales y bien diseñadas. Me gusta trabajar con tecnologías modernas
            y mantener un flujo de trabajo ordenado con Git y Docker.
            Este portfolio es el centro de todos mis proyectos.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '2rem',
          }}>
            {stats.map(s => (
              <div key={s.label} style={{
                textAlign: 'center',
                padding: '1.25rem 0.5rem',
                background: 'var(--color-surface)',
                borderRadius: 12,
                border: '1px solid var(--color-border)',
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)',
                  marginTop: '0.25rem',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
          }}>
            Tecnologías
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {skills.map(s => (
              <div key={s.name}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem',
                  marginBottom: '0.35rem',
                }}>
                  <span style={{ fontWeight: 500 }}>{s.name}</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{s.level}%</span>
                </div>
                <div style={{
                  height: 8,
                  background: '#e5e7eb',
                  borderRadius: 999,
                  overflow: 'hidden',
                }}>
                  <div
                    className="skill-bar"
                    style={{
                      height: '100%',
                      width: `${s.level}%`,
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                      borderRadius: 999,
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
