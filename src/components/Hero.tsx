import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 30); // typing speed
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);

    return (
        <span className={className}>
            {displayedText}
            <span className="animate-blink">_</span>
        </span>
    );
};

const Hero = () => {
    const asciiArt = `
 __ _   ___ ___       ___ __ _  __ _  _ __
/ _\` | (_// __|     / __// _\` |/ _\` || '__|
| (_| |  //\\__ \\ _  \\__ \\\\ (_| | (_| || |
\\__,_| /_//___/(_) |___/ \\__,_|\\__,_||_|
            [ DATA SCIENTIST / AI EXPERT ]
    `;

    return (
        <section id="about" className="pt-24 pb-16 font-mono border-b border-terminal-border/30">
            <div className="container mx-auto px-6 max-w-5xl">
                
                {/* ASCII Art Block */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-12 overflow-x-auto"
                >
                    <pre className="text-primary text-glow font-bold text-xs sm:text-sm md:text-base leading-tight">
                        {asciiArt}
                    </pre>
                </motion.div>

                {/* System Info Block */}
                <div className="space-y-4 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                        <span className="text-secondary">msp-star@OS:~$</span>
                        <TypewriterText text="user-info" delay={1000} className="text-white" />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0 }}
                        className="pl-4 text-glow"
                    >
                        <p className="tracking-wider">NAME: IAMMSP-STAR | STATUS: <span className="text-white animate-pulse">ACTIVE</span> | LOCATION: IN_THE_ZONE</p>
                    </motion.div>

                    <div className="flex items-center gap-2 pt-4">
                        <span className="text-secondary">msp-star@OS:~$</span>
                        <TypewriterText text="cat ./objectives.txt" delay={2000} className="text-white" />
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.8, duration: 0 }}
                        className="pl-4 space-y-2 text-slate-300 max-w-3xl"
                    >
                        <p>{'>'} EXECUTE: Developing AI-driven systems and scalable data architectures.</p>
                        <p>{'>'} DOMAINS: Machine Learning, Predictive Modeling, Full-Stack Optimization.</p>
                        <p>{'>'} PHYSICAL: Calisthenics routing protocol [Master Calisthenics India].</p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
