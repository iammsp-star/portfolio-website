import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    React.useEffect(() => {
        let i = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 30);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

const timelineData = [
    {
        id: 'central_hub',
        status: 'ENROLLED',
        joined: 'JULY 2025',
        modules: ['DEEP_LEARNING', 'PREDICTIVE_ANALYTICS', 'STATISTICAL_INFERENCE'],
        title: '[SDSBI] SCHOOL OF DATA SCIENCE AND BUSINESS INTELLIGENCE',
        logs: [
            "Initializing academic core...",
            "Loading mathematical foundation arrays [OK]",
            "Establishing data pipelines... [OK]"
        ]
    },
    {
        id: 'independent',
        status: 'ACTIVE',
        joined: 'SEPT 2024',
        modules: ['AI_WRAPPERS', 'FULL_STACK_DEV', 'LLM_INTEGRATION'],
        title: 'FREELANCE SOFTWARE DEVELOPER',
        logs: [
            "Bypassing standard employment protocols...",
            "Injecting custom client solutions...",
            "Deploying scalable architectures [OK]"
        ]
    },
    {
        id: 'xcore_fitness',
        status: 'ARCHIVED',
        joined: '2023-2024',
        modules: ['PHYSICAL_TRAINING', 'DATA_DRIVEN_COACHING', 'ATHLETE_RECORDS'],
        title: 'FITNESS INSTRUCTOR',
        logs: [
            "Logging physical stress tests...",
            "Compiling athlete progression metrics...",
            "Connection terminated."
        ]
    }
];

const TimelineExpandedView = ({ item }: { item: typeof timelineData[0] }) => {
    return (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pl-4 sm:pl-8 border-l border-terminal-border/40 mt-2 mb-4 space-y-2 overflow-hidden text-sm"
        >
            <div className="text-secondary tracking-widest uppercase pb-2">{item.title}</div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-slate-400">
                <span>STATUS: <span className={item.status === 'ENROLLED' || item.status === 'ACTIVE' ? 'text-primary' : 'text-slate-500'}>{item.status}</span></span>
                <span>JOINED: {item.joined}</span>
            </div>
            <div className="text-slate-400 pt-1">
                MODULES: <span className="text-accent">{item.modules.join(', ')}</span>
            </div>
            <div className="mt-4 p-2 bg-terminal-dim/30 border border-terminal-border/20 rounded-sm font-mono text-xs text-primary/70">
                {item.logs.map((log, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ delay: i * 0.2 }} 
                        key={i}
                    >
                        {'> '} {log}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    const [expandedId, setExpandedId] = useState<string | null>('central_hub');

    return (
        <section id="experience" className="py-12 border-b border-terminal-border/30 font-mono">
            <div className="container mx-auto px-6 max-w-5xl">
                
                {/* Command Input Sequence */}
                <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-secondary">msp-star@OS:~$</span>
                        <TypewriterText text="cd education/timelines" delay={200} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-secondary">msp-star@OS:~/education/timelines$</span>
                            <TypewriterText text="ls -l" delay={1200} />
                        </div>
                    </motion.div>
                </div>

                {/* Directory Dump */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.2 }}
                    className="space-y-1"
                >
                    <div className="grid grid-cols-12 text-slate-500 text-xs border-b border-terminal-border/20 pb-2 mb-4 hidden sm:grid">
                        <div className="col-span-2">PERMISSIONS</div>
                        <div className="col-span-2">SIZE</div>
                        <div className="col-span-8">DIRECTORY / FILE</div>
                    </div>

                    {timelineData.map((item) => (
                        <div key={item.id} className="flex flex-col">
                            <div 
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                className="grid grid-cols-1 sm:grid-cols-12 hover:bg-primary/5 cursor-pointer py-1 transition-colors group items-center"
                            >
                                <div className="col-span-2 text-slate-600 hidden sm:block">drwxr-xr-x</div>
                                <div className="col-span-2 text-slate-600 hidden sm:block">4096</div>
                                <div className="col-span-12 sm:col-span-8 flex items-center gap-2 text-primary group-hover:text-white transition-colors">
                                    <span className="text-accent/50">{expandedId === item.id ? '[-]' : '[+]'}</span> 
                                    <span className="font-bold">dir: {item.id.toUpperCase()}</span>
                                </div>
                            </div>
                            
                            <AnimatePresence>
                                {expandedId === item.id && <TimelineExpandedView item={item} />}
                            </AnimatePresence>
                        </div>
                    ))}

                </motion.div>
            </div>
        </section>
    );
};

export default Timeline;
