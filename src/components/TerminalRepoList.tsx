import { Bot, GitBranch, Star, Terminal } from 'lucide-react';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
    size: number;
}

const TerminalRepoList = ({ repos }: { repos: Repo[] }) => {
    return (
        <div className="w-full font-sans overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-white/10 text-xs font-mono text-slate-400 uppercase tracking-widest bg-white/5">
                <div className="col-span-4 md:col-span-3">Repository</div>
                <div className="col-span-5 md:col-span-4 hidden md:block">Description</div>
                <div className="col-span-4 md:col-span-2 text-center">Tech Stack</div>
                <div className="col-span-4 md:col-span-3 text-right">Metrics</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
                {repos.map((repo) => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-white/5 transition-colors group cursor-pointer items-center relative"
                    >
                        {/* Hover accent line */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>

                        {/* Repo Name */}
                        <div className="col-span-6 md:col-span-3 flex flex-col gap-1 pr-2">
                            <span className="text-white font-medium group-hover:text-primary transition-colors truncate flex items-center gap-2">
                                <Terminal size={12} className="text-primary hidden md:inline" />
                                {repo.name}
                            </span>
                            <span className="text-[10px] text-slate-600 font-mono">
                                {new Date(repo.updated_at).toISOString().split('T')[0]}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="col-span-6 md:col-span-4 hidden md:flex items-center text-sm text-slate-400 font-light pr-4 pb-1">
                            <p className="truncate w-full">{repo.description || 'No description provided.'}</p>
                        </div>

                        {/* Tech Stack */}
                        <div className="col-span-3 md:col-span-2 flex items-center justify-center">
                            {repo.language ? (
                                <span className="px-2 py-1 text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 rounded-md whitespace-nowrap">
                                    {repo.language}
                                </span>
                            ) : (
                                <span className="text-slate-600 text-[10px] font-mono whitespace-nowrap">Unknown</span>
                            )}
                        </div>

                        {/* Metrics */}
                        <div className="col-span-3 md:col-span-3 flex items-center justify-end gap-3 text-xs text-slate-400 font-mono">
                            {repo.stargazers_count > 0 && (
                                <span className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                                    <Star size={12} />
                                    {repo.stargazers_count}
                                </span>
                            )}
                            {repo.forks_count > 0 && (
                                <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                                    <GitBranch size={12} />
                                    {repo.forks_count}
                                </span>
                            )}
                            <span className="text-slate-600 whitespace-nowrap hidden sm:block">
                                {(repo.size / 1024).toFixed(1)} MB
                            </span>
                        </div>
                    </a>
                ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-white/10 px-4 py-2 bg-background flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                <span>Total Nodes: {repos.length}</span>
                <span className="flex items-center gap-2 shadow-[0_0_8px_rgba(59,130,246,0.5)] bg-primary/20 px-2 py-0.5 rounded text-primary">
                    <Bot size={10} /> Automated Sync
                </span>
            </div>
        </div>
    );
};

export default TerminalRepoList;
