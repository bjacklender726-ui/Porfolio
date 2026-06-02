import { useState } from 'react'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
      }}>
        <a href="#hero" style={{
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#2563eb',
        }}>
          Jaime
        </a>

        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
          className="menu-toggle"
        >
          {open ? '✕' : '☰'}
        </button>

        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
        }} className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  color: '#4b5563',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#2563eb'}
                onMouseLeave={e => e.target.style.color = '#4b5563'}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div style={{
          padding: '0 1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }} className="mobile-menu">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ color: '#4b5563', fontWeight: 500 }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
