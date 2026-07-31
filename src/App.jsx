import React from "react";
import DATA from "./data.js";
import Hero from "./components/Hero.jsx";
import Banner from "./components/Banner.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import PortfolioSection from "./components/PortfolioSection.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Reveal from "./components/Reveal.jsx";
import AIChatbot from "./components/AIChatbot.jsx";

export default function App() {
  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans">
      <Hero data={DATA} onNavigate={scrollToId} />
      
      <Reveal>
        <Banner data={DATA.banner} />
      </Reveal>
      
      <Reveal>
        <About data={DATA.about} />
      </Reveal>
      
      <Reveal>
        <Skills data={DATA.skills} />
      </Reveal>
      
      <Reveal>
        <PortfolioSection data={DATA.portfolio} />
      </Reveal>
      
      <Reveal>
        <Contact data={DATA.contact} />
      </Reveal>
      
      <Footer name={DATA.name} year={DATA.footer?.year} />

      {/* Floating AI Chatbot Assistant */}
      <AIChatbot data={DATA} />
    </div>
  );
}