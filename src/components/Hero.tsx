import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Terminal, Cpu, Shield, Activity, FileText } from 'lucide-react';

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i === text.length) clearInterval(interval);
            }, 30);
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

const Hero = () => {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 font-mono">
            {/* Background Elements */}
            <div className="absolute inset-0 grid-bg opacity-10"></div>

            {/* HUD Corners */}
            <div className="absolute top-20 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-lg"></div>
            <div className="absolute top-20 right-4 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-lg"></div>

            <div className="container mx-auto px-6 relative z-10 w-full max-w-5xl">
                <div className="glass-card bg-black/60 border border-primary/30 p-6 md:p-12 relative overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                    {/* Header */}
                    <div className="border-b-2 border-primary/20 pb-4 mb-8 flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-primary text-sm font-mono tracking-widest mb-1">// _system_ready ■</span>
                            <span className="text-slate-400 font-mono tracking-widest mb-4">Data Scientist & ML Engineer</span>

                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2 leading-tight">
                                <span className="text-white">Manas </span>
                                <span className="text-[#a5e887]">Puthanpura</span>
                            </h1>
                        </div>
                        <div className="text-right hidden md:block text-slate-500 text-xs">
                            <p>REF_ID: 0x882A</p>
                            <p>SEC_LEVEL: ALPHA</p>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column: Data Fields */}
                        <div className="space-y-6 text-sm md:text-base">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col hidden"
                            >
                                <span className="text-slate-500 text-xs mb-1">SUBJECT_NAME</span>
                                <span className="text-white text-xl font-bold">MANAS PUTHANPURA</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col"
                            >
                                <span className="text-slate-500 text-xs mb-1">ARCHETYPE</span>
                                <span className="text-primary font-bold tracking-widest">
                                    <TypewriterText text="DATA SCIENTIST | FOUNDER" delay={0.8} />
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.5 }}
                                className="flex flex-col"
                            >
                                <span className="text-slate-500 text-xs mb-1">CURRENT_DIRECTIVE</span>
                                <span className="text-secondary">Building SDBI Neural Architecture</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.0 }}
                                className="flex flex-col"
                            >
                                <span className="text-slate-500 text-xs mb-1">OPERATIONAL_STATUS</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                                    <span className="text-green-500">ACTIVE - OPTIMAL PERFORMANCE</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.2 }}
                                className="flex flex-col"
                            >
                                <span className="text-slate-500 text-xs mb-1">PROFILE_SUMMARY</span>
                                <span className="text-slate-300 text-sm leading-relaxed">
                                    Student at the School of Data Science and Business Intelligence, exploring data and uncovering insights. Enjoy learning new tools, excited to grow knowledge in data science and apply it to real-world challenges.
                                </span>
                            </motion.div>
                        </div>

                        {/* Right Column: Visualizer/Stats */}
                        <div className="relative border border-slate-800 bg-slate-900/50 p-6 rounded flex flex-col justify-between">
                            <div className="absolute top-2 right-2 text-primary/20">
                                <Activity size={48} />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>NEURAL_NET_LOAD</span>
                                        <span>88%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 0.88 }}
                                            transition={{ duration: 2, delay: 2.5 }}
                                            className="bg-primary h-full origin-left"
                                        ></motion.div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>CREATIVE_OUTPUT</span>
                                        <span>94%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 0.94 }}
                                            transition={{ duration: 2, delay: 2.7 }}
                                            className="bg-secondary h-full origin-left"
                                        ></motion.div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>SLEEP_SCHEDULE</span>
                                        <span className="text-red-500 animate-pulse">OPTIMIZING...</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 0.45 }}
                                            transition={{ duration: 2, delay: 2.9 }}
                                            className="bg-red-500 h-full origin-left"
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-slate-700 flex justify-between items-center">
                                <span className="text-xs text-slate-500">ENCRYPTION: AES-256</span>
                                <Shield size={16} className="text-slate-500" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-start flex-wrap">
                        <a
                            href="#projects"
                            className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-all flex items-center gap-2 group text-sm"
                        >
                            <Terminal size={16} />
                            EXECUTE_PROJECTS_VIEW
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 border border-slate-600 text-slate-300 hover:border-secondary hover:text-secondary hover:bg-slate-900 transition-all flex items-center gap-2 text-sm"
                        >
                            <Cpu size={16} />
                            INITIATE_CONTACT
                        </a>
                        <a
                            href="/Manas_Puthanpura_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-slate-400 hover:bg-slate-900 transition-all flex items-center gap-2 text-sm"
                        >
                            <FileText size={16} />
                            VIEW_CV
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-xs terminal-text tracking-widest">SCROLL_FOR_DATA</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown size={14} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
