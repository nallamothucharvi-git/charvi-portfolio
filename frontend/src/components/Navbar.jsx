import { useEffect, useState } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Chatbot', href: '#chatbot' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    function updateActiveSection() {
      const sectionIds = [
        'home',
        ...links.map((link) => link.href.slice(1)),
      ];

      let currentSection = 'home';

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= 140) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    }

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-5xl px-6 py-4"
      >
        <div className="flex flex-wrap items-center justify-between">
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold tracking-tight text-white"
          >
            Charvi<span className="text-teal-400">.</span>
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="navigation-links"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:border-teal-400 md:hidden"
          >
            {menuOpen ? 'Close ✕' : 'Menu ☰'}
          </button>

          <ul
            id="navigation-links"
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } mt-4 w-full flex-col gap-2 border-t border-slate-800 pt-4 md:mt-0 md:flex md:w-auto md:flex-row md:gap-1 md:border-0 md:pt-0`}
          >
            {links.map((link) => {
              const isActive =
                activeSection === link.href.slice(1);

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-400/10 text-teal-400'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;