import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, X, Move } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandHistory {
    type: 'input' | 'output' | 'error' | 'success';
    content: React.ReactNode;
}

const CommandPrompt: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([
        { type: 'success', content: 'Antigravity Node initialized. Type "help" for commands.' }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [history, isOpen]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const newHistory = [...history, { type: 'input', content: `visitor@sdbi.node:~$ ${cmd}` } as CommandHistory];

        let response: CommandHistory;

        switch (trimmedCmd) {
            case 'help':
                response = {
                    type: 'output',
                    content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between"><span className="text-secondary font-medium">help</span> <span className="text-slate-400 font-light">Show this help message</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">clear</span> <span className="text-slate-400 font-light">Clear terminal history</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">about</span> <span className="text-slate-400 font-light">Navigate to About section</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">projects</span> <span className="text-slate-400 font-light">Navigate to Projects directory</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">skills</span> <span className="text-slate-400 font-light">Show loaded modules</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">exp</span> <span className="text-slate-400 font-light">Show experience logs</span></div>
                            <div className="flex justify-between"><span className="text-secondary font-medium">whoami</span> <span className="text-slate-400 font-light">Display current user</span></div>
                        </div>
                    )
                };
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'about':
                response = { type: 'success', content: 'Navigating to System Diagnostic...' };
                navigate('/');
                setTimeout(() => {
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
                break;
            case 'projects':
                response = { type: 'success', content: 'Accessing Project Directory...' };
                navigate('/');
                setTimeout(() => {
                    const projectSection = document.getElementById('projects');
                    if (projectSection) projectSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'skills':
                response = { type: 'success', content: 'Listing Loaded Modules...' };
                navigate('/');
                setTimeout(() => {
                    const skillsSection = document.getElementById('skills');
                    if (skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'exp':
                response = { type: 'success', content: 'Retrieving Process Logs...' };
                navigate('/');
                setTimeout(() => {
                    const expSection = document.getElementById('timeline');
                    if (expSection) expSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'whoami':
                response = { type: 'output', content: 'visitor@sdbi.node - Clearance: VIEWER' };
                break;
            case 'manas':
                response = { type: 'output', content: 'Admin access denied. Invalid neural signature.' };
                break;
            case 'sudo':
                response = { type: 'error', content: 'User is not in the sudoers file. Weightless protocols locked.' };
                break;
            default:
                response = { type: 'error', content: `Command not found: ${trimmedCmd}. Type "help" for commands.` };
        }

        setHistory([...newHistory, response]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && input) {
            handleCommand(input);
        }
    };

    return (
        <div className="font-sans z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-50 p-4 glass-card bg-primary/20 text-primary border border-primary/40 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-primary/30 transition-all duration-300 hover-magnetic flex items-center justify-center backdrop-blur-md"
                >
                    <Terminal size={24} />
                </button>
            )}

            {isOpen && (
                <div className="fixed sm:bottom-8 sm:right-8 bottom-0 right-0 w-full sm:w-[450px] z-50 p-4 sm:p-0">
                    <div className="glass-card bg-background/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col max-h-[500px] h-[50vh] sm:h-auto animate-float">
                        
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[40px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between p-3 bg-white/5 border-b border-white/10 relative z-10">
                            <div className="flex items-center gap-3 text-xs text-slate-300 px-2 font-mono uppercase tracking-widest">
                                <Terminal size={14} className="text-primary" />
                                <span>Command Node</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors text-slate-400">
                                    <Move size={12} />
                                </div>
                                <button onClick={() => setIsOpen(false)} className="w-6 h-6 rounded-full hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors text-slate-400">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Output Area */}
                        <div className="p-5 flex-grow overflow-y-auto font-mono text-sm space-y-3 custom-scrollbar relative z-10" style={{ minHeight: '250px' }}>
                            {history.map((entry, idx) => (
                                <div key={idx} className={`${
                                    entry.type === 'input' ? 'text-slate-400' :
                                    entry.type === 'error' ? 'text-red-400' :
                                    entry.type === 'success' ? 'text-primary' : 'text-slate-200 font-light'
                                } leading-relaxed`}>
                                    {entry.content}
                                </div>
                            ))}
                            <div ref={bottomRef}></div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-3 relative z-10">
                            <span className="text-primary text-sm font-bold font-mono pl-2">{`>`}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none flex-grow text-white font-mono text-sm placeholder-slate-600 focus:ring-0"
                                placeholder="Execute command..."
                                autoFocus
                            />
                            <button onClick={() => input && handleCommand(input)} className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 flex items-center justify-center transition-colors">
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommandPrompt;
