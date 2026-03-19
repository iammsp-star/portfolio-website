import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
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
        <div className="font-mono text-primary p-6">
            <div className="max-w-7xl mx-auto">
                
                <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>cd ..</span>
                </Link>

                <div className="mb-12 border-l border-terminal-border/40 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-secondary">&gt;</span>
                        <span className="text-white text-xl font-bold uppercase tracking-widest">[ ALL GITHUB REPOSITORIES ]</span>
                    </div>
                    <p className="text-slate-400 max-w-2xl text-sm leading-relaxed mt-4">
                        A complete inventory of my open-source projects, experiments, and code repositories hosted on GitHub.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="animate-pulse">FETCHING_REMOTE_DATA... [ PLEASE WAIT ]</div>
                    </div>
                ) : (
                    <div className="border border-terminal-border/20 p-4 bg-terminal-dim/10">
                        <TerminalRepoList repos={repos} />
                    </div>
                )}

                <div className="mt-8 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest border-t border-terminal-border/20 pt-4">
                    <span>TOTAL_NODES: {repos.length}</span>
                    <span className="hidden sm:block">STATUS: SYNCED</span>
                    <span>TIMESTAMP: {new Date().toISOString()}</span>
                </div>
            </div>
        </div>
    );
};
