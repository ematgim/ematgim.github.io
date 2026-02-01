import { useScrollTracking } from './hooks/useScrollTracking';
import { SECTIONS } from './constants/data';
import { Navbar, FloatingChat } from './components';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';

const App = () => {
  const { activeSection, isScrolled } = useScrollTracking(SECTIONS);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-green-500/30 selection:text-green-400">
      <Navbar isScrolled={isScrolled} activeSection={activeSection} />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default App;