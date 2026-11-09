
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Gift, ImageOff, X } from 'lucide-react'
import { site } from '../data/site'
import { spotMove } from '../hooks/useSpot'
import { reveal } from '../hooks/reveal'
import SectionHeading from './SectionHeading'

const goodieUrl = file => {
  if (!file) return ''
  return file.startsWith('/') ? file : `/goodies/${file}`
}

function GoodiePhoto({ item }) {
  const [failed, setFailed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const imagePath = goodieUrl(item.image || item.photo)

  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ti/15 bg-card">
        {failed || !imagePath ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-mute">
            <ImageOff size={32} />
            <span className="text-sm">Photo unavailable</span>
          </div>
        ) : (
          <img
            src={imagePath}
            alt={item.title}
            loading="lazy"
            onError={() => setFailed(true)}
            onClick={() => setIsOpen(true)}
            className="h-full w-full cursor-zoom-in object-contain transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-5 z-[10000] rounded-full bg-amber-deep p-3 text-tihi transition hover:bg-amber"
            aria-label="Close image"
          >
            <X size={28} />
          </button>

          <img
            src={imagePath}
            alt={item.title}
            onClick={e => e.stopPropagation()}
            className="max-h-[95vh] max-w-[95vw] object-contain rounded-xl shadow-[0_0_50px_rgba(255,157,0,0.14)]"
          />
        </div>
      )}
    </>
  )
}

export default function Achievements() {
  const root = useRef(null)
  const items = site.goodies || []

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reveal(
          '.goodie-card',
          { y: 70 },
          {
            trigger: '.goodie-grid',
            stagger: 0.14,
            duration: 0.95
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="achievements"
      ref={root}
      className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-36"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading sub="Memories and goodies from my Google Cloud Arcade journey.">
          Achievements
        </SectionHeading>

        {items.length > 0 ? (
          <ul className="goodie-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={item.image || item.photo || index}
                onMouseMove={spotMove}
                className="goodie-card glass spot group border-ti/15 p-4 shadow-[0_0_28px_rgba(255,157,0,0.14)] transition-all duration-300 hover:-translate-y-2 hover:border-amber/60 hover:shadow-[0_0_55px_rgba(255,157,0,0.14)] sm:p-5"
              >
                <div className="relative">
                  <GoodiePhoto item={item} />

                  <h3 className="mt-5 font-display text-lg font-semibold text-tihi sm:text-xl">
                    {item.title}
                  </h3>

                  {item.text && (
                    <p className="mt-2 text-sm leading-relaxed text-mute">
                      {item.text}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="goodie-grid">
            <div className="goodie-card glass mx-auto flex max-w-xl flex-col items-center gap-4 border-dashed border-ti/15 p-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber/10 text-amber-hi">
                <Gift size={28} />
              </span>

              <h3 className="font-display text-xl font-semibold">
                Google Cloud Arcade goodies
              </h3>

              <p className="text-sm text-mute">
                Add your Google Cloud Arcade goodies photos in public/goodies and list them in src/data/site.js.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
