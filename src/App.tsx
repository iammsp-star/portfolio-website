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
    <Router>
      <div className="min-h-screen bg-black text-primary font-mono selection:bg-primary selection:text-black overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none scanline z-50"></div>
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
