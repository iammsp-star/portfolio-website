import { motion } from 'framer-motion';
import { Database, Layout, Server, Code, Cpu, Brain } from 'lucide-react';

const SkillCard = ({ title, skills, icon: Icon, delay }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="border border-slate-800 bg-slate-900/40 p-6 relative group hover:border-primary/50 transition-colors"
        >
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-slate-600 group-hover:border-primary transition-colors"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-slate-600 group-hover:border-primary transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-slate-600 group-hover:border-primary transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-slate-600 group-hover:border-primary transition-colors"></div>

            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-2">
                <Icon size={18} className="text-secondary" />
                <h3 className="text-lg font-bold text-primary font-mono uppercase tracking-wider">{title}</h3>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
                {skills.map((skill: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 group/skill">
                        <span className="text-slate-600 group-hover/skill:text-secondary transition-colors">{`>`}</span>
                        <span className="text-slate-400 group-hover/skill:text-white transition-colors">{skill}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const SkillsBento = () => {
    return (
        <section id="skills" className="py-20 relative font-mono">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="terminal-text text-primary text-sm tracking-widest mb-2 block">SYSTEM_CAPABILITIES</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Cpu size={32} className="text-secondary" />
                        LOADED_MODULES
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Initialized frameworks and libraries available for execution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <SkillCard
                        title="Data Science & ML"
                        skills={['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'NLTK']}
                        icon={Database}
                        delay={0}
                    />

                    <SkillCard
                        title="Frontend Core"
                        skills={['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Vite']}
                        icon={Layout}
                        delay={0.2}
                    />

                    <SkillCard
                        title="Backend & Cloud"
                        skills={['FastAPI', 'Node.js', 'Supabase', 'Firebase', 'AWS', 'Docker', 'Git']}
                        icon={Server}
                        delay={0.4}
                    />

                    <SkillCard
                        title="Languages"
                        skills={['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'HTML/CSS']}
                        icon={Code}
                        delay={0.6}
                    />

                    <SkillCard
                        title="AI & Workflow"
                        skills={['Vibe Coding', 'Research', 'Prompt Engineering']}
                        icon={Brain}
                        delay={0.8}
                    />
                </div>
            </div>
        </section>
    );
};

export default SkillsBento;
