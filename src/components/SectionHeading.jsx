import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SectionHeading({ children, sub }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.sh-inner', { yPercent: 110, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
        gsap.from('.sh-line', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} className="mb-14">
      <div className="overflow-hidden pb-2">
        <h2 className="sh-inner font-display text-4xl font-bold sm:text-6xl"><span className="text-grad">{children}</span></h2>
      </div>
      <div className="sh-line mt-4 h-px w-32 bg-gradient-to-r from-amber to-transparent" />
      {sub && <p className="mt-4 max-w-xl text-mute">{sub}</p>}
    </div>
  )
}
