import { motion } from 'framer-motion';
import { FileCode, Folder, ExternalLink, Github } from 'lucide-react';

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

const TerminalRepoList = ({ repos }: { repos: Repo[] }) => {
    const formatSize = (kb: number) => {
        if (kb < 1024) return `${kb}KB`;
        return `${(kb / 1024).toFixed(1)}MB`;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="w-full bg-[#050505] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">
            {/* Table Header */}
            <div className="grid grid-cols-[140px_80px_100px_100px_1fr] px-6 py-3 border-b border-slate-800 bg-slate-900/40 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <div>Permissions</div>
                <div>Size</div>
                <div>User</div>
                <div>Date</div>
                <div>Name</div>
            </div>

            {/* Table Body */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-slate-800/50"
            >
                {repos.map((repo) => (
                    <motion.div
                        key={repo.id}
                        variants={itemVariants}
                        className="grid grid-cols-[140px_80px_100px_100px_1fr] px-6 py-3 items-center hover:bg-primary/5 transition-colors group cursor-default"
                    >
                        {/* Permissions */}
                        <div className="text-slate-600">
                            {repo.language ? '-rwxr-xr-x' : '-rw-r--r--'}
                        </div>

                        {/* Size */}
                        <div className="text-slate-500">
                            {formatSize(repo.size)}
                        </div>

                        {/* User */}
                        <div className="text-amber-500/80">founder</div>

                        {/* Date */}
                        <div className="text-slate-500">
                            {formatDate(repo.updated_at)}
                        </div>

                        {/* Name & Links */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {repo.language ? (
                                    <FileCode size={16} className="text-primary/70" />
                                ) : (
                                    <Folder size={16} className="text-primary/70" />
                                )}
                                <span className="text-slate-200 group-hover:text-primary transition-colors font-bold truncate max-w-[200px]">
                                    {repo.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                {repo.homepage && (
                                    <a
                                        href={repo.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-primary transition-colors p-1"
                                        title="View Live"
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors p-1"
                                    title="View Source"
                                >
                                    <Github size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Loading/Empty State placeholder dots like in the image */}
                {[...Array(3)].map((_, i) => (
                    <div key={`dot-${i}`} className="grid grid-cols-[140px_80px_100px_100px_1fr] px-6 py-3 text-slate-800">
                        <div>----------</div>
                        <div>----</div>
                        <div>----</div>
                        <div>------</div>
                        <div>...</div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default TerminalRepoList;
