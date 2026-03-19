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
            className="fixed left-6 top-0 bottom-0 w-[2px] bg-white/5 z-0 hidden lg:block rounded-full"
            style={{ originY: 0 }}
        >
            <motion.div
                className="w-full bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                style={{ scaleY, height: '100%' }}
            />
        </motion.div>
    );
};

export default ScrollProgress;
