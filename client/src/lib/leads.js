// client/src/lib/leads.js
// WhatsApp / call links that carry a project (and unit) reference, plus click logging.
import { CONTACT } from '../data/portfolio';

export const waLink = (message, number = CONTACT.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export function projectMessage(project, unit, kind = 'project') {
  if (kind === 'upcoming') {
    const what = project.name ? `${project.name} in ${project.area}` : `your upcoming project in ${project.area}`;
    return `Hello Space Maker, I would like to register my interest in ${what}. Ref: UP-${project.id}`;
  }
  if (kind === 'interior') {
    return `Hello Space Maker, I would like to know more about your interior work: ${project.title}. Ref: ${project.ref}`;
  }
  if (unit) {
    return `Hello Space Maker, I am interested in unit ${unit.id} (${unit.label}, ${unit.size}) at ${project.title}, ${project.area}. Ref: ${project.ref}-${unit.id}`;
  }
  return `Hello Space Maker, I would like to know more about ${project.title}, ${project.area}. Ref: ${project.ref}`;
}

export function landMessage(f) {
  return [
    'Hello Space Maker, I would like a feasibility study for my land.',
    f.name && `Name: ${f.name}`,
    f.phone && `Phone: ${f.phone}`,
    f.location && `Plot location: ${f.location}`,
    f.size && `Plot size: ${f.size}`,
    f.notes && `Notes: ${f.notes}`,
  ]
    .filter(Boolean)
    .join('\n');
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
