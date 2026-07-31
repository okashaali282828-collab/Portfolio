import React from "react";
import { Facebook, Linkedin, Instagram, Mail, ChevronUp } from "lucide-react";

export default function Footer({ name, year }) {
  const footerIcons = [
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/okasha57437",
      title: "Facebook"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/muhammad-okasha28/",
      title: "LinkedIn"
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/me_okasha/?hl=en",
      title: "Instagram"
    },
    { 
      icon: Mail, 
      // Direct Gmail Web composer (Works on Desktop & Mobile without app dependency)
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=okashalinkedin@gmail.com",
      title: "Email Me"
    },
  ];

  return (
    <footer className="bg-black text-white text-center py-10 px-6">
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex flex-col items-center gap-1 mx-auto mb-6 text-xs tracking-widest text-neutral-300 hover:text-white transition cursor-pointer"
      >
        <ChevronUp size={16} />
        BACK TO TOP
      </button>

      {/* Social & Mail Icons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {footerIcons.map(({ icon: Icon, href, title }, i) => (
          <a
            key={i}
            href={href}
            title={title}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded bg-white/10 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      {/* Copyright Line */}
      <p className="text-xs text-neutral-500">
        @{year || new Date().getFullYear()} {name || "Muhammad Okasha"}. All Rights Reserved.
      </p>
    </footer>
  );
}