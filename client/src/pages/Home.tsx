import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import ProgramsSection from '@/components/ProgramsSection';
import EventsSection from '@/components/EventsSection';
import DonationCTA from '@/components/DonationCTA';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <AboutSection />
      <ProgramsSection />
      <EventsSection />
      <DonationCTA />
    </div>
  );
};

export default Home;
