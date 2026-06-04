import { useState, useEffect } from 'react'

function Footer() {
  const year = new Date().getFullYear()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '3rem 1.5rem 2rem',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
      }} className="footer-grid">
        <div>
          <div style={{
            fontWeight: 800,
            fontSize: '1.25rem',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.75rem',
          }}>
            Jaime
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Desarrollador full-stack. Este portfolio es el centro de todos mis proyectos.
          </p>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.95rem' }}>Enlaces</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Inicio', 'Sobre mí', 'Proyectos', 'Contacto'].map(l => (
              <a
                key={l}
                href={`#${l === 'Inicio' ? 'hero' : l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.95rem' }}>Social</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
              href="https://github.com/bjacklender726-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
        fontSize: '0.85rem',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--color-border)',
      }}>
        &copy; {year} Jaime. Todos los derechos reservados.
      </div>

      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Volver arriba"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            boxShadow: '0 2px 12px rgba(37,99,235,0.3)',
            transition: 'all 0.3s',
            display: 'grid',
            placeItems: 'center',
            zIndex: 999,
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--color-primary-dark)'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'var(--color-primary)'
            e.target.style.transform = 'none'
          }}
        >
          ↑
        </button>
      )}
    </footer>
  )
}

export default Footer
