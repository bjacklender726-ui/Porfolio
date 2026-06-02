function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid #e5e7eb',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '0.9rem',
      }}
    >
      <p>&copy; {year} Jaime. Todos los derechos reservados.</p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.75rem' }}>
        <a
          href="https://github.com/bjacklender726-ui"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#6b7280', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#2563eb'}
          onMouseLeave={e => e.target.style.color = '#6b7280'}
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer
