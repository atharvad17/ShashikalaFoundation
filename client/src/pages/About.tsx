import { Button } from '@/components/ui/button';
import TeamSection from '@/components/TeamSection';

const About = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Shashikala Foundation</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <img 
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80" 
            alt="Shashikala Foundation Team" 
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Shashikala Foundation, our mission is to make art accessible to everyone, regardless of their background or experience level. We believe in the transformative power of creativity and its ability to heal, connect, and inspire.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-6">
            We envision a world where art is recognized as an essential part of human experience and where creative expression is valued as a means of personal growth, community building, and social change.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our History</h2>
          <p className="text-lg text-gray-700 mb-6">
            Founded in 2015, Shashikala Foundation began as a small community art project led by a group of passionate artists and educators. What started as weekend workshops in a borrowed space has grown into a comprehensive arts organization with multiple programs, exhibitions, and outreach initiatives.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Over the years, we have served thousands of individuals of all ages, backgrounds, and abilities, providing them with opportunities to create, learn, and connect through art.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 mb-6 space-y-2">
            <li><span className="font-medium">Inclusivity:</span> We believe that art is for everyone.</li>
            <li><span className="font-medium">Creativity:</span> We encourage experimentation and innovative thinking.</li>
            <li><span className="font-medium">Community:</span> We foster connection and collaboration through art.</li>
            <li><span className="font-medium">Excellence:</span> We maintain high standards in our programs and exhibitions.</li>
            <li><span className="font-medium">Advocacy:</span> We champion the value of art in society.</li>
          </ul>
        </div>
        
        {/* Team Section with tabs for different groups */}
        <TeamSection />
        
        <div className="text-center mt-16">
          <Button className="bg-[#9DD3DD] hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300">
            Get Involved
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
