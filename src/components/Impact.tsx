import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight, Zap, ArrowRight, FolderOpen } from 'lucide-react';
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
        color: 'text-emerald-400',
        dot: 'bg-emerald-400',
    },
    'open-source': {
        label: 'Open Source',
        color: 'text-sky-400',
        dot: 'bg-sky-400',
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="w-full sm:max-w-lg bg-[#0a0f0a] border border-slate-800 rounded-t-2xl sm:rounded-2xl p-6 space-y-5 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
                            <span className={`text-xs font-mono ${s.color}`}>{s.label}</span>
                            <span className="text-slate-700 text-xs">· {project.year}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-600 hover:text-white transition-colors p-1 mt-0.5 shrink-0"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

                {/* Note */}
                {project.note && (
                    <p className="text-xs text-slate-600 italic border-l-2 border-slate-800 pl-3">
                        {project.note}
                    </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-1">
                    {project.links.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all rounded-lg font-mono"
                        >
                            <Zap size={14} />
                            View Live
                        </a>
                    )}
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm px-4 py-2 border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all rounded-lg"
                        >
                            <Github size={14} />
                            Source
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            onClick={onClick}
            className="group relative bg-[#070d07] border border-slate-800 rounded-xl p-5 cursor-pointer hover:border-primary/40 hover:shadow-[0_0_24px_rgba(0,255,65,0.07)] transition-all duration-200 flex flex-col gap-3"
        >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${project.status === 'live' ? 'animate-pulse' : ''}`} />
                        <span className={`text-xs font-mono ${s.color}`}>{s.label}</span>
                        <span className="text-slate-700 text-xs font-mono">· {project.year}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                </div>
                <ArrowUpRight
                    size={16}
                    className="text-slate-700 group-hover:text-primary transition-colors shrink-0 mt-1"
                />
            </div>

            {/* Description */}
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((tag, i) => (
                    <span
                        key={i}
                        className="px-2 py-0.5 text-xs font-mono bg-slate-900/80 border border-slate-800 text-slate-500 rounded group-hover:border-primary/20 group-hover:text-slate-400 transition-colors"
                    >
                        {tag}
                    </span>
                ))}
                {project.tags.length > 4 && (
                    <span className="text-xs text-slate-700 py-0.5">+{project.tags.length - 4}</span>
                )}
            </div>

            {/* Quick links */}
            <div className="flex items-center gap-3 pt-1 border-t border-slate-800/60">
                {hasDemo && (
                    <a
                        href={project.links.demo!}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-emerald-400/70 hover:text-emerald-400 transition-colors"
                    >
                        <ExternalLink size={12} />
                        Live site
                    </a>
                )}
                {hasGithub && (
                    <a
                        href={project.links.github!}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        <Github size={12} />
                        GitHub
                    </a>
                )}
                <span className="ml-auto text-xs text-slate-700">click to expand</span>
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
        <section id="projects" className="py-20 font-mono">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">

                {/* Terminal Header */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex flex-col gap-2 mb-6">
                        <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-mono">
                            // system_inventory
                        </span>
                        <div className="flex items-center gap-3">
                            <FolderOpen size={24} className="text-amber-500/80" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">
                                ~/projects/portfolio <span className="animate-pulse text-primary italic font-light ml-2">_cursor_active</span>
                            </h2>
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm max-w-md font-mono">
                        A mix of real products, research, and side projects — click any card to see more.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
                            Recent Repositories
                        </h3>
                        {repos.length > 0 && (
                            <span className="text-[10px] text-slate-600 font-mono">
                                {repos.length} nodes detected
                            </span>
                        )}
                    </div>

                    {loadingRepos ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <span className="text-[10px] text-primary/60 animate-pulse font-mono tracking-widest uppercase">Initializing_System...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="min-w-[500px]">
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
                    className="flex flex-col items-center gap-6 mt-16"
                >
                    <Link
                        to="/projects"
                        className="group flex items-center gap-2 px-6 py-3 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 rounded-full text-primary transition-all duration-300"
                    >
                        <span className="text-sm font-mono tracking-wide">View full project directory</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <p className="text-xs text-slate-700 font-mono">
                        more coming soon —{' '}
                        <a
                            href="https://github.com/iammsp-star"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-primary transition-colors"
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
