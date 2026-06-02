import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="hero" style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>Hero - Próximamente</p>
        </section>
        <section id="about" style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>Sobre mí - Próximamente</p>
        </section>
        <section id="projects" style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>Proyectos - Próximamente</p>
        </section>
        <section id="contact" style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>Contacto - Próximamente</p>
        </section>
      </main>
    </div>
  )
}

export default App
