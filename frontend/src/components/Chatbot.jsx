import { useEffect, useRef, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const suggestedQuestions = [
  "What are your skills?",
  "Tell me about your projects",
  "Where do you study?",
  "Show me your resume",
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm Charvi's portfolio assistant. Ask me about her skills, education, projects, or resume.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const sendingRef = useRef(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, loading]);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  async function sendMessage(question = input) {
    const text = question.trim();

    if (!text || sendingRef.current) return;

    sendingRef.current = true;
    setInput("");
    setLoading(true);
    setMessages((previous) => [
      ...previous,
      { role: "user", text },
    ]);

    const controller = new AbortController();
    controllerRef.current = controller;

    const timeout = window.setTimeout(
      () => controller.abort(),
      90000,
    );

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your message.");
      }

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("The server returned an empty reply.");
      }

      let safeLink = null;

      if (typeof data.link === "string") {
        try {
          const url = new URL(data.link, window.location.origin);

          if (url.protocol === "https:" || url.protocol === "http:") {
            safeLink = url.href;
          }
        } catch {
          safeLink = null;
        }
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply,
          link: safeLink,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            error.name === "AbortError"
              ? "The server took too long to respond. Please try again."
              : "I couldn't connect right now. Please try again in a moment.",
        },
      ]);
    } finally {
      window.clearTimeout(timeout);
      controllerRef.current = null;
      sendingRef.current = false;
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <section id="chatbot" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Get to know me
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Ask my portfolio assistant
          </h2>

          <p className="mt-3 text-slate-400">
            Explore my skills, projects, education, and contact details.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 text-xl"
            >
              💬
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Charvi's Assistant
              </h3>
              <p className="text-xs text-slate-400">
                Answers questions about this portfolio
              </p>
            </div>
          </div>

          <div
            role="log"
            aria-label="Chat messages"
            aria-live="polite"
            aria-relevant="additions"
            className="h-96 space-y-4 overflow-y-auto p-4 sm:p-6"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-violet-600 text-white"
                      : "rounded-bl-sm bg-slate-800 text-slate-200"
                  }`}
                >
                  <span className="sr-only">
                    {message.role === "user" ? "You: " : "Assistant: "}
                  </span>

                  <p className="whitespace-pre-wrap break-words">
                    {message.text}
                  </p>

                  {message.link && (
                    <a
                      href={message.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex rounded-lg bg-violet-500/20 px-3 py-2 font-medium text-violet-200 transition hover:bg-violet-500/30 focus-visible:outline-2 focus-visible:outline-violet-400"
                    >
                      {new URL(message.link).pathname.endsWith(".pdf")
                        ? "View resume ↗"
                        : "Open link ↗"}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div role="status" className="text-sm text-slate-400">
                Thinking… The server may take a moment to wake up.
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-4 sm:px-6">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                disabled={loading}
                onClick={() => sendMessage(question)}
                className="rounded-full border border-violet-400/20 px-3 py-2 text-xs text-violet-200 transition hover:bg-violet-500/15 focus-visible:outline-2 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 p-4 sm:px-6"
          >
            <label htmlFor="chatbot-input" className="sr-only">
              Ask a question about Charvi
            </label>

            <div className="flex gap-2">
              <input
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={500}
                placeholder="Ask about Charvi..."
                autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-400"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "…" : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}