import { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          'https://api.github.com/users/nallamothucharvi-git/repos?sort=updated&per_page=100',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Unable to load GitHub projects.');
        }

        const repositories = await response.json();

        setProjects(
          repositories.filter(
            (repository) => !repository.fork && !repository.archived
          )
        );
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(
            'Projects could not be loaded. Please retry or visit my GitHub.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => controller.abort();
  }, [retry]);

  const filteredProjects = projects.filter((project) => {
    const text = [
      project.name,
      project.description || '',
      project.language || '',
    ].join(' ').toLowerCase();

    return text.includes(search.toLowerCase().trim());
  });

  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl border-t border-slate-800 px-6 py-20"
    >
      <p className="text-sm font-medium tracking-widest text-teal-400">
        LEARNING THROUGH BUILDING
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        My GitHub projects
      </h2>

      <p className="mt-4 text-slate-400">
        Explore my public repositories and the work I’m sharing.
      </p>

      <label
        htmlFor="project-search"
        className="mt-8 block text-sm font-medium text-slate-300"
      >
        Search projects
      </label>

      <input
        id="project-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name, description, or language..."
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

      <div aria-live="polite" className="mt-6">
        {loading && (
          <p className="text-slate-400">Loading projects…</p>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-slate-700 p-5">
            <p className="text-slate-300">{error}</p>

            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-4 rounded-lg bg-teal-400 px-4 py-2 font-semibold text-slate-950"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredProjects.length === 0 && (
          <p className="text-slate-400">
            {projects.length === 0
              ? 'No public projects to display yet.'
              : 'No projects match your search.'}
          </p>
        )}
      </div>

      {!loading && !error && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-teal-400/50"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-teal-400">
                Public repository
              </p>

              <h3 className="mt-3 break-words text-xl font-semibold">
                {project.name.replace(/[-_]/g, ' ')}
              </h3>

              <p className="mt-4 flex-1 leading-relaxed text-slate-400">
                {project.description ||
                  'Explore the repository for code and project details.'}
              </p>

              {project.language && (
                <span className="mt-5 w-fit rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {project.language}
                </span>
              )}

              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-fit rounded-xl bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                View code →
              </a>
            </article>
          ))}
        </div>
      )}

      <a
        href="https://github.com/nallamothucharvi-git"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block text-sm text-teal-400 hover:underline"
      >
        Visit my GitHub profile →
      </a>
    </section>
  );
}

export default Projects;