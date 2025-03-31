import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const Profile = () => {
  const { toast } = useToast();
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setPassword('');
    setConfirmPassword('');
  };
  
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-[#9DD3DD] flex items-center justify-center text-white text-4xl font-bold">
                {name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                <p className="text-gray-600 mb-4">{email}</p>
                <p className="text-gray-600">Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="events">Event RSVPs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                
                <form onSubmit={handleSaveProfile}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <Button type="submit" className="bg-[#9DD3DD] hover:bg-opacity-90 text-white mt-2">
                      Save Changes
                    </Button>
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t">
                  <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                  
                  <form onSubmit={handleChangePassword}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      
                      <Button type="submit" className="bg-[#9DD3DD] hover:bg-opacity-90 text-white mt-2">
                        Update Password
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="donations" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Donation History</h2>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-gray-50">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Program</div>
                    <div>Status</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 border-t">
                    <div>June 15, 2023</div>
                    <div>$50.00</div>
                    <div>General Fund</div>
                    <div className="text-green-600">Completed</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 border-t">
                    <div>March 22, 2023</div>
                    <div>$75.00</div>
                    <div>Youth Art Program</div>
                    <div className="text-green-600">Completed</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 border-t">
                    <div>January 5, 2023</div>
                    <div>$100.00</div>
                    <div>Exhibition Fund</div>
                    <div className="text-green-600">Completed</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="bg-[#FFA07A] hover:bg-[#FF8C66] text-white">
                    Make a New Donation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-gray-50">
                    <div>Event</div>
                    <div>Date</div>
                    <div>Location</div>
                    <div>Status</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 border-t">
                    <div>Summer Art Fair</div>
                    <div>August 15, 2023</div>
                    <div>Central Park, Main Plaza</div>
                    <div className="text-blue-600">Confirmed</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 border-t">
                    <div>Watercolor Workshop</div>
                    <div>August 23, 2023</div>
                    <div>Art Studio, 123 Main St</div>
                    <div className="text-blue-600">Confirmed</div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Past Events</h2>
                
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-gray-50">
                    <div>Event</div>
                    <div>Date</div>
                    <div>Location</div>
                    <div>Status</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 border-t">
                    <div>Spring Exhibition</div>
                    <div>May 12, 2023</div>
                    <div>Main Gallery</div>
                    <div className="text-gray-600">Attended</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 border-t">
                    <div>Portrait Drawing Class</div>
                    <div>April 5, 2023</div>
                    <div>Art Studio, 123 Main St</div>
                    <div className="text-gray-600">Attended</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="bg-[#9DD3DD] hover:bg-opacity-90 text-white">
                    Browse All Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
