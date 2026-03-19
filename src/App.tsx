import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BootSequence from './components/BootSequence';
import { Home } from './pages/Home';
import { AllProjects } from './pages/AllProjects';

import TerminalLayout from './components/TerminalLayout';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-background text-slate-200 font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden">
        <TerminalLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
        </TerminalLayout>
      </div>
    </Router>
  );
}

export default App;
