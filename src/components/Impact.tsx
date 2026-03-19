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
        highlights: [
            "Processed thousands of fitness data points",
            "Deployed scalable backend on AWS",
            "Integrated real-time user progress tracking"
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
        highlights: [
            "Implemented Retrieval Augmented Generation",
            "Fine-tuned vector database embeddings",
            "Reduced hallucination rates significantly"
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
        highlights: [
            "Built dynamic 3D physics with Three.js",
            "Implemented custom CSS CRT Shaders",
            "Optimized 60fps scrolling performance"
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
        highlights: [
            "Direct hardware interfacing in browser",
            "Zero-latency visual feedback",
            "Mobile-responsive gaming UI"
        ]
    }
];

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
                    TECHNOLOGIES: {project.tags}
                </span>
            </div>

            <div className="flex gap-3 pt-2 pb-4">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all">
                    [ VIEW PROJECT ]
                </a>
            </div>

            {/* Clean clear highlights instead of fake ASCII text */}
            <div className="mt-2 p-3 bg-black border border-terminal-border/20 rounded-sm font-mono text-xs text-primary/80">
                <h4 className="text-secondary mb-2 uppercase tracking-widest text-[10px]">Key Achievements:</h4>
                <ul className="flex flex-col gap-1 list-disc pl-4 text-slate-400">
                    {project.highlights.map((highlight, i) => (
                        <motion.li 
                            initial={{ opacity: 0, x: -10 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            transition={{ delay: i * 0.15 }} 
                            key={i}
                        >
                            {highlight}
                        </motion.li>
                    ))}
                </ul>
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
                
                {/* Clean Header */}
                <div className="mb-12 border-l border-terminal-border/40 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-secondary">&gt;</span>
                        <span className="text-white text-xl font-bold uppercase tracking-widest">[ FEATURED PROJECTS ]</span>
                    </div>
                    <p className="text-slate-400 max-w-2xl text-sm leading-relaxed mt-4">
                        A showcase of my major applications, data science models, and research deployments.
                    </p>
                </div>

                {/* Project List */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-1"
                >
                    {projects.map((project) => (
                        <div key={project.id} className="flex flex-col">
                            <div 
                                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                                className="hover:bg-primary/5 cursor-pointer py-2 transition-colors group flex items-center border-b border-terminal-border/10"
                            >
                                <div className="flex items-center gap-2 text-primary group-hover:text-white transition-colors text-sm sm:text-base">
                                    <span className="text-accent/50">{expandedId === project.id ? '[-]' : '[+]'}</span> 
                                    <span className="font-bold">{project.dirName}</span>
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
                    className="mt-16 pt-8 border-t border-terminal-border/20"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-secondary">&gt;</span>
                        <span className="font-bold text-white uppercase">[ RECENT GITHUB ACTIVITY ]</span>
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
