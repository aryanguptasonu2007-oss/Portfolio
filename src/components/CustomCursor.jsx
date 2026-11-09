import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-cursor')
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.1 })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })
    const move = (e) => {
      document.body.classList.add('cursor-live')
       dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY) }
    const over = (e) => {
      const hit = e.target.closest('a, button, input, textarea, [data-hover]')
      gsap.to(ring.current, { scale: hit ? 1.9 : 1, duration: 0.3 })
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])
  return (
    <div aria-hidden="true" className="cursor-wrap pointer-events-none fixed left-0 top-0 z-[100] hidden opacity-0 [@media(hover:hover)_and_(pointer:fine)]:block">
      <div ref={ring} className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-amber/40 mix-blend-screen" />
      <div ref={dot} className="-ml-[3px] -mt-[3px] absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-amber-hi shadow-[0_0_12px_#FF9D00]" />
    </div>
  )
}
