import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface DonationModalProps {
  buttonText?: string;
  buttonClassName?: string;
  defaultAmount?: number;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const DonationModal = ({
  buttonText = "Donate Now",
  buttonClassName = "bg-[#FFA07A] hover:bg-[#FF8C66] text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 font-medium",
  defaultAmount = 25,
  onSuccess,
  children
}: DonationModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(defaultAmount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName('');
    setEmail('');
    setAmount(defaultAmount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !amount) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      /* 
      // API INTEGRATION POINT: POST Create Donation Payment Intent
      // External API Endpoint: https://apis-1b88.onrender.com/api/donate
      //
      // This would create a donation payment intent with Stripe using the external API
      // Instead of using the local apiRequest function, we'd make a direct fetch to the external API:
      //
      // const response = await fetch('https://apis-1b88.onrender.com/api/donate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ 
      //     name,
      //     email,
      //     amount
      //   }),
      // });
      //
      // const data = await response.json();
      //
      // if (data.clientSecret) {
      //   // Redirect to the donation payment page with the client secret
      //   window.location.href = `/donate/payment?clientSecret=${data.clientSecret}&amount=${amount}`;
      // } else {
      //   throw new Error('Failed to initialize donation payment');
      // }
      */
      
      // Mark payment type as donation before processing
      localStorage.setItem('currentPaymentType', 'donation');
      localStorage.setItem('donorName', name);
      localStorage.setItem('donorEmail', email);
      
      // Create a donation payment intent
      const response = await apiRequest('POST', '/api/create-donation-intent', { 
        name, 
        email, 
        amount 
      });
      
      const data = await response.json();
      
      if (data.clientSecret) {
        // Redirect to donation payment page
        window.location.href = `/donate?clientSecret=${data.clientSecret}&amount=${amount}`;
      } else {
        throw new Error('Failed to initialize donation payment');
      }
      
      toast({
        title: "Thank you for your donation!",
        description: `Your donation of $${amount} has been received.`,
      });
      
      resetForm();
      setOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error processing donation",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className={buttonClassName}>
            <Heart className="h-4 w-4" />
            <span>{buttonText}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
          <DialogDescription>
            Your contribution helps us provide art education and creative opportunities to our community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="donation-name" className="text-right">
                Name
              </Label>
              <Input 
                id="donation-name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3" 
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="donation-email" className="text-right">
                Email
              </Label>
              <Input 
                id="donation-email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3" 
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="donation-amount" className="text-right">
                Amount ($)
              </Label>
              <Input 
                id="donation-amount" 
                type="number" 
                min="5" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="col-span-3" 
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#9DD3DD] hover:bg-opacity-90"
            >
              {isSubmitting ? "Processing..." : "Complete Donation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
