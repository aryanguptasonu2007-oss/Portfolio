import { useState } from 'react'
import { site } from '../data/site'

export default function Photo({ className = '' }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-ti/20 bg-gradient-to-br from-card via-ink to-panel ${className}`}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center font-display text-7xl font-bold text-grad">AG</div>
      ) : (
        <img src={site.photo} alt={`Portrait of ${site.name}`} className="h-full w-full object-cover" onError={() => setFailed(true)} />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_50px_rgba(8,9,11,0.55)]" />
    </div>
  )
}
