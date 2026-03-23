import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Timeline = () => {
    const timelines = [
        {
            period: "2025 — 2028",
            title: "B.Sc. in Data Science",
            organization: "SDBI (Mumbai University)",
            description: "Pursuing foundational knowledge in statistics, Python programming, and data structures to build a career in intelligent systems.",
            type: "edu"
        },
        {
            period: "2025 — Present",
            title: "Freelance ",
            organization: "Independent",
            description: "Designed and deployed a full-stack business website to manage community engagement, membership, and training programs.",
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
                        <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 py-2 border-b border-terminal-border/30 text-xs text-primary/60 font-bold uppercase tracking-widest bg-terminal-dim/5">
                            <div className="hidden sm:block sm:col-span-3 lg:col-span-2">PERIOD</div>
                            <div className="col-span-12 sm:col-span-4 lg:col-span-4">ROLE / ORGANIZATION</div>
                            <div className="hidden sm:block sm:col-span-5 lg:col-span-6">DESCRIPTION</div>
                        </div>

                        {timelines.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="grid grid-cols-12 gap-2 sm:gap-4 px-4 py-4 border-b border-terminal-border/10 hover:bg-terminal-dim/10 transition-colors text-sm group items-start"
                            >
                                {/* Period cell (hidden on xs, shown on sm+) */}
                                <div className="hidden sm:flex col-span-3 lg:col-span-2 text-secondary/80 font-bold whitespace-nowrap">
                                    <span>{item.period}</span>
                                </div>

                                {/* Role cell */}
                                <div className="col-span-12 sm:col-span-4 lg:col-span-4">
                                    {/* Show period here on mobile only */}
                                    <div className="sm:hidden text-secondary/80 font-bold text-xs mb-1">
                                        {item.period}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                                        <h3 className="text-white font-bold">{item.title}</h3>
                                        <span className="hidden sm:inline text-slate-500">|</span>
                                        <span className="text-primary font-bold">{item.organization}</span>
                                    </div>
                                    {/* Description for mobile only */}
                                    <p className="sm:hidden mt-2 text-slate-400 text-xs leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Description cell (hidden on xs, shown on sm+) */}
                                <div className="hidden sm:block col-span-5 lg:col-span-6">
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
