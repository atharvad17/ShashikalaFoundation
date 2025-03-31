import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderImage {
  url: string;
  title: string;
  subtitle: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: SliderImage[] = [
    {
      url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      title: "Handcrafted Art, Heartfelt Stories",
      subtitle: "Your one-stop solution for managing tasks efficiently"
    },
    {
      url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      title: "Empowering Artists",
      subtitle: "Discover unique talents in our community"
    },
    {
      url: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      title: "Nurturing Creativity",
      subtitle: "Supporting artistic expression through exhibitions and workshops"
    },
    {
      url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      title: "Inspiring Communities",
      subtitle: "Bringing art to everyone, everywhere"
    },
    {
      url: "https://images.unsplash.com/photo-1608501821300-4f99e58bba77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      title: "Join Our Movement",
      subtitle: "Become part of our growing artistic community"
    }
  ];
  
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  return (
    <section className="pt-16 relative">
      <div className="relative w-full h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
            <img 
              src={slide.url}
              alt={slide.title} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-6 max-w-2xl">{slide.subtitle}</p>
              <div className="flex space-x-2">
                {slides.map((_, dotIndex) => (
                  <button 
                    key={dotIndex}
                    className={`h-2 ${dotIndex === currentSlide ? 'w-12 bg-[#9DD3DD]' : 'w-2 bg-white opacity-60'} rounded-full transition-all duration-300`}
                    onClick={() => handleSlideChange(dotIndex)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <button 
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-30 hover:bg-opacity-70 transition-all duration-300"
          onClick={handlePrevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-30 hover:bg-opacity-70 transition-all duration-300"
          onClick={handleNextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
