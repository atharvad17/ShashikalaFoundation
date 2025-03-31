import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

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
  price: number;
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
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
      price: 0 // Free event
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
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
      price: 25 // $25 per person
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
      image: 'https://images.unsplash.com/photo-1580060860978-d479ca3087fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
      price: 10 // $10 per person
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
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
      price: 15 // $15 per child
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
      image: 'https://images.unsplash.com/photo-1620504155085-d7b3cf1c8b46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
      price: 20 // $20 per person
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
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
      price: 0 // Free event, just bring your supplies
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
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <Badge className={event.price === 0 ? "bg-green-500" : "bg-[#F5A962]"}>
                        {event.price === 0 ? "Free" : `$${event.price}`}
                      </Badge>
                    </div>
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
                        className={`${event.price === 0 ? "bg-[#9DD3DD]" : "bg-[#F5A962]"} hover:bg-opacity-90 text-white`}
                        onClick={() => handleRSVP(event)}
                      >
                        {event.price === 0 ? "RSVP Now" : "Register"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{rsvpEvent?.title}</DialogTitle>
                        <DialogDescription className="text-base">
                          Date: {rsvpEvent?.date.month} {rsvpEvent?.date.day}, 2024 | Time: {rsvpEvent?.time} | Location: {rsvpEvent?.location}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name" className="text-sm font-medium">
                              First Name<span className="text-red-500">*</span>
                            </Label>
                            <Input id="first-name" placeholder="First Name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name" className="text-sm font-medium">
                              Last Name<span className="text-red-500">*</span>
                            </Label>
                            <Input id="last-name" placeholder="Last Name" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="middle-name" className="text-sm font-medium">
                            Middle Name (optional)
                          </Label>
                          <Input id="middle-name" placeholder="Middle Name" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email<span className="text-red-500">*</span>
                          </Label>
                          <Input id="email" type="email" placeholder="abc@gmail.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="contact" className="text-sm font-medium">
                            Contact<span className="text-red-500">*</span>
                          </Label>
                          <Input id="contact" placeholder="+1 (000)-000-0000" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium">
                            Address<span className="text-red-500">*</span>
                          </Label>
                          <Input id="address" placeholder="Primary Address" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address-line2" className="text-sm font-medium">
                            Apt/ Unit/ Suite
                          </Label>
                          <Input id="address-line2" placeholder="Apt/ Unit/ Suite" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium">
                              City<span className="text-red-500">*</span>
                            </Label>
                            <Input id="city" placeholder="City" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-sm font-medium">
                              State<span className="text-red-500">*</span>
                            </Label>
                            <Input id="state" placeholder="State" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipcode" className="text-sm font-medium">
                              Zipcode<span className="text-red-500">*</span>
                            </Label>
                            <Input id="zipcode" placeholder="Zipcode" />
                          </div>
                        </div>
                        
                        {rsvpEvent && rsvpEvent.price > 0 && (
                          <div className="mt-2 text-center">
                            <p className="font-medium">Registration Fee: ${rsvpEvent.price}</p>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button 
                          type="submit" 
                          className={`w-full ${rsvpEvent?.price === 0 ? "bg-[#9DD3DD]" : "bg-[#F5A962]"} hover:bg-opacity-90`}
                        >
                          {rsvpEvent?.price === 0 ? "Confirm RSVP" : "Proceed to Payment"}
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
