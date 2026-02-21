import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Terminal, Cpu, Wifi } from 'lucide-react';
import LiveStats from './LiveStats';
import CommandPrompt from './CommandPrompt';

const TerminalLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bitrate, setBitrate] = useState(100);
    const [cpuLoad, setCpuLoad] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setBitrate(Math.floor(Math.random() * 500) + 800);
            setCpuLoad(Math.floor(Math.random() * 30) + 10);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { name: 'About', path: '/' },
        { name: 'Projects', path: '/projects' },
        // { name: 'Skills', path: '/skills' }, // Placeholder for now if route doesn't exist
        // { name: 'Contact', path: '/contact' } // Placeholder
    ];

    return (
        <div className="min-h-screen flex flex-col font-mono relative z-10">
            {/* Top Bar / Status */}
            <div className="w-full bg-slate-900/80 border-b border-gray-800 p-2 flex justify-between items-center text-xs md:text-sm sticky top-0 z-40 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-primary">
                    <div className="flex items-center gap-2">
                        <Terminal size={16} />
                        <span className="hidden md:inline">TERMINAL_V.2.0.1</span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <span className="text-secondary">USER: FOUNDER</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-accent">
                        <Wifi size={14} className={bitrate > 1000 ? "text-primary" : "text-yellow-500"} />
                        <span>{bitrate} Kbps</span>
                    </div>
                    <div className="flex items-center gap-2 text-accent">
                        <Cpu size={14} className={cpuLoad > 30 ? "text-red-500" : "text-green-500"} />
                        <span>CPU: {cpuLoad}%</span>
                    </div>
                </div>
            </div>

            {/* Navigation "Prompt" */}
            <div className="bg-black/50 border-b border-primary/20 p-4 sticky top-[40px] z-30 backdrop-blur-md">
                <div className="container mx-auto flex flex-wrap items-center gap-4 text-lg">
                    <span className="text-primary font-bold">C:\Users\Founder&gt;</span>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`px-3 py-1 border border-transparent hover:bg-primary hover:text-black transition-colors duration-200 ${location.pathname === item.path
                                    ? 'bg-primary/20 text-primary border-primary'
                                    : 'text-gray-400'
                                    }`}
                            >
                                [{item.name}]
                            </button>
                        ))}
                    </div>
                    <span className="animate-pulse text-primary block w-3 h-6 bg-primary ml-1"></span>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow container mx-auto px-4 py-8 relative">
                <div className="border border-gray-800 bg-black/60 p-1 md:p-6 rounded-lg shadow-2xl min-h-[60vh] border-glow">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <LiveStats />
            <CommandPrompt />
        </div>
    );
};

export default TerminalLayout;
