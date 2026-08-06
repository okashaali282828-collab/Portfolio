import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, Loader2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function AIChatbot({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  // Initial Welcome Message in English
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: ` Hi! I'm ${
        data?.name || "Muhammad Okasha"
      }'s AI Assistant. Feel free to ask me anything about his skills, projects, experience, or contact details!`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);
  const chipsContainerRef = useRef(null);

  // Auto scroll to latest message inside chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Quick Suggested Questions in English
  const suggestionChips = [
    "What are his main skills?",
    "Tell me about his best projects",
    "How can I contact or hire him?",
    "What is his educational background?",
    "What is his experience level?",
  ];

  // Helper function to format **bold** text and markdown links nicely in JSX
  const formatResponseText = (text) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, lineIndex) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`bold-${match.index}`} className="font-bold text-white">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const formattedParts = parts.map((part) => {
        if (typeof part !== "string") return part;

        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const linkElements = [];
        let lLastIdx = 0;
        let lMatch;

        while ((lMatch = linkRegex.exec(part)) !== null) {
          if (lMatch.index > lLastIdx) {
            linkElements.push(part.substring(lLastIdx, lMatch.index));
          }
          linkElements.push(
            <a
              key={`link-${lMatch.index}`}
              href={lMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-medium underline hover:text-emerald-300 transition"
            >
              {lMatch[1]}
            </a>
          );
          lLastIdx = linkRegex.lastIndex;
        }

        if (lLastIdx < part.length) {
          linkElements.push(part.substring(lLastIdx));
        }

        return linkElements.length > 0 ? linkElements : part;
      });

      return (
        <React.Fragment key={lineIndex}>
          {formattedParts}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // Scroll function for Suggestion Chips
  const scrollChips = (direction) => {
    if (chipsContainerRef.current) {
      const scrollAmount = direction === "left" ? -180 : 180;
      chipsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Portfolio Data Formatted
  const portfolioDataFormatted = JSON.stringify(
    {
      name: data?.name || "Muhammad Okasha",
      role: data?.role || "Web Developer & Designer",
      about: data?.about || "Passionate Full-Stack Developer creating high quality web applications.",
      skills: data?.skills || ["React", "JavaScript", "Tailwind CSS", "Node.js", "Git"],
      projects: data?.projects || [],
      experience: data?.experience || [],
      education: data?.education || [],
      contact: {
        email: data?.contact?.email || data?.social?.email || "N/A",
        phone: data?.contact?.phone || "N/A",
        github: data?.social?.github || "N/A",
        linkedin: data?.social?.linkedin || "N/A",
      },
    },
    null,
    2
  );

  // System Instruction forcing strict English responses
  const systemInstruction = `
You are the personal AI Assistant for ${data?.name || "Muhammad Okasha"}.

STRICT LANGUAGE RULE:
- ALWAYS respond in professional, friendly, and clear ENGLISH.
- Even if the user types in Urdu, Hindi, or any other language, answer strictly in English.

ALL AVAILABLE PORTFOLIO DATA:
${portfolioDataFormatted}

RESPONSE GUIDELINES:
1. Keep answers concise, direct, and well-structured using bullet points where necessary.
2. Highlight important details using **bold text**.
3. Only rely on the provided portfolio data. Do not fabricate information.
4. If a question is outside the portfolio context, politely reply in English: "I'm ${data?.name || "Muhammad Okasha"}'s portfolio assistant, so I can only answer questions related to his professional background, skills, and projects."
`;

  const handleSend = async (customMessage = null) => {
    const userMessage = (typeof customMessage === "string" ? customMessage : input).trim();

    if (!userMessage || isLoading) return;

    if (typeof customMessage !== "string") {
      setInput("");
    }

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        text: userMessage,
      },
    ];

    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const contents = updatedMessages
        .filter((msg) => msg.role === "user" || msg.role === "model")
        .map((msg) => ({
          role: msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.text }],
        }));

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      let response;

      if (apiKey) {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemInstruction }],
              },
              contents: contents,
            }),
          }
        );
      } else {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction,
            contents,
          }),
        });
      }

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData?.error?.message || `Server error: ${response.status}`);
      }

      const botReply =
        resData?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process that request right now.";

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: botReply,
        },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Oops! Something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* CHAT TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-neutral-950 text-white px-5 py-3.5 rounded-full shadow-2xl border border-neutral-700 hover:border-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer font-bold text-xs uppercase tracking-widest group"
        >
          <div className="relative">
            <Bot size={18} className="text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="hidden sm:inline tracking-wider">Ask AI Assistant</span>
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* HEADER */}
          <div className="bg-neutral-900/90 backdrop-blur-md p-3.5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold shadow">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-wider uppercase text-white flex items-center gap-1.5">
                  {data?.name || "Okasha"}'s AI <Sparkles size={12} className="text-amber-400" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Responds instantly
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 transition cursor-pointer rounded-lg hover:bg-neutral-800"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          {/* MAIN CHAT MESSAGES CONTAINER */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs leading-relaxed">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 max-w-[88%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                    msg.role === "user"
                      ? "bg-neutral-700 text-white"
                      : "bg-white text-black font-bold shadow"
                  }`}
                >
                  {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                </div>

                {/* Formatted Text Box */}
                <div
                  className={`p-3 rounded-2xl leading-relaxed ${
                    msg.role === "user"
                      ? "bg-white text-black font-medium rounded-br-xs"
                      : "bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-xs shadow-sm"
                  }`}
                >
                  {formatResponseText(msg.text)}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-400 text-[11px] p-2 bg-neutral-900/50 border border-neutral-800/80 w-28 rounded-xl">
                <Loader2 size={13} className="animate-spin text-white" />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* SUGGESTION CHIPS CONTAINER */}
          <div className="relative w-full bg-neutral-950 border-t border-neutral-900 px-2 py-2 flex items-center min-w-0 shrink-0">
            <button
              onClick={() => scrollChips("left")}
              className="p-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition mr-1 cursor-pointer shrink-0 z-10"
              aria-label="Scroll suggestions left"
            >
              <ChevronLeft size={14} />
            </button>

            <div
              ref={chipsContainerRef}
              onWheel={(e) => {
                if (e.deltaY !== 0) {
                  chipsContainerRef.current.scrollLeft += e.deltaY;
                }
              }}
              className="flex-1 flex gap-2 overflow-x-auto scroll-smooth whitespace-nowrap min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {suggestionChips.map((chip, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSend(chip)}
                  className="whitespace-nowrap bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-[10px] text-neutral-300 hover:text-white px-3 py-1.5 rounded-full transition cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollChips("right")}
              className="p-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition ml-1 cursor-pointer shrink-0 z-10"
              aria-label="Scroll suggestions right"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, experience..."
              className="flex-1 bg-neutral-950 text-xs text-white px-3.5 py-2.5 rounded-xl border border-neutral-800 focus:outline-none focus:border-neutral-600 transition placeholder:text-neutral-500"
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-white text-black p-2.5 rounded-xl hover:bg-neutral-200 disabled:opacity-40 transition cursor-pointer"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </button>
          </form>

        </div>
      )}
    </div>
  );
}