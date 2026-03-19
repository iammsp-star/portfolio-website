import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Timeline = () => {
    const timelines = [
        {
            period: "2024 - 2028",
            title: "Btech in Artificial Intelligence and Data Science",
            organization: "AISSMS IOIT",
            description: "Deep dive into Machine Learning, Neural Networks, Statistical Modeling, and Big Data infrastructure.",
            type: "edu"
        },
        {
            period: "2024",
            title: "Data Visualization & Dashboard Engineering",
            organization: "Personal Lab",
            description: "Engineered high-performance real-time data visualizers. Transformed massive datasets into highly readable UI/UX graphs.",
            type: "exp"
        },
        {
            period: "2025",
            title: "Machine Learning Researcher",
            organization: "Stealth Node",
            description: "Developed and optimized deep learning architectures for predictive analysis and natural language processing.",
            type: "exp"
        }
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="py-16 border-b border-terminal-border/30 font-mono">
            <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
                
                <div className="mb-12 border-l border-terminal-border/40 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-secondary">&gt;</span>
                        <span className="text-white text-xl font-bold uppercase tracking-widest">[ EDUCATION & EXPERIENCE ]</span>
                    </div>
                    <p className="text-slate-400 max-w-2xl text-sm leading-relaxed mt-4">
                        A chronological timeline of my academic background and professional data science deployments.
                    </p>
                </div>

                {isInView && (
                    <div className="space-y-1">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-terminal-border/30 text-xs text-primary/60 font-bold uppercase tracking-widest bg-terminal-dim/5">
                            <div className="hidden sm:block sm:col-span-3">PERIOD</div>
                            <div className="col-span-12 sm:col-span-9">ROLE / ORGANIZATION</div>
                        </div>

                        {timelines.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="grid grid-cols-12 gap-2 sm:gap-4 px-4 py-4 border-b border-terminal-border/10 hover:bg-terminal-dim/10 transition-colors text-sm group"
                            >
                                {/* Period cell (hidden on xs, shown on sm+) */}
                                <div className="hidden sm:flex col-span-3 text-secondary/80 font-bold">
                                    <span>{item.period}</span>
                                </div>

                                {/* Content cell */}
                                <div className="col-span-12 sm:col-span-9">
                                    {/* Show period here on mobile only */}
                                    <div className="sm:hidden text-secondary/80 font-bold text-xs mb-1">
                                        {item.period}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                        <h3 className="text-white font-bold">{item.title}</h3>
                                        <span className="hidden sm:inline text-slate-500">|</span>
                                        <span className="text-primary">{item.organization}</span>
                                    </div>
                                    <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Timeline;
