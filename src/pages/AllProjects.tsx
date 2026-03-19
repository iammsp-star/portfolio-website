import { useState, useEffect } from 'react';
import { ArrowLeft, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import TerminalRepoList from '../components/TerminalRepoList';

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

    return (
        <div className="min-h-screen relative z-10 py-16 px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-16 group px-4 py-2 rounded-xl glass-card border border-white/5 hover:bg-white/5">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Return to Nexus</span>
                </Link>

                <div className="mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest mb-2">
                        <Code size={14} /> Global Directory
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                        All Neural Nodes
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
                        A complete inventory of system repositories, experimental modules, and data architectures, synchronized seamlessly with remote networks.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <span className="text-sm text-primary/60 font-mono tracking-widest uppercase animate-pulse">Syncing_Nodes...</span>
                    </div>
                ) : (
                    <div className="glass-card rounded-2xl border border-white/5 p-1 overflow-hidden shadow-2xl">
                        <TerminalRepoList repos={repos} />
                    </div>
                )}

                {/* Footer decorations */}
                <div className="mt-12 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest border-t border-white/10 pt-6 font-mono">
                    <span className="flex items-center gap-2 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span> Nodes: {repos.length}</span>
                    <span className="hidden sm:block">Status: Optimal</span>
                    <span>Sync timestamp: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};
