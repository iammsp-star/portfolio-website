import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

                <div className="bg-terminal-dim/10 p-4 border border-terminal-border/20 rounded-sm">
                    <h4 className="text-primary tracking-widest uppercase mb-4 text-xs font-bold">
                        [ GITHUB_MATRIX_OVERLAY ]
                    </h4>

                    {/* Contribution Graph (Mock) */}
                    <div className="overflow-x-auto no-scrollbar w-full">
                        <div className="grid grid-rows-7 grid-flow-col gap-1 w-fit opacity-80 mix-blend-screen pb-2">
                            {Array.from({ length: 140 }).map((_, i) => {
                            const val = Math.random();
                            let color = 'bg-terminal-dim';
                            if (val > 0.8) color = 'bg-primary shadow-[0_0_5px_#00ff00]';
                            else if (val > 0.5) color = 'bg-secondary';
                            else if (val > 0.3) color = 'bg-accent/40';

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.01 }}
                                    className={`w-2.5 h-2.5 rounded-[1px] ${color}`}
                                />
                            );
                        })}
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-terminal-border/20 text-xs text-slate-500 font-mono">
                        OUTPUT: 648+ commit nodes detected across 52 weeks.
                    </div>
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
