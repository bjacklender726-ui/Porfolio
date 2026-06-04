import { useState, useEffect } from 'react'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120
      let current = ''

      for (const { href } of links) {
        const el = document.querySelector(href)
        if (el && el.offsetTop <= scrollY) {
          current = href
        }
      }

      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.875rem 1.5rem',
      }}>
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
          style={{
            fontWeight: 800,
            fontSize: '1.35rem',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
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
            color: 'var(--color-text)',
            padding: '0.25rem',
          }}
          className="menu-toggle"
        >
          {open ? '✕' : '☰'}
        </button>

        <ul style={{
          display: 'flex',
          gap: '0.25rem',
          listStyle: 'none',
        }} className="nav-links">
          {links.map(l => {
            const isActive = active === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 8,
                    background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
                    transition: 'all 0.2s',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.target.style.color = 'var(--color-primary)'
                      e.target.style.background = 'rgba(37,99,235,0.05)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.target.style.color = 'var(--color-text-secondary)'
                      e.target.style.background = 'transparent'
                    }
                  }}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div
        style={{
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          maxHeight: open ? 240 : 0,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '0 1.5rem 1rem',
        }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
              style={{
                color: active === l.href ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: 500,
                padding: '0.5rem 0',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
