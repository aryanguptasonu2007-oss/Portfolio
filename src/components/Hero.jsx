
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react'
import { site } from '../data/site'
import { goTo } from '../hooks/goTo'
import Particles from './Particles'
import Photo from './Photo'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({ defaults: { ease: 'power4.out' } })
          .from('.hero-hello', {
            y: 30,
            opacity: 0,
            duration: 0.8
          })
          .from('.hero-name', {
            y: 35,
            opacity: 0,
            duration: 1
          }, '-=0.4')
          .from('.hero-fade', {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9
          }, '-=0.6')
          .from('.hero-photo', {
            scale: 0.75,
            opacity: 0,
            rotate: -8,
            duration: 1.4,
            ease: 'expo.out'
          }, '-=1.3')

        const st = {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }

        gsap.to('.orb-a', {
          yPercent: 70,
          scrollTrigger: st
        })

        gsap.to('.orb-b', {
          yPercent: -40,
          xPercent: 20,
          scrollTrigger: st
        })

        gsap.to('.hero-content', {
          yPercent: -14,
          opacity: 0.15,
          scrollTrigger: st
        })

        gsap.to('.hero-photo', {
          yPercent: 18,
          scrollTrigger: st
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const [lead, ...rest] = site.title.split('|').map(t => t.trim())

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-10"
    >
      <div className="orb-a pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-amber/10 blur-[150px]" />

      <div className="orb-b pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-ti/10 blur-[150px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#C8CDD4_1px,transparent_1px),linear-gradient(90deg,#C8CDD4_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <Particles />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div className="hero-content min-w-0">
          <p className="hero-hello mb-4 flex items-center gap-2 font-display text-lg text-amber-hi sm:text-xl">
            <Sparkles size={18} />
            Hello, I'm
          </p>

          <h1 className="hero-name text-sheen pb-2 font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
            {site.name || 'Aryan Gupta'}
          </h1>

          <p className="hero-fade mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xl text-tihi sm:text-2xl">
            <span>{lead}</span>
            {rest.map(r => (
              <span key={r} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-5 w-px bg-ti/30" />
                <span className="text-amber-hi">{r}</span>
              </span>
            ))}
          </p>

          <p className="hero-fade mt-4 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            {site.intro}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => goTo('projects')}
              className="btn btn-primary"
            >
              View My Work
            </button>

            <a
              href={site.resume}
              download
              className="btn btn-ghost"
            >
              <Download size={18} />
              Download Resume
            </a>

            <button
              onClick={() => goTo('contact')}
              className="btn btn-ghost"
            >
              <Mail size={18} />
              Let's Connect
            </button>
          </div>
        </div>

        <div className="hero-photo relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[1.5rem] border border-ti/15" />
          <span aria-hidden="true" className="absolute -left-4 -top-4 h-12 w-12 rounded-tl-[1.5rem] border-l-2 border-t-2 border-amber" />
          <span aria-hidden="true" className="absolute -bottom-4 -right-4 h-12 w-12 rounded-br-[1.5rem] border-b-2 border-r-2 border-amber" />

          <div className="absolute -inset-2 rounded-2xl bg-amber/10 blur-3xl" />

          <Photo className="relative aspect-[4/5] w-full transition-transform duration-500 hover:scale-[1.02]" />
        </div>
      </div>

      <button
        onClick={() => goTo('about')}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-mute"
      >
        <span className="relative h-12 w-px overflow-hidden bg-ti/15">
          <span className="absolute inset-x-0 top-0 h-1/3 animate-[drip_1.8s_ease-in-out_infinite] bg-amber" />
        </span>

        <ArrowDown size={14} />
      </button>
    </section>
  )
}
