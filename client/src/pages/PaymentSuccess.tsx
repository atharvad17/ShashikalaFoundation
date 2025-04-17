import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, MapPin, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { events } from '@/lib/data';

interface RegistrationData {
  eventId: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  contact: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipcode: string;
  attendees: number;
  totalAmount: number;
}

export default function PaymentSuccess() {
  const [_, navigate] = useLocation();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [event, setEvent] = useState<any>(null);
  
  useEffect(() => {
    // Try to get registration data from localStorage
    const storedData = localStorage.getItem('eventRegistration');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setRegistrationData(parsedData);
        
        // Find the corresponding event
        if (parsedData.eventId) {
          const foundEvent = events.find(e => e.id === parsedData.eventId);
          if (foundEvent) {
            setEvent(foundEvent);
          }
        }
      } catch (e) {
        console.error("Error parsing registration data:", e);
      }
    }
  }, []);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#9DD3DD] to-[#87CEEB] p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your payment. Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          {event && registrationData ? (
            <>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-[#9DD3DD]" />
                  <span className="text-gray-700">
                    {event.date.month} {event.date.day}, 2024 | {event.time}
                  </span>
                </div>
                
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-[#9DD3DD]" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-2 text-[#9DD3DD]" />
                  <span className="text-gray-700">{registrationData.attendees} {registrationData.attendees === 1 ? 'Attendee' : 'Attendees'}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Registration Details</h3>
                <p className="text-gray-700">
                  {registrationData.firstName} {registrationData.middleName ? registrationData.middleName + ' ' : ''}{registrationData.lastName}
                </p>
                <p className="text-gray-700">{registrationData.email}</p>
                <p className="text-gray-700">{registrationData.contact}</p>
                <p className="text-gray-700">{registrationData.address}</p>
                {registrationData.addressLine2 && (
                  <p className="text-gray-700">{registrationData.addressLine2}</p>
                )}
                <p className="text-gray-700">
                  {registrationData.city}, {registrationData.state} {registrationData.zipcode}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Price per attendee:</span>
                  <span>${event.price}.00</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Number of attendees:</span>
                  <span>{registrationData.attendees}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${registrationData.totalAmount}.00</span>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-600 mt-4">
                A confirmation email has been sent to your email address with your receipt details.
              </p>
            </>
          ) : (
            <p className="text-center text-gray-600">
              Thank you for your purchase. A confirmation email has been sent with your receipt details.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-[#9DD3DD] text-[#9DD3DD] hover:bg-[#9DD3DD] hover:text-white"
          >
            Return to Home
          </Button>
          <Button 
            onClick={() => window.print()}
            className="bg-[#FFA07A] hover:bg-[#FF8C66] text-white"
          >
            Print Receipt
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}