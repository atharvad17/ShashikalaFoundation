import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { PaymentLayout } from '@/components/payments/PaymentLayout';
import { CheckoutForm } from '@/components/payments/CheckoutForm';
import { apiRequest } from '@/lib/queryClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { events } from '@/lib/data';

export default function EventRegistration() {
  const [routeMatch, params] = useRoute('/event-registration/:id');
  const eventId = params?.id ? parseInt(params.id) : null;
  const event = events.find(e => e.id === eventId);
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [attendees, setAttendees] = useState<number>(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!event) {
      toast({
        title: "Event Not Found",
        description: "The event you're trying to register for doesn't exist.",
        variant: "destructive",
      });
      navigate('/events');
    }
  }, [event, navigate, toast]);

  const totalAmount = event ? event.price * attendees : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;
    
    if (!name || !email || !email.includes('@') || attendees < 1) {
      toast({
        title: "Invalid Information",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For free events, just submit the RSVP directly
      if (event.price === 0) {
        const response = await apiRequest('POST', '/api/events/rsvp', { 
          eventId: event.id, 
          name, 
          email, 
          attendees 
        });
        
        if (response.ok) {
          toast({
            title: "RSVP Confirmed",
            description: `You've successfully RSVP'd to ${event.title}.`,
          });
          navigate('/events');
        } else {
          throw new Error('Failed to submit RSVP');
        }
      } else {
        // For paid events, create a payment intent first
        const response = await apiRequest('POST', '/api/create-event-registration-intent', { 
          eventId: event.id, 
          attendees,
          pricePerAttendee: event.price 
        });
        
        if (!response.ok) {
          throw new Error('Failed to initialize payment');
        }
        
        const data = await response.json();
        
        if (data.clientSecret) {
          // Scroll to top to ensure payment form is visible
          window.scrollTo(0, 0);
          setClientSecret(data.clientSecret);
          setShowPaymentForm(true);
        } else {
          throw new Error('Failed to initialize payment');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuccess = () => {
    if (!event) return;
    
    toast({
      title: "Registration Complete",
      description: `You've successfully registered for ${event.title}.`,
    });
    navigate('/events');
  };

  if (!event) return null;

  return (
    <PaymentLayout
      title={event.price === 0 ? `RSVP to ${event.title}` : `Register for ${event.title}`}
      description={event.price === 0 
        ? "Please fill out this form to reserve your spot."
        : `Registration fee: $${event.price} per person.`
      }
      clientSecret={clientSecret}
      isLoading={isLoading && showPaymentForm}
    >
      {!showPaymentForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attendees">Number of Attendees</Label>
            <Input 
              id="attendees" 
              type="number" 
              min="1" 
              value={attendees} 
              onChange={(e) => setAttendees(parseInt(e.target.value))}
              required
            />
          </div>
          
          {event.price > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between text-sm mb-1">
                <span>Price per attendee:</span>
                <span>${event.price}.00</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Number of attendees:</span>
                <span>{attendees}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${totalAmount}.00</span>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full mt-6" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (event.price === 0 ? "Confirm RSVP" : "Continue to Payment")}
          </Button>
        </form>
      ) : (
        <CheckoutForm 
          submitButtonText={`Pay $${totalAmount}.00`} 
          onSuccess={handleSuccess}
          isLoading={isLoading}
        />
      )}
    </PaymentLayout>
  );
}