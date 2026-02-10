import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Background } from './components/Background';
import { Home } from './pages/Home';
import { AllProjects } from './pages/AllProjects';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-slate-200 selection:bg-primary/20 selection:text-primary overflow-hidden">
        <Background />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
