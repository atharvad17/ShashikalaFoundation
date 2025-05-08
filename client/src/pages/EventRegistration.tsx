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
  // Only use route parameters since query parameters have been inconsistent
  const [routeMatch, params] = useRoute('/event-registration/:id');
  
  // Extract the event ID from the route parameters
  const eventId = params?.id ? parseInt(params.id) : null;
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [attendees, setAttendees] = useState<number>(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDonationPrompt, setShowDonationPrompt] = useState<boolean>(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // For debugging, log the values to help identify the issue
  console.log("Event ID from route param:", eventId);
  console.log("Available events:", events.map(e => e.id));
  
  // Find the event with the matching ID
  const event = events.find(e => e.id === eventId);
  console.log("Found event:", event);

  useEffect(() => {
    // If no valid event ID is provided, navigate back to events
    if (eventId === null) {
      toast({
        title: "No Event Selected",
        description: "Please select an event from the events page.",
        variant: "destructive",
      });
      navigate('/events');
      return;
    }
    
    // If the event ID doesn't match any events, display an error
    if (!event) {
      toast({
        title: "Event Not Found",
        description: `The event with ID ${eventId} doesn't exist.`,
        variant: "destructive",
      });
      navigate('/events');
    }
  }, [event, eventId, navigate, toast]);

  const totalAmount = event ? event.price * attendees : 0;
  
  // Make sure there's a reasonable minimum attendees count
  useEffect(() => {
    if (attendees < 1) {
      setAttendees(1);
    }
  }, [attendees]);

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
      // For free events, submit RSVP, then show a donation prompt
      if (event.price === 0) {
        // Simulate API request for RSVP
        // In a real app, you'd send this to your backend
        // const response = await apiRequest('POST', '/api/events/rsvp', { 
        //   eventId: event.id, 
        //   name, 
        //   email, 
        //   attendees 
        // });
        
        // Simulate successful response
        const mockSuccess = true;
        
        if (mockSuccess) {
          toast({
            title: "RSVP Confirmed",
            description: `You've successfully RSVP'd to ${event.title}.`,
          });
          
          // Show donation prompt
          setShowDonationPrompt(true);
          setTimeout(() => {
            const wantToDonate = window.confirm(`Thank you for your RSVP to ${event.title}! Would you like to make a donation to support our foundation?`);
            if (wantToDonate) {
              navigate('/donate');
            } else {
              navigate('/events');
            }
          }, 500);
          
        } else {
          throw new Error('Failed to submit RSVP');
        }
      } else {
        /* 
        // API INTEGRATION POINT: POST Create Event Registration Payment Intent
        // External API Endpoint: https://apis-1b88.onrender.com/api/event/register
        //
        // This would create an event registration payment intent with Stripe using the external API
        // Instead of mocking client secrets, we'd make a direct fetch to the external API:
        //
        // const response = await fetch('https://apis-1b88.onrender.com/api/event/register', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ 
        //     eventId: event.id,
        //     attendees,
        //     amount: totalAmount,
        //     customer: {
        //       name,
        //       email
        //     }
        //   }),
        // });
        //
        // const data = await response.json();
        //
        // if (data.clientSecret) {
        //   setClientSecret(data.clientSecret);
        //   setShowPaymentForm(true);
        //   
        //   // Store the registration data for the checkout process
        //   const registrationData = {
        //     eventId: event.id,
        //     firstName: name.split(' ')[0],
        //     lastName: name.split(' ').slice(1).join(' '),
        //     email,
        //     attendees,
        //     totalAmount
        //   };
        //   
        //   localStorage.setItem('eventRegistration', JSON.stringify(registrationData));
        //   window.scrollTo(0, 0);
        // } else {
        //   throw new Error('Failed to initialize event registration payment');
        // }
        */
        
        // For paid events, let's try to work around the API issues by mocking the client secret
        // In a real app, you'd get this from your backend
        console.log("Attempting to process payment for event:", event.id);
        
        // Normally you would get this from the server
        // const response = await apiRequest('POST', '/api/create-event-registration-intent', { 
        //   eventId: event.id, 
        //   attendees,
        //   pricePerAttendee: event.price 
        // });
        
        // For demonstration, we'll just mock a successful payment flow
        // This should be replaced with a real API call in production
        // Scroll to top to ensure payment form is visible
        window.scrollTo(0, 0);
        
        // Mock a client secret - in production this would come from your Stripe backend
        const mockClientSecret = "pi_" + Math.random().toString(36).substring(2, 15) + "_secret_" + Math.random().toString(36).substring(2, 15);
        setClientSecret(mockClientSecret);
        setShowPaymentForm(true);
        
        console.log("Payment form should now be visible");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process registration. Please try again.",
        variant: "destructive",
      });
      console.error("Error in handleSubmit:", error);
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
            className="w-full mt-8 text-lg py-6" 
            size="lg"
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