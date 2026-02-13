import { motion } from 'framer-motion';
import { Terminal, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const logData = [
    {
        timestamp: '2023-05-15 09:00:00',
        pid: 'edu_init',
        status: 'SUCCESS',
        message: 'Completed academic module: B.Tech in Data Science.',
        details: 'Specialized in Machine Learning, Deep Learning, and Big Data Analytics. Neural pathways established.',
        type: 'education'
    },
    {
        timestamp: '2024-02-10 14:30:22',
        pid: 'r&d_core',
        status: 'SUCCESS',
        message: 'Executed Research & Development protocols.',
        details: 'Published paper on "AI in Healthcare". Developed 3 end-to-end ML production systems for deployment.',
        type: 'tech'
    },
    {
        timestamp: '2025-01-01 00:00:01',
        pid: 'startup_launch',
        status: 'WARNING',
        message: 'Initialized Master Calisthenics Elite platform. High load detected.',
        details: 'Launched India’s first AI-driven Calisthenics platform. Scaled to 500+ users in 3 months. System stability: 99.9%.',
        type: 'founder'
    },
    {
        timestamp: 'CURRENT_TIME',
        pid: 'sys_main',
        status: 'RUNNING',
        message: 'Operating role: Full Stack AI Engineer.',
        details: 'Merging technical expertise with product vision to build the next generation of AI tools. Continuous integration active.',
        type: 'current'
    }
];

const LogEntry = ({ log, index }: { log: any; index: number }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SUCCESS': return 'text-primary';
            case 'WARNING': return 'text-secondary';
            case 'RUNNING': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };

    const getIcon = (status: string) => {
        switch (status) {
            case 'SUCCESS': return <CheckCircle size={14} />;
            case 'WARNING': return <AlertCircle size={14} />;
            case 'RUNNING': return <Clock size={14} className="animate-spin" />;
            default: return <Terminal size={14} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="font-mono text-xs md:text-sm border-l-2 border-slate-800 pl-4 pb-6 relative last:pb-0 group"
        >
            <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${log.status === 'RUNNING' ? 'bg-blue-400 animate-pulse' : log.status === 'WARNING' ? 'bg-secondary' : 'bg-primary'}`}></div>

            <div className="flex flex-wrap gap-2 md:gap-4 mb-1 text-slate-500 select-none">
                <span>[{log.timestamp}]</span>
                <span>[PID:{log.pid}]</span>
                <span className={`flex items-center gap-1 font-bold ${getStatusColor(log.status)}`}>
                    {getIcon(log.status)} {log.status}
                </span>
            </div>

            <div className="text-slate-300 mb-1 group-hover:text-white transition-colors">
                <span className="text-secondary">{`>>`}</span> {log.message}
            </div>

            <div className="text-slate-500 pl-6 border-l border-slate-800 ml-1">
                {log.details}
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <section id="experience" className="py-20 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="glass-card bg-black/80 border border-slate-800 p-6 md:p-8 rounded-lg shadow-2xl">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Terminal size={18} />
                            <span className="font-mono text-sm">/var/log/syslog</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
                        </div>
                    </div>

                    <div className="space-y-2 font-mono h-[500px] overflow-y-auto custom-scrollbar pr-2">
                        {logData.map((log, index) => (
                            <LogEntry key={index} log={log} index={index} />
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary animate-pulse pt-4"
                        >
                            <span className="mr-2">_</span>
                            <span className="text-slate-500">Waiting for new input...</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
