import React, { useState } from "react";

export default function PortfolioSection({ data }) {
  const [filter, setFilter] = useState("all");

  const projects = data?.projects || [];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative bg-black text-white">
      {/* Background Banner with Header & Filters */}
      <div
        className="relative bg-cover bg-center py-16 px-6 md:px-12 text-center"
        style={{ backgroundImage: `url(${data?.bgUrl || ""})` }}
      >
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Bold Box Title with clean spacing below */}
          <div className="inline-block border-[4px] border-white px-8 py-2 mb-10">
            <h2 className="text-xl sm:text-2xl font-black tracking-[0.35em] text-white uppercase">
              PORTFOLIO
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-bold tracking-[0.2em]">
            {["all", "coded", "designed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`pb-1 border-b-2 transition-all duration-300 uppercase cursor-pointer ${
                  filter === f
                    ? "border-white text-white scale-105 font-black"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredProjects.map((p, i) => (
          <div
            key={i}
            className="relative group aspect-square overflow-hidden bg-neutral-900 border border-neutral-800"
          >
            {/* Project Cover Image */}
            <img
              src={p.imgUrl}
              alt={p.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Hover Details Overlay */}
            <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-center p-6">
              {p.tags && (
                <p className="text-xs italic text-neutral-400 mb-2 tracking-widest uppercase">
                  {p.tags}
                </p>
              )}
              <h3 className="text-lg font-black uppercase mb-2 text-white tracking-wide">
                {p.title}
              </h3>
              {p.desc && (
                <p className="text-xs text-neutral-300 mb-6 leading-relaxed max-w-xs">
                  {p.desc}
                </p>
              )}

              {/* Action Links */}
              <div className="flex items-center gap-5 text-xs font-bold tracking-widest">
                {p.demoUrl && p.demoUrl !== "#" && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b-2 border-white pb-0.5 hover:text-neutral-400 hover:border-neutral-400 transition uppercase"
                  >
                    VISIT SITE
                  </a>
                )}
                {p.moreUrl && (
                  <a
                    href={p.moreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b-2 border-white pb-0.5 hover:text-neutral-400 hover:border-neutral-400 transition uppercase"
                  >
                    GITHUB
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Subtext */}
      <p className="text-center py-10 text-xs sm:text-sm tracking-[0.25em] text-neutral-400 uppercase font-medium">
        And many more to come!
      </p>
    </section>
  );
}