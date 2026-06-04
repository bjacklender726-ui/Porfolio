import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <div className="fade-in"><About /></div>
        <div className="fade-in"><Projects /></div>
        <div className="fade-in"><Contact /></div>
      </main>
      <Footer />
    </div>
  )
}

export default App
