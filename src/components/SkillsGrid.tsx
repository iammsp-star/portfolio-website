import { motion } from 'framer-motion';
import { Database, Layout, Server, Brain } from 'lucide-react';

const SkillItem = ({ icon: Icon, title, skills, color }: any) => (
    <div className="glass-card p-6 h-full border-t-2 border-t-transparent hover:border-t-current transition-all group" style={{ color: color.replace('text-', '') }}>
        <div className={`p-3 rounded-lg w-fit mb-4 bg-slate-800/50 group-hover:bg-slate-800 transition-colors`}>
            <Icon size={24} className={color} />
        </div>
        <h3 className="text-lg font-bold mb-4 text-slate-200">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
                <span key={skill} className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400 border border-slate-700/50 group-hover:border-slate-600 transition-colors">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

export const SkillsGrid = () => {
    return (
        <section className="py-20 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3"
                >
                    <span className="text-primary">02.</span> Technical Arsenal
                    <span className="h-px bg-slate-700 flex-1 ml-4 opacity-50"></span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                    {/* Main Skill Focus - Large */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 glass-card p-8 relative overflow-hidden group border border-primary/20"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                            <Brain size={120} className="text-secondary" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-3 text-white flex items-center gap-2">
                                <Brain className="text-secondary" />
                                Machine Learning & AI
                            </h3>
                            <p className="text-slate-400 mb-6 max-w-lg leading-relaxed">
                                Architecting and deploying state-of-the-art models for computer vision, NLP, and predictive analytics.
                                Focus on scalable inference, model optimization, and MLOps best practices.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Hugging Face', 'OpenCV', 'LangChain', 'LlamaIndex'].map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 text-sm rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <SkillItem
                            icon={Database}
                            title="Data Engineering"
                            skills={['SQL', 'PostgreSQL', 'MongoDB', 'Airflow', 'Spark', 'Kafka', 'Redis']}
                            color="text-blue-400"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <SkillItem
                            icon={Server}
                            title="Cloud & DevOps"
                            skills={['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform']}
                            color="text-orange-400"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 lg:col-span-1"
                    >
                        <SkillItem
                            icon={Layout}
                            title="Visualization"
                            skills={['Tableau', 'PowerBI', 'D3.js', 'Recharts', 'Streamlit', 'Plotly']}
                            color="text-purple-400"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
