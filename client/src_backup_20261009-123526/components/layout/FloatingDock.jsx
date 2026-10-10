import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { contactContent } from "../../data/siteContent";

export default function FloatingDock() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-neutral-300 p-2 rounded-2xl shadow-2xl">
      <a 
        href={contactContent.whatsappUrl} 
        target="_blank" 
        rel="noreferrer"
        className="w-11 h-11 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white flex items-center justify-center transition shadow-sm"
        title="Direct WhatsApp"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a 
        href={contactContent.messengerUrl || "https://m.me/spacemakerbd"} 
        target="_blank" 
        rel="noreferrer"
        className="w-11 h-11 rounded-xl bg-[#0084FF] hover:bg-blue-600 text-white flex items-center justify-center transition shadow-sm"
        title="Direct Messenger"
      >
        <MessageSquare className="w-5 h-5" />
      </a>
    </div>
  );
}
