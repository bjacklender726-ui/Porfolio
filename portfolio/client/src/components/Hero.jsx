function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem 4rem',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}
      >
        Hola, soy{' '}
        <span style={{ color: '#2563eb' }}>Jaime</span>
      </h1>

      <p
        style={{
          fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
          color: '#6b7280',
          maxWidth: 600,
          marginBottom: '2rem',
        }}
      >
        Desarrollador full-stack. Construyo aplicaciones web modernas
        con React, Node.js y Docker.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="#projects"
          style={{
            background: '#2563eb',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = '#1d4ed8'}
          onMouseLeave={e => e.target.style.background = '#2563eb'}
        >
          Ver proyectos
        </a>

        <a
          href="#contact"
          style={{
            border: '2px solid #d1d5db',
            color: '#374151',
            padding: '0.75rem 2rem',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => e.target.style.borderColor = '#2563eb'}
          onMouseLeave={e => e.target.style.borderColor = '#d1d5db'}
        >
          Contacto
        </a>
      </div>
    </section>
  )
}

export default Hero
