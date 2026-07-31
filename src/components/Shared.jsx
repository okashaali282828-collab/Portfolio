import React from "react";

export function SectionTitle({ children, light = false }) {
  return (
    <div
      className={`inline-block border-2 px-6 py-3 mb-6 ${
        light ? "border-white" : "border-black"
      }`}
    >
      <h2 className="text-lg md:text-xl font-bold tracking-[0.25em]">
        {children}
      </h2>
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 text-neutral-400 my-6 select-none">
      <span className="h-px w-10 bg-neutral-400" />
      <span className="text-xs tracking-widest">\/\/\/</span>
      <span className="h-px w-10 bg-neutral-400" />
    </div>
  );
}
