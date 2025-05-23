import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

const ArtistLogin = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail) {
      toast({
        title: "Missing email",
        description: "Please provide an email address for testing.",
        variant: "destructive",
      });
      return;
    }
    
    // Allow any credentials for API testing
    // Store authentication info in localStorage
    localStorage.setItem('artistLoggedIn', 'true');
    localStorage.setItem('artistEmail', loginEmail);
    localStorage.setItem('artistName', 'Test Artist');
    
    toast({
      title: "API Test Mode",
      description: "You're now logged in with test credentials. You can now test the API endpoints.",
    });
    
    // Redirect to artist profile page
    setLocation('/artist-profile');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Missing email",
        description: "Please provide an email address for testing.",
        variant: "destructive",
      });
      return;
    }
    
    /* 
    // API INTEGRATION POINT: POST Artist Registration/Signup
    // External API Endpoint: https://apis-1b88.onrender.com/api/auth/artist/signup
    //
    // This would register a new artist with the external API
    // 
    // async function registerArtist() {
    //   try {
    //     const artistData = {
    //       firstName,
    //       lastName,
    //       email,
    //       phoneNumber,
    //       city,
    //       state,
    //       country,
    //       password
    //     };
    //
    //     const response = await fetch('https://apis-1b88.onrender.com/api/auth/artist/signup', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(artistData),
    //     });
    // 
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || 'Registration failed');
    //     }
    // 
    //     const data = await response.json();
    //     // Optionally auto-login the user after registration
    //     localStorage.setItem('artistToken', data.token);
    //     localStorage.setItem('artistId', data.artistId);
    // 
    //     toast({
    //       title: "Signup successful",
    //       description: "Your account has been created.",
    //     });
    //
    //     // Redirect to artist profile page
    //     setLocation('/artist-profile');
    //   } catch (error) {
    //     toast({
    //       title: "Registration failed",
    //       description: error.message || "Failed to create account",
    //       variant: "destructive",
    //     });
    //   }
    // }
    // 
    // registerArtist();
    */
    
    // For demo purposes, simulate a successful registration
    // In a real app, this would send data to the backend
    
    toast({
      title: "Signup successful",
      description: "Your account has been created.",
    });
    
    // Store authentication info in localStorage
    localStorage.setItem('artistLoggedIn', 'true');
    localStorage.setItem('artistEmail', email);
    localStorage.setItem('artistName', `${firstName} ${lastName}`);
    
    // Redirect to artist profile page
    setLocation('/artist-profile');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      toast({
        title: "Missing email",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    /* 
    // API INTEGRATION POINT: POST Password Reset Request
    // This would send a password reset request to the external API
    // Example API call:
    // POST: ${BASE_URL}/api/artists/reset-password
    // 
    // async function requestPasswordReset() {
    //   try {
    //     const response = await fetch(`${BASE_URL}/api/artists/reset-password`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ email: forgotPasswordEmail }),
    //     });
    // 
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || 'Password reset request failed');
    //     }
    // 
    //     toast({
    //       title: "Password reset email sent",
    //       description: "Please check your email for password reset instructions.",
    //     });
    //     
    //     setShowForgotPassword(false);
    //   } catch (error) {
    //     toast({
    //       title: "Error",
    //       description: error.message || "Failed to process password reset request",
    //       variant: "destructive",
    //     });
    //   }
    // }
    // 
    // requestPasswordReset();
    */
    
    // This would be replaced with an actual API call
    toast({
      title: "Password reset email sent",
      description: "Please check your email for password reset instructions.",
    });
    
    setShowForgotPassword(false);
  };

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80)' }}>
      <div className="container mx-auto max-w-md">
        <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome to the Artist Platform</h1>
          <p className="text-gray-600 text-center mb-6">Showcase your talent, connect with fans, and manage your art catalog in one place.</p>
          
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              {!showForgotPassword ? (
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="login-password">Password</Label>
                        <button 
                          type="button" 
                          className="text-sm text-[#9DD3DD] hover:underline"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <Input 
                        id="login-password" 
                        type="password" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#9DD3DD] hover:bg-opacity-90 text-white">
                      Login
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleForgotPassword}>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Reset Password</h3>
                    <p className="text-gray-600 text-sm">Enter your email address and we'll send you instructions to reset your password.</p>
                    
                    <div className="space-y-2">
                      <Label htmlFor="forgot-password-email">Email</Label>
                      <Input 
                        id="forgot-password-email" 
                        type="email" 
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-[#9DD3DD] hover:bg-opacity-90 text-white">
                        Send Reset Link
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Back to Login
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </TabsContent>
            
            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input 
                      id="phone-number" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="text-center">
                    <a href="#" className="text-sm text-[#9DD3DD] hover:underline">
                      View Terms and Conditions
                    </a>
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#F5A962] hover:bg-opacity-90 text-white">
                    Sign Up
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ArtistLogin;