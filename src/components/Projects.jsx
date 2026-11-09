
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  Github,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Circle
} from 'lucide-react'
import { site } from '../data/site'
import { spotMove } from '../hooks/useSpot'
import SectionHeading from './SectionHeading'

const LinkBtn = ({ href, children, primary }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${primary ? 'btn-primary' : 'btn-ghost'}`}
    >
      {children}
    </a>
  ) : (
    <span
      role="link"
      aria-disabled="true"
      title="Coming soon"
      className={`btn ${primary ? 'btn-primary' : 'btn-ghost'}`}
    >
      {children}
    </span>
  )

function ProjectGallery({ project }) {
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : []

  const [active, setActive] = useState(0)

  const previous = () =>
    setActive(current => (current - 1 + images.length) % images.length)

  const next = () =>
    setActive(current => (current + 1) % images.length)

  if (!images.length) {
    return (
      <div className="p-img relative flex aspect-[16/10] flex-col items-center justify-center gap-4 bg-gradient-to-br from-card via-ink to-panel">
        <div className="grid grid-cols-3 gap-2">
          {['x', 'o', '', '', 'x', 'o', 'o', '', 'x'].map((m, i) => (
            <div
              key={i}
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-ti/15 bg-white/5 text-amber-hi shadow-[0_0_18px_rgba(255,157,0,0.14)] sm:h-16 sm:w-16"
            >
              {m === 'x' && <X size={30} strokeWidth={2.5} />}
              {m === 'o' && <Circle size={26} strokeWidth={2.5} />}
            </div>
          ))}
        </div>
        <p className="text-xs text-mute">Screenshot coming soon</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <img
          key={images[active]}
          src={images[active]}
          alt={`${project.name} screenshot ${active + 1}`}
          className="p-img aspect-[16/10] w-full bg-ink object-contain"
          onError={e => console.error('Image failed:', e.currentTarget.src)}
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={previous}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-tihi backdrop-blur transition hover:bg-amber hover:text-ink"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-tihi backdrop-blur transition hover:bg-amber hover:text-ink"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs text-tihi backdrop-blur">
            {active + 1} / {images.length}
          </div>

          <div className="mt-3 flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setActive(index)}
                aria-label={`Show screenshot ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  active === index
                    ? 'w-6 bg-amber'
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Projects() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.project').forEach(card => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%'
            }
          })

          tl.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          })
            .from(
              card.querySelector('.p-mask'),
              {
                clipPath: 'inset(0 100% 0 0)',
                duration: 1.3,
                ease: 'power4.inOut'
              },
              '-=0.6'
            )
            .from(
              card.querySelector('.p-img'),
              {
                scale: 1.5,
                duration: 1.6,
                ease: 'power3.out'
              },
              '<'
            )
            .from(
              card.querySelectorAll('.p-tag, .p-feat'),
              {
                y: 20,
                opacity: 0,
                stagger: 0.06,
                duration: 0.6
              },
              '-=0.8'
            )
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={root}
      className="relative px-5 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading sub="Things I've built while learning and experimenting.">
          Projects
        </SectionHeading>

        <div className="flex flex-col gap-16 sm:gap-24">
          {site.projects.map((p, i) => (
            <article
              key={p.name}
              onMouseMove={spotMove}
              className="project glass spot grid items-center gap-8 p-4 transition-shadow duration-500 hover:shadow-[0_0_70px_rgba(255,157,0,0.14)] sm:p-6 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={`p-mask overflow-hidden rounded-2xl border border-ti/15 ${
                  i % 2 ? 'lg:order-2' : ''
                }`}
              >
                <ProjectGallery project={p} />
              </div>

              <div className="relative p-2 sm:p-4">
                <h3 className="font-display text-3xl font-bold sm:text-5xl">
                  <span className="text-grad">{p.name}</span>
                </h3>

                <p className="mt-4 text-mute">{p.description}</p>

                <ul className="mt-5 grid gap-2 text-sm text-ti sm:grid-cols-2">
                  {p.features.map(f => (
                    <li key={f} className="p-feat flex items-center gap-2">
                      <Check size={15} className="shrink-0 text-amber-hi" />
                      {f}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <li
                      key={t}
                      className="p-tag rounded-full border border-ti/15 bg-amber/10 px-3 py-1 text-xs text-amber-hi"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <LinkBtn href={p.github}>
                    <Github size={18} /> GitHub
                  </LinkBtn>

                  <LinkBtn href={p.demo} primary>
                    <ExternalLink size={18} /> Live Demo
                  </LinkBtn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
