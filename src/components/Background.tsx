import { motion } from 'framer-motion';

const Node = ({ delay, duration, startX, startY, size, colorClass }: any) => {
    return (
        <motion.div
            className={`absolute rounded-full blur-[2px] ${colorClass}`}
            style={{ 
                width: size, 
                height: size,
                left: startX,
                top: startY
            }}
            animate={{
                y: [0, -40, 0],
                x: [0, 30, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
        />
    );
};

const Background = () => {
    // Generate a set of static nodes parameters to avoid re-renders causing jumps
    const nodes = [
        { id: 1, size: 8, startX: '10%', startY: '20%', duration: 8, delay: 0, colorClass: 'bg-primary' },
        { id: 2, size: 12, startX: '85%', startY: '15%', duration: 12, delay: 2, colorClass: 'bg-secondary' },
        { id: 3, size: 6, startX: '50%', startY: '40%', duration: 6, delay: 1, colorClass: 'bg-white' },
        { id: 4, size: 10, startX: '30%', startY: '70%', duration: 10, delay: 3, colorClass: 'bg-primary/50' },
        { id: 5, size: 14, startX: '70%', startY: '80%', duration: 14, delay: 5, colorClass: 'bg-secondary/40' },
        { id: 6, size: 7, startX: '90%', startY: '60%', duration: 9, delay: 2, colorClass: 'bg-primary' },
        { id: 7, size: 9, startX: '15%', startY: '85%', duration: 11, delay: 4, colorClass: 'bg-secondary' },
        { id: 8, size: 11, startX: '45%', startY: '90%', duration: 13, delay: 1, colorClass: 'bg-white/40' },
        { id: 9, size: 5, startX: '5%', startY: '50%', duration: 7, delay: 0.5, colorClass: 'bg-primary' },
        { id: 10, size: 15, startX: '65%', startY: '30%', duration: 15, delay: 4, colorClass: 'bg-secondary' },
        { id: 11, size: 8, startX: '25%', startY: '10%', duration: 8.5, delay: 1.5, colorClass: 'bg-white/60' },
        { id: 12, size: 12, startX: '95%', startY: '95%', duration: 12.5, delay: 3.5, colorClass: 'bg-primary/30' },
    ];

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[-5] overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
            
            {nodes.map(node => (
                <Node key={node.id} {...node} />
            ))}
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
        </div>
    );
};

export default Background;
