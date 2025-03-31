import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DonationCTA = () => {
  const [donationOpen, setDonationOpen] = useState(false);
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#9DD3DD] bg-opacity-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Your donation helps us provide art education and creative opportunities to our community. Every contribution makes a difference.
        </p>
        
        <Dialog open={donationOpen} onOpenChange={setDonationOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FFA07A] hover:bg-[#FF8C66] text-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <Heart className="h-5 w-5" />
              <span>Donate Now</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Donation</DialogTitle>
              <DialogDescription>
                Your contribution helps us provide art education and creative opportunities to our community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cta-name" className="text-right">
                  Name
                </Label>
                <Input id="cta-name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cta-email" className="text-right">
                  Email
                </Label>
                <Input id="cta-email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cta-amount" className="text-right">
                  Amount ($)
                </Label>
                <Input id="cta-amount" type="number" min="5" className="col-span-3" defaultValue="25" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setDonationOpen(false)}>
                Complete Donation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DonationCTA;
