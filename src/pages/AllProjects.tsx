import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft, Star, GitFork, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

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
}

export const AllProjects = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/iammsp-star/repos?sort=updated&per_page=100');
                const data = await response.json();
                setRepos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen relative z-10 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    <span className="text-primary">/projects</span> directory
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 max-w-2xl mb-16 text-lg"
                >
                    A complete collection of my open source work, experiments, and contributions.
                    fetched directly from GitHub.
                </motion.p>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {repos.map((repo) => (
                            <motion.div
                                key={repo.id}
                                variants={itemVariants}
                                className="glass-card group relative p-6 flex flex-col h-full border border-slate-700/50 hover:border-primary/50 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <Github className="text-secondary" size={24} />
                                    <div className="flex gap-3">
                                        {repo.homepage && (
                                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors truncate">
                                    {repo.name}
                                </h3>

                                <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow line-clamp-3">
                                    {repo.description || 'No description available'}
                                </p>

                                <div className="space-y-4 mt-auto">
                                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-mono">
                                        {repo.language && (
                                            <span className="flex items-center gap-1.5 text-slate-300">
                                                <span className="w-2 h-2 rounded-full bg-primary/80"></span>
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Star size={14} />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GitFork size={14} />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-700/30 text-xs text-slate-500 flex items-center gap-2">
                                        <Calendar size={14} />
                                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};
