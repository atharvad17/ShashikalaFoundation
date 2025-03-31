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
      
      // In a real application, we would process payment here
      await apiRequest('POST', '/api/donate', { name, email, amount });
      
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
