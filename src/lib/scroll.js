export function initScroll(onChange) {
  function handler() {
    const y = window.scrollY || 0
    onChange({
      isScrolled: y > 8,
      showTop: y > 500,
    })
  }

  handler()
  window.addEventListener('scroll', handler, { passive: true })

  return function cleanup() {
    window.removeEventListener('scroll', handler)
  }
}
