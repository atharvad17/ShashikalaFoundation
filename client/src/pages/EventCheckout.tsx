import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { events } from '@/lib/data';
import { Loader2 } from 'lucide-react';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface RegistrationData {
  eventId: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  contact: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipcode: string;
  attendees: number;
  totalAmount: number;
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  
  useEffect(() => {
    // Get registration data from localStorage
    const storedData = localStorage.getItem('eventRegistration');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setRegistrationData(parsedData);
      } catch (e) {
        console.error("Error parsing registration data:", e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: window.location.origin + '/payment-success',
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error) {
        toast({
          title: "Payment failed",
          description: error.message || "An unknown error occurred",
          variant: "destructive"
        });
        console.log('Payment error:', error);
      } else {
        // In a real implementation, you would wait for the redirect to /payment-success
        // But for testing purposes, let's simulate successful payment
        toast({
          title: "Payment successful",
          description: "Your payment has been processed successfully"
        });
        setTimeout(() => {
          navigate('/payment-success');
        }, 500);
      }
    } catch (e) {
      console.error("Payment submission error:", e);
      toast({
        title: "Error processing payment",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="mb-4 text-lg">No registration data found</p>
          <Button onClick={() => navigate('/events')}>Go to Events</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md mb-8">
          <h3 className="font-semibold mb-2">Payment Summary</h3>
          <div className="text-sm text-gray-600 mb-4">
            <p>Event registration for: {registrationData.firstName} {registrationData.lastName}</p>
            <p>Total amount: ${registrationData.totalAmount.toFixed(2)}</p>
          </div>
        </div>
        
        <PaymentElement 
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                name: `${registrationData.firstName} ${registrationData.lastName}`,
                email: registrationData.email,
                phone: registrationData.contact,
                address: {
                  line1: registrationData.address,
                  line2: registrationData.addressLine2 || '',
                  city: registrationData.city,
                  state: registrationData.state,
                  postal_code: registrationData.zipcode,
                  country: 'US',
                }
              }
            }
          }}
        />
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-[#F5A962] hover:bg-[#F09A52] text-white font-medium py-3"
      >
        {isProcessing ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </span>
        ) : (
          `Pay $${registrationData.totalAmount.toFixed(2)}`
        )}
      </Button>
    </form>
  );
};

export default function EventCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Get registration data from localStorage
    const storedData = localStorage.getItem('eventRegistration');
    if (!storedData) {
      setError("No registration data found");
      setIsLoading(false);
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData) as RegistrationData;
      setRegistrationData(parsedData);
      
      // Create a payment intent server-side
      apiRequest('POST', '/api/create-payment-intent', {
        amount: parsedData.totalAmount,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          eventId: parsedData.eventId,
          attendees: parsedData.attendees,
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      })
      .catch(err => {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment. Please try again.");
        
        // For development/testing, we can create a mock client secret
        // In production, this should be removed and proper error handling added
        const mockClientSecret = "pi_" + Math.random().toString(36).substring(2, 15) + "_secret_" + Math.random().toString(36).substring(2, 15);
        setClientSecret(mockClientSecret);
      })
      .finally(() => {
        setIsLoading(false);
      });
    } catch (e) {
      console.error("Error parsing registration data:", e);
      setError("Invalid registration data");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#9DD3DD]" />
          <p className="mt-4">Initializing payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <Button onClick={() => navigate('/events')}>Go to Events</Button>
        </div>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#F5A962',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px',
    },
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-3xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Purchase</h1>
      
      {registrationData && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            {events.find(e => e.id === registrationData.eventId)?.title || 'Event Registration'}
          </h2>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Registration for {registrationData.attendees} {registrationData.attendees === 1 ? 'attendee' : 'attendees'}</span>
            <span className="font-medium text-base">${registrationData.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
      
      <Card>
        <CardContent className="p-6">
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          )}
        </CardContent>
      </Card>
    </div>
  );
}