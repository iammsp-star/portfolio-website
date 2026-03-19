import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Activity, Clock, MapPin, Linkedin, Mail } from 'lucide-react';

const LiveStats = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="border-t border-white/5 bg-background/60 backdrop-blur-xl pt-16 pb-8 relative z-20 font-sans">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Identity */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Activity size={20} className="text-primary" />
                            </div>
                            <h3 className="text-2xl font-display font-medium text-white tracking-wide">
                                Manas<span className="text-primary/80 font-light">.Puthanpura</span>
                            </h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-md font-light">
                            Synthesizing parallel momentum in data architectures and physical discipline. Available for complex problem solving and freelance engineering.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://github.com/iammsp-star" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover-magnetic transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/manas-puthanpura-5b06b0377/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover-magnetic transition-all">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:manassubhash2007@gmail.com" className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover-magnetic transition-all">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Live Data */}
                    <div>
                        <h4 className="text-sm font-medium text-primary tracking-widest uppercase mb-6 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_8px_currentColor]"></span> Live Metrics
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-400 font-light">
                            <li className="flex items-center justify-between glass-card px-4 py-2 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-primary" />
                                    <span>System</span>
                                </div>
                                <span className="text-white font-medium flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
                                </span>
                            </li>
                            <li className="flex items-center justify-between glass-card px-4 py-2 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-secondary" />
                                    <span>Time (IST)</span>
                                </div>
                                <span className="text-white font-medium font-mono text-xs">
                                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </li>
                            <li className="flex items-center justify-between glass-card px-4 py-2 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-slate-300" />
                                    <span>Location</span>
                                </div>
                                <span className="text-white font-medium">India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contribution Graph (Mock) */}
                    <div>
                        <h4 className="text-sm font-medium text-secondary tracking-widest uppercase mb-6 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 shadow-[0_0_8px_currentColor]"></span> Git Output
                        </h4>
                        <div className="glass-card p-4 rounded-xl border border-white/5">
                            <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-fit">
                                {Array.from({ length: 112 }).map((_, i) => {
                                    const rand = Math.random();
                                    let colorClass = 'bg-white/5'; // empty
                                    if (rand > 0.8) colorClass = 'bg-primary'; // high
                                    else if (rand > 0.5) colorClass = 'bg-primary/50'; // medium
                                    else if (rand > 0.3) colorClass = 'bg-primary/20'; // low

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.005 }}
                                            className={`w-2.5 h-2.5 rounded-sm ${colorClass} transition-colors hover:bg-white`}
                                        />
                                    );
                                })}
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                                <span>1 Year Span</span>
                                <span className="text-primary font-medium">648+ Commits</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
                    <p>© {new Date().getFullYear()} Manas Puthanpura. Weightless Architecture.</p>
                    <div className="flex gap-4">
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:text-white transition-colors cursor-default">v3.0.0 [ANTIGRAVITY]</span>
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:text-white transition-colors cursor-default">REACT // TAILWIND // FRAMER</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LiveStats;
