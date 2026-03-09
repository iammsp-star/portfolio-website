import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Terminal, X, FileCode, Folder, ChevronRight, Zap } from 'lucide-react';

// ─── Portfolio OS code snippet (plain string to avoid TS template-literal issues) ────
const PORTFOLIO_SNIPPET = [
    '// FileViewer — syntax-highlighted code modal',
    'import { motion, AnimatePresence } from "framer-motion";',
    'import { useEffect, useRef } from "react";',
    '',
    'type TokenType = "kw" | "str" | "cmt" | "num" | "plain";',
    'interface Token { type: TokenType; value: string }',
    '',
    'const KEYWORDS = new Set([',
    '  "const", "let", "import", "export", "return",',
    '  "interface", "type", "useEffect", "useState",',
    ']);',
    '',
    'function tokenise(src: string, lang: string): Token[] {',
    '  const tokens: Token[] = [];',
    '  // emit kw / str / cmt / num / plain tokens',
    '  return tokens;',
    '}',
    '',
    'export default function FileViewer({ project, onClose }) {',
    '  const ref = useRef<HTMLDivElement>(null);',
    '  useEffect(() => { ref.current?.focus(); }, []);',
    '  const tokens = tokenise(project.codeSnippet, project.lang);',
    '  // render each Token with its colour-mapped <span>',
    '}',
].join('\n');

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects = [
    {
        id: 1,
        title: 'Weightless Data Visualizer',
        filename: 'weightless_viz.py',
        lang: 'python',
        permissions: '-rwxr-xr-x',
        permColors: ['text-primary', 'text-slate-500', 'text-slate-500'],
        size: '4.2K',
        date: 'Oct 24',
        description:
            'An interactive 3D force-directed graph for analysing caloric expenditure and workout volume. Maps fitness metrics into live WebGL nodes that respond to wearable API streams in real time.',
        tags: ['React', 'Three.js', 'D3.js', 'Firebase', 'WebGL'],
        codeSnippet: `# 3D Force Graph — real-time wearable binding
from force_graph import ForceGraph3D

graph = ForceGraph3D(width=1280, height=720)
graph.node_label("id").node_auto_color("group")
graph.link_directional_particles(2, speed=lambda d: d.value * 0.001)

# Stream wearable metrics into live nodes
@wearable_api.on_update
def handle_snapshot(snapshot):
    nodes, links = parse_metrics(snapshot)
    graph.set_data(nodes=nodes, links=links)

# Force layout with clustered muscle-group nodes
graph.apply_force(
    charge=-120,
    collide_radius=10,
    link_distance=50
)
graph.render()`,
        logic: [
            'Ingests live workout data from wearable APIs (JSON streaming).',
            'Builds a directed acyclic graph from raw fitness metrics.',
            'Renders nodes via WebGL with force-directed layout for clustering.',
            'Hot-updates graph topology on each sensor snapshot without re-render.',
        ],
        projectLinks: { demo: '#', github: '#' },
    },
    {
        id: 2,
        title: 'Master Calisthenics Elite',
        filename: 'mce_ai_engine.py',
        lang: 'python',
        permissions: '-rwxr--r--',
        permColors: ['text-primary', 'text-yellow-500', 'text-slate-500'],
        size: '8.1M',
        date: 'Nov 12',
        description:
            "India's first AI-driven calisthenics coaching platform — 500+ active users. Personalised 4-week microcycles powered by Random Forest, real-time volume adjustment via daily check-ins, and automated WhatsApp / email drip campaigns.",
        tags: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Supabase', 'AI/ML'],
        codeSnippet: `# AI Progression Engine — Random Forest classifier
from sklearn.ensemble import RandomForestClassifier
from supabase import create_client

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_progression(user_id: str) -> dict:
    user   = get_user_stats(user_id)   # strength, recovery, history
    volume = calculate_weekly_volume(user)

    clf = RandomForestClassifier(n_estimators=200, random_state=42)
    clf.fit(X_train, y_train)

    tier = clf.predict([[
        user.strength_score,
        user.recovery_index,
        volume.weekly_avg,
    ]])[0]   # "beginner" | "intermediate" | "advanced"

    if volume.weekly_avg > VOLUME_THRESHOLD:
        return advanced_plan(load_factor=1.2, tier=tier)
    return maintenance_plan(tier=tier)`,
        logic: [
            'User assessment scores feed a Random Forest tier classifier.',
            'Generates personalised 4-week microcycle from predicted tier.',
            'Daily check-in data dynamically adjusts weekly volume targets.',
            'Automated WhatsApp / email triggers maintain engagement loops.',
        ],
        projectLinks: {
            demo: 'https://mastercalisthenicsindia.com',
            github: '#',
        },
    },
    {
        id: 3,
        title: 'Portfolio OS',
        filename: 'portfolio_os.tsx',
        lang: 'tsx',
        permissions: '-rwxrwxr--',
        permColors: ['text-primary', 'text-primary', 'text-slate-500'],
        size: '2.3M',
        date: 'Mar 25',
        description:
            'This portfolio itself — a terminal-themed single-page app built with React 18, Vite, Framer Motion, and Tailwind. Features CRT scanlines, animated section reveals, a Pac-Man game in the footer, and a file-explorer projects view.',
        tags: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind'],
        codeSnippet: PORTFOLIO_SNIPPET,
        logic: [
            'Vite + React 18 for blazing-fast HMR during development.',
            'Framer Motion AnimatePresence drives section reveal animations.',
            'Inline tokeniser highlights keywords/strings without extra deps.',
            'Deployed to Vercel with custom domain via DNS A / CNAME records.',
        ],
        projectLinks: {
            demo: 'https://mastercalisthenicsindia.com',
            github: 'https://github.com/iammsp-star/portfolio-website',
        },
    },
];

// ─── Tiny inline syntax highlighter ──────────────────────────────────────────

const LANG_CONFIG: Record<string, { keywords: string[]; kwColor: string; strColor: string; cmtColor: string }> = {
    python: {
        keywords: ['def', 'return', 'import', 'from', 'if', 'else', 'elif', 'for', 'while', 'class', 'lambda', 'with', 'as', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is'],
        kwColor: '#00FF41',
        strColor: '#FFB000',
        cmtColor: '#4a7c59',
    },
    tsx: {
        keywords: ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 'from', 'interface', 'type', 'extends', 'class', 'new', 'this', 'true', 'false', 'null', 'undefined', 'if', 'else', 'for', 'while', 'async', 'await', 'useEffect', 'useRef', 'useState'],
        kwColor: '#7dd3fc',
        strColor: '#fca5a5',
        cmtColor: '#4a7c59',
    },
    js: {
        keywords: ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 'from', 'class', 'new', 'this', 'true', 'false', 'null', 'undefined', 'if', 'else', 'async', 'await'],
        kwColor: '#fef08a',
        strColor: '#fca5a5',
        cmtColor: '#4a7c59',
    },
};

interface Token { type: 'kw' | 'str' | 'cmt' | 'num' | 'plain'; value: string }

function tokenise(src: string, lang: string): Token[] {
    const cfg = LANG_CONFIG[lang] ?? LANG_CONFIG['python'];
    const kwSet = new Set(cfg.keywords);
    const tokens: Token[] = [];

    const lines = src.split('\n');
    lines.forEach((line, li) => {
        if (li > 0) tokens.push({ type: 'plain', value: '\n' });

        const commentChar = lang === 'python' ? '#' : '//';
        const commentIdx = findCommentStart(line, commentChar);
        const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
        const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : '';

        const wordRe = /([a-zA-Z_]\w*)|(["'](?:[^"'\\]|\\.)*["'])|(\b\d+\.?\d*\b)|(\s+|[^a-zA-Z0-9_"'\s]+)/g;
        let m: RegExpExecArray | null;
        while ((m = wordRe.exec(codePart)) !== null) {
            const [, word, str, num, other] = m;
            if (word) {
                tokens.push({ type: kwSet.has(word) ? 'kw' : 'plain', value: word });
            } else if (str) {
                tokens.push({ type: 'str', value: str });
            } else if (num) {
                tokens.push({ type: 'num', value: num });
            } else {
                tokens.push({ type: 'plain', value: other });
            }
        }
        if (commentPart) tokens.push({ type: 'cmt', value: commentPart });
    });

    return tokens;
}

function findCommentStart(line: string, char: string): number {
    let inStr: string | null = null;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (inStr) {
            if (c === '\\') { i++; continue; }
            if (c === inStr) inStr = null;
        } else if (c === '"' || c === "'") {
            inStr = c;
        } else if (line.slice(i, i + char.length) === char) {
            return i;
        }
    }
    return -1;
}

function tokenColor(t: Token, lang: string): string {
    const cfg = LANG_CONFIG[lang] ?? LANG_CONFIG['python'];
    switch (t.type) {
        case 'kw': return cfg.kwColor;
        case 'str': return cfg.strColor;
        case 'cmt': return cfg.cmtColor;
        case 'num': return '#c084fc';
        default: return '#cbd5e1';
    }
}

// ─── Permission display ───────────────────────────────────────────────────────

const PermissionDisplay = ({ perm, colors }: { perm: string; colors: string[] }) => {
    const parts = [
        { chars: perm[0], color: 'text-slate-600' },
        { chars: perm.slice(1, 4), color: colors[0] },
        { chars: perm.slice(4, 7), color: colors[1] },
        { chars: perm.slice(7, 10), color: colors[2] },
    ];
    return (
        <span className="font-mono tracking-tight" title={`permissions: ${perm}`}>
            {parts.map((part, i) => (
                <span key={i} className={part.color}>{part.chars}</span>
            ))}
        </span>
    );
};

// ─── FileViewer modal ─────────────────────────────────────────────────────────

const LANG_LABEL: Record<string, string> = {
    python: 'PYTHON',
    tsx: 'TSX / REACT',
    js: 'JAVASCRIPT',
};

type Project = typeof projects[0];

const FileViewer = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const tokens = tokenise(project.codeSnippet, project.lang);

    // Split tokens into lines for numbered display
    const lines: Token[][] = [[]];
    for (const t of tokens) {
        if (t.type === 'plain' && t.value === '\n') {
            lines.push([]);
        } else {
            lines[lines.length - 1].push(t);
        }
    }

    const hasLive = project.projectLinks.demo !== '#';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="w-full max-w-4xl bg-[#070d07] border border-primary/40 shadow-[0_0_60px_rgba(0,255,65,0.12)] overflow-hidden flex flex-col max-h-[92vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Window chrome */}
                <div className="bg-slate-900/80 border-b border-primary/20 p-2 px-4 flex justify-between items-center text-xs font-mono select-none shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" onClick={onClose} />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <span className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <span className="text-slate-500 ml-2">
                            vim <span className="text-primary">{project.filename}</span>
                        </span>
                    </div>
                    <button onClick={onClose} className="text-slate-600 hover:text-red-400 transition-colors p-1">
                        <X size={14} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto font-mono text-sm leading-relaxed text-slate-300 custom-scrollbar flex-1">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left: Info */}
                        <div className="md:w-1/2 space-y-5">
                            <div>
                                <span className="text-slate-600 text-xs uppercase tracking-widest">// {project.filename}</span>
                                <h2 className="text-xl md:text-2xl font-bold text-white mt-1 leading-tight">
                                    {project.title}
                                </h2>
                                <div className="w-12 h-0.5 bg-primary mt-2 mb-3" />
                                <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-secondary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Terminal size={12} /> Execution Logic
                                </h3>
                                <ul className="list-none space-y-1.5">
                                    {project.logic.map((item, idx) => (
                                        <li key={idx} className="flex gap-2 text-xs text-slate-400">
                                            <ChevronRight size={14} className="text-primary flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map((tag, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded border border-primary/20 font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-2 flex-wrap">
                                {project.projectLinks.github !== '#' ? (
                                    <a
                                        href={project.projectLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs border border-slate-700 px-3 py-1.5 text-slate-300 hover:border-primary hover:text-primary transition-all duration-200"
                                    >
                                        <Github size={13} /> GITHUB_REPO
                                    </a>
                                ) : (
                                    <span className="flex items-center gap-2 text-xs border border-slate-800 px-3 py-1.5 text-slate-600 cursor-not-allowed select-none">
                                        <Github size={13} /> PRIVATE_REPO
                                    </span>
                                )}
                                {hasLive && (
                                    <a
                                        href={project.projectLinks.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs border border-secondary/50 px-3 py-1.5 text-secondary hover:bg-secondary/10 transition-all duration-200"
                                    >
                                        <ExternalLink size={13} /> LIVE_DEMO
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Right: Syntax-highlighted code */}
                        <div className="md:w-1/2 bg-black border border-slate-800 rounded overflow-hidden flex flex-col">
                            <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-1.5 flex items-center gap-2 shrink-0">
                                <span className="text-slate-600 text-xs">SOURCE_PREVIEW</span>
                                <span className="ml-auto text-primary/60 text-xs font-bold tracking-widest">
                                    ● {LANG_LABEL[project.lang] ?? project.lang.toUpperCase()}
                                </span>
                            </div>
                            <div className="overflow-auto custom-scrollbar flex-1">
                                <pre className="p-4 text-xs font-mono whitespace-pre leading-relaxed min-h-full">
                                    {lines.map((lineToks, i) => (
                                        <div key={i} className="flex">
                                            <span className="text-slate-700 select-none w-6 text-right mr-4 shrink-0">{i + 1}</span>
                                            <span>
                                                {lineToks.map((t, j) => (
                                                    <span key={j} style={{ color: tokenColor(t, project.lang) }}>{t.value}</span>
                                                ))}
                                            </span>
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-slate-900/80 border-t border-primary/20 px-4 py-1.5 text-xs font-mono text-slate-600 flex justify-between items-center shrink-0">
                    <span className="text-primary/70">-- NORMAL --</span>
                    <div className="flex items-center gap-4">
                        {hasLive && (
                            <a
                                href={project.projectLinks.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-secondary hover:text-secondary/80 transition-colors"
                            >
                                <Zap size={11} /> OPEN_LIVE
                            </a>
                        )}
                        <span className="hidden sm:block">{project.tags.join(' · ')}</span>
                        <span>{project.size}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Typewriter hook ──────────────────────────────────────────────────────────

const COMMAND = 'ls -la --color=auto';

function useTypewriter(text: string, speed = 60) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;
        const id = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(id);
                setDone(true);
            }
        }, speed);
        return () => clearInterval(id);
    }, [text, speed]);

    return { displayed, done };
}

// ─── Main component ───────────────────────────────────────────────────────────

const Impact = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const { displayed: typedCmd, done: cmdDone } = useTypewriter(
        inView ? COMMAND : '',
        60
    );

    // Fire typewriter once section enters viewport
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="projects" className="py-20 relative font-mono" ref={sectionRef}>
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    {/* Animated command prompt */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-4 font-mono select-none">
                        <span className="text-primary">founder@portfolio</span>
                        <span>:</span>
                        <span className="text-yellow-500">~/projects</span>
                        <span className="text-slate-400">$</span>
                        <span className="text-slate-200 ml-0.5">{typedCmd}</span>
                        {!cmdDone && inView && (
                            <span className="inline-block w-2 h-4 bg-primary animate-pulse align-middle" />
                        )}
                        {cmdDone && (
                            <span className="inline-block w-2 h-4 bg-primary/25 align-middle" />
                        )}
                    </div>

                    <div className="border-b border-primary/20 pb-3 flex items-end justify-between">
                        <div>
                            <span className="text-slate-500 text-xs block mb-1">CURRENT_DIR</span>
                            <h2 className="text-2xl text-white font-bold flex items-center gap-2">
                                <Folder size={20} className="text-yellow-500" />
                                ~/projects/portfolio
                            </h2>
                        </div>
                        <div className="text-right hidden md:block">
                            <span className="text-xs text-slate-600">total {projects.length} entries</span>
                        </div>
                    </div>
                </motion.div>

                {/* File Table */}
                <div className="bg-black/60 border border-slate-800 rounded-lg overflow-hidden shadow-[0_0_24px_rgba(0,255,65,0.06)]">
                    <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-900/40">
                                <th className="p-3 text-slate-600 font-normal w-32">PERMISSIONS</th>
                                <th className="p-3 text-slate-600 font-normal w-16 hidden sm:table-cell">SIZE</th>
                                <th className="p-3 text-slate-600 font-normal w-20 hidden md:table-cell">USER</th>
                                <th className="p-3 text-slate-600 font-normal w-20 hidden sm:table-cell">DATE</th>
                                <th className="p-3 text-slate-600 font-normal">NAME</th>
                                <th className="p-3 text-slate-600 font-normal text-right hidden md:table-cell">TAGS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, idx) => {
                                const isHovered = hoveredIdx === idx;
                                const hasLive = project.projectLinks.demo !== '#';

                                return (
                                    <motion.tr
                                        key={project.id}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        onHoverStart={() => setHoveredIdx(idx)}
                                        onHoverEnd={() => setHoveredIdx(null)}
                                        onClick={() => setSelectedProject(project)}
                                        className="cursor-pointer border-b border-slate-800/60 last:border-0 group relative"
                                        style={{
                                            background: isHovered ? 'rgba(0,255,65,0.045)' : 'transparent',
                                            boxShadow: isHovered
                                                ? 'inset 0 0 0 1px rgba(0,255,65,0.18), 0 0 18px rgba(0,255,65,0.07)'
                                                : 'none',
                                            transition: 'background 0.15s ease, box-shadow 0.15s ease',
                                        }}
                                    >
                                        <td className="p-3">
                                            <PermissionDisplay perm={project.permissions} colors={project.permColors} />
                                        </td>
                                        <td className="p-3 text-slate-500 hidden sm:table-cell">{project.size}</td>
                                        <td className="p-3 text-yellow-500/70 hidden md:table-cell">founder</td>
                                        <td className="p-3 text-slate-500 hidden sm:table-cell">{project.date}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <FileCode
                                                    size={15}
                                                    className="text-slate-600 group-hover:text-primary transition-colors flex-shrink-0"
                                                />
                                                <span className="text-white font-semibold group-hover:text-primary transition-colors">
                                                    {project.filename}
                                                </span>
                                                {hasLive && (
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"
                                                        title="Live project"
                                                    />
                                                )}
                                                <ChevronRight
                                                    size={13}
                                                    className="text-primary/0 group-hover:text-primary/70 transition-all -ml-1 group-hover:ml-0"
                                                />
                                            </div>
                                            <div className="text-slate-600 text-xs mt-0.5 pl-5 hidden md:block">
                                                {project.title}
                                            </div>
                                        </td>
                                        <td className="p-3 text-right hidden md:table-cell">
                                            <div className="flex gap-1 justify-end flex-wrap">
                                                {project.tags.slice(0, 3).map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-1.5 py-0.5 text-xs bg-slate-900 border border-slate-700 text-slate-500 group-hover:border-primary/30 group-hover:text-slate-400 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span className="px-1.5 py-0.5 text-xs text-slate-600">
                                                        +{project.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}

                            {/* Decorative ghost rows */}
                            {[...Array(2)].map((_, i) => (
                                <tr key={`empty-${i}`} className="select-none opacity-10">
                                    <td className="p-3 text-slate-800">----------</td>
                                    <td className="p-3 text-slate-800 hidden sm:table-cell">----</td>
                                    <td className="p-3 text-slate-800 hidden md:table-cell">-------</td>
                                    <td className="p-3 text-slate-800 hidden sm:table-cell">------</td>
                                    <td className="p-3 text-slate-800">…</td>
                                    <td className="p-3 hidden md:table-cell" />
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Footer hint */}
                    <div className="border-t border-slate-800/60 px-4 py-2 flex items-center justify-between">
                        <span className="text-xs text-slate-700">
                            Click a row to open the file —{' '}
                            <kbd className="px-1 py-0.5 border border-slate-800 rounded text-slate-600">↵ Enter</kbd>
                        </span>
                        <span className="text-xs text-primary/40 animate-pulse">_</span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <FileViewer project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Impact;
