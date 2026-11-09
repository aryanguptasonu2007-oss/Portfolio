import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './hooks/useReducedMotion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import LearningPath from './components/LearningPath'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <LearningPath />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
