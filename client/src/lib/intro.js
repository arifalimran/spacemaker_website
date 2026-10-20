// client/src/lib/intro.js
// Decides ONCE at load whether the opening animation plays: first visit in this browser session, home page only,
// and never for visitors who prefer reduced motion. The hero reads the same flag to time its own entrance.
let will = false;
try {
  will =
    typeof window !== 'undefined' &&
    window.location.pathname === '/' &&
    !window.sessionStorage.getItem('sm-intro') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
} catch {
  will = false;
}
export const introWillPlay = will;
export const markIntroSeen = () => {
  try {
    window.sessionStorage.setItem('sm-intro', '1');
  } catch {
    /* private mode: it simply plays again next time */
  }
};
