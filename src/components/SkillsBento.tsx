import { motion } from 'framer-motion';
import { Database, Layout, Server, Code } from 'lucide-react';

const SkillCard = ({ title, skills, icon: Icon, delay, className }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`glass-card relative overflow-hidden group ${className}`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={64} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, idx: number) => (
                        <span
                            key={idx}
                            className="px-3 py-1 rounded-md text-sm font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const SkillsBento = () => {
    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="terminal-text text-primary text-sm tracking-widest mb-2 block">THE TOOLKIT</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Processing Nodes</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Authorized technologies and frameworks used for data manipulation and system architecture.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Data Science - Large Card */}
                    <SkillCard
                        title="Data Science & ML"
                        skills={['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'NLTK']}
                        icon={Database}
                        delay={0}
                        className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-900 to-slate-800"
                    />

                    {/* Languages */}
                    <SkillCard
                        title="Languages"
                        skills={['Python', 'SQL', 'JavaScript', 'TypeScript', 'C++']}
                        icon={Code}
                        delay={0.2}
                        className="md:col-span-1"
                    />

                    {/* Web Technologies */}
                    <SkillCard
                        title="Frontend Engineering"
                        skills={['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Three.js']}
                        icon={Layout}
                        delay={0.3}
                        className="md:col-span-1"
                    />

                    {/* Backend & Cloud - Wide Card */}
                    <SkillCard
                        title="Backend & Cloud"
                        skills={['FastAPI', 'Node.js', 'Supabase', 'Firebase', 'AWS', 'Docker', 'Git']}
                        icon={Server}
                        delay={0.4}
                        className="md:col-span-3 bg-slate-900/50"
                    />
                </div>
            </div>
        </section>
    );
};

export default SkillsBento;
