import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2 z-0 hidden lg:block"
            style={{ originY: 0 }}
        >
            <motion.div
                className="w-full bg-primary origin-top"
                style={{ scaleY, height: '100%' }}
            />
        </motion.div>
    );
};

export default ScrollProgress;
