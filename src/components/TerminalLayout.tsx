import React from 'react';
import Background from './Background';
import CommandPrompt from './CommandPrompt';
import LiveStats from './LiveStats';

const TerminalLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen bg-transparent">
            {/* The absolute 3D Background */}
            <Background />

            {/* The CRT Monitor bounds. Creates a boxed, bordered layout in the center feeling like a screen */}
            <div className="min-h-screen p-2 md:p-6 flex items-center justify-center">
                <main className="w-full max-w-7xl min-h-[90vh] bg-terminal-dark/80 backdrop-blur-md border border-terminal-border border-glow rounded-lg overflow-hidden flex flex-col relative shadow-[0_0_50px_rgba(0,255,0,0.1)]">
                    
                    {/* Fake monitor / window header */}
                    <header className="bg-primary/10 border-b border-terminal-border px-4 py-2 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-4">
                            <span className="text-secondary tracking-widest uppercase font-bold">MASTER CORE v3.0</span>
                            <span className="text-primary/70 animate-pulse hidden sm:inline">● SYS_ONLINE</span>
                        </div>
                        <div className="flex gap-2 text-primary/50">
                            <span>MEM: OK</span>
                            <span>NET: STABLE</span>
                        </div>
                    </header>

                    {/* Scrollable Main Content inside the terminal window */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                        {children}
                        <LiveStats />
                    </div>

                    {/* Interactive Command Runner */}
                    <CommandPrompt />
                </main>
            </div>
        </div>
    );
};

export default TerminalLayout;
