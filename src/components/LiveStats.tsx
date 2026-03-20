import { useState, useEffect } from 'react';
import PacmanGame from './PacmanGame';

const LiveStats = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12 border-b border-terminal-border/30 font-mono pb-32">
            <div className="container mx-auto px-6 max-w-5xl">
                
                <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-secondary">msp-star@OS:~$</span>
                        <span className="text-white">sysctl --fetch-contributions</span>
                    </div>
                </div>

                <div className="bg-terminal-dim/10 p-4 shrink-0 min-w-max border border-terminal-border/20 rounded-sm overflow-x-auto no-scrollbar">
                    <PacmanGame />
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                    <p>SYSTEM UPTIME: {time.toLocaleTimeString([], { hour12: false })}</p>
                    <div className="flex gap-4">
                        <span>v3.0.0 [CRT_MODE]</span>
                        <span className="animate-pulse text-primary/50">SECURE_CONNECTION</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveStats;
