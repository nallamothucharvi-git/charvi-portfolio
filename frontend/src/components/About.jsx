function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-5xl border-t border-slate-800 px-6 py-20"
    >
      <p className="text-sm font-medium tracking-widest text-teal-400">
        A LITTLE ABOUT ME
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        Curious to learn. Excited to build.
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-slate-300">
          <p>
            I am Charvi, a second-year B.Tech student in Artificial
            Intelligence and Machine Learning at VNR VJIET.
          </p>

          <p>
            I enjoy solving mathematical problems, which sparked my
            interest in machine learning. I am also learning web
            development to turn my ideas into interactive websites.
          </p>

          <p>
            I am building this portfolio myself, one component at a
            time, to understand how the frontend, backend, and
            database work together.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">
            What I am exploring
          </h3>

          <ul className="mt-5 space-y-3 text-slate-300">
            <li>✦ Web development with React and JavaScript</li>
            <li>✦ Backend development with Node.js and Express</li>
            <li>✦ Databases with MongoDB</li>
            <li>✦ Machine learning and problem-solving</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;