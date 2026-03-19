import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalRepoList from './TerminalRepoList';

const projects = [
    {
        id: 'MCI',
        dirName: 'MASTER_CALISTHENICS_INDIA',
        type: 'freelance',
        tags: 'Python, FastAPI, React, PostgreSQL, AI/ML',
        description: "India's first AI-driven calisthenics coaching platform. Built personalised 4-week training plans with a Random Forest model.",
        status: 'UP_AND_RUNNING',
        link: 'https://mastercalisthenicsindia.com',
        note: 'My own startup — built everything from scratch.',
        logs: [
            "[MCI] LOG: Processing pose data...",
            "[MCI] LOG: Predictive model applied...",
            "[MCI] LOG: Recommendations updated [SUCCESS]"
        ]
    },
    {
        id: 'MENTAL_HEALTH_RAG',
        dirName: 'MENTAL_HEALTH_RAG',
        type: 'research',
        tags: 'Python, LangChain, RAG, ChromaDB, OpenAI',
        description: 'Conversational AI answering mental health queries pulling context from wellness literature.',
        status: 'OPEN_SOURCE',
        link: 'https://github.com/iammsp-star/Mental-Health-RAG',
        note: 'Research project — published paper on AI in Healthcare.',
        logs: [
            "[RAG] SYS: Initializing HuggingFace Embeddings...",
            "[RAG] SYS: Vector DB Connection established.",
            "[RAG] INFO: Query retrieved context [OK]"
        ]
    },
    {
        id: 'PORTFOLIO_OS',
        dirName: 'PORTFOLIO_OS',
        type: 'core',
        tags: 'React, TypeScript, Vite, Tailwind',
        description: 'This site. A 3D terminal-themed portfolio rendering interactive data.',
        status: 'ACTIVE_PROCESS',
        link: 'https://github.com/iammsp-star/portfolio-website',
        note: 'You\'re looking at it.',
        logs: [
            "[OS] RENDER: CRT Shader active...",
            "[OS] INFO: Accessing root permissions... FAILED",
            "[OS] RENDER: Display stable."
        ]
    },
    {
        id: 'CONTROL_CENTER',
        dirName: 'CONTROL_CENTER_GUIDE',
        type: 'app',
        tags: 'HTML, CSS, JavaScript, Gamepad API',
        description: 'Interactive web guide for newcomers to controller gaming. Uses Gamepad API.',
        status: 'LIVE',
        link: 'https://github.com/iammsp-star/Control-Center-Guide',
        note: 'Built for casual gamers who are just starting out.',
        logs: [
            "[CCG] EVENT: Gamepad connected.",
            "[CCG] EVENT: Button X pressed.",
            "[CCG] SYSTEM: Mapping successful."
        ]
    }
];

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

const ProjectExpandedView = ({ project }: { project: typeof projects[0] }) => {
    return (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pl-4 sm:pl-8 border-l border-terminal-border/40 mt-2 mb-6 space-y-3 overflow-hidden text-sm"
        >
            <div className="flex gap-4 mb-2 text-slate-300">
                <span className="text-secondary font-bold">[{project.id}]</span>
                <span>STATUS: <span className="text-primary animate-pulse">{project.status}</span></span>
            </div>
            
            <p className="text-slate-400 max-w-3xl leading-relaxed">
                {project.description}
            </p>
            
            <div className="text-slate-500 italic border-l-2 border-slate-700 pl-3">
                {project.note}
            </div>

            <div className="flex items-center gap-2 pt-2">
                <span className="bg-terminal-dim px-2 py-1 text-xs rounded-sm border border-terminal-border/30">
                    MODULES: {project.tags}
                </span>
            </div>

            <div className="flex gap-3 pt-2">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all">
                    [ EXECUTE_LINK ]
                </a>
            </div>

            <div className="mt-4 p-3 bg-black flex gap-4 border border-terminal-border/20 rounded-sm font-mono text-xs text-primary/70">
                {/* Simulated Schematic Area (Static ASCII block) */}
                <div className="hidden md:block whitespace-pre text-[8px] leading-tight text-accent/50 border-r border-terminal-border/30 pr-4">
{`   _  _
  ( \/ )
   \  /
   /  \\
  / /\ \\
 / /  \ \\`}
                </div>
                
                <div className="flex flex-col gap-1 justify-center">
                    {project.logs.map((log, i) => (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            transition={{ delay: i * 0.2 }} 
                            key={i}
                        >
                            {log}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Impact = () => {
    const [expandedId, setExpandedId] = useState<string | null>('MCI');
    const [repos, setRepos] = useState<any[]>([]);

    React.useEffect(() => {
        fetch('https://api.github.com/users/iammsp-star/repos?sort=updated&per_page=100')
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)) setRepos(data.slice(0, 8));
            })
            .catch(console.error);
    }, []);

    return (
        <section id="projects" className="py-12 border-b border-terminal-border/30 font-mono">
            <div className="container mx-auto px-6 max-w-5xl">
                
                {/* Command Input Sequence */}
                <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-secondary">msp-star@OS:~$</span>
                        <TypewriterText text="cd projects/freelance" delay={200} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-secondary">msp-star@OS:~/projects/freelance$</span>
                            <TypewriterText text="ls -al" delay={1200} />
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
                        <div className="col-span-2">PERMS</div>
                        <div className="col-span-1">OWNER</div>
                        <div className="col-span-2">SIZE</div>
                        <div className="col-span-7">NAME</div>
                    </div>

                    {projects.map((project) => (
                        <div key={project.id} className="flex flex-col">
                            <div 
                                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                                className="grid grid-cols-1 sm:grid-cols-12 hover:bg-primary/5 cursor-pointer py-1 transition-colors group items-center"
                            >
                                <div className="col-span-2 text-slate-600 hidden sm:block">drwxr-xr-x</div>
                                <div className="col-span-1 text-slate-600 hidden sm:block">root</div>
                                <div className="col-span-2 text-slate-600 hidden sm:block">4096</div>
                                <div className="col-span-12 sm:col-span-7 flex items-center gap-2 text-primary group-hover:text-white transition-colors">
                                    <span className="text-accent/50">{expandedId === project.id ? '[-]' : '[+]'}</span> 
                                    <span className="font-bold">dir: {project.dirName} [{project.id}]</span>
                                </div>
                            </div>
                            
                            <AnimatePresence>
                                {expandedId === project.id && <ProjectExpandedView project={project} />}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>

                {/* GitHub Automatic Sync */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-secondary">msp-star@OS:~/projects$</span>
                        <span>./fetch_github_nodes.sh</span>
                    </div>
                    {repos.length > 0 ? (
                        <div className="pl-4 border-l border-terminal-border/20">
                            <TerminalRepoList repos={repos} />
                        </div>
                    ) : (
                        <div className="pl-4 text-slate-500 animate-pulse">Establishing secure connection to GitHub API...</div>
                    )}
                </motion.div>

            </div>
        </section>
    );
};

export default Impact;
