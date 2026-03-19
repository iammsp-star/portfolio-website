import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CommandPrompt: React.FC = () => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Re-focus input on click anywhere in prompt area
    const handleClick = () => {
        inputRef.current?.focus();
    };

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        
        switch (trimmedCmd) {
            case 'home':
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'projects':
                navigate('/');
                setTimeout(() => {
                    const projectSection = document.getElementById('projects');
                    if (projectSection) projectSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'research':
            case 'skills':
                navigate('/');
                setTimeout(() => {
                    const skillsSection = document.getElementById('skills');
                    if (skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'exp':
            case 'timeline':
                navigate('/');
                setTimeout(() => {
                    const expSection = document.getElementById('experience');
                    if (expSection) expSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'github':
                window.open('https://github.com/iammsp-star', '_blank');
                break;
            case 'linkedin':
                window.open('https://www.linkedin.com/in/manas-puthanpura-5b06b0377/', '_blank');
                break;
            default:
                // could show a temporary error message in a real terminal
                break;
        }

        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && input) {
            handleCommand(input);
        }
    };

    return (
        <div 
            className="sticky top-0 w-full bg-terminal-dark/95 border-b border-terminal-border/50 text-primary font-mono text-sm z-50 shadow-[0_5px_15px_rgba(0,255,0,0.05)] cursor-text"
            onClick={handleClick}
        >
            {/* Mobile-optimized horizontal scroll menu */}
            <div className="flex flex-row overflow-x-auto no-scrollbar sm:divide-x divide-terminal-border/30 border-b border-terminal-border/20 text-xs sm:text-sm text-center whitespace-nowrap">
                <button onClick={() => handleCommand('home')} className="flex-1 px-4 py-2 hover:bg-primary/20 hover:text-white transition-colors">[ HOME ]</button>
                <button onClick={() => handleCommand('projects')} className="flex-1 px-4 py-2 hover:bg-primary/20 hover:text-white transition-colors">[ PROJECTS ]</button>
                <button onClick={() => handleCommand('skills')} className="flex-1 px-4 py-2 hover:bg-primary/20 hover:text-white transition-colors">[ MODULES ]</button>
                <button onClick={() => handleCommand('github')} className="flex-1 px-4 py-2 hover:bg-primary/20 hover:text-white transition-colors">[ GITHUB ]</button>
                <button onClick={() => handleCommand('linkedin')} className="flex-1 px-4 py-2 hover:bg-primary/20 hover:text-white transition-colors">[ LINKEDIN ]</button>
            </div>

            <div className="p-2 sm:p-3 flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-2">
                <span className="text-secondary font-bold">msp-star@OS:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none flex-grow text-white font-mono placeholder-primary/30 w-full sm:w-auto mt-1 sm:mt-0"
                    placeholder="Enter command or select above..."
                    autoFocus
                />
                <span className="w-2 h-4 bg-primary animate-blink hidden sm:inline-block"></span>
            </div>
        </div>
    );
};

export default CommandPrompt;
