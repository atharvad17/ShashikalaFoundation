import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: {
    day: string;
    month: string;
  };
  time: string;
  location: string;
  image: string;
}

const Events = () => {
  const [rsvpEvent, setRsvpEvent] = useState<Event | null>(null);
  
  const events: Event[] = [
    {
      id: 1,
      title: 'Summer Art Fair',
      description: 'Join us for our annual summer art fair featuring works from over 50 local artists. Browse and purchase unique artworks, enjoy live demonstrations, and participate in hands-on activities for all ages.',
      date: {
        day: '15',
        month: 'Aug'
      },
      time: '10:00 AM - 4:00 PM',
      location: 'Central Park, Main Plaza',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80'
    },
    {
      id: 2,
      title: 'Watercolor Workshop',
      description: 'Learn essential watercolor techniques from our experienced instructors in this hands-on workshop. This class is suitable for beginners and intermediate painters looking to refine their skills.',
      date: {
        day: '23',
        month: 'Aug'
      },
      time: '2:00 PM - 5:00 PM',
      location: 'Art Studio, 123 Main St',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80'
    },
    {
      id: 3,
      title: 'Artist Talk: Modern Expressionism',
      description: 'Join renowned artist Maria Sanchez as she discusses the influence of expressionism in contemporary art. Following the talk will be a Q&A session and light refreshments.',
      date: {
        day: '30',
        month: 'Aug'
      },
      time: '6:30 PM - 8:00 PM',
      location: 'Community Gallery',
      image: 'https://images.unsplash.com/photo-1580060860978-d479ca3087fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80'
    },
    {
      id: 4,
      title: 'Children\'s Art Day',
      description: 'A special day dedicated to young artists! Children ages 5-12 can explore different art mediums through guided activities. All materials provided.',
      date: {
        day: '05',
        month: 'Sep'
      },
      time: '9:00 AM - 12:00 PM',
      location: 'Youth Center, 456 Elm St',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80'
    },
    {
      id: 5,
      title: 'Sculpture Exhibition Opening',
      description: 'Be the first to see our new sculpture exhibition featuring works from regional artists. Opening reception includes artist meet-and-greet and wine tasting.',
      date: {
        day: '12',
        month: 'Sep'
      },
      time: '7:00 PM - 9:00 PM',
      location: 'Main Gallery',
      image: 'https://images.unsplash.com/photo-1620504155085-d7b3cf1c8b46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80'
    },
    {
      id: 6,
      title: 'Plein Air Painting Excursion',
      description: 'Join us for a day of outdoor painting in the scenic Riverside Park. Bring your own supplies or rent from us. All skill levels welcome.',
      date: {
        day: '19',
        month: 'Sep'
      },
      time: '10:00 AM - 2:00 PM',
      location: 'Riverside Park, East Entrance',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80'
    }
  ];

  const handleRSVP = (event: Event) => {
    setRsvpEvent(event);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Upcoming Events</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Join us for workshops, exhibitions, and community art events. Everyone is welcome!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9DD3DD] bg-opacity-20 text-[#9DD3DD] rounded-lg p-3 mr-4 w-16 h-16 flex flex-col justify-center items-center">
                    <span className="text-lg font-bold">{event.date.day}</span>
                    <span className="text-xs uppercase">{event.date.month}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <p>{event.time}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-[#9DD3DD]" />
                    <span>{event.location}</span>
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-[#9DD3DD] hover:bg-opacity-90 text-white"
                        onClick={() => handleRSVP(event)}
                      >
                        RSVP Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>RSVP to {rsvpEvent?.title}</DialogTitle>
                        <DialogDescription>
                          Fill out this form to reserve your spot at this event.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="full-name" className="text-right">
                            Full Name
                          </Label>
                          <Input id="full-name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email-address" className="text-right">
                            Email
                          </Label>
                          <Input id="email-address" type="email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input id="phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="attendees" className="text-right">
                            Attendees
                          </Label>
                          <Input id="attendees" type="number" min="1" className="col-span-3" defaultValue="1" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          Confirm RSVP
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
