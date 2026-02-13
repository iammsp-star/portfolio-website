import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Terminal, X, FileCode, Folder } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Weightless Data Visualizer',
        filename: 'weightless_viz.py',
        permissions: '-rwxr-xr-x',
        size: '4.2KB',
        date: 'Oct 24',
        description: 'A 3D interactive data visualization tool for caloric expenditure and workout volume.',
        tags: ['React', 'Three.js', 'D3.js', 'Firebase'],
        codeSnippet: `// 3D Force Graph Implementation
const Graph = ForceGraph3D()
  .graphData(data)
  .nodeLabel('id')
  .nodeAutoColorBy('group')
  .linkDirectionalParticles(2)
  .linkDirectionalParticleSpeed(d => d.value * 0.001);`,
        logic: [
            'Ingests measured workout data from wearable APIs.',
            'Processes raw JSON into a directed acyclic graph (DAG).',
            'Renders nodes continuously using WebGL for high performance.',
            'Applies force-directed layout algorithms for clustering.'
        ],
        links: {
            demo: '#',
            github: '#'
        }
    },
    {
        id: 2,
        title: 'Master Calisthenics Elite',
        filename: 'mce_ai_engine.py',
        permissions: '-rwxr--r--',
        size: '8.1MB',
        date: 'Nov 12',
        description: 'AI-driven fitness platform serving 500+ users with personalized progression algorithms.',
        tags: ['Python', 'FastAPI', 'React', 'PostgreSQL'],
        codeSnippet: `def generate_progression(user_id: str):
  user = get_user_stats(user_id)
  volume = calculate_volume(user.history)
  
  if volume > threshold:
      return advanced_plan(load=1.2)
  return maintenance_plan()`,
        logic: [
            'User assessment inputs feed into a random forest classifier.',
            'Generates a 4-week microcycle based on recovery metrics.',
            'Real-time adjustment of volume based on daily check-ins.',
            'Automated email/WhatsApp triggers for consistency.'
        ],
        links: {
            demo: '#',
            github: '#'
        }
    }
];

const FileViewer = ({ project, onClose }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-4xl bg-black border border-primary/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Window Header */}
                <div className="bg-slate-900 border-b border-primary/30 p-2 flex justify-between items-center text-xs font-mono text-primary select-none">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} />
                        <span>vim {project.filename}</span>
                    </div>
                    <button onClick={onClose} className="hover:text-red-500 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto font-mono text-sm leading-relaxed text-slate-300 custom-scrollbar">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2 space-y-4">
                            <h2 className="text-2xl font-bold text-primary mb-2 line-through decoration-primary/30">
                                {project.title}
                            </h2>
                            <p className="border-l-2 border-secondary pl-4 py-1 text-slate-400 italic">
                                "{project.description}"
                            </p>

                            <div className="space-y-2 mt-6">
                                <h3 className="text-secondary font-bold text-xs uppercase tracking-widest">Execution Logic:</h3>
                                <ul className="list-none space-y-2">
                                    {project.logic.map((item: string, idx: number) => (
                                        <li key={idx} className="flex gap-2 text-xs md:text-sm">
                                            <span className="text-primary">{`>>`}</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-2 flex-wrap mt-4">
                                {project.tags.map((tag: string, idx: number) => (
                                    <span key={idx} className="px-2 py-1 bg-slate-800 text-xs text-secondary rounded border border-slate-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <a href={project.links.github} className="flex items-center gap-2 text-primary hover:text-white transition-colors text-xs border border-primary px-3 py-1 hover:bg-primary hover:text-black">
                                    <Github size={14} /> GITHUB_REPO
                                </a>
                                <a href={project.links.demo} className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-xs border border-secondary px-3 py-1 hover:bg-secondary hover:text-black">
                                    <ExternalLink size={14} /> LIVE_DEMO
                                </a>
                            </div>
                        </div>

                        <div className="md:w-1/2 bg-slate-900/50 p-4 rounded border border-slate-700 overflow-x-auto">
                            <h3 className="text-slate-500 text-xs mb-2">SOURCE_PREVIEW:</h3>
                            <pre className="text-xs md:text-sm font-mono text-green-400 whitespace-pre-wrap">
                                {project.codeSnippet}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-slate-900 border-t border-primary/30 p-1 px-4 text-xs font-mono text-slate-500 flex justify-between">
                    <span>-- INSERT --</span>
                    <span>{project.size}</span>
                </div>
            </div>
        </motion.div>
    );
};

const Impact = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    return (
        <section id="projects" className="py-20 relative font-mono">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8 border-b border-primary/30 pb-2 flex items-end justify-between">
                    <div>
                        <span className="text-slate-500 text-xs block mb-1">CURRENT_DIR</span>
                        <h2 className="text-2xl text-white font-bold flex items-center gap-2">
                            <Folder size={20} className="text-secondary" /> ~/projects/portfolio
                        </h2>
                    </div>
                    <span className="text-xs text-primary animate-pulse">_cursor_active</span>
                </div>

                <div className="bg-black/40 border border-slate-800 p-2 rounded-lg font-mono text-sm md:text-base overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-500 border-b border-slate-800">
                                <th className="p-2 w-24">PERMISSIONS</th>
                                <th className="p-2 w-16">SIZE</th>
                                <th className="p-2 w-16">USER</th>
                                <th className="p-2 w-20">DATE</th>
                                <th className="p-2">NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, idx) => (
                                <motion.tr
                                    key={project.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="hover:bg-primary/10 cursor-pointer group transition-colors border-b border-slate-800/50 last:border-0"
                                >
                                    <td className="p-2 text-slate-400 group-hover:text-primary transition-colors">{project.permissions}</td>
                                    <td className="p-2 text-slate-500">{project.size}</td>
                                    <td className="p-2 text-secondary">founder</td>
                                    <td className="p-2 text-slate-500">{project.date}</td>
                                    <td className="p-2 text-white font-bold group-hover:text-primary flex items-center gap-2">
                                        <FileCode size={16} className="text-slate-600 group-hover:text-primary" />
                                        {project.filename}
                                    </td>
                                </motion.tr>
                            ))}
                            {/* Empty rows filler for aesthetics */}
                            {[...Array(3)].map((_, i) => (
                                <tr key={`empty-${i}`} className="text-slate-800 select-none">
                                    <td className="p-2">----------</td>
                                    <td className="p-2">----</td>
                                    <td className="p-2">----</td>
                                    <td className="p-2">------</td>
                                    <td className="p-2">...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
