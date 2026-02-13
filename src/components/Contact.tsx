import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Globe } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending
        console.log('Transmitting packet:', formState);
        alert('PACKET_SENT: Transmission successful.');
        setFormState({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-20 relative font-mono">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="terminal-text text-primary text-sm tracking-widest mb-2 block">COMMUNICATION_LINK</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Establish Connection</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Initiate handshake protocol. Send encrypted transmission regarding collaboration or inquiries.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="border-l-2 border-primary pl-6 py-2">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <MapPin size={20} className="text-secondary" />
                                NODE_LOCATION
                            </h3>
                            <p className="text-slate-400">Bangalore, India (IST)</p>
                        </div>

                        <div className="border-l-2 border-primary pl-6 py-2">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Mail size={20} className="text-secondary" />
                                DIRECT_LINE
                            </h3>
                            <p className="text-slate-400">manas.puthanpura@example.com</p>
                            <p className="text-xs text-slate-600 mt-1">PGP Key: 0x44F2...99A</p>
                        </div>

                        <div className="border-l-2 border-primary pl-6 py-2">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Globe size={20} className="text-secondary" />
                                NETWORK_NODES
                            </h3>
                            <div className="flex gap-4 mt-2">
                                <a href="#" className="text-slate-400 hover:text-primary transition-colors">[LINKEDIN]</a>
                                <a href="#" className="text-slate-400 hover:text-primary transition-colors">[GITHUB]</a>
                                <a href="#" className="text-slate-400 hover:text-primary transition-colors">[TWITTER]</a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="glass-card bg-slate-900/50 border border-slate-800 p-6 rounded"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs text-secondary mb-1">SOURCE_ID (NAME)</label>
                                <input
                                    type="text"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-black/50 border border-slate-700 p-2 text-white outline-none focus:border-primary transition-colors"
                                    placeholder="Enter identifier..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-secondary mb-1">RETURN_ADDRESS (EMAIL)</label>
                                <input
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-black/50 border border-slate-700 p-2 text-white outline-none focus:border-primary transition-colors"
                                    placeholder="Enter encrypted channel..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-secondary mb-1">DATA_PACKET (MESSAGE)</label>
                                <textarea
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-black/50 border border-slate-700 p-2 text-white outline-none focus:border-primary transition-colors h-32"
                                    placeholder="Input transmission data..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black font-bold py-3 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                TRANSMIT_DATA
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
