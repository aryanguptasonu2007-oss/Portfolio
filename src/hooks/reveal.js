import gsap from 'gsap'

/**
 * Scroll-reveal for cards that also have CSS hover effects/transitions.
 *
 * Why not gsap.from()? from() reads the element's computed values to find the
 * "end" state. On elements with a CSS `transition`, that read can return a
 * mid-transition value, leaving the card stuck invisible. This uses explicit
 * start/end values, pauses CSS transitions while animating, and removes the
 * inline styles afterwards so hover effects (lift, glow) keep working.
 *
 * @param targets  element(s) to animate
 * @param from     start values, e.g. { y: 80, rotateX: -20 }  (opacity is always 0 -> 1)
 * @param opts     { trigger, start, ...any gsap tween vars (duration, stagger, ease) }
 */
export function reveal(targets, from, { trigger, start = 'top 85%', ...vars } = {}) {
  const startVals = { opacity: 0, ...from }
  const endVals = { opacity: 1 }
  Object.keys(from).forEach(k => {
    if (k !== 'transformPerspective') endVals[k] = 0
  })

  return gsap.fromTo(targets, startVals, {
    ...endVals,
    duration: 0.9,
    ease: 'power3.out',
    ...vars,
    onStart() {
      gsap.utils.toArray(targets).forEach(el => (el.style.transition = 'none'))
    },
    clearProps: 'opacity,transform,transition',
    scrollTrigger: { trigger, start }
  })
}
