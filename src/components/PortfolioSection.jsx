import React, { useState, useRef } from "react";

export default function PortfolioSection({ data }) {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const projects = data?.projects || [];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Scroll to specific index
  const scrollToProject = (index) => {
    if (sliderRef.current && sliderRef.current.children[index]) {
      const targetElement = sliderRef.current.children[index];
      sliderRef.current.scrollTo({
        left: targetElement.offsetLeft - 16,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // Track active slide on scroll
  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, children } = sliderRef.current;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.offsetLeft + child.offsetWidth / 2 > scrollLeft) {
          setActiveIndex(i);
          break;
        }
      }
    }
  };

  const scroll = (direction) => {
    if (direction === "left") {
      const nextIndex = Math.max(0, activeIndex - 1);
      scrollToProject(nextIndex);
    } else {
      const nextIndex = Math.min(filteredProjects.length - 1, activeIndex + 1);
      scrollToProject(nextIndex);
    }
  };

  return (
    <section id="portfolio" className="relative bg-black text-white py-12 sm:py-16 overflow-hidden">
      
      {/* Background Banner */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-12 px-4 text-center min-h-[200px] flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${data?.bgUrl || ""})` }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" />

        <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
          {/* Section Title */}
          <div className="inline-block border-2 border-white px-6 py-2 mb-6 shadow-md">
            <h2 className="text-lg sm:text-2xl font-black tracking-[0.35em] text-white uppercase">
              PORTFOLIO
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto max-w-full pb-1">
            {["all", "coded", "designed"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setActiveIndex(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  filter === f
                    ? "bg-white text-black scale-105 shadow-md font-black"
                    : "bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Touch Slider Container */}
      <div className="relative max-w-7xl mx-auto pt-8 px-4 sm:px-8">
        
        {/* Modern Floating Glassmorphism Arrow Buttons */}
        {activeIndex > 0 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 sm:left-4 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-950/80 border border-neutral-700/80 text-white backdrop-blur-xl flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl cursor-pointer group"
            aria-label="Previous Slide"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {activeIndex < filteredProjects.length - 1 && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 sm:right-4 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-950/80 border border-neutral-700/80 text-white backdrop-blur-xl flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl cursor-pointer group"
            aria-label="Next Slide"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* 16:9 Carousel Cards */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {filteredProjects.map((p, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[85vw] sm:w-[380px] aspect-[16/9] relative group rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 flex flex-col justify-end shadow-2xl transition-transform duration-300"
            >
              {/* Project Cover Image */}
              <div className="absolute inset-0 w-full h-full bg-neutral-900">
                <img
                  src={p.imgUrl}
                  alt={p.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="relative z-10 p-3.5 sm:p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs sm:text-sm font-black uppercase text-white tracking-wide truncate max-w-[70%]">
                    {p.title}
                  </h3>
                  {p.tags && (
                    <span className="text-[8px] sm:text-[9px] font-bold text-neutral-300 tracking-wider uppercase bg-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                      {p.tags}
                    </span>
                  )}
                </div>

                {p.desc && (
                  <p className="text-[10px] sm:text-xs text-neutral-400 line-clamp-1 mb-2 leading-tight">
                    {p.desc}
                  </p>
                )}

                {/* Horizontal Action Links */}
                <div className="flex items-center gap-2 pt-0.5">
                  {p.demoUrl && p.demoUrl !== "#" && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white text-black text-[10px] font-extrabold py-1.5 rounded-md hover:bg-neutral-200 transition uppercase"
                    >
                      LIVE DEMO
                    </a>
                  )}
                  {p.moreUrl && (
                    <a
                      href={p.moreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-neutral-900/90 border border-neutral-700 text-white text-[10px] font-bold py-1.5 rounded-md hover:bg-neutral-800 transition uppercase"
                    >
                      GITHUB
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sleek Minimal Controller: Dash Progress + Number Counter */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className="text-xs font-mono text-neutral-400 font-bold">
            0{activeIndex + 1}
          </span>

          <div className="flex items-center gap-1.5">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToProject(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-8 bg-white"
                    : "w-2 bg-neutral-800 hover:bg-neutral-600"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-mono text-neutral-600 font-bold">
            0{filteredProjects.length}
          </span>
        </div>
      </div>

      {/* Footer Subtext */}
      <p className="text-center pt-6 text-xs tracking-[0.2em] text-neutral-500 uppercase font-medium">
        And many more to come!
      </p>
    </section>
  );
}