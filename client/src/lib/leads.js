// client/src/lib/leads.js
// WhatsApp / call links that carry a project (and flat) reference, plus click logging.
import { CONTACT } from '../data/portfolio';

export const waLink = (message, number = CONTACT.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export function projectMessage(project, flat, kind = 'project') {
  if (kind === 'upcoming') {
    return `Hello Space Maker, I would like to register my interest in your upcoming project in ${project.area}. Ref: UP-${project.id}`;
  }
  if (flat) {
    return `Hello Space Maker, I am interested in flat ${flat.id} (${flat.beds} bed, ${flat.size}) at ${project.title}, ${project.area}. Ref: ${project.ref}-${flat.id}`;
  }
  return `Hello Space Maker, I would like to know more about ${project.title}, ${project.area}. Ref: ${project.ref}`;
}

/* Logs every WhatsApp / call tap.
   Set VITE_LEADS_URL in client/.env and each tap is POSTed there (n8n webhook or your API).
   Without it, taps are only printed in the browser console during development. */
export function trackLead(payload) {
  try {
    const body = JSON.stringify({
      ...payload,
      at: new Date().toISOString(),
      page: window.location.pathname,
    });
    const url = import.meta.env.VITE_LEADS_URL;
    if (url && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    } else if (import.meta.env.DEV) {
      console.debug('[lead]', body);
    }
  } catch {
    /* never block the visitor */
  }
}
