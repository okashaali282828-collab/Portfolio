import React, { useState, useEffect } from "react";

export default function Navbar({ items = [], onNavigate, dark = true }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ID formatting function (About me -> about)
  const getTargetId = (item) => {
    const cleanId = item.toLowerCase().replace(/\s/g, "");
    return cleanId === "aboutme" ? "about" : cleanId;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 sm:py-4 px-2 sm:px-6 md:px-12">
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled
            ? "w-[96%] max-w-5xl bg-black/80 backdrop-blur-md text-white border border-white/15 shadow-2xl rounded-full px-3 sm:px-6 py-2"
            : "w-full bg-transparent px-2 sm:px-4 py-1"
        }`}
      >
        {/* ONLY TEXT NAME - NO LOGO IMAGE ON ANY SCREEN */}
        <span
          onClick={() => onNavigate && onNavigate("hero")}
          className={`text-[10px] sm:text-sm md:text-base font-extrabold tracking-wider cursor-pointer transition-all duration-300 hover:opacity-80 select-none whitespace-nowrap shrink-0 ${
            scrolled ? "text-white" : dark ? "text-white" : "text-black"
          }`}
        >
          MUHAMMAD OKASHA
        </span>

        {/* ALWAYS DESKTOP HORIZONTAL LAYOUT ON ALL SCREENS */}
        <div className="flex items-center gap-1.5 sm:gap-4 md:gap-8 text-[9px] sm:text-xs md:text-sm font-medium">
          {items?.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate && onNavigate(getTargetId(item))}
              className={`relative group transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                scrolled
                  ? "text-white/90 hover:text-white"
                  : dark
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {item}
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          {/* CONTACT BUTTON */}
          <button
            onClick={() => onNavigate && onNavigate("contact")}
            className="bg-white text-black rounded-full px-2.5 sm:px-4 py-1 text-[9px] sm:text-xs md:text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            CONTACT ME
          </button>
        </div>
      </nav>
    </header>
  );
}