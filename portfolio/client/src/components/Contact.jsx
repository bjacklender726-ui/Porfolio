import { useState } from 'react'

const fields = [
  { name: 'name', label: 'Nombre', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Error al enviar')

      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section
      id="contact"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: 700,
        margin: '0 auto',
      }}
    >
      <h2>Contacto</h2>

      <p style={{
        color: 'var(--color-text-secondary)',
        textAlign: 'center',
        marginBottom: '2.5rem',
      }}>
        ¿Tienes un proyecto en mente? Escríbeme.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
          marginBottom: '1.25rem',
        }} className="contact-row">
          {fields.map(f => (
            <div key={f.name} style={{ position: 'relative' }}>
              <input
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                required
                placeholder={f.label}
                style={inputStyle}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-primary)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--color-border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Mensaje"
            rows={5}
            style={{ ...inputStyle, resize: 'vertical', width: '100%' }}
            onFocus={e => {
              e.target.style.borderColor = 'var(--color-primary)'
              e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'var(--color-border)'
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            width: '100%',
            background: 'var(--color-primary)',
            color: '#fff',
            padding: '0.85rem',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: '1rem',
            border: 'none',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            opacity: status === 'sending' ? 0.8 : 1,
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={e => {
            if (status !== 'sending') {
              e.target.style.background = 'var(--color-primary-dark)'
              e.target.style.boxShadow = '0 0 20px rgba(37,99,235,0.3)'
            }
          }}
          onMouseLeave={e => {
            e.target.style.background = 'var(--color-primary)'
            e.target.style.boxShadow = 'none'
          }}
        >
          {status === 'sending' && (
            <span style={{
              width: 18,
              height: 18,
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
              display: 'inline-block',
            }} />
          )}
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        {status === 'ok' && (
          <p style={{
            color: '#059669',
            textAlign: 'center',
            fontWeight: 500,
            marginTop: '1rem',
            animation: 'fadeIn 0.3s ease',
          }}>
            ¡Mensaje enviado correctamente!
          </p>
        )}

        {status === 'error' && (
          <p style={{
            color: '#dc2626',
            textAlign: 'center',
            fontWeight: 500,
            marginTop: '1rem',
            animation: 'fadeIn 0.3s ease',
          }}>
            Error al enviar. Inténtalo de nuevo.
          </p>
        )}
      </form>
    </section>
  )
}

const inputStyle = {
  padding: '0.85rem',
  border: '1px solid var(--color-border)',
  borderRadius: 10,
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
  width: '100%',
  background: 'var(--color-surface)',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default Contact
