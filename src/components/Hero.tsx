import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Cpu, Activity, Move } from 'lucide-react';

const FloatingElement = ({ children, delay = 0, duration = 6, yOffset = -20, className = "" }: any) => {
    return (
        <motion.div
            animate={{ 
                y: [0, yOffset, 0],
                rotate: [0, 1, -1, 0]
            }}
            transition={{ 
                duration: duration, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section id="about" className="min-h-screen flex items-center justify-center relative font-sans overflow-hidden py-32">
            {/* Background Image & Effects */}
            <div className="absolute inset-0 z-[-2]">
                <img 
                    src={`${import.meta.env.BASE_URL}hero-bg.png`} 
                    alt="Antigravity Background" 
                    className="w-full h-full object-cover opacity-60 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background"></div>
            </div>

            {/* Parallax Floating Data Nodes */}
            <motion.div style={{ y: y2 }} className="absolute inset-0 z-[-1] pointer-events-none">
                <FloatingElement delay={1} duration={8} yOffset={-30} className="absolute top-[20%] left-[10%] opacity-50">
                    <div className="px-4 py-2 glass-card rounded-lg text-xs font-mono text-primary flex items-center gap-2">
                        <Database size={14} /> SELECT * FROM neural_net
                    </div>
                </FloatingElement>
                <FloatingElement delay={2} duration={7} yOffset={20} className="absolute top-[60%] right-[15%] opacity-40">
                    <div className="px-4 py-2 glass-card rounded-lg text-xs font-mono text-secondary flex items-center gap-2">
                        <Cpu size={14} /> weight[i] *= 0.98
                    </div>
                </FloatingElement>
                <FloatingElement delay={0.5} duration={6} yOffset={-25} className="absolute bottom-[20%] left-[20%] opacity-60">
                    <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center">
                        <Activity size={24} className="text-primary/50" />
                    </div>
                </FloatingElement>
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full glass-card border border-primary/30 text-primary text-xs font-medium tracking-widest uppercase">
                                    System Online
                                </span>
                                <span className="h-px bg-primary/30 w-12 hidden sm:block"></span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">
                                Antigravity:
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-white text-glow">
                                    Mastering Form<br/>& Data.
                                </span>
                            </h1>
                            
                            <p className="text-slate-300 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                                I create parallel momentum between the physical discipline of <strong className="text-white font-medium">calisthenics</strong>—mastering my body against gravity—and the technical precision of <strong className="text-primary font-medium">data science</strong>—finding clarity in heavy, complex datasets.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="#projects"
                                className="px-8 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-white rounded-xl hover-magnetic flex items-center justify-center gap-2 font-medium transition-all"
                            >
                                <Move size={18} className="text-primary" />
                                View Weightless Solutions
                            </a>
                            <a
                                href={`${import.meta.env.BASE_URL}Manas_Puthanpura_CV.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl hover-magnetic flex items-center justify-center font-medium transition-all"
                            >
                                Access CV Data
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Floating Image Frames */}
                    <div className="lg:col-span-5 relative h-[500px] w-full hidden md:block">
                        <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-full">
                            {/* Main Portrait */}
                            <FloatingElement delay={0} duration={7} yOffset={-15} className="absolute top-10 right-0 w-[280px] h-[350px] z-20">
                                <div className="w-full h-full glass-card rounded-2xl overflow-hidden border border-white/20 p-2 shadow-2xl hover-magnetic group cursor-pointer">
                                    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-800 relative">
                                        <img 
                                            src={`${import.meta.env.BASE_URL}profile-portrait.jpg`} 
                                            alt="Manas - Portrait" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="%231a202c" /><text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="%23cbd5e1" text-anchor="middle" dominant-baseline="middle">Add profile-portrait.jpg</text></svg>';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4 relative z-10 flex items-center justify-between">
                                            <span className="text-white font-medium text-sm">Focus.</span>
                                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        </div>
                                    </div>
                                </div>
                            </FloatingElement>

                            {/* Secondary Action/Calisthenics Shot */}
                            <FloatingElement delay={1.5} duration={6} yOffset={25} className="absolute bottom-10 left-0 w-[220px] h-[260px] z-30">
                                <div className="w-full h-full glass-card rounded-2xl overflow-hidden border border-primary/30 p-2 shadow-2xl hover-magnetic group cursor-pointer backdrop-blur-md bg-black/40">
                                    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-800 relative">
                                        <img 
                                            src={`${import.meta.env.BASE_URL}profile-calisthenics.jpg`} 
                                            alt="Manas - Calisthenics" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="%230f172a" /><text x="50%" y="50%" font-family="sans-serif" font-size="12" fill="%233b82f6" text-anchor="middle" dominant-baseline="middle">Add profile-calisthenics.jpg</text></svg>';
                                            }}
                                        />
                                        <div className="absolute inset-0 border border-primary/20 rounded-xl"></div>
                                    </div>
                                    {/* Decorative UI elements on the card */}
                                    <div className="absolute -left-2 top-1/2 w-4 h-8 bg-primary/20 blur-md rounded-full"></div>
                                </div>
                            </FloatingElement>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            >
                <span className="text-xs font-mono text-slate-400 tracking-[0.2em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-8 h-12 rounded-full border-2 border-slate-600 flex justify-center p-1"
                >
                    <motion.div className="w-1.5 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
