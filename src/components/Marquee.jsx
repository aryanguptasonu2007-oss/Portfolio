import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { site } from '../data/site'

export default function Marquee() {
  const root = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.m-a', { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo('.m-b', { xPercent: -30 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  const words = [...site.skills, ...site.skills, ...site.skills].join('  /  ')
  return (
    <div ref={root} aria-hidden="true" className="select-none overflow-hidden border-y border-ti/10 py-6">
      <div className="m-a whitespace-nowrap font-display text-5xl font-bold text-grad sm:text-7xl">{words}</div>
      <div className="m-b mt-2 whitespace-nowrap font-display text-5xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(200,205,212,0.3)] sm:text-7xl">{words}</div>
    </div>
  )
}
