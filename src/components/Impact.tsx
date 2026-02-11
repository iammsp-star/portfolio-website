import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Brain, Terminal } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Weightless Data Visualizer',
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

const ProjectCard = ({ project }: any) => {
    const [viewMode, setViewMode] = useState<'code' | 'logic'>('code');

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card w-full border border-slate-800 bg-slate-900/40 relative group"
        >
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Content Side */}
                <div className="lg:w-1/2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                        <div className="flex gap-2">
                            <a href={project.links.github} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                                <Github size={18} />
                            </a>
                            <a href={project.links.demo} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>

                    <p className="text-slate-400 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag: string, idx: number) => (
                            <span key={idx} className="text-xs font-mono text-secondary bg-secondary/10 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Toggle & Display Side */}
                <div className="lg:w-1/2">
                    <div className="bg-black/50 rounded-xl overflow-hidden border border-slate-800">
                        {/* Toggle Header */}
                        <div className="flex border-b border-slate-800">
                            <button
                                onClick={() => setViewMode('code')}
                                className={`flex-1 py-2 text-sm font-mono flex items-center justify-center gap-2 transition-colors ${viewMode === 'code' ? 'bg-slate-800 text-primary' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Code size={14} /> View Code
                            </button>
                            <button
                                onClick={() => setViewMode('logic')}
                                className={`flex-1 py-2 text-sm font-mono flex items-center justify-center gap-2 transition-colors ${viewMode === 'logic' ? 'bg-slate-800 text-secondary' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Brain size={14} /> View Logic
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-4 h-64 overflow-y-auto custom-scrollbar font-mono text-sm">
                            <AnimatePresence mode="wait">
                                {viewMode === 'code' ? (
                                    <motion.div
                                        key="code"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <pre className="text-slate-300">
                                            <code>{project.codeSnippet}</code>
                                        </pre>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="logic"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ul className="space-y-3">
                                            {project.logic.map((item: string, idx: number) => (
                                                <li key={idx} className="flex gap-2 text-slate-300">
                                                    <span className="text-secondary mt-1">
                                                        <Terminal size={12} />
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Impact = () => {
    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="terminal-text text-primary text-sm tracking-widest mb-2 block">THE IMPACT</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">System Output</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Deployed solutions solving real-world problems through code and data architecture.
                    </p>
                </motion.div>

                <div className="grid gap-12 max-w-5xl mx-auto">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Impact;
