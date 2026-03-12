import { useState, useEffect } from 'react';
import { ArrowLeft, FolderOpen } from 'lucide-react';
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
        <div className="min-h-screen relative z-10 py-12 px-6 font-mono">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">cd ..</span>
                </Link>

                <div className="mb-12">
                    <div className="flex flex-col gap-2 mb-8">
                        <span className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">Current_Dir</span>
                        <div className="flex items-center gap-3">
                            <FolderOpen size={24} className="text-amber-500/80" />
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-200">
                                ~/projects/portfolio <span className="animate-pulse text-primary italic font-light ml-2">_cursor_active</span>
                            </h1>
                        </div>
                    </div>

                    <p className="text-slate-500 max-w-2xl text-sm leading-relaxed mb-12">
                        A complete inventory of system repositories and experimental modules, 
                        synchronized with remote GitHub services.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        <span className="text-xs text-primary/60 animate-pulse font-mono">FETCHING_REMOTE_DATA...</span>
                    </div>
                ) : (
                    <TerminalRepoList repos={repos} />
                )}

                {/* Footer decorations */}
                <div className="mt-8 flex justify-between items-center text-[10px] text-slate-700 uppercase tracking-widest border-t border-slate-900 pt-4">
                    <span>Total Nodes: {repos.length}</span>
                    <span>Status: Optimized</span>
                    <span>Last Sync: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};
