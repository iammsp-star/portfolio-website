import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
    onComplete: () => void;
}

const bootMessages = [
    "Manas.os [Version 10.0.19045.3324]",
    "(c) Manas Corporation. All rights reserved.",
    "",
    "C:\\Users\\Manas> boot_system.bat",
    "Initializing Website...",
    "Aligning Neural Pathways...",
    "Loading Data Structures...",
    "Calibrating Zero-G Physics...",
    "System Synchronized.",
    "C:\\Users\\Manas> start ui_engine.exe"
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < bootMessages.length) {
            const delay = bootMessages[currentLine] === "" ? 50 : 150;
            const timeout = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                onComplete();
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [currentLine, onComplete]);

    return (
        <div className="fixed inset-0 bg-background p-4 md:p-6 font-mono z-50 overflow-hidden text-primary/90">
            {/* CRT visual effects overlay */}
            <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
            {/* Moving scanline */}
            <div className="pointer-events-none absolute inset-0 w-full h-12 bg-primary/10 animate-scanline blur-[2px]"></div>
            
            <div className="w-full text-left text-sm md:text-base leading-relaxed relative z-10 animate-flicker">
                {bootMessages.slice(0, currentLine).map((msg, index) => (
                    <div key={index} className="drop-shadow-[0_0_2px_rgba(0,255,0,0.8)]">{msg || '\u00A0'}</div>
                ))}
                {currentLine < bootMessages.length && (
                    <div className="flex items-center drop-shadow-[0_0_5px_rgba(0,255,0,1)]">
                        <span>{bootMessages[currentLine]}</span>
                        <span className="inline-block w-2.5 h-4 bg-primary ml-1 animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BootSequence;
