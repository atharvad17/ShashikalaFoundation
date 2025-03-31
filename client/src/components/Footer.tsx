import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would typically send this to the backend
    toast({
      title: "Thank you for subscribing!",
      description: "You've been added to our newsletter.",
    });
    
    setEmail('');
  };
  
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Shashikala Foundation</h3>
            <p className="text-gray-300 mb-4">
              Empowering communities through art, education, and creative expression.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#9DD3DD] transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#9DD3DD] transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#9DD3DD] transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#9DD3DD] transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-[#9DD3DD] transition-colors duration-300">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/programs">
                  <a className="text-gray-300 hover:text-[#9DD3DD] transition-colors duration-300">Programs</a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-gray-300 hover:text-[#9DD3DD] transition-colors duration-300">Events</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#9DD3DD] transition-colors duration-300">Donate</a>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-[#9DD3DD] transition-colors duration-300">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-[#9DD3DD] h-4 w-4" />
                <span className="text-gray-300">123 Art Street, Creative City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-[#9DD3DD] h-4 w-4" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-[#9DD3DD] h-4 w-4" />
                <span className="text-gray-300">info@shashikalafoundation.org</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates on events and programs.</p>
            <form className="flex flex-col space-y-3" onSubmit={handleNewsletterSignup}>
              <Input 
                type="email" 
                placeholder="Your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#9DD3DD]" 
              />
              <Button type="submit" className="bg-[#9DD3DD] text-white hover:bg-opacity-90 transition-all duration-300">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Shashikala Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
