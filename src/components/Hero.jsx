import React from "react";
import { AtSign, Github, Linkedin, Download } from "lucide-react";
import Navbar from "./Navbar.jsx";

export default function Hero({ data, onNavigate }) {
  // Safe Email Extraction (Checks both social and contact objects)
  const rawEmail = data?.social?.email || data?.contact?.email || "okashaali282828@gmail.com";
  const cleanEmail = rawEmail.replace(/^mailto:/, "").trim();

  // Web Gmail Link (Works everywhere without requiring Mail apps)
  const emailHref = cleanEmail 
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${cleanEmail}`
    : "#";

  // Single unified array for ALL icons (Socials + CV)
  const allIcons = [
    {
      icon: AtSign,
      href: emailHref,
      title: "Email Me",
      isExternal: true, // Opens Gmail in a new tab
    },
    {
      icon: Github,
      href: data?.social?.github || "#",
      title: "GitHub",
      isExternal: true,
    },
    {
      icon: Linkedin,
      href: data?.social?.linkedin || "#",
      title: "LinkedIn",
      isExternal: true,
    },
    {
      icon: Download,
      href: "/Muhammad_Okasha_CV.pdf",
      title: "Download CV",
      download: "Muhammad_Okasha_CV.pdf",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Global Floating Navbar */}
      <Navbar items={data.nav} onNavigate={onNavigate} />

      {/* ================= DESKTOP & TABLET VIEW ================= */}
      <div className="hidden md:flex flex-col relative w-full min-h-screen h-screen bg-[#e7e7e5]">
        {/* Diagonal Black Background */}
        <div
          className="absolute inset-0 bg-black z-0"
          style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 60% 100%)" }}
        />

        {/* Desktop Content */}
        <div className="relative z-20 flex-1 flex items-center max-w-7xl w-full mx-auto px-8 lg:px-12 pt-16">
          <div className="max-w-md lg:max-w-lg">
            <p className="text-sm md:text-base text-neutral-600 mb-2 font-medium">
              Hi, I am
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight tracking-tight text-neutral-900">
              {data.name}
            </h1>
            <p className="text-base md:text-lg text-neutral-500 mb-6 font-medium">
              {data.role}
            </p>

            {/* Icons Row (Identical Styling for Email, GitHub, LinkedIn, CV) */}
            <div className="flex items-center gap-3">
              {allIcons.map(({ icon: Icon, href, title, isExternal, download }, i) => (
                <a
                  key={i}
                  href={href}
                  title={title}
                  download={download || undefined}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 flex items-center justify-center rounded bg-neutral-200 text-neutral-800 hover:bg-black hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Image */}
        <img
          src={data.photoUrl}
          alt={data.name}
          className="absolute z-10 right-4 lg:right-16 xl:right-24 bottom-0 h-[75vh] lg:h-[85vh] max-h-[750px] object-contain drop-shadow-2xl pointer-events-none"
        />
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden relative min-h-[100dvh] h-[100dvh] bg-black overflow-hidden flex flex-col justify-end pt-20">
        {/* Mobile Background Image */}
        <img
          src={data.photoUrl}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Overlay Panel */}
        <div
          className="absolute inset-0 z-10 bg-neutral-900/80 backdrop-blur-[2px]"
          style={{ clipPath: "polygon(0 55%, 100% 40%, 100% 100%, 0 100%)" }}
        />

        {/* Mobile Content */}
        <div className="relative z-20 p-6 w-full pb-8">
          <div className="flex items-end justify-between">
            {/* Left Info */}
            <div className="text-white max-w-[70%]">
              <p className="text-xs text-neutral-300 mb-1 font-medium">Hi, I am</p>
              <h1 className="text-2xl font-extrabold leading-tight">{data.name}</h1>
              <p className="text-xs text-neutral-300 mt-1">{data.role}</p>
            </div>

            {/* Right Icons Column (Identical Styling on Mobile) */}
            <div className="flex flex-col gap-2.5">
              {allIcons.map(({ icon: Icon, href, title, isExternal, download }, i) => (
                <a
                  key={i}
                  href={href}
                  title={title}
                  download={download || undefined}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-black shadow active:scale-95 transition-all cursor-pointer"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}