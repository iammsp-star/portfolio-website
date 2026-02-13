import Hero from '../components/Hero';
import ScrollProgress from '../components/ScrollProgress';
import Timeline from '../components/Timeline';
import SkillsBento from '../components/SkillsBento';
import Impact from '../components/Impact';
import Contact from '../components/Contact';
import LiveStats from '../components/LiveStats';

export const Home = () => {
  return (
    <div className="relative z-10 antialiased selection:bg-primary/30 selection:text-primary-foreground">
      <ScrollProgress />

      <main className="flex flex-col gap-0">
        <Hero />
        <Timeline />
        <SkillsBento />
        <Impact />
        <Contact />
      </main>

      <LiveStats />
    </div>
  );
};
