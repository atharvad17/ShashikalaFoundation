import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  location: string;
  image: string;
  category: 'executive' | 'youth' | 'team' | 'artist';
}

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    // Executive Committee
    {
      id: 1,
      name: 'Dr. Amelia Roberts',
      title: 'Executive Director',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'executive'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Board Chair',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'executive'
    },
    {
      id: 3,
      name: 'Sophia Williams',
      title: 'Chief Financial Officer',
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'executive'
    },
    {
      id: 4,
      name: 'James Peterson',
      title: 'Development Director',
      location: 'Boston, MA',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'executive'
    },

    // Youth Committee
    {
      id: 5,
      name: 'Zoe Chen',
      title: 'Youth Committee Chair',
      location: 'Portland, OR',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'youth'
    },
    {
      id: 6,
      name: 'Marcus Johnson',
      title: 'Youth Outreach Coordinator',
      location: 'Seattle, WA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'youth'
    },
    {
      id: 7,
      name: 'Lily Patel',
      title: 'Student Representative',
      location: 'Denver, CO',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'youth'
    },
    {
      id: 8,
      name: 'Tyler Rodriguez',
      title: 'Youth Programs Coordinator',
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'youth'
    },

    // Core Team
    {
      id: 9,
      name: 'Rebecca Kim',
      title: 'Program Manager',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'team'
    },
    {
      id: 10,
      name: 'Daniel Garcia',
      title: 'Communications Director',
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'team'
    },
    {
      id: 11,
      name: 'Olivia Lewis',
      title: 'Event Coordinator',
      location: 'Atlanta, GA',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'team'
    },
    {
      id: 12,
      name: 'Ethan West',
      title: 'Operations Manager',
      location: 'Philadelphia, PA',
      image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'team'
    },

    // Artists
    {
      id: 13,
      name: 'Sarah Johnson',
      title: 'Visual Artist',
      location: 'Minneapolis, MN',
      image: 'https://images.unsplash.com/photo-1541779408-c1f32d396f36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'artist'
    },
    {
      id: 14,
      name: 'Elena Rodriguez',
      title: 'Ceramic Artist',
      location: 'Santa Fe, NM',
      image: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'artist'
    },
    {
      id: 15,
      name: 'Amara Patel',
      title: 'Textile Artist',
      location: 'Detroit, MI',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'artist'
    },
    {
      id: 16,
      name: 'David Anderson',
      title: 'Sculptor',
      location: 'New Orleans, LA',
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      category: 'artist'
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-semibold mb-10 text-center">Our Team</h2>
      
      <Tabs defaultValue="executive" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="executive">Executive Committee</TabsTrigger>
          <TabsTrigger value="youth">Youth Committee</TabsTrigger>
          <TabsTrigger value="team">Core Team</TabsTrigger>
          <TabsTrigger value="artist">Artists</TabsTrigger>
        </TabsList>
        
        {['executive', 'youth', 'team', 'artist'].map((category) => (
          <TabsContent value={category} key={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers
                .filter(member => member.category === category)
                .map(member => (
                  <Card 
                    key={member.id} 
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      
                      {/* Hover overlay with information */}
                      <div 
                        className={`absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 text-white transition-opacity duration-300 ${
                          hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-sm">{member.title}</p>
                        <p className="text-xs opacity-80">{member.location}</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.title}</p>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TeamSection;