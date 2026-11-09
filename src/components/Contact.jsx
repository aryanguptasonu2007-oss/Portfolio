
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Mail, Github, Linkedin, Send } from 'lucide-react'
import { site } from '../data/site'
import { spotMove } from '../hooks/useSpot'

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID

export default function Contact() {
  const root = useRef(null)
  const [status, setStatus] = useState({ type: 'idle', msg: '' })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.c-reveal', {
          y: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%'
          }
        })

        gsap.to('.c-orb', {
          scale: 1.4,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true
          }
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const submit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    if (!FORM_ID) {
      const name = formData.get('name')
      const email = formData.get('email')
      const message = formData.get('message')

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )

      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`

      setStatus({
        type: 'error',
        msg: 'Opening your email application. Configure Formspree for direct website submission.'
      })

      return
    }

    setStatus({ type: 'loading', msg: 'Sending your message...' })

    try {
      const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.errors?.map(error => error.message).join(', ') || 'Submission failed')
      }

      form.reset()

      setStatus({
        type: 'success',
        msg: 'Message sent successfully! Thank you for contacting me.'
      })
    } catch (error) {
      setStatus({
        type: 'error',
        msg: `Unable to send message. ${error.message || `Please email ${site.email}.`}`
      })
    }
  }

  const field =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-tihi placeholder-white/30 outline-none transition focus:border-amber focus:shadow-[0_0_24px_rgba(255,157,0,0.14)]'

  const links = [
    [Mail, 'Email', `mailto:${site.email}`, site.email],
    [Github, 'GitHub', site.github, 'aryanguptasonu2007-oss'],
    [Linkedin, 'LinkedIn', site.linkedin, 'Aryan Gupta']
  ]

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-40"
    >
      <div className="c-orb pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="c-reveal font-display text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[1] tracking-tight">
          <span className="text-grad">{site.contact.heading}</span>
        </h2>

        <p className="c-reveal mt-6 max-w-xl text-lg text-mute">
          {site.contact.text}
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <ul className="flex flex-col gap-4">
            {links.map(([Icon, label, href, text]) => (
              <li key={label} className="c-reveal">
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onMouseMove={spotMove}
                  className="glass spot flex items-center gap-4 p-5 transition hover:-translate-y-1 hover:border-amber/60"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber-hi">
                    <Icon size={22} />
                  </span>

                  <span className="relative min-w-0">
                    <span className="block text-sm text-mute">{label}</span>
                    <span className="block truncate text-tihi">{text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <form
            onSubmit={submit}
            className="c-reveal glass flex flex-col gap-4 p-6 sm:p-8"
          >
            <label className="flex flex-col gap-2 text-sm text-ti">
              Name
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className={field}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-ti">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={field}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-ti">
              Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your idea or opportunity"
                className={field}
              />
            </label>

            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="btn btn-primary self-start disabled:opacity-60"
            >
              <Send size={18} />
              {status.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`min-h-[1.5rem] text-sm ${
                status.type === 'success'
                  ? 'text-emerald-300'
                  : status.type === 'error'
                    ? 'text-rose-300'
                    : 'text-mute'
              }`}
            >
              {status.msg}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
