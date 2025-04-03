import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { PaymentLayout } from '@/components/payments/PaymentLayout';
import { CheckoutForm } from '@/components/payments/CheckoutForm';
import { apiRequest } from '@/lib/queryClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock cart data - in a real app, this would come from a cart state manager or context
// This is just for demonstration purposes
const mockCartItems = [
  { id: 1, title: 'Original Artwork', price: 199, quantity: 1 },
  { id: 2, title: 'Art Print', price: 45, quantity: 2 },
];

const mockCartTotal = mockCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

export default function Checkout() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  // In a real app, you would fetch cart items and calculate total here
  const cartItems = mockCartItems;
  const cartTotal = mockCartTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !email.includes('@') || !address || !city || !state || !zip) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest('POST', '/api/create-cart-payment-intent', { 
        cartItems, 
        cartTotal 
      });
      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowPaymentForm(true);
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuccess = () => {
    toast({
      title: "Order Complete!",
      description: "Your order has been successfully processed.",
    });
    navigate('/order-confirmation');
  };

  return (
    <PaymentLayout
      title="Complete Your Purchase"
      description="Enter your shipping information and payment details to complete your order."
      clientSecret={clientSecret}
      isLoading={isLoading && showPaymentForm}
    >
      {!showPaymentForm ? (
        <div className="space-y-6">
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 p-3 font-medium">Order Summary</div>
            <div className="p-3 space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity} × {item.title}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input 
                id="name" 
                placeholder="Your Full Name" 
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
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                placeholder="123 Main St" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  placeholder="City" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  placeholder="State" 
                  value={state} 
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zip">Zipcode</Label>
              <Input 
                id="zip" 
                placeholder="12345" 
                value={zip} 
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>
            
            <Button 
              className="w-full mt-6" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue to Payment"}
            </Button>
          </form>
        </div>
      ) : (
        <CheckoutForm 
          submitButtonText={`Pay $${cartTotal.toFixed(2)}`} 
          onSuccess={handleSuccess}
          isLoading={isLoading}
        />
      )}
    </PaymentLayout>
  );
}