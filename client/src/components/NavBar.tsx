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
              <a className="flex items-center">
                <svg 
                  className="h-10 w-auto text-[#9DD3DD]" 
                  viewBox="0 0 50 50" 
                  fill="currentColor"
                >
                  <path d="M25,2 C36.0457,2 45,10.9543 45,22 C45,33.0457 36.0457,42 25,42 C13.9543,42 5,33.0457 5,22 C5,10.9543 13.9543,2 25,2 Z M25,6 C16.1634,6 9,13.1634 9,22 C9,30.8366 16.1634,38 25,38 C33.8366,38 41,30.8366 41,22 C41,13.1634 33.8366,6 25,6 Z" 
                  fillRule="nonzero"/>
                  <path d="M25,11 C29.9706,11 34,15.0294 34,20 C34,24.9706 29.9706,29 25,29 C20.0294,29 16,24.9706 16,20 C16,15.0294 20.0294,11 25,11 Z" 
                  fillRule="nonzero"/>
                </svg>
              </a>
            </Link>
          </div>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className={`text-white hover:text-[#9DD3DD] transition-colors duration-300 relative nav-link ${
                    location === item.href ? "text-[#9DD3DD]" : ""
                  }`}>
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
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
                      <a className={`px-3 py-2 text-white hover:bg-gray-700 rounded-md ${
                        location === item.href ? "bg-gray-700" : ""
                      }`}>
                        {item.label}
                      </a>
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
