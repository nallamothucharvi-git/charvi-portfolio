function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="inline-flex rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-medium tracking-widest text-teal-300">
            LEARNING • BUILDING • EXPLORING
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            Hi, I’m
            <span className="block text-teal-400">Charvi.</span>
          </h1>

          <h2 className="mt-6 text-xl leading-relaxed text-slate-200">
            AIML student exploring the intersection of
            web development and artificial intelligence.
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-slate-400">
            I enjoy problem-solving and turning ideas into useful
            websites. Explore what I’m building, what I’m learning,
            and where I want to go next.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-teal-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Explore projects
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:border-teal-400 hover:text-teal-400"
            >
              View resume
            </a>
          </div>

          <a
            href="#chatbot"
            className="mt-6 inline-block text-sm text-slate-300 transition hover:text-teal-400"
          >
            Have a question? Ask my portfolio assistant →
          </a>
        </div>

        <aside className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-8 shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-400/10 text-2xl font-bold text-teal-400">
            CN
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            Charvi Nallamothu
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            B.Tech · AIML · VNR VJIET
          </p>

          <dl className="mt-6 space-y-5 border-t border-slate-800 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-widest text-slate-500">
                Currently building
              </dt>
              <dd className="mt-1 text-slate-200">
                My personal portfolio
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-widest text-slate-500">
                Working with
              </dt>
              <dd className="mt-1 text-slate-200">
                React · Node.js · MongoDB
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-widest text-slate-500">
                Interested in
              </dt>
              <dd className="mt-1 text-slate-200">
                Web development & machine learning
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export default Hero;