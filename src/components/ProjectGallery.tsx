
import { motion } from 'framer-motion';
import { Github, ExternalLink, Database, BarChart3, Brain } from 'lucide-react';

const projects = [
    {
        title: 'Master Calisthenics Elite Management System',
        description: 'Full-Stack Web Development & Business Automation for a fitness facility. Features include Supabase/Razorpay payment automation, WhatsApp API retention reminders, and a real-time Coach Dashboard.',
        tech: ['Supabase', 'Razorpay', 'React', 'Node.js'],
        metrics: 'Automation & SEO',
        icon: <Database className="text-blue-400" size={24} />,
        color: 'border-blue-500/50',
        link: '#'
    },
    {
        title: 'Predictive Maintenance Engine',
        description: 'Deep learning model predicting machinery failure 48 hours in advance using IoT sensor data. Reduced downtime by 35%.',
        tech: ['Python', 'TensorFlow', 'PostgreSQL', 'FastAPI'],
        metrics: '94% Accuracy',
        icon: <Brain className="text-secondary" size={24} />,
        color: 'border-secondary/50',
        link: '#'
    },
    {
        title: 'Customer Churn Analysis',
        description: 'End-to-end pipeline identifying at-risk customers and suggesting retention strategies. Deployed on AWS Lambda.',
        tech: ['R', 'XGBoost', 'Tableau', 'AWS'],
        metrics: '$1.2M Saved',
        icon: <BarChart3 className="text-primary" size={24} />,
        color: 'border-primary/50',
        link: '#'
    },
    {
        title: 'NLP Sentiment Analyzer',
        description: 'Real-time social media sentiment tracking for brand reputation management using BERT transformers.',
        tech: ['Python', 'BERT', 'Kafka', 'React'],
        metrics: '<50ms Latency',
        icon: <Database className="text-purple-400" size={24} />,
        color: 'border-purple-500/50',
        link: '#'
    }
];

export const ProjectGallery = () => {
    return (
        <section className="py-20 relative z-10 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3"
                >
                    <span className="text-primary">01.</span> Selected Projects
                    <span className="h-px bg-slate-700 flex-1 ml-4 opacity-50"></span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card group relative overflow-hidden flex flex-col h-full"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity z-20">
                                <a href={project.link} className="p-2 hover:bg-slate-700 rounded-full transition-colors block">
                                    <ExternalLink size={20} className="text-slate-400 group-hover:text-white" />
                                </a>
                            </div>

                            <div className="mb-6 p-4 bg-slate-800/50 rounded-lg w-fit group-hover:bg-slate-800 transition-colors">
                                {project.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                                {project.description}
                            </p>

                            <div className="space-y-4 mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700 group-hover:border-slate-600 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                    <span className="text-sm font-mono text-secondary flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                                        {project.metrics}
                                    </span>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs hover:underline">
                                        <Github size={16} />
                                        <span>Source</span>
                                    </a>
                                </div>
                            </div>

                            <div className={`absolute inset-0 border-2 ${project.color} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none duration-300`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
