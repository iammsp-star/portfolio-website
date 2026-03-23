const Hero = () => {
    return (
        <section id="home" className="pt-8 pb-16 border-b border-terminal-border/30 font-mono relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

                <div className="mb-8 opacity-80 text-xs sm:text-sm">
                    <p className="text-secondary">&gt; ACCESSING PROFILE: MANAS PUTHANPURA</p>
                    <p>&gt; ROLE: DATA SCIENTIST & AI EXPERT</p>
                    <p>&gt; STATUS: OPEN FOR OPPORTUNITIES</p>
                    <p className="text-primary/70 animate-pulse mt-4">&gt; SYSTEM READY. AWAITING INPUT.</p>
                </div>
                
                <style>
                    {`
                    @keyframes hologram {
                        0% { text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; opacity: 1; transform: skew(0deg); }
                        5% { text-shadow: 2px 0 5px rgba(255,0,255,0.7), -2px 0 10px rgba(0,255,255,0.7); opacity: 0.8; transform: skew(2deg); }
                        10% { text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; opacity: 1; transform: skew(0deg); }
                        15% { opacity: 0.6; }
                        20% { opacity: 1; text-shadow: 0 0 5px #00ff00; }
                        50% { opacity: 1; text-shadow: 0 0 5px #00ff00, 0 0 15px #00ff00; }
                        52% { opacity: 0.8; transform: skew(-5deg); text-shadow: 2px 0 5px rgba(255,0,200,0.7), -2px 0 10px rgba(0,255,255,0.7); }
                        54% { opacity: 1; transform: skew(0deg); text-shadow: 0 0 5px #00ff00, 0 0 15px #00ff00; }
                        100% { opacity: 1; text-shadow: 0 0 5px #00ff00, 0 0 15px #00ff00; }
                    }
                    .hologram-effect {
                        animation: hologram 4s infinite;
                        color: #00ff00;
                    }
                    `}
                </style>

                {/* ASCII Art Logo - Wraps on mobile */}
                <div className="mb-12 overflow-x-auto no-scrollbar scroll-smooth">
                    <pre className="text-[0.45rem] xs:text-[0.6rem] sm:text-xs md:text-sm leading-none font-bold inline-block min-w-max hologram-effect">
                        {`
[===================================================================================================================]
|   __  __    _    _   _    _    ____   ____  _   _ _____ _   _    _    _   _ ____  _   _ ____      _       |
|  |  \\/  |  / \\  | \\ | |  / \\  / ___| |  _ \\| | | |_   _| | | |  / \\  | \\ | |  _ \\| | | |  _ \\    / \\      |
|  | |\\/| | / _ \\ |  \\| | / _ \\ \\___ \\ | |_) | | | | | | | |_| | / _ \\ |  \\| | |_) | | | | |_) |  / _ \\     |
|  | |  | |/ ___ \\| |\\  |/ ___ \\ ___) ||  __/| |_| | | | |  _  |/ ___ \\| |\\  |  __/| |_| |  _ <  / ___ \\    |
|  |_|  |_/_/   \\_\\_| \\_/_/   \\_\\____/ |_|    \\___/  |_| |_| |_/_/   \\_\\_| \\_|_|    \\___/|_| \\_\\/_/   \\_\\   |
|                                                                                                           |
[======================================= { DATA SCIENTIST & AI EXPERT } ====================================]
                        `}
                    </pre>
                </div>

                {/* Brief bio replacing system output */}
                <div className="mt-8 text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
                    <p className="mb-4">
                        <span className="text-primary">&gt; DESCRIPTION:</span> Data Scientist currently pursuing my degree. I am developing a strong technical foundation in statistics and computer science to eventually build scalable intelligent systems.
                    </p>
                    <p>
                        <span className="text-primary">&gt; CURRENT FOCUS:</span> Deep-diving into Linear Algebra and Calculus for ML, practicing data visualization techniques, and researching the history of Deep Learning architectures.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
