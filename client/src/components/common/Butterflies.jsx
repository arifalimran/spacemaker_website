import React from "react";

export default function Butterflies() {
  return (
    <>
      <div className="butterfly-gpu-1">
        <svg viewBox="0 0 64 64" className="w-9 h-9 wings-flutter drop-shadow-md">
          <ellipse cx="32" cy="32" rx="2.5" ry="12" fill="#111827" />
          <path d="M32 26 C22 10 6 16 10 28 C12 36 24 34 32 30 Z" fill="#2D6A4F" />
          <path d="M14 22 C18 16 26 18 30 25 C26 27 18 28 14 22 Z" fill="#C6F00C" opacity="0.85" />
          <path d="M32 30 C24 34 14 42 16 50 C18 56 28 50 32 36 Z" fill="#C5A880" />
          <path d="M32 26 C42 10 58 16 54 28 C52 36 40 34 32 30 Z" fill="#2D6A4F" />
          <path d="M50 22 C46 16 38 18 34 25 C38 27 46 28 50 22 Z" fill="#C6F00C" opacity="0.85" />
          <path d="M32 30 C40 34 50 42 48 50 C46 56 36 50 32 36 Z" fill="#C5A880" />
        </svg>
      </div>

      <div className="butterfly-gpu-2">
        <svg viewBox="0 0 64 64" className="w-8 h-8 wings-flutter drop-shadow-md">
          <ellipse cx="32" cy="32" rx="2" ry="10" fill="#111827" />
          <path d="M32 26 C22 12 8 18 12 30 C14 36 24 34 32 30 Z" fill="#F59E0B" />
          <path d="M15 24 C19 18 27 20 30 26 C26 28 19 29 15 24 Z" fill="#38BDF8" opacity="0.9" />
          <path d="M32 30 C24 34 15 42 17 48 C19 54 27 48 32 36 Z" fill="#EA580C" />
          <path d="M32 26 C42 12 56 18 52 30 C50 36 40 34 32 30 Z" fill="#F59E0B" />
          <path d="M49 24 C45 18 37 20 34 26 C38 28 45 29 49 24 Z" fill="#38BDF8" opacity="0.9" />
          <path d="M32 30 C40 34 49 42 47 48 C45 54 37 48 32 36 Z" fill="#EA580C" />
        </svg>
      </div>
    </>
  );
}
