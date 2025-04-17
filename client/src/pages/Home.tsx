import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import FeaturedArtworks from '@/components/FeaturedArtworks';
import EventsSection from '@/components/EventsSection';
import DonationCTA from '@/components/DonationCTA';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <AboutSection />
      <FeaturedArtworks />
      <EventsSection />
      <DonationCTA />
    </div>
  );
};

export default Home;
