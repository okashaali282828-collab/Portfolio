import React from "react";
import { PenTool, Code2, Wrench } from "lucide-react";

// Icons ka map object
const ICONS = {
  PenTool,
  Code2,
  Wrench,
};

const About = ({ data }) => {
  return (
    <section id="about" className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-16 text-center">
      {/* Bordered Heading Box */}
      <div className="flex justify-center mb-6">
        <h2 className="border-2 sm:border-4 border-black px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg md:text-xl font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase text-black">
          About Me
        </h2>
      </div>

      {/* Intro / Bio Text (Optional display if present in data) */}
      {(data?.intro || data?.bio) && (
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-700 font-medium mb-6 leading-relaxed">
          {data?.intro || data?.bio}
        </p>
      )}

      {/* Custom Divider (—— \\//\\// ——) */}
      <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14 select-none">
        <span className="w-12 sm:w-16 h-[3px] bg-black"></span>
        <span className="font-extrabold text-sm sm:text-base tracking-tighter text-black">
          \\//\\//
        </span>
        <span className="w-12 sm:w-16 h-[3px] bg-black"></span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-left">
        {data?.cards?.map(({ icon, title, text }) => {
          const Icon = ICONS[icon] || PenTool;

          return (
            <div
              key={title}
              className="group p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1"
            >
              <Icon
                size={22}
                className="mb-3 text-neutral-400 transition-all duration-300 group-hover:text-black group-hover:scale-110"
              />
              <h4 className="font-bold tracking-widest text-sm mb-2">{title}</h4>
              <p className="text-sm text-neutral-500 leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;