const socials = [
  {
    label: 'GitHub',
    url: 'https://github.com/bjacklender726-ui',
    path: 'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

const shapes = [
  { size: 300, top: '10%', left: '-5%', delay: 0 },
  { size: 200, top: '60%', right: '-3%', delay: 4 },
  { size: 150, top: '30%', right: '20%', delay: 8 },
  { size: 100, bottom: '15%', left: '15%', delay: 2 },
]

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.08), transparent)',
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            animation: `float ${12 + i * 2}s ease-in-out ${s.delay}s infinite alternate`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <h1
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}
      >
        Hola, soy{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #2563eb, #7c3aed, #2563eb)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease-in-out infinite',
          }}
        >
          Jaime
        </span>
      </h1>

      <p
        style={{
          fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
          color: 'var(--color-text-secondary)',
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
            background: 'var(--color-primary)',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--color-primary-dark)'
            e.target.style.boxShadow = '0 0 20px rgba(37,99,235,0.4)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'var(--color-primary)'
            e.target.style.boxShadow = 'none'
          }}
        >
          Ver proyectos
        </a>

        <a
          href="#contact"
          style={{
            border: '2px solid var(--color-border)',
            color: 'var(--color-text)',
            padding: '0.75rem 2rem',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.target.style.borderColor = 'var(--color-primary)'
            e.target.style.color = 'var(--color-primary)'
          }}
          onMouseLeave={e => {
            e.target.style.borderColor = 'var(--color-border)'
            e.target.style.color = 'var(--color-text)'
          }}
        >
          Contacto
        </a>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '3rem' }}>
        {socials.map(s => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            style={{
              color: 'var(--color-text-secondary)',
              transition: 'color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--color-primary)'
              e.target.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--color-text-secondary)'
              e.target.style.transform = 'scale(1)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d={s.path} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Hero
