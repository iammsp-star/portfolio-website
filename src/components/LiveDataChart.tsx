import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const generateData = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        time: i,
        loss: Math.max(0.1, Math.exp(-0.1 * i) + Math.random() * 0.1),
    }));
};

export const LiveDataChart = () => {
    const [data, setData] = useState(generateData(30));

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newTime = prev[prev.length - 1].time + 1;
                // Simulate training loss curve (mostly going down but with noise)
                const lastLoss = prev[prev.length - 1].loss;
                const newLoss = Math.max(0.02, lastLoss * 0.98 + (Math.random() - 0.5) * 0.02);

                const newData = [...prev.slice(1), { time: newTime, loss: newLoss }];
                return newData;
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="glass-card p-8 border border-slate-700/50 relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-red-500/10">
                                <Activity className="text-red-400 animate-pulse" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-200">Model Training Simulator</h3>
                                <p className="text-xs text-slate-400 font-mono">Real-time loss monitoring</p>
                            </div>
                        </div>

                        <div className="flex gap-6 text-sm font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-slate-400">Loss: <span className="text-white">{(data[data.length - 1].loss).toFixed(4)}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-slate-400">Epoch: <span className="text-white">{data[data.length - 1].time}</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" hide />
                                <YAxis
                                    domain={[0, 'auto']}
                                    tick={{ fill: '#475569', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => value.toFixed(2)}
                                    width={40}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                    itemStyle={{ color: '#ef4444' }}
                                    labelStyle={{ color: '#94a3b8' }}
                                    formatter={(value: number) => [value.toFixed(4), "Loss"]}
                                    labelFormatter={(label) => `Epoch ${label}`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="loss"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorLoss)"
                                    isAnimationActive={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};
