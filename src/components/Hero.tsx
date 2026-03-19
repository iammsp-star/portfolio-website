const Hero = () => {
    return (
        <section id="home" className="pt-8 pb-16 border-b border-terminal-border/30 font-mono relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

                <div className="mb-8 opacity-80 text-xs sm:text-sm">
                    <p className="text-secondary">&gt; ACCESSING PROFILE: MANAS M POOPULLY</p>
                    <p>&gt; ROLE: DATA SCIENTIST & AI EXPERT</p>
                    <p>&gt; STATUS: OPEN FOR OPPORTUNITIES</p>
                    <p className="text-primary/70 animate-pulse mt-4">&gt; SYSTEM READY. AWAITING INPUT.</p>
                </div>
                
                {/* ASCII Art Logo - Wraps on mobile */}
                <div className="mb-12 overflow-x-auto no-scrollbar scroll-smooth">
                    <pre className="text-[0.45rem] xs:text-[0.6rem] sm:text-xs md:text-sm text-primary leading-none font-bold inline-block min-w-max">
                        {`
[==================================================================================================]
|  ___  ___  ___  _   _   ___  _____   __   _   ___       ___  _____  ___  ___   _______  __     |
|  |  \\/  | / _ \\ | \\ | | / _ \\/  ___| |  \\/  |  | _ \\     / _ \\ |_   _|/ _ \\|  \\  /  |  _  \\ \\ \\  |
|  | .  . |/ /_\\ \\|  \\| |/ /_\\ \\ \`--.  | .  . |  | | | |    / /_\\ \\  | | / /_\\ \\ | |/ /  | | | | \\ \\ |
|  | |\\/| ||  _  || . \` ||  _  | \`--. \\| |\\/| |  | | | |    |  _  |  | | |  _  ||    /   | | | |  > >|
|  | |  | || | | || |\\  || | | |/\\__/ /| |  | |  | |/ /|    | | | | _| |_| | | || |\\ \\   | |/ /  / / |
|  \\_|  |_/\\_| |_/\\_| \\_/\\_| |_/\\____/ \\_|  |_/  |___/     | | |/ \\___|\\_| |_/\\_| \\_/  |___/  /_/  |
|                                                                                                  |
[==================================== { DATA SCIENTIST & AI EXPERT } ===============================]
                        `}
                    </pre>
                </div>

                {/* Profile Information */}
                <div className="mt-8 border-l border-terminal-border/40 pl-4">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-secondary">msp-star@OS:~$</span>
                        <span className="text-white">whoami --details</span>
                    </div>
                    
                    <div className="bg-terminal-dim/10 p-4 border border-terminal-border/20 text-sm">
                        <pre className="whitespace-pre-wrap font-mono text-primary/90">
{`{
    "name": "Manas M Poopully",
    "title": "Data Scientist & AI Expert",
    "location": "AISSMS IOIT, Pune, MH, IN",
    "specialties": ["Machine Learning", "Artificial Intelligence", "Neural Networks"],
    "email": "manassubhash2007@gmail.com",
    "socials": {
        "linkedin": "linkedin.com/in/manas-puthanpura-5b06b0377/",
        "github": "github.com/iammsp-star"
    }
}`}
                        </pre>
                    </div>
                </div>

                {/* Brief bio replacing system output */}
                <div className="mt-8 text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
                    <p className="mb-4">
                        <span className="text-primary">&gt; DESCRIPTION:</span> I am a Data Scientist specializing in Machine Learning, Statistical Analysis, and building highly scalable intelligent systems. I transform complex datasets into actionable insights.
                    </p>
                    <p>
                        <span className="text-primary">&gt; CURRENT FOCUS:</span> Training cutting-edge neural networks, deploying MLOps pipelines, and researching Deep Learning architectures.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
