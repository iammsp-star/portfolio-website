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
        <div className="w-full font-mono text-sm">
            <div className="grid grid-cols-12 text-slate-500 text-xs border-b border-terminal-border/20 pb-2 mb-2">
                <div className="col-span-4">NODE_REF</div>
                <div className="col-span-2 hidden sm:block">SIZE</div>
                <div className="col-span-2">LANG</div>
                <div className="col-span-2 text-right">STARS</div>
                <div className="col-span-2 sm:col-span-2 text-right">METRICS</div>
            </div>

            <div className="space-y-1">
                {repos.map((repo) => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid grid-cols-12 hover:bg-primary/10 transition-colors py-1 group cursor-pointer"
                    >
                        <div className="col-span-4 text-primary group-hover:text-white truncate pr-2">
                            {repo.name}
                        </div>
                        <div className="col-span-2 hidden sm:block text-slate-400">
                            {(repo.size / 1024).toFixed(1)}M
                        </div>
                        <div className="col-span-2 text-accent">
                            {repo.language || 'SYS'}
                        </div>
                        <div className="col-span-2 text-right text-yellow-400/80 group-hover:text-yellow-400">
                            {repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : '-'}
                        </div>
                        <div className="col-span-2 sm:col-span-2 text-right text-slate-400 group-hover:text-primary overflow-hidden">
                            [VIEW]
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TerminalRepoList;
