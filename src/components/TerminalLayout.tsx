import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';
import LiveStats from './LiveStats';
import CommandPrompt from './CommandPrompt';
import { motion } from 'framer-motion';

const TerminalLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
    ];

    return (
        <div className="min-h-screen flex flex-col relative z-10 selection:bg-primary/30 selection:text-white">
            {/* Top Navigation Bar (Floating Glass) */}
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-2xl glass-nav px-6 py-4 flex justify-between items-center"
            >
                <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex flex-col items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <Layers size={16} className="text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-display font-medium text-lg tracking-wide hidden sm:block">
                        Manas<span className="text-primary/80 font-light">.Puthanpura</span>
                    </span>
                </div>

                <nav className="flex items-center gap-1 sm:gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                                    isActive 
                                        ? 'text-white' 
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {isActive && (
                                    <motion.div 
                                        layoutId="nav-indicator"
                                        className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </motion.header>

            {/* Background ambient lighting */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-[10%] w-[600px] h-[600px] bg-[#001333] rounded-full blur-[150px]"></div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow pt-32 pb-16 relative">
                {children}
            </main>

            {/* Footer / Stats */}
            <LiveStats />
            
            {/* Keeping CommandPrompt widget, but styling it later */}
            <CommandPrompt />
        </div>
    );
};

export default TerminalLayout;
