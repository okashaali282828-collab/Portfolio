import React, { useState } from "react";

export default function Contact({ data }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Apni form submission logic yahan add karein (e.g. EmailJS / Formspree)
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#e4e4e2] px-6 md:px-12 py-16 text-center">
      {/* 1. Title with Box Border */}
      <div className="inline-block border-[4px] border-black px-8 py-2 mb-8">
        <h2 className="text-xl sm:text-2xl font-black tracking-[0.35em] text-black uppercase">
          CONTACT
        </h2>
      </div>

      {/* Description Text */}
      <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-700 font-medium mb-6 leading-relaxed">
        {data?.text ||
          "Got a project in mind or just want to say hi? Fill out the form below, and I'll get back to you as soon as possible!"}
      </p>

      {/* 2. Custom Divider (—— \\// ——) */}
      <div className="flex items-center justify-center gap-3 mb-12 select-none">
        <span className="w-12 sm:w-16 h-[3px] bg-black"></span>
        <span className="font-extrabold text-sm tracking-tighter text-black">
          \\//\\//
        </span>
        <span className="w-12 sm:w-16 h-[3px] bg-black"></span>
      </div>

      {submitted ? (
        <div className="max-w-md mx-auto p-6 bg-black text-white font-bold tracking-widest text-xs sm:text-sm">
          THANKS — YOUR MESSAGE HAS BEEN SENT!
        </div>
      ) : (
        <form
          className="max-w-md md:max-w-lg mx-auto text-left flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          {/* Name Input - L Shaped Border (Left + Bottom) */}
          <input
            type="text"
            placeholder="ENTER YOUR NAME*"
            className="w-full bg-transparent border-l-[3.5px] border-b-[3.5px] border-black border-t-0 border-r-0 pl-3 pb-2 text-xs font-bold tracking-widest placeholder:text-neutral-500 placeholder:font-bold focus:outline-none transition-colors"
            required
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL*"
            className="w-full bg-transparent border-l-[3.5px] border-b-[3.5px] border-black border-t-0 border-r-0 pl-3 pb-2 text-xs font-bold tracking-widest placeholder:text-neutral-500 placeholder:font-bold focus:outline-none transition-colors"
            required
          />

          {/* Phone Input */}
          <input
            type="tel"
            placeholder="PHONE NUMBER"
            className="w-full bg-transparent border-l-[3.5px] border-b-[3.5px] border-black border-t-0 border-r-0 pl-3 pb-2 text-xs font-bold tracking-widest placeholder:text-neutral-500 placeholder:font-bold focus:outline-none transition-colors"
          />

          {/* Message Textarea */}
          <textarea
            placeholder="YOUR MESSAGE*"
            rows={5}
            className="w-full bg-transparent border-l-[3.5px] border-b-[3.5px] border-black border-t-0 border-r-0 pl-3 pt-1 pb-2 text-xs font-bold tracking-widest placeholder:text-neutral-500 placeholder:font-bold focus:outline-none resize-none transition-colors"
            required
          />

          {/* Submit Button with Left & Right Vertical Borders */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="border-x-[3px] border-black px-8 py-1.5 text-xs font-black tracking-[0.25em] text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer uppercase"
            >
              SUBMIT
            </button>
          </div>
        </form>
      )}
    </section>
  );
}