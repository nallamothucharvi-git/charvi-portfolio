import { useEffect, useRef, useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi! Ask me about Charvi’s skills, education, projects, or resume.',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const conversationRef = useRef(null);

  useEffect(() => {
    const conversation = conversationRef.current;

    if (conversation) {
      conversation.scrollTop = conversation.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(event) {
    event.preventDefault();

    const question = input.trim();

    if (!question || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: 'user', text: question },
    ]);

    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to get a reply.');
      }

      setMessages((previous) => [
        ...previous,
        {
          role: 'bot',
          text: data.reply,
          link: data.link,
        },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: 'bot',
          text: 'Unable to connect. Please check that the backend is running and try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="chatbot"
      className="mx-auto max-w-5xl border-t border-slate-800 px-6 py-20"
    >
      <p className="text-sm font-medium tracking-widest text-teal-400">
        ASK ABOUT ME
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        Chat with my portfolio assistant
      </h2>

      <p className="mt-4 text-slate-400">
        A keyword-based assistant using my portfolio information.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 font-bold text-teal-400"
          >
            CN
          </div>

          <div>
            <h3 className="font-semibold">Charvi’s assistant</h3>
            <p className="text-xs text-slate-400">
              Ask about my portfolio
            </p>
          </div>
        </div>

        <div
          ref={conversationRef}
          role="log"
          aria-label="Chat conversation"
          aria-live="polite"
          className="h-80 space-y-4 overflow-y-auto p-5"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-teal-400 text-slate-950'
                    : 'bg-slate-800 text-slate-200'
                }`}
              >
                <p className="mb-1 text-xs font-semibold">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </p>

                <p className="break-words leading-relaxed">
                  {message.text}
                </p>

                {message.link && (
                  <a
                    href={message.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-teal-400 underline"
                  >
                    Open link →
                  </a>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-sm text-slate-400">
              Finding an answer…
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-800 px-4 py-3">
          {[
            'What are your skills?',
            'Show me your resume',
            'What is your GitHub?',
          ].map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => setInput(question)}
              disabled={loading}
              className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-teal-400 hover:text-teal-400 disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>

        <form
          onSubmit={sendMessage}
          className="flex gap-3 border-t border-slate-800 p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={500}
            aria-label="Your question about Charvi"
            placeholder="Ask about my skills..."
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Wait…' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Chatbot;