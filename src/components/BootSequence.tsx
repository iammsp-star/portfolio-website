import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
    onComplete: () => void;
}

const bootMessages = [
    "Initializing System...",
    "Loading SDBI_Modules...",
    "Accessing Master_Calisthenics_Elite_Database...",
    "Verifying User Credentials...",
    "Founder Status: ACTIVE",
    "System Ready."
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (currentLine < bootMessages.length) {
            const timeout = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, Math.random() * 300 + 400); // Random delay between 400ms and 700ms
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [currentLine, onComplete]);

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-start justify-end p-8 font-mono text-primary z-50 overflow-hidden">
            <div className="w-full max-w-2xl">
                {bootMessages.slice(0, currentLine + 1).map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-2 text-lg md:text-xl"
                    >
                        <span className="text-secondary mr-2">{`>`}</span>
                        {msg}
                        {index === currentLine && (
                            <span className="inline-block w-3 h-5 bg-primary ml-1 animate-pulse" />
                        )}
                    </motion.div>
                ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none scanline opacity-30"></div>
        </div>
    );
};

export default BootSequence;
