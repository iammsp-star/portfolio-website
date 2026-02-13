import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandHistory {
    type: 'input' | 'output' | 'error' | 'success';
    content: React.ReactNode;
}

const CommandPrompt: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([
        { type: 'success', content: 'Terminal v2.0.1 initialized. Type "help" for a list of commands.' }
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
        const newHistory = [...history, { type: 'input', content: `visitor@portfolio:~$ ${cmd}` } as CommandHistory];

        let response: CommandHistory;

        switch (trimmedCmd) {
            case 'help':
                response = {
                    type: 'output',
                    content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between"><span className="text-secondary">help</span> <span className="text-slate-400">Show this help message</span></div>
                            <div className="flex justify-between"><span className="text-secondary">clear</span> <span className="text-slate-400">Clear terminal history</span></div>
                            <div className="flex justify-between"><span className="text-secondary">about</span> <span className="text-slate-400">Navigate to About section</span></div>
                            <div className="flex justify-between"><span className="text-secondary">projects</span> <span className="text-slate-400">Navigate to Projects directory</span></div>
                            <div className="flex justify-between"><span className="text-secondary">skills</span> <span className="text-slate-400">Show loaded modules</span></div>
                            <div className="flex justify-between"><span className="text-secondary">exp</span> <span className="text-slate-400">Show experience logs</span></div>
                            <div className="flex justify-between"><span className="text-secondary">contact</span> <span className="text-slate-400">Initiate contact protocol</span></div>
                            <div className="flex justify-between"><span className="text-secondary">whoami</span> <span className="text-slate-400">Display current user</span></div>
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
                    const expSection = document.getElementById('experience');
                    if (expSection) expSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'contact':
                response = { type: 'success', content: 'Opening Contact Channel...' };
                navigate('/');
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'whoami':
                response = { type: 'output', content: 'visitor@portfolio - Permissions: READ_ONLY' };
                break;
            case 'manas':
                response = { type: 'output', content: 'Admin access denied. Nice try.' };
                break;
            case 'sudo':
                response = { type: 'error', content: 'User is not in the sudoers file. This incident will be reported.' };
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
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:scale-110 transition-transform animate-bounce-slow"
                >
                    <Terminal size={24} />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-8 right-8 w-full max-w-md z-50">
                    <div className="bg-black/90 border border-slate-700 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md flex flex-col max-h-[400px]">
                        {/* Header */}
                        <div className="flex items-center justify-between p-2 bg-slate-900 border-b border-slate-800">
                            <div className="flex items-center gap-2 text-xs text-slate-400 px-2">
                                <Terminal size={12} />
                                <span>TERMINAL</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Output Area */}
                        <div className="p-4 flex-grow overflow-y-auto font-mono text-sm space-y-2 custom-scrollbar bg-black/50" style={{ minHeight: '200px' }}>
                            {history.map((entry, idx) => (
                                <div key={idx} className={`${entry.type === 'input' ? 'text-slate-400' :
                                    entry.type === 'error' ? 'text-red-500' :
                                        entry.type === 'success' ? 'text-primary' : 'text-slate-300'
                                    }`}>
                                    {entry.content}
                                </div>
                            ))}
                            <div ref={bottomRef}></div>
                        </div>

                        {/* Input Area */}
                        <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                            <span className="text-primary text-sm font-bold">{`>`}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none flex-grow text-white font-mono text-sm placeholder-slate-600"
                                placeholder="Type 'help'..."
                                autoFocus
                            />
                            <button onClick={() => input && handleCommand(input)} className="text-slate-500 hover:text-primary">
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommandPrompt;
