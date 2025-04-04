import { Link, useLocation } from 'wouter';
import { ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  
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
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setEmail("");
    setContact("");
    setAddress("");
    setAddressLine2("");
    setCity("");
    setState("");
    setZipcode("");
    setAttendees(1);
    setIsOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rsvpEvent) return;
    
    if (!firstName || !lastName || !email || !email.includes('@') || !contact || !address || !city || !state || !zipcode) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    // For free events, just confirm RSVP
    if (rsvpEvent.price === 0) {
      toast({
        title: "RSVP Confirmed",
        description: `You've successfully RSVP'd to ${rsvpEvent.title}.`
      });
      setIsOpen(false);
    } else {
      // For paid events, redirect to the payment page with event details
      navigate(`/event-registration?id=${rsvpEvent.id}`);
      setIsOpen(false);
    }
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
                  <Dialog open={isOpen && rsvpEvent?.id === event.id} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className={`${event.price === 0 ? "bg-[#9DD3DD]" : "bg-[#F5A962]"} hover:bg-opacity-90 text-white`}
                        onClick={() => handleRSVP(event)}
                      >
                        {event.price === 0 ? "RSVP Now" : "Register"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {rsvpEvent?.price === 0 
                            ? `RSVP to ${rsvpEvent?.title}` 
                            : `Register for ${rsvpEvent?.title}`}
                        </DialogTitle>
                        <DialogDescription>
                          Date: {rsvpEvent?.date.month} {rsvpEvent?.date.day}, 2024 | Time: {rsvpEvent?.time}
                          <br />
                          Location: {rsvpEvent?.location}
                          <br />
                          {rsvpEvent?.price === 0 
                            ? "Fill out this form to reserve your spot at this event." 
                            : `Registration fee: $${rsvpEvent?.price} per person.`}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name" className="text-sm font-medium">
                                First Name<span className="text-red-500">*</span>
                              </Label>
                              <Input 
                                id="first-name" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name" 
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name" className="text-sm font-medium">
                                Last Name<span className="text-red-500">*</span>
                              </Label>
                              <Input 
                                id="last-name" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name" 
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="middle-name" className="text-sm font-medium">
                              Middle Name (optional)
                            </Label>
                            <Input 
                              id="middle-name" 
                              value={middleName}
                              onChange={(e) => setMiddleName(e.target.value)}
                              placeholder="Middle Name" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email<span className="text-red-500">*</span>
                            </Label>
                            <Input 
                              id="email" 
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="your.email@example.com" 
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="contact" className="text-sm font-medium">
                              Contact<span className="text-red-500">*</span>
                            </Label>
                            <Input 
                              id="contact"
                              value={contact}
                              onChange={(e) => setContact(e.target.value)}
                              placeholder="+1 (000)-000-0000" 
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium">
                              Address<span className="text-red-500">*</span>
                            </Label>
                            <Input 
                              id="address" 
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Primary Address" 
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address-line2" className="text-sm font-medium">
                              Apt/ Unit/ Suite
                            </Label>
                            <Input 
                              id="address-line2" 
                              value={addressLine2}
                              onChange={(e) => setAddressLine2(e.target.value)}
                              placeholder="Apt/ Unit/ Suite" 
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city" className="text-sm font-medium">
                                City<span className="text-red-500">*</span>
                              </Label>
                              <Input 
                                id="city" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City" 
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state" className="text-sm font-medium">
                                State<span className="text-red-500">*</span>
                              </Label>
                              <Input 
                                id="state" 
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State" 
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zipcode" className="text-sm font-medium">
                                Zipcode<span className="text-red-500">*</span>
                              </Label>
                              <Input 
                                id="zipcode" 
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                placeholder="Zipcode" 
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="attendees" className="text-sm font-medium">
                              Number of Attendees<span className="text-red-500">*</span>
                            </Label>
                            <Input 
                              id="attendees" 
                              type="number" 
                              min="1" 
                              value={attendees}
                              onChange={(e) => setAttendees(parseInt(e.target.value) || 1)}
                              required
                            />
                          </div>
                          
                          {rsvpEvent?.price !== 0 && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-md">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Price per attendee:</span>
                                <span>${rsvpEvent?.price}.00</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Number of attendees:</span>
                                <span>{attendees}</span>
                              </div>
                              <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="flex justify-between font-medium">
                                  <span>Total:</span>
                                  <span>${rsvpEvent ? rsvpEvent.price * attendees : 0}.00</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button 
                            type="submit"
                            className={`w-full ${rsvpEvent?.price === 0 ? "bg-[#9DD3DD]" : "bg-[#F5A962]"} hover:bg-opacity-90 text-white text-lg py-6`}
                            size="lg"
                          >
                            {rsvpEvent?.price === 0 ? "Confirm RSVP" : "Proceed to Payment"}
                          </Button>
                        </DialogFooter>
                      </form>
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
