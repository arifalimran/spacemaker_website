import React from 'react';

/**
 * Inline Banyan Tree emblem. Pure SVG — always renders, no asset path needed.
 * Uses currentColor so it can be tinted by the parent (navbar mark or giant watermark).
 */
export default function BanyanMark({ className = '', title = 'Space Maker banyan tree' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Canopy */}
      <path
        d="M14 54c-4-14 6-26 19-24 4-12 20-18 32-10 10-6 26 0 28 14 12 2 18 16 11 26-4 6-12 8-18 6-6 6-16 6-22 2-6 4-16 4-22-1-8 4-22 0-28-13z"
        fill="currentColor"
        fillOpacity="0.14"
        strokeWidth="2.5"
      />
      {/* Trunk */}
      <path d="M54 62c1 14-2 26-8 40M66 62c-1 14 2 26 8 40M54 62c3 10 9 10 12 0" strokeWidth="3" />
      {/* Aerial roots */}
      <path d="M32 58v26M42 62v30M78 62v30M88 58v26" strokeWidth="2" />
      {/* Ground roots */}
      <path d="M46 102c-8 4-18 4-28 4M74 102c8 4 18 4 28 4M60 104v8" strokeWidth="2.5" />
    </svg>
  );
}
