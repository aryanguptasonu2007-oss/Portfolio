import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

export default function Particles({ count = 36 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pts = []
    const size = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    for (let i = 0; i < count; i++)
      pts.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.4, vx: (Math.random() - 0.5) * 0.25, vy: -Math.random() * 0.35 - 0.05, a: Math.random() * 0.6 + 0.2 })
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,205,212,${p.a * 0.55})`
        ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(255,157,0,0.5)'
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    if (prefersReducedMotion()) { draw(); cancelAnimationFrame(raf) } else draw()
    window.addEventListener('resize', size)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size) }
  }, [count])
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
