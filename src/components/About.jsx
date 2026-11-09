import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { GraduationCap, Layers, CalendarDays } from 'lucide-react'
import { site } from '../data/site'
import SectionHeading from './SectionHeading'
import Photo from './Photo'

export default function About() {
  const root = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.word', { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 45%', scrub: true } })
        gsap.from('.about-card', { y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.about-cards', start: 'top 85%' } })
        gsap.from('.about-photo', { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: '.about-photo', start: 'top 85%' } })
        gsap.to('.about-glow', { yPercent: -50, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const cards = [
    [GraduationCap, 'Education', site.education.degree],
    [Layers, 'Specialization', site.education.specialization],
    [CalendarDays, 'Current year', `${site.education.year} at ${site.education.university}`]
  ]

  return (
    <section id="about" ref={root} className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-40">
      <div className="about-glow pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-amber/10 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading>About Me</SectionHeading>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="about-text font-display text-2xl font-medium leading-snug sm:text-3xl">
              {site.about.split(' ').map((w, i) => (
                <span key={i} className="word inline-block pr-[0.28em]">{w}</span>
              ))}
            </p>
            <div className="about-cards mt-12 grid gap-4 sm:grid-cols-3">
              {cards.map(([Icon, label, value]) => (
                <div key={label} className="about-card glass p-5 shadow-[0_0_40px_rgba(255,157,0,0.14)]">
                  <Icon className="mb-3 text-amber-hi" size={22} />
                  <p className="font-display text-sm text-mute">{label}</p>
                  <p className="mt-1 text-sm leading-snug text-ti">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-photo mx-auto w-full max-w-sm self-start">
            <Photo className="aspect-[4/5] w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
