// client/src/lib/careersApi.js
// One place that sends a job application. Change APPLY_ENDPOINT when the CMS / back end is ready.
// While APPLY_ENDPOINT is empty it runs in DEMO mode: it pretends to send and saves nothing.

export const APPLY_ENDPOINT = ''; // e.g. 'https://your-cms.example.com/api/applications'

export const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
export const CV_EXTENSIONS = ['pdf', 'doc', 'docx'];

export function checkCv(file) {
  if (!file) return 'Please attach your CV.';
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!CV_EXTENSIONS.includes(ext)) return 'Please upload a PDF, DOC or DOCX file.';
  if (file.size > MAX_CV_BYTES) return 'That file is over 5 MB. Please upload a smaller one.';
  return '';
}

export function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// formData fields: position, name, phone, email, city, experience, link, salary, note, cv (File)
// Returns { ok: true, demo?: true }. Throws if sending fails.
export async function submitApplication(formData) {
  if (!APPLY_ENDPOINT) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, demo: true };
  }
  const res = await fetch(APPLY_ENDPOINT, { method: 'POST', body: formData });
  if (!res.ok) throw new Error(`Application failed (${res.status})`);
  return { ok: true };
}
