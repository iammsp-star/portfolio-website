import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap } from 'lucide-react';

const timelineData = [
    {
        year: '2025: Current',
        title: 'Founder & Head Coach',
        company: 'Master Calisthenics India',
        description: 'Managing operations and coaching elite calisthenics routines. Building platforms blending fitness with data.',
        icon: Briefcase,
    },
    {
        year: '2024: September',
        title: 'Freelance Software Developer',
        company: 'Independent',
        description: 'Developing AI wrappers and custom full-stack solutions for specialized client needs, leveraging modern web frameworks and LLMs.',
        icon: Briefcase,
    },
    {
        year: '2024: July',
        title: 'Student: BSc Data Science',
        company: 'School of Data Science and Business Intelligence',
        description: 'Rigorous academic focus on machine learning algorithms, statistical modeling, and scalable database architectures.',
        icon: GraduationCap,
    },
    {
        year: '2023 - 2024',
        title: 'Fitness Instructor',
        company: 'Xcore Fitness',
        description: 'Led group and individual physical training sessions with a data-driven approach to athlete progression records.',
        icon: Briefcase,
    }
];

const TimelineCard = ({ item, index }: any) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`flex flex-col md:flex-row gap-8 items-center md:items-start group w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Timeline Node */}
            <div className="hidden md:flex flex-col items-center relative z-10 w-24">
                <div className="w-12 h-12 rounded-full glass-card border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <item.icon size={20} className="text-white/70 group-hover:text-white" />
                </div>
            </div>

            {/* Content Card */}
            <div className={`flex-1 w-full relative ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                {/* Connecting Line (Desktop) */}
                <div className={`hidden md:block absolute top-[24px] w-8 h-px bg-white/10 group-hover:bg-primary/50 transition-colors ${isEven ? 'right-[-4rem]' : 'left-[-4rem]'}`}></div>

                <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 group-hover:border-primary/30 transition-all duration-300 hover-magnetic bg-background/40 backdrop-blur-md">
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Calendar size={14} className="text-primary" />
                        <span className="text-primary font-mono text-sm tracking-widest">{item.year}</span>
                    </div>
                    <h3 className="text-2xl font-display font-medium text-white mb-2">{item.title}</h3>
                    <h4 className="text-lg text-slate-300 font-light mb-4">{item.company}</h4>
                    <p className="text-slate-400 leading-relaxed font-light">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <section id="timeline" className="py-32 relative font-sans">
            {/* Background elements */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2"></div>
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-4">
                        Historical Data
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                        Experience Timeline
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                        Chronological execution logs detailing professional momentum and skill acquisition.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Central Axis Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"></div>

                    <div className="space-y-12 md:space-y-24">
                        {timelineData.map((item, index) => (
                            <TimelineCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
