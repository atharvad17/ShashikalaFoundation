import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

const Artists = () => {
  const artists: Artist[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Abstract Painting',
      bio: 'Sarah is a contemporary abstract painter whose work explores the relationship between color, form, and emotion. She has exhibited her work nationally and has been an artist-in-residence at several prestigious institutions.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Printmaking',
      bio: 'Michael specializes in relief and intaglio printmaking, creating works that blend traditional techniques with contemporary subjects. His prints are held in several museum collections.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      specialty: 'Ceramics',
      bio: 'Elena creates functional and sculptural ceramic pieces inspired by natural forms. She has taught ceramics for over a decade and her work has been featured in numerous galleries.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 4,
      name: 'David Anderson',
      specialty: 'Wood Sculpture',
      bio: 'David is a sculptor who works primarily with reclaimed wood. His sculptures explore themes of sustainability and the relationship between humans and the natural world.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 5,
      name: 'Amara Patel',
      specialty: 'Textile Art',
      bio: 'Amara creates handwoven textiles using traditional techniques and natural dyes. Her work celebrates cultural heritage and sustainable craft practices.',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 6,
      name: 'Jordan Smith',
      specialty: 'Digital Illustration',
      bio: 'Jordan is a digital artist whose vibrant illustrations combine elements of fantasy and social commentary. Their work has been commissioned for various publications and exhibitions.',
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Our Artists</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Meet the talented artists who are part of our foundation. We support their work and help them connect with the community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Card key={artist.id} className="overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{artist.name}</h3>
                <p className="text-[#9DD3DD] font-medium mb-3">{artist.specialty}</p>
                <p className="text-gray-600 mb-4">{artist.bio}</p>
                <Button 
                  className="w-full bg-[#9DD3DD] hover:bg-opacity-90 text-white"
                  variant="outline"
                >
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;
