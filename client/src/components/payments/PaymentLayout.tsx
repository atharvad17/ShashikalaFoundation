import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="container max-w-3xl py-12">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 max-h-[70vh] overflow-y-auto">
          {clientSecret ? (
            <Elements 
              stripe={stripePromise} 
              options={{ 
                clientSecret,
                appearance: {
                  theme: 'stripe',
                },
              }}
            >
              {children}
            </Elements>
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