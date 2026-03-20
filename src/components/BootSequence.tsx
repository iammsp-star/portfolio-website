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
            const delay = bootMessages[currentLine] === "" ? 50 : Math.random() * 100 + 100;
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
        <div className="fixed inset-0 bg-black p-4 md:p-6 font-mono z-50 overflow-hidden text-gray-300">
            <div className="w-full text-left text-sm md:text-base leading-relaxed">
                {bootMessages.slice(0, currentLine).map((msg, index) => (
                    <div key={index}>{msg || '\u00A0'}</div>
                ))}
                {currentLine < bootMessages.length && (
                    <div className="flex items-center">
                        <span>{bootMessages[currentLine]}</span>
                        <span className="inline-block w-2 cursor-blink h-4 bg-gray-300 ml-1" />
                    </div>
                )}
            </div>
            
            <style>
                {`
                    .cursor-blink {
                        animation: blink 1s step-end infinite;
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
};

export default BootSequence;
