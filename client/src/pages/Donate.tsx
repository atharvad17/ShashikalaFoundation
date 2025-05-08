import { useState } from 'react';
import { useLocation } from 'wouter';
import { PaymentLayout } from '@/components/payments/PaymentLayout';
import { CheckoutForm } from '@/components/payments/CheckoutForm';
import { apiRequest } from '@/lib/queryClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card'; 
import { Check } from 'lucide-react';

// Predefined donation amounts
const DONATION_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const getDonationAmount = (): number => {
    if (customAmount && parseFloat(customAmount) > 0) {
      return parseFloat(customAmount);
    }
    return selectedAmount || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = getDonationAmount();
    
    if (amount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (!anonymous && (!donorName || !email || !email.includes('@'))) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and a valid email address, or choose to donate anonymously.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    /* 
    // API INTEGRATION POINT: POST Create Donation Payment Intent
    // This would create a payment intent with the external API for a donation
    // Example API call structure - the actual implementation is below using apiRequest helper
    // POST: ${BASE_URL}/api/create-donation-intent
    // 
    // async function createDonationIntent() {
    //   try {
    //     const response = await fetch(`${BASE_URL}/api/create-donation-intent`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         amount: amount,
    //         donorName: anonymous ? 'Anonymous' : donorName,
    //         email: anonymous ? '' : email,
    //         message: message,
    //         anonymous: anonymous
    //       }),
    //     });
    // 
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || 'Could not create donation intent');
    //     }
    //
    //     const data = await response.json();
    //     setClientSecret(data.clientSecret);
    //     setShowPaymentForm(true);
    //   } catch (error) {
    //     toast({
    //       title: "Error",
    //       description: "Failed to process your donation. Please try again.",
    //       variant: "destructive",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // 
    // createDonationIntent();
    */
    
    try {
      // Mark this as a donation payment
      localStorage.setItem('currentPaymentType', 'donation');
      localStorage.setItem('donorName', anonymous ? 'Anonymous' : donorName);
      localStorage.setItem('donorEmail', anonymous ? '' : email);
      localStorage.setItem('donationAmount', amount.toString());
      localStorage.setItem('donationMessage', message);
      
      const response = await apiRequest('POST', '/api/create-donation-intent', { 
        amount,
        name: anonymous ? 'Anonymous' : donorName,
        email: anonymous ? '' : email,
        message: message
      });
      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowPaymentForm(true);
        window.scrollTo(0, 0); // Scroll to top so user can see payment form
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuccess = () => {
    toast({
      title: "Thank You!",
      description: "Your donation has been successfully processed. We appreciate your support!",
    });
    navigate('/payment-success');
  };
  
  // Ensure donation amount is at least $1
  const validateAmount = () => {
    const amount = getDonationAmount();
    return amount >= 1;
  };

  return (
    <PaymentLayout
      title="Support Our Mission"
      description="Your donation helps us continue to provide arts programs and support local artists."
      clientSecret={clientSecret}
      isLoading={isLoading && showPaymentForm}
    >
      {!showPaymentForm ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Select a Donation Amount</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {DONATION_AMOUNTS.map(amount => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className="relative h-16"
                >
                  {selectedAmount === amount && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  <span className="text-lg font-medium">${amount}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customAmount">Or Enter Custom Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <Input
                id="customAmount"
                type="number"
                min="1"
                step="0.01"
                placeholder="Other amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="pl-7"
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <Label htmlFor="anonymous" className="text-sm font-medium">
                  Make this an anonymous donation
                </Label>
              </div>
              
              {!anonymous && (
                <>
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="donorName">Your Name</Label>
                    <Input 
                      id="donorName" 
                      placeholder="Full Name" 
                      value={donorName} 
                      onChange={(e) => setDonorName(e.target.value)}
                      required={!anonymous}
                      disabled={anonymous}
                    />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required={!anonymous}
                      disabled={anonymous}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <textarea
                  id="message"
                  placeholder="Say something about why you're donating..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>
          
          <Button 
            className="w-full mt-8 text-lg py-6" 
            size="lg"
            type="submit" 
            disabled={isLoading || !validateAmount()}
          >
            {isLoading ? "Processing..." : `Donate $${getDonationAmount() || '0'}`}
          </Button>
        </form>
      ) : (
        <CheckoutForm 
          submitButtonText={`Donate $${getDonationAmount()}`} 
          onSuccess={handleSuccess}
          isLoading={isLoading}
        />
      )}
    </PaymentLayout>
  );
}