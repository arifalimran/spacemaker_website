// client/src/lib/scroll.js
// Works with Lenis when it is running, and falls back to normal smooth scrolling.
export function scrollToEl(target, offset = -90) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return false;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  return true;
}

export function scrollTop() {
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
