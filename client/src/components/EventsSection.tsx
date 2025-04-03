import { Link } from 'wouter';
import { ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  price: number; // Price in USD, 0 for free events
}

const EventsSection = () => {
  const [rsvpEvent, setRsvpEvent] = useState<Event | null>(null);
  
  const events: Event[] = [
    {
      id: 1,
      title: 'Summer Art Fair',
      description: 'Join us for our annual summer art fair featuring works from over 50 local artists.',
      date: {
        day: '15',
        month: 'Aug'
      },
      time: '10:00 AM - 4:00 PM',
      location: 'Central Park, Main Plaza',
      price: 0 // Free event
    },
    {
      id: 2,
      title: 'Watercolor Workshop',
      description: 'Learn essential watercolor techniques from our experienced instructors in this hands-on workshop.',
      date: {
        day: '23',
        month: 'Aug'
      },
      time: '2:00 PM - 5:00 PM',
      location: 'Art Studio, 123 Main St',
      price: 25 // $25 per person
    },
    {
      id: 3,
      title: 'Artist Talk: Modern Expressionism',
      description: 'Join renowned artist Maria Sanchez as she discusses the influence of expressionism in contemporary art.',
      date: {
        day: '30',
        month: 'Aug'
      },
      time: '6:30 PM - 8:00 PM',
      location: 'Community Gallery',
      price: 10 // $10 per person
    }
  ];

  const handleRSVP = (event: Event) => {
    setRsvpEvent(event);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link href="/events">
            <a className="text-[#9DD3DD] font-medium flex items-center">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9DD3DD] bg-opacity-20 text-[#9DD3DD] rounded-lg p-3 mr-4 w-16 h-16 flex flex-col justify-center items-center">
                    <span className="text-lg font-bold">{event.date.day}</span>
                    <span className="text-xs uppercase">{event.date.month}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <div className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        event.price === 0 
                          ? "bg-green-100 text-green-800" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {event.price === 0 ? "Free" : `$${event.price}`}
                      </div>
                    </div>
                    <p className="text-gray-600">{event.time}</p>
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
                        variant="ghost" 
                        className="text-[#9DD3DD] font-medium"
                        onClick={() => handleRSVP(event)}
                      >
                        {event.price === 0 ? "RSVP Now" : "Register"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {event.price === 0 
                            ? `RSVP to ${rsvpEvent?.title}` 
                            : `Register for ${rsvpEvent?.title}`}
                        </DialogTitle>
                        <DialogDescription>
                          {event.price === 0 
                            ? "Fill out this form to reserve your spot at this event." 
                            : `Complete registration to attend this event. Registration fee: $${rsvpEvent?.price} per person.`}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="attendees" className="text-right">
                            Attendees
                          </Label>
                          <Input 
                            id="attendees" 
                            type="number" 
                            min="1" 
                            className="col-span-3" 
                            defaultValue="1" 
                          />
                        </div>
                        {rsvpEvent?.price !== 0 && (
                          <div className="grid grid-cols-1 mt-2">
                            <div className="p-3 bg-gray-100 rounded-md">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Price per attendee:</span>
                                <span>${rsvpEvent?.price}.00</span>
                              </div>
                              <div className="border-t border-gray-300 pt-1 mt-1">
                                <div className="flex justify-between font-medium">
                                  <span>Total:</span>
                                  <span>Calculated at checkout</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          {event.price === 0 ? "Confirm RSVP" : "Proceed to Payment"}
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
    </section>
  );
};

export default EventsSection;
