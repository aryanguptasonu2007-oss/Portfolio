import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { School, BookOpen, GraduationCap, Rocket, MapPin } from 'lucide-react'
import { site } from '../data/site'
import { spotMove } from '../hooks/useSpot'
import SectionHeading from './SectionHeading'

const icons = { school: School, book: BookOpen, cap: GraduationCap }

function Node({ children, active }) {
  return (
    <span
      className={`absolute -left-[4.25rem] top-5 flex h-11 w-11 items-center justify-center rounded-full border bg-ink text-amber-hi transition-transform duration-500 group-hover:scale-110 sm:-left-[4.75rem] ${
        active
          ? 'border-amber shadow-[0_0_28px_rgba(255,157,0,0.14)]'
          : 'border-ti/15 shadow-[0_0_20px_rgba(255,157,0,0.14)]'
      }`}
    >
      {active && (
        <span className="absolute inset-0 animate-ping rounded-full border border-amber/40" />
      )}
      <span className="relative">{children}</span>
    </span>
  )
}

export default function LearningPath() {
  const root = useRef(null)
  const cur = site.currentLearning

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.lp-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: '.lp-timeline',
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: true
            }
          }
        )
        gsap.utils.toArray('.lp-item').forEach(el =>
          gsap.from(el, {
            x: -50,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          })
        )
        gsap.from('.lp-chip', {
          y: 14,
          opacity: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.lp-current', start: 'top 80%' }
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="learning"
      ref={root}
      className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-36"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-amber/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading sub="My education so far and where my learning is heading.">
          Learning Path
        </SectionHeading>

        <div className="lp-timeline relative mx-auto max-w-3xl pl-[4.25rem] sm:pl-[4.75rem]">
          {/* track + glowing progress line */}
          <div className="absolute bottom-0 left-[21px] top-0 w-px bg-white/10 sm:left-[21px]" />
          <div className="lp-line absolute bottom-0 left-[21px] top-0 w-px bg-gradient-to-b from-amber-hi to-amber-deep shadow-[0_0_12px_#FF9D00]" />

          <ol className="flex flex-col gap-8 sm:gap-10">
            {site.learningPath.map(step => {
              const Icon = icons[step.icon] || School
              return (
                <li key={step.stage} className="lp-item group relative">
                  <Node>
                    <Icon size={20} />
                  </Node>
                  <article
                    onMouseMove={spotMove}
                    className="glass spot relative p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/60 hover:shadow-[0_0_50px_rgba(255,157,0,0.14)] sm:p-7"
                  >
                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-ti/15 bg-amber/10 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-amber-hi">
                          {step.stage}
                        </span>
                        {step.years && (
                          <span className="text-xs text-mute">{step.years}</span>
                        )}
                        {step.badge && (
                          <span className="rounded-full bg-amber/15 px-3 py-1 text-xs text-amber-hi">
                            {step.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-tihi sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 flex items-start gap-1.5 text-sm text-mute">
                        <MapPin size={15} className="mt-0.5 shrink-0 text-amber-hi/80" />
                        {step.place}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-mute">
                        {step.text}
                      </p>
                    </div>
                  </article>
                </li>
              )
            })}

            {/* Current learning journey (skills development, no projects) */}
            <li className="lp-item lp-current group relative">
              <Node active>
                <Rocket size={20} />
              </Node>
              <article
                onMouseMove={spotMove}
                className="glass spot relative border-amber/40 p-6 shadow-[0_0_40px_rgba(255,157,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(255,157,0,0.14)] sm:p-7"
              >
                <div className="relative">
                  <span className="rounded-full border border-amber/40 bg-amber/15 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-amber-hi">
                    Now
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-tihi sm:text-2xl">
                    {cur.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    {cur.text}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {cur.focus.map(f => (
                      <li
                        key={f}
                        className="lp-chip rounded-full border border-ti/15 bg-amber/10 px-3 py-1.5 text-xs text-amber-hi transition-colors hover:bg-amber/20"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
