import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  Coffee,
  Terminal,
  Braces,
  Atom,
  Palette,
  FileCode2,
  Code2,
  Leaf,
  Webhook,
  Database,
  Brain,
  BrainCircuit,
  Binary,
  GitBranch,
  Code,
  Layers,
  Server,
  Cpu,
  Sparkles
} from 'lucide-react'
import { site } from '../data/site'
import { spotMove } from '../hooks/useSpot'
import { reveal } from '../hooks/reveal'
import SectionHeading from './SectionHeading'

// key = `icon` value in site.skillGroups
const icons = {
  Java: Coffee,
  C: Terminal,
  Python: Braces,
  JavaScript: FileCode2,
  HTML: Code2,
  CSS: Palette,
  React: Atom,
  'Spring Boot': Leaf,
  'REST APIs': Webhook,
  SQL: Database,
  'Artificial Intelligence': BrainCircuit,
  'Machine Learning': Brain,
  'Data Structures and Algorithms': Binary,
  'Git and GitHub': GitBranch
}

const categoryIcons = {
  'Programming Languages': Code,
  'Frontend Development': Layers,
  'Backend & Data': Server,
  'AI & Machine Learning': Cpu,
  'Core Concepts & Tools': Sparkles
}

// Which projects use a skill, derived from each project's tags.
const usedIn = tag =>
  tag
    ? site.projects.filter(p => p.tags.includes(tag)).map(p => p.name)
    : []

export default function Skills() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.skill-group').forEach(group => {
          reveal(
            group.querySelectorAll('.skill-card'),
            { y: 80, rotateX: -20, transformPerspective: 800 },
            { trigger: group, stagger: 0.09 }
          )
          reveal(group.querySelector('.skill-cat'), { x: -40 }, { trigger: group, start: 'top 88%', duration: 0.8 })
        })
        gsap.to('.skills-bg', {
          yPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={root}
      className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-36"
    >
      <div className="skills-bg pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-amber/10 blur-[140px]" />
      <div className="skills-bg pointer-events-none absolute -right-40 top-[55%] h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading sub="Languages, tools and concepts I work with and keep learning.">
          Skills
        </SectionHeading>

        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-2 lg:gap-y-16">
          {site.skillGroups.map(group => {
            const CatIcon = categoryIcons[group.category] || Code
            const n = group.items.length
            // Wide groups (4+ cards) take the full row; smaller groups pair up side by side.
            const wrap = n >= 4 ? 'lg:col-span-2' : ''
            const cols =
              n >= 4 ? 'lg:grid-cols-4' : n === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
            return (
              <div key={group.category} className={`skill-group ${wrap}`}>
                <div className="skill-cat mb-6 flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ti/15 bg-amber/10 text-amber-hi shadow-[0_0_20px_rgba(255,157,0,0.14)]">
                    <CatIcon size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-tihi sm:text-2xl">
                      {group.category}
                    </h3>
                    <p className="text-sm text-mute">{group.blurb}</p>
                  </div>
                </div>

                <ul className={`grid gap-4 sm:grid-cols-2 sm:gap-5 ${cols}`}>
                  {group.items.map(s => {
                    const Icon = icons[s.icon] || Code
                    const projects = usedIn(s.tag)
                    return (
                      <li
                        key={s.name}
                        onMouseMove={spotMove}
                        className="skill-card glass spot group p-6 lg:p-5 transition-all duration-300 hover:-translate-y-2 hover:border-amber/60 hover:shadow-[0_0_50px_rgba(255,157,0,0.14)]"
                      >
                        <div className="relative flex h-full flex-col">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber/10 text-amber-hi transition-transform duration-500 group-hover:rotate-[360deg]">
                            <Icon size={28} />
                          </div>
                          <h4 className="font-display text-xl font-semibold leading-tight sm:text-2xl">
                            {s.name}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-mute">
                            {s.text}
                          </p>
                          {projects.length > 0 && (
                            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-amber-hi/80">
                              Used in {projects.join(', ')}
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
