import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import ScrollProgress from './components/UI/ScrollProgress'
import LoadingScreen  from './components/UI/LoadingScreen'
import CustomCursor   from './components/UI/CustomCursor'
import Navbar         from './components/UI/Navbar'

import Hero           from './components/Hero/Hero'
import About          from './components/About/About'
import Skills         from './components/Skills/Skills'
import Projects       from './components/Projects/Projects'
import Certifications from './components/Certifications/Certifications'
import Education      from './components/Education/Education'
import Contact        from './components/Contact/Contact'

import './styles/globals.css'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      {/* ── Loading screen — renders above everything, exits via AnimatePresence ── */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* ── Chrome: progress bar + cursor always mounted ── */}
      <ScrollProgress />
      <CustomCursor />

      {/* ── Main content fades in once loader exits ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>
      </motion.div>
    </BrowserRouter>
  )
}
