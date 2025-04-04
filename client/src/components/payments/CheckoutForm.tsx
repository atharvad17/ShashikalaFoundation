import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        // Show error to your customer
        toast({
          title: 'Payment Failed',
          description: error.message || 'An unexpected error occurred.',
          variant: 'destructive',
        });
        
        if (onError) {
          onError(error);
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // The payment has been processed!
        toast({
          title: 'Payment Successful',
          description: 'Thank you for your payment.',
        });
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        // Unexpected state
        toast({
          title: 'Something went wrong',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
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
    <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center">
      <div className="w-full">
        <PaymentElement />
      </div>
      <Button 
        type="submit" 
        className="w-full max-w-sm mx-auto" 
        disabled={!stripe || isLoading || externalLoading}
      >
        {isLoading || externalLoading ? 'Processing...' : submitButtonText}
      </Button>
    </form>
  );
}