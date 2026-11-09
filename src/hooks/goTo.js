export function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(id === 'home' ? 0 : el, { duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
