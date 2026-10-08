const skillGroups = [
  {
    number: '01',
    title: 'Programming',
    description: 'My foundation for solving problems.',
    skills: ['C', 'JavaScript', 'Python basics'],
  },
  {
    number: '02',
    title: 'Frontend',
    description: 'Building interfaces for the web.',
    skills: [
      'HTML basics',
      'CSS basics',
      'React basics',
      'Tailwind CSS basics',
    ],
  },
  {
    number: '03',
    title: 'Backend & Databases',
    description: 'Connecting interfaces to data.',
    skills: ['Node.js', 'Express', 'MySQL', 'MongoDB'],
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl border-t border-slate-800 px-6 py-20"
    >
      <p className="text-sm font-medium tracking-widest text-teal-400">
        MY TOOLKIT
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        Skills I am developing
      </h2>

      <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
        Learning through coursework, practice, and hands-on projects.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-teal-400/50"
          >
            <span className="text-sm font-semibold text-teal-400">
              {group.number}
            </span>

            <h3 className="mt-4 text-xl font-semibold">
              {group.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {group.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;