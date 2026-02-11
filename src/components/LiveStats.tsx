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
        <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-md pt-12 pb-6">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Identity */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            <span className="text-primary">Manas</span> Puthanpura
                        </h3>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            Data Scientist & Full Stack Engineer building the future of intelligent systems.
                            Available for freelance and full-time opportunities.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/iammsp-star" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-primary/50 transition-all">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/manas-puthanpura-5b06b0377/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-primary/50 transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:manassubhash2007@gmail.com" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-primary/50 transition-all">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Live Data */}
                    <div>
                        <h4 className="terminal-text text-sm font-bold text-secondary mb-4">LIVE METRICS</h4>
                        <ul className="space-y-3 font-mono text-sm text-slate-400">
                            <li className="flex items-center gap-2">
                                <Activity size={16} className="text-primary animate-pulse" />
                                <span className="text-white">System Status:</span> Online
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock size={16} className="text-secondary" />
                                <span className="text-white">Local Time:</span>
                                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={16} className="text-accent" />
                                <span className="text-white">Location:</span> India (IST)
                            </li>
                        </ul>
                    </div>

                    {/* Contribution Graph (Mock) */}
                    <div>
                        <h4 className="terminal-text text-sm font-bold text-primary mb-4">CONTRIBUTIONS</h4>
                        <div className="flex gap-1 flex-wrap w-full max-w-[200px]">
                            {Array.from({ length: 48 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.01 }}
                                    className={`w-2 h-2 rounded-sm ${Math.random() > 0.7 ? 'bg-primary' :
                                            Math.random() > 0.4 ? 'bg-primary/50' : 'bg-slate-800'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="mt-2 text-xs text-slate-500 font-mono">
                            648 contributions in the last year
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-mono">
                    <p>© {new Date().getFullYear()} Manas Puthanpura. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span>v2.0.1 [STABLE]</span>
                        <span>REACT // TAILWIND // FRAMER</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LiveStats;
