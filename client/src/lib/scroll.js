// client/src/lib/scroll.js
// One place for all scrolling. Lenis does every scroll; the browser never jumps to an anchor.
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';

/* Scroll to an element (or selector). Same call everywhere:
   window.__lenis?.scrollTo(target, { offset: -80, duration: 1.2 }) */
/* Height of the fixed menu (top-4 + bar) plus breathing room. Content must never sit under it. */
export const NAV_OFFSET = 104;

export function scrollToEl(target, offset = -NAV_OFFSET, duration = 1.2) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return false;
  if (window.__lenis) {
    window.__lenis?.scrollTo(el, { offset, duration });
  } else {
    // Lenis is off (reduced motion): plain scroll, still no anchor jump
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + offset);
  }
  return true;
}

export function scrollToHash(hash) {
  if (!hash || hash === '#') return false;
  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    /* keep raw id */
  }
  const el = document.getElementById(id);
  return el ? scrollToEl(el, -NAV_OFFSET, 1.2) : false;
}

export function scrollTop(immediate = true) {
  if (window.__lenis) window.__lenis?.scrollTo(0, immediate ? { immediate: true, force: true } : { duration: 1.2 });
  else window.scrollTo(0, 0);
}

/* Smooth inertia scrolling for the whole site, shared through window.__lenis.
   While the page is moving, <html> carries .sm-scrolling: hover effects pause (see index.css),
   so the browser only paints the scroll itself. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.2 });
    window.__lenis = lenis;
    const root = document.documentElement;
    let idle;
    lenis.on('scroll', () => {
      root.classList.add('sm-scrolling');
      clearTimeout(idle);
      idle = setTimeout(() => root.classList.remove('sm-scrolling'), 140);
    });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      root.classList.remove('sm-scrolling');
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}

/* Call once inside the Router (in Shell):
   1. every click on a same-page #hash link is taken over: no browser jump, Lenis scrolls
   2. a new page opens at the top instantly, then glides to its #hash (no long jerky scroll)
   3. hash links work even when the target mounts a moment later */
export function useHashScroll() {
  const { pathname, hash, key } = useLocation();
  const navigate = useNavigate();
  const lastPath = useRef(pathname);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      let url;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || !url.hash || url.hash === '#') return;
      if (url.pathname !== window.location.pathname) return; // another page: Router navigates, then we scroll
      e.preventDefault(); // stops the browser jump
      const same = url.search === window.location.search && url.hash === window.location.hash;
      navigate({ pathname: url.pathname, search: url.search, hash: url.hash }, { replace: same });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  useEffect(() => {
    const pathChanged = lastPath.current !== pathname;
    lastPath.current = pathname;

    if (pathChanged) scrollTop(true); // new page: start at the top instantly

    if (!hash) {
      if (!pathChanged && key !== 'default') scrollTop(false); // e.g. logo clicked on the same page
      return undefined;
    }

    let raf;
    let tries = 0;
    const go = () => {
      if (scrollToHash(hash)) return;
      if (tries++ < 60) raf = requestAnimationFrame(go);
    };
    raf = requestAnimationFrame(go);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);
}
