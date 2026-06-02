import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <section id="contact" style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>Contacto - Próximamente</p>
        </section>
      </main>
    </div>
  )
}

export default App
