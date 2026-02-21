import { Send } from 'lucide-react';
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
        <section id="contact" className="py-20 relative font-mono text-slate-300">
            <div className="container mx-auto px-6 max-w-4xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="border border-slate-800 bg-black p-4 hover:border-primary/50 transition-colors group">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="text-primary">{'>'}</span> NODE_LOCATION
                            </h3>
                            <div className="pl-6 border-l border-primary/20 ml-2">
                                <p className="text-slate-400">Mumbai, India (IST)</p>
                                <p className="text-xs text-slate-600 mt-1">lat: 19.0760, long: 72.8777</p>
                            </div>
                        </div>

                        <div className="border border-slate-800 bg-black p-4 hover:border-primary/50 transition-colors group">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="text-primary">{'>'}</span> DIRECT_LINE
                            </h3>
                            <div className="pl-6 border-l border-primary/20 ml-2">
                                <a href="mailto:manas.puthanpura@example.com" className="text-slate-400 hover:text-primary transition-colors block">
                                    manas.puthanpura@example.com
                                </a>
                                <p className="text-xs text-slate-600 mt-1">PGP Key: 0x44F2...99A</p>
                            </div>
                        </div>

                        <div className="border border-slate-800 bg-black p-4 hover:border-primary/50 transition-colors group">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="text-primary">{'>'}</span> NETWORK_NODES
                            </h3>
                            <div className="pl-6 border-l border-primary/20 ml-2 flex flex-col gap-2">
                                <a href="https://www.linkedin.com/in/manas-puthanpura-5b06b0377/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors font-mono text-sm">
                                    [LINKEDIN_PROFILE]
                                </a>
                                <a href="https://github.com/iammsp-star" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors font-mono text-sm">
                                    [GITHUB_REPO]
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="border border-slate-800 bg-black p-6 relative">
                        <div className="absolute top-0 right-0 p-2 text-xs text-slate-600">v1.0.4</div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs text-primary mb-2 font-bold">SOURCE_ID (NAME)</label>
                                <div className="flex items-center bg-transparent border-b border-slate-700 hover:border-primary transition-colors group">
                                    <span className="text-slate-500 mr-2">{'>'}</span>
                                    <input
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-transparent p-2 text-white outline-none font-mono placeholder-slate-700"
                                        placeholder="Enter identifier..."
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-primary mb-2 font-bold">RETURN_ADDRESS (EMAIL)</label>
                                <div className="flex items-center bg-transparent border-b border-slate-700 hover:border-primary transition-colors group">
                                    <span className="text-slate-500 mr-2">{'>'}</span>
                                    <input
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-transparent p-2 text-white outline-none font-mono placeholder-slate-700"
                                        placeholder="Enter return path..."
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-primary mb-2 font-bold">DATA_PACKET (MESSAGE)</label>
                                <div className="bg-transparent border border-slate-700 hover:border-primary transition-colors group p-2 relative">
                                    <textarea
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-transparent text-white outline-none font-mono h-32 resize-none placeholder-slate-700 custom-scrollbar"
                                        placeholder="Input transmission data..."
                                        required
                                    ></textarea>
                                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary animate-pulse"></div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black font-bold py-3 transition-all flex items-center justify-center gap-2 group uppercase tracking-wider"
                            >
                                <span className="group-hover:hidden">[ TRANSMIT_DATA ]</span>
                                <span className="hidden group-hover:inline">[ SENDING... ]</span>
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
