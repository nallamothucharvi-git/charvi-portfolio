import './index.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Chatbot from './components/Chatbot.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Chatbot />
        <Contact />
      </main>

      <footer className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Charvi Nallamothu
      </footer>
    </div>
  );
}

export default App;