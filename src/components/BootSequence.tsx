import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

interface BootSequenceProps {
    onComplete: () => void;
}

const bootMessages = [
    "Initializing Website...",
    "Aligning Neural Pathways...",
    "Loading Data Structures...",
    "Calibrating Zero-G Physics...",
    "System Synchronized."
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
        <div className="fixed inset-0 bg-background flex items-center justify-center font-sans z-50 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 md:p-12 rounded-2xl w-full max-w-lg relative z-10 mx-4 border-t border-l border-white/10"
            >
                <div className="flex items-center gap-4 mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <Hexagon size={32} className="text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-display font-light text-white tracking-widest">MASTER<span className="font-bold text-primary">.CORE</span></h2>
                </div>

                <div className="space-y-4">
                    {bootMessages.slice(0, currentLine + 1).map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-sm md:text-base font-mono text-slate-300 flex items-center gap-3"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            {msg}
                            {index === currentLine && (
                                <span className="inline-block w-2 h-4 bg-secondary ml-1 animate-pulse" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentLine / (bootMessages.length - 1)) * 100}%` }}
                        className="h-full bg-primary rounded-full relative"
                    >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default BootSequence;
