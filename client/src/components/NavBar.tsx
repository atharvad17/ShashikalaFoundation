import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartIcon } from '@/components/Cart';

const NavBar = () => {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [donationOpen, setDonationOpen] = useState(false);

  const navItems = [
    { href: '/shop', label: 'Shop' },
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/artists', label: 'Artists' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="bg-black text-white fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <img 
                  src="/assets/shashikala-logo.jpg" 
                  alt="Shashikala Foundation Logo" 
                  className="h-12 w-auto"
                />
              </div>
            </Link>
          </div>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={`text-white hover:text-[#9DD3DD] transition-colors duration-300 relative nav-link ${
                    location === item.href ? "text-[#9DD3DD]" : ""
                  }`}>
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          )}
          
          <div className="flex items-center space-x-4">
            {location === '/shop' && (
              <div className="flex items-center mr-2">
                <CartIcon />
              </div>
            )}
            <Dialog open={donationOpen} onOpenChange={setDonationOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#FFA07A] hover:bg-[#FF8C66] text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
                  <Heart className="h-4 w-4" />
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
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount ($)
                  </Label>
                  <Input id="amount" type="number" min="5" className="col-span-3" defaultValue="25" />
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
          
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden text-white">
                  <i className="fas fa-bars text-xl"></i>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black text-white">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className={`px-3 py-2 text-white hover:bg-gray-700 rounded-md ${
                        location === item.href ? "bg-gray-700" : ""
                      }`}>
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
