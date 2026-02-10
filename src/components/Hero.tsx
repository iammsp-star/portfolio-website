import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Download, ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
    const [text, setText] = useState('');
    const fullText = ">> initializing_neural_network...\n>> loading_modules... [100%]\n>> optimization_complete\n>> system_ready";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-4xl glass rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
                {/* Terminal Header */}
                <div className="bg-slate-900/90 px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 text-center text-xs text-slate-500 font-mono">
                        user@portfolio:~/workspace
                    </div>
                </div>

                {/* Terminal Content */}
                <div className="p-8 md:p-12 font-mono space-y-8">
                    <div className="min-h-[100px] text-green-400/90 text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                        {text}
                        <span className="animate-pulse inline-block w-2.5 h-4 bg-green-400 ml-1 align-middle"></span>
                    </div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                        >
                            Data Scientist <span className="text-primary">&</span><br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                                ML Engineer
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3, duration: 0.8 }}
                            className="text-slate-400 max-w-2xl text-lg md:text-xl leading-relaxed"
                        >
                            Transforming complex datasets into actionable intelligence.
                            Specialized in <span className="text-white">Deep Learning</span>,
                            <span className="text-white"> NLP</span>, and
                            <span className="text-white"> Predictive Analytics</span>.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.5, duration: 0.5 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <Link to="/projects" className="group relative px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 rounded-lg flex items-center gap-2 transition-all overflow-hidden text-sm md:text-base font-medium">
                            <Terminal size={18} />
                            <span>View Projects</span>
                            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                        </Link>

                        <button className="px-6 py-3 hover:bg-white/5 text-slate-300 border border-slate-700/50 hover:border-slate-500 rounded-lg flex items-center gap-2 transition-all text-sm md:text-base">
                            <Download size={18} />
                            <span>Download CV</span>
                        </button>

                        <a href="https://github.com/iammsp-star" target="_blank" rel="noopener noreferrer" className="px-6 py-3 hover:bg-white/5 text-slate-300 border border-slate-700/50 hover:border-slate-500 rounded-lg flex items-center gap-2 transition-all text-sm md:text-base">
                            <Github size={18} />
                            <span>GitHub</span>
                        </a>

                        <a href="https://www.linkedin.com/in/manas-puthanpura-5b06b0377/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 hover:bg-white/5 text-slate-300 border border-slate-700/50 hover:border-slate-500 rounded-lg flex items-center gap-2 transition-all text-sm md:text-base">
                            <Linkedin size={18} />
                            <span>LinkedIn</span>
                        </a>

                        <a href="mailto:manassubhash2007@gmail.com" className="px-6 py-3 hover:bg-white/5 text-slate-300 border border-slate-700/50 hover:border-slate-500 rounded-lg flex items-center gap-2 transition-all text-sm md:text-base">
                            <Mail size={18} />
                            <span>Email</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
