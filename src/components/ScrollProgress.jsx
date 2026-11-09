import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ScrollProgress() {
  const bar = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
      })
    })
    return () => ctx.revert()
  }, [])
  return (
    <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-[3px] w-full">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-amber-deep via-amber to-amber-hi shadow-[0_0_14px_#FF9D00]" />
    </div>
  )
}
