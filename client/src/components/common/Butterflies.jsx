import React from 'react';

/**
 * Three small butterflies drifting across the viewport.
 * - Only `transform` is animated (CSS keyframes in styles/index.css), so it runs on the GPU
 *   and never triggers layout or React re-renders.
 * - Fixed + pointer-events-none: never blocks scrolling or clicks.
 * - Hidden for prefers-reduced-motion users.
 */
const FLIES = [
  { id: 'a', path: 'bf-path-a', duration: 38, delay: 2,  size: 30, wing: '#C6F00C', body: '#1B4332' },
  { id: 'b', path: 'bf-path-b', duration: 46, delay: 10, size: 24, wing: '#F59E0B', body: '#1B4332' },
  { id: 'c', path: 'bf-path-a', duration: 54, delay: 24, size: 20, wing: '#60A5FA', body: '#111827' },
];

function Butterfly({ size, wing, body }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <g className="bf-wings">
        <path d="M20 19C14 6 3 6 4 15c1 6 8 8 16 4z" fill={wing} fillOpacity="0.9" />
        <path d="M20 21c-8-3-14 0-12 7 2 6 10 4 12-7z" fill={wing} fillOpacity="0.7" />
        <path d="M20 19C26 6 37 6 36 15c-1 6-8 8-16 4z" fill={wing} fillOpacity="0.9" />
        <path d="M20 21c8-3 14 0 12 7-2 6-10 4-12-7z" fill={wing} fillOpacity="0.7" />
      </g>
      <rect x="19" y="12" width="2" height="18" rx="1" fill={body} />
    </svg>
  );
}

export default function Butterflies() {
  return (
    <div aria-hidden="true" className="bf-layer fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {FLIES.map((f) => (
        <div
          key={f.id + f.delay}
          className="bf"
          style={{
            animation: `${f.path} ${f.duration}s linear ${f.delay}s infinite`,
            opacity: 0.85,
          }}
        >
          <Butterfly size={f.size} wing={f.wing} body={f.body} />
        </div>
      ))}
    </div>
  );
}
