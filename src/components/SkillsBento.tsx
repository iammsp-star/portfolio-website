import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SkillsBento = () => {
    const coreSkills = [
        { name: "Python", status: "ACTIVE", loadTime: "12ms" },
        { name: "SQL", status: "ACTIVE", loadTime: "8ms" },
        { name: "NumPy & Pandas", status: "ACTIVE", loadTime: "4ms" },
        { name: "PyTorch / TensorFlow", status: "ACTIVE", loadTime: "45ms" },
        { name: "Scikit-Learn", status: "ACTIVE", loadTime: "16ms" }
    ];

    const toolkit = [
        { name: "Git & GitHub", count: "349 commits" },
        { name: "Docker & Docker Compose", count: "12 containers" },
        { name: "React & TypeScript", count: "5 deployments" },
        { name: "UI/UX Engineering", count: "High Fidelity" }
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-16 border-b border-terminal-border/30 font-mono">
            <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
                
                <div className="mb-12 border-l border-terminal-border/40 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-secondary">&gt;</span>
                        <span className="text-white text-xl font-bold uppercase tracking-widest">[ TECHNICAL SKILLS ]</span>
                    </div>
                    <p className="text-slate-400 max-w-2xl text-sm leading-relaxed mt-4">
                        A verified list of loaded modules, programming languages, and frameworks that I use daily to solve complex problems.
                    </p>
                </div>

                {isInView && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Core ML / Data Science Stack */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-terminal-dim/5 border border-terminal-border/20 p-4"
                        >
                            <h3 className="text-primary text-xs font-bold uppercase tracking-widest border-b border-terminal-border/20 pb-2 mb-4">
                                DATA SCIENCE & MACHINE LEARNING
                            </h3>
                            <ul className="space-y-3">
                                {coreSkills.map((skill, i) => (
                                    <li key={i} className="flex justify-between text-sm">
                                        <span className="text-white">{skill.name}</span>
                                        <span className="text-secondary text-xs">{skill.status}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Engineering / Toolkit Stack */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-terminal-dim/5 border border-terminal-border/20 p-4"
                        >
                            <h3 className="text-accent text-xs font-bold uppercase tracking-widest border-b border-terminal-border/20 pb-2 mb-4">
                                SOFTWARE ENGINEERING & UX
                            </h3>
                            <ul className="space-y-3">
                                {toolkit.map((item, i) => (
                                    <li key={i} className="flex justify-between text-sm">
                                        <span className="text-white">{item.name}</span>
                                        <span className="text-slate-500 text-xs hidden sm:block">{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>
                )}
            </div>
        </section>
    );
};

export default SkillsBento;
