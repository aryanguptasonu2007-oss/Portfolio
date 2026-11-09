import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Eye, Download, Calendar, FileText, Award } from 'lucide-react'
import { site } from '../data/site'
import { spotMove } from '../hooks/useSpot'
import { reveal } from '../hooks/reveal'
import SectionHeading from './SectionHeading'

const pdfUrl = file => `/certificates/${file}`
const previewUrl = file => `/certificates/previews/${file}`

function Preview({ cert }) {
  const [failed, setFailed] = useState(false)
  return (
    <a
      href={pdfUrl(cert.file)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${cert.title} certificate`}
      className="cert-preview relative block aspect-[27/20] overflow-hidden rounded-xl border border-ti/15 bg-white/95"
    >
      {failed ? (
        <span className="flex h-full w-full flex-col items-center justify-center gap-2 bg-card text-mute">
          <FileText size={36} />
          <span className="text-sm">Preview unavailable</span>
        </span>
      ) : (
        <img
          src={previewUrl(cert.preview)}
          alt={`${cert.title} - certificate preview`}
          loading="lazy"
          width="1100"
          height="815"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/55 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex items-center gap-2 rounded-full border border-ti/15 bg-amber/10 px-4 py-2 text-sm font-medium text-tihi">
          <Eye size={16} /> Open certificate
        </span>
      </span>
    </a>
  )
}

export default function Certifications() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        reveal('.cert-card', { y: 80 }, { trigger: '.cert-grid', stagger: 0.12, duration: 0.95 })
        gsap.to('.cert-bg', {
          yPercent: -30,
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

  const certs = site.certifications

  return (
    <section
      id="certifications"
      ref={root}
      className="relative overflow-hidden px-5 py-28 sm:px-10 sm:py-36"
    >
      <div className="cert-bg pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-amber/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading sub="Verified courses and job simulations I have completed. Open or download the original certificate.">
          Certifications
        </SectionHeading>

        <ul className="cert-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map(cert => (
            <li
              key={cert.file}
              onMouseMove={spotMove}
              className="cert-card glass spot group flex flex-col gap-5 border-ti/15 p-4 shadow-[0_0_28px_rgba(255,157,0,0.14)] transition-all duration-300 hover:-translate-y-2 hover:border-amber/60 hover:shadow-[0_0_55px_rgba(255,157,0,0.14)] sm:p-5"
            >
              <div className="relative">
                <Preview cert={cert} />
              </div>

              <div className="relative flex flex-1 flex-col">
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-ti/15 bg-amber/10 px-3 py-1 text-xs text-amber-hi">
                  <Award size={13} /> {cert.issuer}
                </span>

                <h3 className="font-display text-lg font-semibold leading-snug text-tihi sm:text-xl">
                  {cert.title}
                </h3>

                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mute">
                  {cert.platform && <span>via {cert.platform}</span>}
                  {cert.date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} className="text-amber-hi/80" />
                      {cert.date}
                    </span>
                  )}
                </p>

                <div className="mt-auto flex flex-wrap gap-3 pt-5">
                  <a
                    href={pdfUrl(cert.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary !min-h-[44px] flex-1 !px-4 !text-sm"
                  >
                    <Eye size={16} /> View
                  </a>
                  <a
                    href={pdfUrl(cert.file)}
                    download={cert.file}
                    className="btn btn-ghost !min-h-[44px] flex-1 !px-4 !text-sm"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
