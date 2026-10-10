import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { brand, waLink } from '../../data/siteContent';

export default function FloatingDock() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl bg-white/90 backdrop-blur-md border border-[#1B4332]/10 p-2 shadow-xl">
      <a
        href={brand.messengerUrl}
        target="_blank"
        rel="noreferrer"
        title="Message on Facebook"
        aria-label="Message on Facebook Messenger"
        className="w-11 h-11 rounded-xl bg-[#0866FF] hover:bg-[#0654d6] text-white grid place-items-center transition"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
      <a
        href={waLink('Hello Space Maker, I would like to discuss a flat purchase.')}
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-[#1fb857] text-white grid place-items-center transition"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
