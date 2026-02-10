import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const MetricItem = ({ label, value, suffix = '' }: { label: string, value: number, suffix?: string }) => {
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center group hover:bg-slate-800/30 p-4 rounded-lg transition-colors cursor-default"
        >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1 font-mono flex justify-center items-center">
                <motion.span>{display}</motion.span>
                {suffix}
            </div>
            <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold group-hover:text-white transition-colors">
                {label}
            </div>
        </motion.div>
    );
};

export const MetricsBar = () => {
    return (
        <div className="w-full py-10 border-y border-slate-800 bg-slate-900/50 backdrop-blur-sm relative z-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <MetricItem label="Models Deployed" value={42} suffix="+" />
                <MetricItem label="Datasets Analyzed" value={150} suffix="TB" />
                <MetricItem label="Accuracy Rate" value={99} suffix="%" />
                <MetricItem label="Caffeine Level" value={9000} suffix="+" />
            </div>
        </div>
    );
};
