import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight, Zap, ArrowRight, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import TerminalRepoList from './TerminalRepoList';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
    size: number;
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects = [
    {
        id: 1,
        title: 'Master Calisthenics India',
        description:
            "India's first AI-driven calisthenics coaching platform. Built personalised 4-week training plans with a Random Forest model, automated check-ins, and WhatsApp follow-ups. Scaled to 500+ active users.",
        tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'AI/ML'],
        status: 'live',
        links: {
            demo: 'https://mastercalisthenicsindia.com',
            github: null,
        },
        year: '2025',
        note: 'My own startup — built everything from scratch.',
    },
    {
        id: 2,
        title: 'Mental Health RAG',
        description:
            'A conversational AI that answers mental health queries by pulling relevant context from a curated knowledge base of wellness literature. Uses HuggingFace embeddings and ChromaDB for retrieval.',
        tags: ['Python', 'LangChain', 'RAG', 'ChromaDB', 'OpenAI'],
        status: 'open-source',
        links: {
            demo: null,
            github: 'https://github.com/iammsp-star/Mental-Health-RAG',
        },
        year: '2024',
        note: 'Research project — published paper on AI in Healthcare.',
    },
    {
        id: 3,
        title: 'Portfolio OS',
        description:
            "This site. A terminal-themed portfolio built with React 18, Framer Motion, and Vite. Has a Pac-Man game in the footer, animated section reveals, and a code-viewer for each project.",
        tags: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind'],
        status: 'live',
        links: {
            demo: 'https://iammsp-star.github.io/portfolio-website/',
            github: 'https://github.com/iammsp-star/portfolio-website',
        },
        year: '2025',
        note: 'You\'re looking at it.',
    },
    {
        id: 4,
        title: 'Control Center Guide',
        description:
            'An interactive web guide for newcomers to controller gaming. Uses the browser Gamepad API to detect real button presses and map them to on-screen tutorials in real time.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Gamepad API'],
        status: 'live',
        links: {
            demo: 'https://iammsp-star.github.io/Control-Center-Guide/',
            github: 'https://github.com/iammsp-star/Control-Center-Guide',
        },
        year: '2024',
        note: 'Built for casual gamers who are just starting out.',
    },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
    live: {
        label: 'Live',
        color: 'text-primary',
        dot: 'bg-primary',
    },
    'open-source': {
        label: 'Open Source',
        color: 'text-secondary',
        dot: 'bg-secondary',
    },
    wip: {
        label: 'In Progress',
        color: 'text-yellow-400',
        dot: 'bg-yellow-400',
    },
};

type Project = (typeof projects)[0];

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const s = STATUS_CONFIG[project.status] ?? STATUS_CONFIG['live'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full max-w-2xl glass-card rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background glow for modal */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4 relative z-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${s.dot} shadow-[0_0_8px_currentColor]`} />
                            <span className={`text-xs font-mono tracking-widest uppercase ${s.color}`}>{s.label}</span>
                            <span className="text-slate-500 text-xs font-mono">· {project.year}</span>
                        </div>
                        <h2 className="text-3xl font-display font-medium text-white">{project.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-base leading-relaxed font-light relative z-10">
                    {project.description}
                </p>

                {/* Note */}
                {project.note && (
                    <div className="relative z-10 glass-card bg-primary/5 border-primary/20 p-4 rounded-xl">
                        <p className="text-sm text-slate-300 italic flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary/50"></span>
                            {project.note}
                        </p>
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-lg"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-white/10 relative z-10">
                    {project.links.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm px-6 py-3 bg-primary/10 border border-primary/30 text-white hover:bg-primary hover:text-black transition-all rounded-xl font-medium shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                        >
                            <Zap size={16} />
                            Initialize Live Preview
                        </a>
                    )}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm px-6 py-3 border border-white/20 text-slate-300 hover:border-white hover:text-white transition-all rounded-xl font-medium"
                        >
                            <Github size={16} />
                            View Source Nodes
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard = ({
    project,
    onClick,
}: {
    project: Project;
    onClick: () => void;
}) => {
    const s = STATUS_CONFIG[project.status] ?? STATUS_CONFIG['live'];
    const hasDemo = !!project.links.demo;
    const hasGithub = !!project.links.github;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            className="group relative glass-card rounded-2xl p-6 cursor-pointer border border-white/5 hover:border-primary/40 transition-all duration-300 hover-magnetic flex flex-col gap-4 overflow-hidden h-full"
        >
            {/* Ambient hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Top row */}
            <div className="flex items-start justify-between gap-3 relative z-10">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shadow-[0_0_8px_currentColor]`} />
                        <span className={`text-[10px] font-mono tracking-widest uppercase ${s.color}`}>{s.label}</span>
                    </div>
                    <h3 className="text-xl font-display font-medium text-white group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ArrowUpRight
                        size={16}
                        className="text-slate-400 group-hover:text-primary transition-colors shrink-0"
                    />
                </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-3 relative z-10 flex-grow">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 relative z-10">
                {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-lg group-hover:border-primary/20 group-hover:text-white transition-colors"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Quick links */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10 mt-auto">
                <div className="flex gap-4">
                    {hasDemo && (
                        <div className="flex items-center gap-1.5 text-xs text-primary/70 group-hover:text-primary transition-colors">
                            <ExternalLink size={14} />
                            Deploy
                        </div>
                    )}
                    {hasGithub && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                            <Github size={14} />
                            Source
                        </div>
                    )}
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Execute</span>
            </div>
        </motion.div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Impact = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loadingRepos, setLoadingRepos] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/iammsp-star/repos?sort=updated&per_page=100');
                const data = await response.json();
                setRepos(data);
                setLoadingRepos(false);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setLoadingRepos(false);
            }
        };

        fetchRepos();
    }, []);

    return (
        <section id="projects" className="py-32 relative font-sans">
            {/* Ambient Background */}
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-4">
                        <Code size={14} /> Executed Protocols
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                        Impact & Solutions
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                        A collection of weightless systems, data architectures, and fully deployed products.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-20 max-w-5xl mx-auto">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                {/* Full Repository List */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-lg font-display font-medium text-white tracking-wide">
                            Open Source Nodes
                        </h3>
                        {repos.length > 0 && (
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
                                {repos.length} REPOSITORIES
                            </span>
                        )}
                    </div>

                    {loadingRepos ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <span className="text-sm text-primary/60 animate-pulse font-mono tracking-widest uppercase">Fetching_Data_Points...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto glass-card rounded-2xl border border-white/5 p-1">
                            <div className="min-w-[700px]">
                                <TerminalRepoList repos={repos.slice(0, 8)} />
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-6 mt-20"
                >
                    <Link
                        to="/projects"
                        className="group flex items-center gap-3 px-8 py-4 glass-card border border-primary/30 hover:bg-primary/10 hover:border-primary/50 rounded-xl text-white transition-all duration-300 hover-magnetic"
                    >
                        <span className="font-medium">Access Full Directory</span>
                        <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <p className="text-sm text-slate-500 font-light">
                        Source code available at{' '}
                        <a
                            href="https://github.com/iammsp-star"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-white transition-colors"
                        >
                            github.com/iammsp-star
                        </a>
                    </p>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Impact;
