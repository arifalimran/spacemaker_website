// client/src/components/home/ApplyForm.jsx
// The "Apply now" panel. Wrap a page in <ApplyProvider>, then any button calls useApply().open('Role title').
// Slides in from the right on desktop, rises from the bottom on mobile. Sends through lib/careersApi.js.
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { JOBS, HR, APPLY } from '../../data/careers';
import { submitApplication, checkCv, formatSize, MAX_CV_BYTES } from '../../lib/careersApi';

const ApplyCtx = createContext({ open: () => {} });
export const useApply = () => useContext(ApplyCtx);

const EXPERIENCE = ['Fresher', 'Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'];

const field =
  'mt-2 w-full rounded-xl border border-[#2A1F1A]/25 bg-transparent px-4 py-3 text-[15px] text-[#2A1F1A] outline-none transition-colors placeholder:text-[#A39380] focus:border-[#2A1F1A] focus:ring-2 focus:ring-[#C6DB3F]/60';
const label = "block font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#5C4A3E]";

function Field({ id, text, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
        {required && <span className="text-[#5C6E0A]"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] text-[#8A3B2A]">
          {error}
        </p>
      )}
    </div>
  );
}

function Panel({ initialPosition, onClose }) {
  const positions = useMemo(() => [...JOBS.map((j) => j.title), APPLY.general, APPLY.flex], []);
  const [v, setV] = useState({
    position: positions.includes(initialPosition) ? initialPosition : APPLY.general,
    name: '', phone: '', email: '', city: '', experience: '', link: '', salary: '', note: '', consent: false, trap: '',
  });
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | failed
  const [demo, setDemo] = useState(false);
  const firstRef = useRef(null);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  useEffect(() => {
    const t = setTimeout(() => firstRef.current?.focus({ preventScroll: true }), 350);
    return () => clearTimeout(t);
  }, []);

  function validate() {
    const e = {};
    if (!v.name.trim()) e.name = 'Please enter your full name.';
    const digits = v.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) e.phone = 'Please enter a valid phone number.';
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
    if (!v.city.trim()) e.city = 'Please tell us where you live.';
    if (!v.experience) e.experience = 'Please choose your experience.';
    const cvErr = checkCv(cv);
    if (cvErr) e.cv = cvErr;
    if (!v.consent) e.consent = 'Please tick the box so we can contact you.';
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (v.trap) return; // spam trap filled: silently ignore
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`apply-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    const fd = new FormData();
    Object.entries({ position: v.position, name: v.name, phone: v.phone, email: v.email, city: v.city, experience: v.experience, link: v.link, salary: v.salary, note: v.note }).forEach(([k, val]) => fd.append(k, val.trim ? val.trim() : val));
    fd.append('cv', cv);
    try {
      const r = await submitApplication(fd);
      setDemo(!!r.demo);
      setStatus('done');
    } catch {
      setStatus('failed');
    }
  }

  const mail = `mailto:${HR.email}?subject=${encodeURIComponent(`Application: ${v.position}`)}`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-[#2A1F1A]/15 px-6 py-5 sm:px-8">
        <div>
          <span className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#2A1F1A]">
            <span className="h-[2px] w-8 bg-[#C6DB3F]" />
            Apply now
          </span>
          <h2 id="apply-title" className="mt-3 font-['Space_Grotesk'] text-2xl font-extrabold leading-[1.1] tracking-tight text-[#2A1F1A] sm:text-3xl">
            Send your application
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-[#2A1F1A] text-lg text-[#2A1F1A] transition-colors duration-300 hover:bg-[#C6DB3F]"
        >
          ×
        </button>
      </div>

      <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
        {status === 'done' ? (
          <div className="flex min-h-[320px] flex-col items-start justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6DB3F] text-xl text-[#2A1F1A]">✓</span>
            <h3 className="mt-6 font-['Space_Grotesk'] text-3xl font-extrabold leading-[1.1] text-[#2A1F1A]">Thank you, {v.name.trim().split(' ')[0]}.</h3>
            <p className="mt-3 max-w-sm text-base leading-[1.7] text-[#4B3F37]">{APPLY.success}</p>
            {demo && (
              <p className="mt-4 rounded-lg bg-[#E4EDD6] px-3 py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#5C6E0A]">
                Demo mode: nothing was saved yet.
              </p>
            )}
            <button type="button" onClick={onClose} className="mt-8 rounded-full border-[1.5px] border-[#2A1F1A] px-6 py-3 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2A1F1A] transition-colors duration-300 hover:bg-[#2A1F1A] hover:text-[#F5F0E6]">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <Field id="apply-position" text="Position" required>
              <select id="apply-position" value={v.position} onChange={set('position')} className={field}>
                {positions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field id="apply-name" text="Full name" required error={errors.name}>
              <input ref={firstRef} id="apply-name" type="text" autoComplete="name" value={v.name} onChange={set('name')} className={field} aria-invalid={!!errors.name} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="apply-phone" text="Phone / WhatsApp" required error={errors.phone}>
                <input id="apply-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXX-XXXXXX" value={v.phone} onChange={set('phone')} className={field} aria-invalid={!!errors.phone} />
              </Field>
              <Field id="apply-email" text="Email" required error={errors.email}>
                <input id="apply-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} className={field} aria-invalid={!!errors.email} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="apply-city" text="Current city" required error={errors.city}>
                <input id="apply-city" type="text" autoComplete="address-level2" value={v.city} onChange={set('city')} className={field} aria-invalid={!!errors.city} />
              </Field>
              <Field id="apply-experience" text="Experience" required error={errors.experience}>
                <select id="apply-experience" value={v.experience} onChange={set('experience')} className={field} aria-invalid={!!errors.experience}>
                  <option value="">Choose</option>
                  {EXPERIENCE.map((x) => (
                    <option key={x} value={x}>{x}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="apply-cv" text="Your CV" required error={errors.cv}>
              <label
                htmlFor="apply-cv"
                className="mt-2 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-[#2A1F1A]/40 bg-[#F2F5E9] px-4 py-4 transition-colors hover:border-[#2A1F1A]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold text-[#2A1F1A]">{cv ? cv.name : 'Choose a file'}</span>
                  <span className="mt-0.5 block text-[13px] text-[#6B5446]">
                    {cv ? formatSize(cv.size) : `PDF, DOC or DOCX, up to ${MAX_CV_BYTES / (1024 * 1024)} MB`}
                  </span>
                </span>
                <span className="flex-none font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#2A1F1A] underline decoration-[#C6DB3F] decoration-2 underline-offset-[6px]">
                  {cv ? 'Change' : 'Browse'}
                </span>
              </label>
              <input
                id="apply-cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={(e) => setCv(e.target.files?.[0] || null)}
                aria-invalid={!!errors.cv}
              />
            </Field>

            <Field id="apply-link" text="Portfolio or LinkedIn (optional)">
              <input id="apply-link" type="url" inputMode="url" placeholder="https://" value={v.link} onChange={set('link')} className={field} />
            </Field>
            <Field id="apply-salary" text="Expected salary (optional)">
              <input id="apply-salary" type="text" value={v.salary} onChange={set('salary')} className={field} />
            </Field>
            <Field id="apply-note" text="A short note (optional)">
              <textarea id="apply-note" rows={3} maxLength={600} value={v.note} onChange={set('note')} className={`${field} resize-none`} />
            </Field>

            {/* spam trap: hidden from people */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="apply-trap">Leave this empty</label>
              <input id="apply-trap" type="text" tabIndex={-1} autoComplete="off" value={v.trap} onChange={set('trap')} />
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug text-[#4B3F37]">
                <input id="apply-consent" type="checkbox" checked={v.consent} onChange={set('consent')} className="mt-0.5 h-4 w-4 flex-none accent-[#5C6E0A]" />
                I agree that Space Maker may keep my details and CV to contact me about jobs.
              </label>
              {errors.consent && <p role="alert" className="mt-1.5 text-[13px] text-[#8A3B2A]">{errors.consent}</p>}
            </div>

            {status === 'failed' && (
              <p role="alert" className="rounded-xl bg-[#F2F5E9] px-4 py-3 text-[14px] leading-snug text-[#8A3B2A]">
                Sorry, we could not send that. Please try again, or{' '}
                <a href={mail} className="font-semibold underline underline-offset-4">email us instead</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative isolate inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border-[1.5px] border-[#2A1F1A] bg-[#2A1F1A] px-7 py-3.5 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5F0E6] transition-colors duration-300 hover:bg-[#C6DB3F] hover:text-[#2A1F1A] disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'sending' ? 'Sending…' : 'Submit application'}
            </button>
            <p className="pb-2 text-center text-[13px] text-[#6B5446]">
              Prefer email? <a href={mail} className="underline underline-offset-4">{HR.email}</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export function ApplyProvider({ children }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState({ open: false, position: '' });
  const lastFocus = useRef(null);

  const open = useCallback((position = '') => {
    lastFocus.current = document.activeElement;
    setState({ open: true, position });
  }, []);
  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    setTimeout(() => lastFocus.current?.focus?.({ preventScroll: true }), 50);
  }, []);

  useEffect(() => {
    if (!state.open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    window.__lenis?.stop?.();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.__lenis?.start?.();
      document.body.style.overflow = prev;
    };
  }, [state.open, close]);

  const value = useMemo(() => ({ open }), [open]);
  const isDesktop = typeof window !== 'undefined' && window.matchMedia?.('(min-width: 768px)').matches;
  const hidden = isDesktop ? { x: '100%' } : { y: '100%' };
  const shown = isDesktop ? { x: 0 } : { y: 0 };

  return (
    <ApplyCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {state.open && (
          <div className="fixed inset-0 z-[1000]" role="dialog" aria-modal="true" aria-labelledby="apply-title">
            <motion.div
              className="absolute inset-0 bg-[#2A1F1A]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              onClick={close}
            />
            <motion.div
              className="absolute bottom-0 right-0 flex h-[92svh] w-full flex-col overflow-hidden rounded-t-[24px] bg-[#FAF8F5] shadow-2xl md:top-0 md:h-full md:max-w-[520px] md:rounded-none md:rounded-l-[28px]"
              initial={reduce ? { opacity: 0 } : hidden}
              animate={reduce ? { opacity: 1 } : shown}
              exit={reduce ? { opacity: 0 } : hidden}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Panel initialPosition={state.position} onClose={close} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ApplyCtx.Provider>
  );
}
