import { motion } from 'framer-motion';
import { Database, Layout, Server, Code, Cpu, Brain } from 'lucide-react';

const FloatingElement = ({ children, delay = 0, duration = 6, yOffset = -10, className = "" }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            animate={{ y: [0, yOffset, 0] }}
            transition={{ 
                y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const SkillCard = ({ title, skills, icon: Icon, floatDelay }: any) => {
    return (
        <FloatingElement delay={floatDelay} duration={7} yOffset={-12} className="h-full">
            <div className="glass-card h-full p-6 md:p-8 rounded-2xl relative group hover-magnetic cursor-pointer overflow-hidden border border-white/5 hover:border-primary/40">
                {/* Decorative glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                        <Icon size={20} className="text-slate-300 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-display font-medium tracking-wide text-white">{title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, idx: number) => (
                        <span 
                            key={idx} 
                            className="px-3 py-1.5 text-sm font-medium bg-white/5 border border-white/10 rounded-lg text-slate-300 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-white transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </FloatingElement>
    );
};

const SkillsBento = () => {
    return (
        <section id="skills" className="py-32 relative font-sans">
            {/* Ambient Background */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-4">
                        <Cpu size={14} /> System Capabilities
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                        Loaded Modules
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                        Technical frameworks and tools initialized for weightless execution and high-performance engineering.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <SkillCard
                        title="Data Science"
                        skills={['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'NLTK']}
                        icon={Brain}
                        delay={0}
                        floatDelay={0}
                    />

                    <SkillCard
                        title="Engineering"
                        skills={['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'HTML/CSS']}
                        icon={Code}
                        delay={0.1}
                        floatDelay={1.5}
                    />

                    <SkillCard
                        title="Frontend Core"
                        skills={['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js', 'Vite']}
                        icon={Layout}
                        delay={0.2}
                        floatDelay={0.5}
                    />

                    <SkillCard
                        title="Backend & Cloud"
                        skills={['FastAPI', 'Node.js', 'Supabase', 'Firebase', 'AWS', 'Docker']}
                        icon={Server}
                        delay={0.3}
                        floatDelay={2}
                    />

                    <SkillCard
                        title="Databases"
                        skills={['PostgreSQL', 'MongoDB', 'ChromaDB', 'Redis', 'Supabase']}
                        icon={Database}
                        delay={0.4}
                        floatDelay={1}
                    />

                    <SkillCard
                        title="AI Workflows"
                        skills={['Agentic Coding', 'RAG Architecture', 'Prompt Engineering', 'LangChain']}
                        icon={Brain}
                        delay={0.5}
                        floatDelay={2.5}
                    />
                </div>
            </div>
        </section>
    );
};

export default SkillsBento;
