import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { type PaymentIntent } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Extend the PaymentIntent type to include metadata
interface EnhancedPaymentIntent extends PaymentIntent {
  metadata?: {
    purpose?: string;
    [key: string]: string | undefined;
  };
}

interface CheckoutFormProps {
  submitButtonText?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  isLoading?: boolean;
}

export function CheckoutForm({ 
  submitButtonText = 'Submit Payment',
  onSuccess,
  onError,
  isLoading: externalLoading = false
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    /* 
    // API INTEGRATION POINT: Stripe Payment Confirmation
    // This is where the payment is processed with Stripe's confirmPayment API
    // 
    // After receiving a client secret from the server, this code tells Stripe to:
    // 1. Process the payment with the details collected via Stripe Elements
    // 2. Handle the payment confirmation result
    // 3. Redirect if needed or handle the result in-place
    //
    // The redirect URL should match the route in your application that handles
    // successful payments and displays a confirmation to the user
    */
    try {
      console.log("Processing payment...");
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });
      
      const { error, paymentIntent } = result;
      // Cast to our enhanced type that includes metadata
      const enhancedPaymentIntent = paymentIntent as EnhancedPaymentIntent;

      if (error) {
        // Show error to your customer
        console.log("Payment error:", error);
        toast({
          title: 'Payment Failed',
          description: error.message || 'An unexpected error occurred.',
          variant: 'destructive',
        });
        
        if (onError) {
          onError(error);
        }
      } else if (enhancedPaymentIntent && enhancedPaymentIntent.status === 'succeeded') {
        // The payment has been processed!
        console.log("Payment succeeded:", enhancedPaymentIntent);
        toast({
          title: 'Payment Successful',
          description: 'Thank you for your payment.',
        });
        
        // Store payment metadata in localStorage based on payment purpose
        if (enhancedPaymentIntent.metadata && enhancedPaymentIntent.metadata.purpose) {
          switch (enhancedPaymentIntent.metadata.purpose) {
            case 'donation':
              localStorage.setItem('paymentType', 'donation');
              localStorage.setItem('donationAmount', enhancedPaymentIntent.amount ? (enhancedPaymentIntent.amount / 100).toString() : '0');
              break;
              
            case 'event-registration':
              localStorage.setItem('paymentType', 'event-registration');
              // The specific event registration data should already be in localStorage from the form
              break;
              
            case 'cart-checkout':
              localStorage.setItem('paymentType', 'cart-checkout');
              // Store cart details for the success page
              const cartItems = localStorage.getItem('cartItems');
              if (cartItems) {
                localStorage.setItem('purchasedItems', cartItems);
              }
              break;
              
            default:
              localStorage.setItem('paymentType', 'general');
          }
          
          localStorage.setItem('paymentId', enhancedPaymentIntent.id);
          localStorage.setItem('paymentAmount', enhancedPaymentIntent.amount ? (enhancedPaymentIntent.amount / 100).toString() : '0');
        } else {
          // Handle cases where metadata is not available or payment purpose is not set
          // Set a default payment type based on the context where the component is used
          const defaultPaymentType = localStorage.getItem('currentPaymentType') || 'general';
          localStorage.setItem('paymentType', defaultPaymentType);
          
          if (enhancedPaymentIntent.amount) {
            localStorage.setItem('paymentAmount', (enhancedPaymentIntent.amount / 100).toString());
          }
          
          localStorage.setItem('paymentId', enhancedPaymentIntent.id);
        }
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        // Payment is being processed asynchronously
        console.log("Payment in progress:", enhancedPaymentIntent);
        toast({
          title: 'Payment Processing',
          description: 'Your payment is being processed. You will receive a confirmation shortly.',
        });
        
        // Store basic information even for processing payments
        if (enhancedPaymentIntent) {
          localStorage.setItem('paymentId', enhancedPaymentIntent.id);
          if (enhancedPaymentIntent.amount) {
            localStorage.setItem('paymentAmount', (enhancedPaymentIntent.amount / 100).toString());
          }
        }
        
        // Still consider this a success for the UI flow
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.log("Payment submission error:", err);
      toast({
        title: 'Error Processing Payment',
        description: 'There was a problem processing your payment. Please try again.',
        variant: 'destructive',
      });
      
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center w-full">
      <div className="w-full">
        <PaymentElement />
      </div>
      <Button 
        type="submit" 
        className="w-full max-w-sm mx-auto mt-8 text-lg py-6" 
        size="lg"
        disabled={!stripe || isLoading || externalLoading}
      >
        {isLoading || externalLoading ? 'Processing...' : submitButtonText}
      </Button>
    </form>
  );
}