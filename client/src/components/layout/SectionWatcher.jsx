// client/src/components/layout/SectionWatcher.jsx
// One light watcher for the whole home page. A thin band just under the top bar is observed (IntersectionObserver),
// so work happens only when a section boundary crosses it, never on every scroll pixel.
// It sets <html data-sm-theme="light|dark" data-sm-sec="why">, which drives the top bar, the floating buttons and the
// active nav link through CSS variables (colour fades only), and tells the floating pill the current section name.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CSS = `
[data-sm-themed]{
  --nav-bg:rgba(250,248,245,.97);--nav-bd:rgba(229,229,229,.7);--nav-fg:#404040;--nav-hover:#1B4332;--nav-brand:#1B4332;--nav-sub:#737373;
  --nav-btn-bg:#1B4332;--nav-btn-fg:#fff;--nav-btn-hover:#14331f;--nav-panel-hover:#EDF4EC;
  --dk-bg:#2A1F1A;--dk-fg:#F5F0E6;--dk-bd:rgba(245,240,230,.25);
}
[data-sm-themed][data-sm-theme="dark"]{
  --nav-bg:rgba(42,31,26,.97);--nav-bd:rgba(245,240,230,.16);--nav-fg:rgba(245,240,230,.88);--nav-hover:#C6F00C;--nav-brand:#F5F0E6;--nav-sub:rgba(245,240,230,.6);
  --nav-btn-bg:#C6F00C;--nav-btn-fg:#2A1F1A;--nav-btn-hover:#D8FA4D;--nav-panel-hover:rgba(245,240,230,.08);
  --dk-bg:#F5F0E6;--dk-fg:#2A1F1A;--dk-bd:rgba(42,31,26,.25);
}
${['projects', 'about', 'why', 'testimonials', 'team', 'land', 'contact']
  .map((k) => `[data-sm-themed][data-sm-sec="${k}"] .sm-l-${k}{color:var(--nav-hover)}[data-sm-themed][data-sm-sec="${k}"] .sm-l-${k}::after{width:100%}`)
  .join('')}
`;

export default function SectionWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    // only the top bar and the floating dock carry the theme, so a section change restyles two small subtrees
    const announce = (label, theme, key) => {
      document.querySelectorAll('[data-sm-themed]').forEach((n) => {
        n.dataset.smTheme = theme;
        if (key) n.dataset.smSec = key;
        else delete n.dataset.smSec;
      });
      window.dispatchEvent(new CustomEvent('sm-section', { detail: { label } }));
    };

    if (pathname !== '/') {
      announce(null, 'light', null);
      return undefined;
    }

    let io;
    let timer;
    let last = '';
    const live = new Set();

    const resolve = () => {
      const list = [...document.querySelectorAll('[data-sec]')];
      const sig = document.getElementById('signature');
      if (sig) {
        sig.dataset.sec = 'Projects';
        sig.dataset.key = 'projects';
        sig.dataset.theme = 'dark';
        list.push(sig);
      }
      const foot = document.querySelector('footer#contact');
      if (foot) {
        foot.dataset.sec = 'Contact';
        foot.dataset.key = 'contact';
        foot.dataset.theme = 'dark';
        list.push(foot);
      }
      return [...new Set(list)];
    };

    const pick = () => {
      const arr = [...live].sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      const cur = arr[arr.length - 1];
      if (!cur) return;
      const sig = `${cur.dataset.sec}|${cur.dataset.theme}`;
      if (sig === last) return;
      last = sig;
      announce(cur.dataset.sec, cur.dataset.theme || 'light', cur.dataset.key);
    };

    const build = () => {
      if (io) io.disconnect();
      live.clear();
      const top = 76; // just under the floating top bar
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? live.add(e.target) : live.delete(e.target)));
          pick();
        },
        { rootMargin: `-${top}px 0px -${Math.max(0, window.innerHeight - top - 2)}px 0px`, threshold: 0 }
      );
      resolve().forEach((el) => io.observe(el));
    };

    // sections mount a moment after the route, so start next frame, rebuild on resize
    const raf = requestAnimationFrame(build);
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(build, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      if (io) io.disconnect();
    };
  }, [pathname]);

  return <style>{CSS}</style>;
}
