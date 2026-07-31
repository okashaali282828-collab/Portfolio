import React from "react";

function SkillGroup({ label, items }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <p className="text-xs tracking-widest font-bold mb-4 text-neutral-800 uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-4 sm:gap-6 mb-10">
        {items.map((item) => {
          const name = typeof item === "string" ? item : item.name;
          const icon = typeof item === "object" ? item.icon : null;

          return (
            <div
              key={name}
              className="group w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center p-3 bg-white border-2 border-neutral-300 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:bg-black hover:border-black hover:-translate-y-1.5 hover:shadow-xl select-none"
            >
              {/* Logo / Icon */}
              {icon ? (
                typeof icon === "string" ? (
                  <img
                    src={icon}
                    alt={name}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain mb-2 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                  />
                ) : (
                  <div className="text-xl sm:text-2xl mb-2 text-neutral-800 transition-colors duration-300 group-hover:text-white">
                    {icon}
                  </div>
                )
              ) : (
                /* Fallback Icon */
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mb-2 font-bold text-xs text-neutral-700 transition-colors duration-300 group-hover:bg-neutral-800 group-hover:text-white">
                  {name.charAt(0)}
                </div>
              )}

              {/* Skill Name */}
              <span className="text-[11px] sm:text-xs font-bold text-center text-neutral-800 tracking-wide transition-colors duration-300 group-hover:text-white leading-tight">
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function Skills({ data }) {
  // Support both data.skills structure & direct properties
  const skillsData = data?.skills || data || {};

  return (
    <section id="skills" className="bg-[#f7f7f5] px-6 md:px-12 py-16 text-center">
      {/* 1. Bold Box Title */}
      <div className="flex justify-center mb-6">
        <div className="inline-block border-[4px] border-black px-8 py-2">
          <h2 className="text-xl sm:text-2xl font-black tracking-[0.35em] text-black uppercase">
            SKILLS
          </h2>
        </div>
      </div>

      {/* 2. Custom Divider (—— \\//\\// ——) */}
      <div className="flex items-center justify-center gap-3 mb-12 select-none">
        <span className="w-12 sm:w-16 h-[3px] bg-black"></span>
        <span className="font-extrabold text-sm sm:text-base tracking-tighter text-black">
          \\//\\//
        </span>
        <span className="w-12 sm:w-16 h-[3px] bg-black"></span>
      </div>

      {/* Skills Groups */}
      <div className="max-w-3xl mx-auto text-left">
        <SkillGroup label="USING NOW:" items={skillsData.usingNow} />
        <SkillGroup label="LEARNING:" items={skillsData.learning} />
        <SkillGroup label="OTHER SKILLS:" items={skillsData.other} />
      </div>
    </section>
  );
}