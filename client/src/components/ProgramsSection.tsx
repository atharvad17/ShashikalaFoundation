import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Program {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const ProgramsSection = () => {
  const programs: Program[] = [
    {
      id: 1,
      title: 'Art Workshops',
      description: 'Weekly art workshops for beginners and experienced artists alike.',
      imageUrl: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
    },
    {
      id: 2,
      title: 'Art Exhibitions',
      description: 'Monthly exhibitions featuring work from our community artists.',
      imageUrl: 'https://images.unsplash.com/photo-1578926288207-32356a2b80df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
    },
    {
      id: 3,
      title: 'Community Outreach',
      description: 'Art therapy and education programs for underserved communities.',
      imageUrl: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.imageUrl} 
                  alt={program.title} 
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link href={`/programs/${program.id}`}>
                  <a className="text-[#9DD3DD] font-medium flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
