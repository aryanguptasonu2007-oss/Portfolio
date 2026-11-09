import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../data/site'
import { goTo } from '../hooks/goTo'

export default function Footer() {
  const links = [
    [Github, 'GitHub', site.github],
    [Linkedin, 'LinkedIn', site.linkedin],
    [Mail, 'Email', `mailto:${site.email}`]
  ]
  return (
    <footer className="border-t border-ti/10 px-5 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="font-display text-xl font-bold text-grad">{site.name}</p>
          <p className="mt-1 text-sm text-mute">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
        <ul className="flex gap-3">
          {links.map(([Icon, label, href]) => (
            <li key={label}>
              <a href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-ti/15 text-ti transition hover:border-amber hover:text-tihi hover:shadow-[0_0_24px_rgba(255,157,0,0.14)]"><Icon size={18} /></a>
            </li>
          ))}
        </ul>
        <button onClick={() => goTo('home')} className="btn btn-ghost !min-h-[44px]"><ArrowUp size={18} /> Back to top</button>
      </div>
    </footer>
  )
}
