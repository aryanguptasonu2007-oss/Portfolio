import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'
import { goTo } from '../hooks/goTo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const triggers = site.nav.map(([id]) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(id)
      })
    )
    return () => {
      window.removeEventListener('scroll', onScroll)
      triggers.forEach((t) => t.kill())
    }
  }, [])

  const go = (id) => { setOpen(false); goTo(id) }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
      <nav aria-label="Primary" className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-6 ${scrolled ? 'glass !bg-ink/70 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.9)]' : 'border border-transparent'}`}>
        <button onClick={() => go('home')} aria-label="Go to top" className="font-display text-xl font-bold">
          <span className="text-grad">AG</span>
        </button>
        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map(([id, label]) => (
            <li key={id}>
              <button onClick={() => go(id)} aria-current={active === id ? 'true' : undefined} className={`relative rounded-full px-3 py-2 text-sm transition-colors xl:px-4 ${active === id ? 'text-tihi' : 'text-mute hover:text-tihi'}`}>
                {active === id && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-amber shadow-[0_0_10px_rgba(255,157,0,0.8)]" />}
                {label}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => go('contact')} className="btn btn-primary hidden !min-h-[40px] lg:inline-flex">Let's Talk</button>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-ti/20 text-tihi lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="glass absolute left-3 right-3 top-[68px] p-4 lg:hidden">
          <ul className="flex flex-col">
            {site.nav.map(([id, label]) => (
              <li key={id}>
                <button onClick={() => go(id)} className={`w-full rounded-xl px-4 py-3.5 text-left text-lg ${active === id ? 'bg-amber/10 text-tihi' : 'text-ti'}`}>{label}</button>
              </li>
            ))}
          </ul>
          <button onClick={() => go('contact')} className="btn btn-primary mt-3 w-full">Let's Talk</button>
        </div>
      )}
    </header>
  )
}
