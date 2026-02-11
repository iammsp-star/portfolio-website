import { motion } from 'framer-motion';
import { Calendar, Brain, Rocket, GraduationCap } from 'lucide-react';

const timelineData = [
    {
        year: '2023',
        title: 'B.Tech in Data Science',
        subtitle: 'Academic Foundation',
        description: 'Specialized in Machine Learning, Deep Learning, and Big Data Analytics.',
        icon: GraduationCap,
        type: 'education',
        side: 'left'
    },
    {
        year: '2024',
        title: 'Research & Development',
        subtitle: 'Technical Deep Dive',
        description: 'Published paper on "AI in Healthcare". Developed 3 end-to-end ML production systems.',
        icon: Brain,
        type: 'tech',
        side: 'right'
    },
    {
        year: '2025',
        title: 'Founder: Master Calisthenics',
        subtitle: 'Leadership & Execution',
        description: 'Launched India’s first AI-driven Calisthenics platform. Scaled to 500+ users in 3 months.',
        icon: Rocket,
        type: 'founder',
        side: 'left'
    },
    {
        year: 'PRESENT',
        title: 'Full Stack AI Engineer',
        subtitle: 'The Convergence',
        description: 'Merging technical expertise with product vision to build the next generation of AI tools.',
        icon: Calendar,
        type: 'current',
        side: 'right'
    }
];

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
    const isLeft = item.side === 'left';

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex items-center justify-between w-full mb-8 ${isLeft ? 'flex-row-reverse' : ''}`}
        >
            <div className="w-5/12"></div>

            <div className="z-20 flex items-center justify-center w-12 h-12 bg-slate-900 border-2 border-primary rounded-full shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <item.icon size={20} className="text-primary" />
            </div>

            <div className="w-5/12">
                <div className={`p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-primary/50 transition-all group ${isLeft ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        <span className="terminal-text text-primary text-sm font-bold">{item.year}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{item.type.toUpperCase()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <h4 className="text-sm text-secondary mb-3">{item.subtitle}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="terminal-text text-primary text-sm tracking-widest mb-2 block">THE ARCHITECTURE</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Processing Pipeline</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A chronological visualization of the data inputs (education) and processing nodes (experience) that formed the current output.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-slate-800 z-0"></div>

                    <div className="flex flex-col">
                        {timelineData.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
