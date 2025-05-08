import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/* 
// API INTEGRATION POINT: Stripe Configuration
// External API information:
// - The VITE_STRIPE_PUBLIC_KEY should be obtained from your Stripe dashboard
// - This key is used to initialize the Stripe Elements for collecting payment details
// - In a production environment, you would use the Stripe publishable key from your Stripe account
// - Make sure to set the VITE_STRIPE_PUBLIC_KEY environment variable in your deployment environment
*/

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

interface PaymentLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  clientSecret: string | null;
  isLoading: boolean;
}

export function PaymentLayout({ 
  title, 
  description, 
  children, 
  clientSecret,
  isLoading
}: PaymentLayoutProps) {
  return (
    <div className="container max-w-3xl pt-24 pb-16 mx-auto">
      <Card className="w-full">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {clientSecret ? (
            <div className="max-h-full">
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                  },
                  paymentMethodType: 'card',
                  paymentMethodOrder: ['card'],
                }}
              >
                {children}
              </Elements>
            </div>
          ) : (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                </div>
              ) : (
                children
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}