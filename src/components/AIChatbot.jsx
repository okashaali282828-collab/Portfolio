import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, Loader2 } from "lucide-react";


export default function AIChatbot({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: `Hi! I'm ${data?.name || "Okasha"}'s AI Assistant. Ask me anything about his skills, CV, or projects!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const systemInstruction = `
You are the personal AI Assistant for ${data?.name || "Muhammad Okasha"}.
Answer questions based ONLY on his portfolio data:
- Name: ${data?.name || "Muhammad Okasha"}
- Role: ${data?.role || "Web Developer & Designer"}
- Contact: ${data?.contact?.email || data?.social?.email || "N/A"}
- GitHub: ${data?.social?.github || "N/A"}
- LinkedIn: ${data?.social?.linkedin || "N/A"}

Keep responses brief, polite, and helpful.
`;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const updatedMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const contents = [
        {
          role: "user",
          parts: [{ text: systemInstruction }],
        },
        ...updatedMessages.map((msg) => ({
          role: msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.text }],
        })),
      ];

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      let response;

      // Localhost vs Production (Vercel) Handler
      if (apiKey) {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
          }
        );
      } else {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        });
      }

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Quota exceeded. Please wait a minute.");
        }
        throw new Error(resData?.error?.message || `Server error: ${response.status}`);
      }

      const botReply =
        resData?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that request right now.";

      setMessages((prev) => [...prev, { role: "model", text: botReply }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: error.message.includes("Quota") 
            ? "Please try again later."
            : "Oops! Something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
    onClick={() => setIsOpen(true)}
    className="flex items-center justify-center gap-2.5 bg-black text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl border border-neutral-700 hover:border-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer font-bold text-xs uppercase tracking-widest"
  >
    <Bot size={20} className="text-white" />
    {/* Mobile par hide ho jayega, Desktop par dikhega */}
    <span className="hidden sm:inline">Ask AI Assistant</span>
  </button>
      )}

      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-black p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wider uppercase">
                  {data?.name || "Okasha"}'s AI
                </h3>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs leading-relaxed">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.role === "user"
                      ? "bg-neutral-700 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div
                  className={`p-3 rounded-xl whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-white text-black font-medium"
                      : "bg-neutral-800 text-neutral-200 border border-neutral-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs italic p-2">
                <Loader2 size={14} className="animate-spin text-white" />
                Thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="p-3 bg-black border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, experience..."
              className="flex-1 bg-neutral-900 text-xs text-white px-3 py-2.5 rounded-lg border border-neutral-700 focus:outline-none focus:border-white transition placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-white text-black p-2.5 rounded-lg hover:bg-neutral-200 disabled:opacity-40 transition cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}