import React from "react";

export default function Banner({ data }) {
  return (
    <section className="w-full bg-black text-white px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {data?.title && (
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wider sm:tracking-[0.2em] mb-3 sm:mb-4 break-words">
            {data.title}
          </h3>
        )}
        <p className="text-neutral-400 text-xs sm:text-sm md:text-base max-w-full md:max-w-2xl lg:max-w-3xl leading-relaxed mb-5 sm:mb-6">
          {data.text}
        </p>
        <button className="text-xs sm:text-sm tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity cursor-pointer">
          READ MORE
        </button>
      </div>
    </section>
  );
}