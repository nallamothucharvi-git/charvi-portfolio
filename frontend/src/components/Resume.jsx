function Resume() {
  return (
    <section
      id="resume"
      className="mx-auto max-w-5xl border-t border-slate-800 px-6 py-20"
    >
      <p className="text-sm font-medium tracking-widest text-teal-400">
        MY RESUME
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        A closer look at my journey
      </h2>

      <p className="mt-4 text-slate-400">
        Explore my education, skills, and project experience.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-teal-400 px-6 py-3 font-semibold text-slate-950 hover:bg-teal-300"
        >
          View resume
        </a>

        <a
          href="/resume.pdf"
          download="Charvi-Resume.pdf"
          className="rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:border-teal-400 hover:text-teal-400"
        >
          Download resume
        </a>
      </div>
    </section>
  );
}

export default Resume;