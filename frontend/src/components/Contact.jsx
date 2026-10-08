function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl border-t border-slate-800 px-6 py-20"
    >
      <p className="text-sm font-medium tracking-widest text-teal-400">
        LET’S CONNECT
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        Find me online
      </h2>

      <p className="mt-4 text-slate-400">
        I would love to connect, learn, and collaborate on projects.
      </p>

      <a
        href="mailto:nallamothucharvi@gmail.com"
        className="mt-6 inline-block break-all text-teal-400 hover:underline"
      >
        nallamothucharvi@gmail.com
      </a>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="https://github.com/nallamothucharvi-git"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-700 px-5 py-3 hover:border-teal-400 hover:text-teal-400"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/charvi-nallamothu-173516372/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-700 px-5 py-3 hover:border-teal-400 hover:text-teal-400"
        >
          LinkedIn
        </a>

        <a
          href="https://leetcode.com/u/CharviNallamothu/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-700 px-5 py-3 hover:border-teal-400 hover:text-teal-400"
        >
          LeetCode
        </a>
      </div>
    </section>
  );
}

export default Contact;