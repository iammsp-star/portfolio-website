import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

const skillModules = [
    { name: 'python_core', version: 'v3.12', status: 'LOADED', color: 'text-primary' },
    { name: 'fastapi_routing', version: 'v0.103', status: 'LOADED', color: 'text-primary' },
    { name: 'react_ui', version: 'v18.2', status: 'LOADED', color: 'text-accent' },
    { name: 'typescript_compiler', version: 'v5.2', status: 'LOADED', color: 'text-accent' },
    { name: 'postgres_db', version: 'v15.0', status: 'CONNECTED', color: 'text-secondary' },
    { name: 'scikit_learn', version: 'v1.3', status: 'LOADED', color: 'text-secondary' },
    { name: 'pytorch_tensor', version: 'v2.1', status: 'INITIALIZING', color: 'text-yellow-400' },
    { name: 'huggingface_hub', version: 'v0.17', status: 'CONNECTED', color: 'text-primary' },
    { name: 'chromadb_vector', version: 'v0.4', status: 'LOADED', color: 'text-secondary' },
    { name: 'calisthenics_engine', version: 'v1.0', status: 'OPTIMIZED', color: 'text-green-300' },
];

const SkillsBento = () => {
    return (
        <section id="skills" className="py-12 border-b border-terminal-border/30 font-mono">
            <div className="container mx-auto px-6 max-w-5xl">
                
                {/* Command Input Sequence */}
                <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-secondary">msp-star@OS:~$</span>
                        <TypewriterText text="sysctl --list-modules" delay={200} />
                    </div>
                </div>

                {/* Module List Output */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="bg-terminal-dim/20 p-4 border border-terminal-border/20 rounded-sm"
                >
                    <div className="grid grid-cols-12 text-slate-500 text-xs border-b border-terminal-border/20 pb-2 mb-4">
                        <div className="col-span-6 sm:col-span-4">MODULE_NAME</div>
                        <div className="col-span-3 sm:col-span-4">VERSION</div>
                        <div className="col-span-3 sm:col-span-4 text-right sm:text-left">STATE</div>
                    </div>

                    <div className="space-y-1">
                        {skillModules.map((mod, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.2 + (idx * 0.1) }}
                                className="grid grid-cols-12 text-sm hover:bg-primary/10 transition-colors py-0.5"
                            >
                                <div className={`col-span-6 sm:col-span-4 ${mod.color}`}>{mod.name}</div>
                                <div className="col-span-3 sm:col-span-4 text-slate-400">{mod.version}</div>
                                <div className="col-span-3 sm:col-span-4 text-right sm:text-left">
                                    <span className={mod.status === 'INITIALIZING' ? 'animate-pulse text-yellow-400' : 'text-primary/70'}>
                                        [{mod.status}]
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.5 }}
                        className="mt-6 text-xs text-slate-500 border-t border-terminal-border/20 pt-2"
                    >
                        Total modules dynamically loaded: {skillModules.length}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsBento;
