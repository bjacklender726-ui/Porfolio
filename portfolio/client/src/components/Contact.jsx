import { useState } from 'react'

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
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      style={{
        padding: '6rem 1.5rem',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        Contacto
      </h2>

      <p
        style={{
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        ¿Tienes un proyecto en mente? Escríbeme.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Mensaje"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            background: '#2563eb',
            color: '#fff',
            padding: '0.75rem',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1rem',
            border: 'none',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            opacity: status === 'sending' ? 0.7 : 1,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => {
            if (status !== 'sending') e.target.style.background = '#1d4ed8'
          }}
          onMouseLeave={e => {
            e.target.style.background = '#2563eb'
          }}
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>

        {status === 'ok' && (
          <p style={{ color: '#059669', textAlign: 'center', fontWeight: 500 }}>
            Mensaje enviado correctamente
          </p>
        )}

        {status === 'error' && (
          <p style={{ color: '#dc2626', textAlign: 'center', fontWeight: 500 }}>
            Error al enviar. Inténtalo de nuevo.
          </p>
        )}
      </form>
    </section>
  )
}

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: 8,
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default Contact
