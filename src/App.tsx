import { Github } from 'lucide-react';
import { Hero } from './components/Hero';
import { Background } from './components/Background';
import { MetricsBar } from './components/MetricsBar';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsGrid } from './components/SkillsGrid';
import { LiveDataChart } from './components/LiveDataChart';

function App() {
  return (
    <div className="min-h-screen text-slate-200 selection:bg-primary/20 selection:text-primary overflow-hidden">
      <Background />
      <div className="relative z-10 antialiased">
        <Hero />
        <MetricsBar />
        <SkillsGrid />
        <ProjectGallery />
        <LiveDataChart />

        <footer className="py-8 text-center text-slate-600 text-sm font-mono border-t border-slate-900 bg-slate-950/50 backdrop-blur-sm">
          <div className="flex justify-center gap-6 mb-4">
            <a href="https://github.com/iammsp-star" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            {/* Add more social links here if needed */}
          </div>
          <p>© {new Date().getFullYear()} Data Scientist Portfolio. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
