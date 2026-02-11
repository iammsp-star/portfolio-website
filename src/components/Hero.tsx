import { motion } from 'framer-motion';
import { ArrowDown, Database, Terminal, Cpu } from 'lucide-react';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            {/* Background Elements */}
            <div className="absolute inset-0 grid-bg opacity-20"></div>

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 text-primary/20"
            >
                <Database size={64} />
            </motion.div>
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 text-secondary/20"
            >
                <Terminal size={64} />
            </motion.div>
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/3 right-1/3 text-accent/20"
            >
                <Cpu size={48} />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
                    >
                        <span className="terminal-text text-primary text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            SYSTEM STATUS: ONLINE
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Initialize: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Manas</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        TRANSITIONING: <span className="text-primary">STUDENT</span> → <span className="text-secondary">FOUNDER</span>
                        <br />
                        <span className="text-sm md:text-base mt-2 block opacity-80">
                            Building scalable data pipelines and AI-driven solutions.
                        </span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3 rounded-lg bg-primary text-background font-bold hover:bg-primary/90 transition-all flex items-center gap-2 group"
                        >
                            <Terminal size={20} />
                            View Projects
                            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 rounded-lg border border-slate-700 hover:border-primary/50 hover:bg-slate-800/50 transition-all text-slate-300"
                        >
                            Contact Protocol
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-xs terminal-text tracking-widest">INITIATE SCROLL</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
