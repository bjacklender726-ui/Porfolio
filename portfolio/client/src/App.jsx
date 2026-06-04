import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import FadeIn from './components/FadeIn.jsx'
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
        <FadeIn><About /></FadeIn>
        <FadeIn><Projects /></FadeIn>
        <FadeIn><Contact /></FadeIn>
      </main>
      <Footer />
    </div>
  )
}

export default App
