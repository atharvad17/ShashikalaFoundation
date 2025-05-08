import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, MapPin, Users, Heart, ShoppingBag, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { events } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/contexts/CartContext';

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
  const [paymentType, setPaymentType] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);
  const { clearCart } = useCart();
  
  useEffect(() => {
    // Check what type of payment was processed
    const storedPaymentType = localStorage.getItem('paymentType');
    const storedPaymentAmount = localStorage.getItem('paymentAmount');
    setPaymentType(storedPaymentType);
    setPaymentAmount(storedPaymentAmount);
    
    if (storedPaymentType === 'event-registration') {
      // Get event registration data
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
    } else if (storedPaymentType === 'cart-checkout') {
      // Get purchased items from cart
      const storedItems = localStorage.getItem('purchasedItems');
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          setPurchasedItems(parsedItems);
          // Clear the cart after successful purchase
          clearCart();
        } catch (e) {
          console.error("Error parsing cart items:", e);
        }
      }
    }
    
    // Clean up localStorage after we've read the data
    // This prevents showing the same confirmation if the user refreshes
    return () => {
      if (storedPaymentType === 'cart-checkout') {
        localStorage.removeItem('purchasedItems');
      }
    };
  }, [clearCart]);
  
  const renderDonationConfirmation = () => (
    <>
      <div className="bg-gray-50 p-6 rounded-md text-center">
        <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Thank You for Your Donation!</h3>
        <p className="text-gray-700 mb-4">
          Your generosity makes our work possible and directly supports our artists and programs.
        </p>
        {paymentAmount && (
          <div className="mt-4 mb-2">
            <div className="text-3xl font-bold text-gray-800">${paymentAmount}</div>
            <div className="text-sm text-gray-500">Donation Amount</div>
          </div>
        )}
      </div>
      
      <div className="text-center text-gray-700 space-y-2">
        <p>Your donation will help us:</p>
        <ul className="list-disc text-left ml-8">
          <li>Support emerging artists in our community</li>
          <li>Fund educational programs for underprivileged youth</li>
          <li>Maintain our exhibition spaces and creative studios</li>
          <li>Host more community events and workshops</li>
        </ul>
      </div>
      
      <p className="text-center text-gray-600 mt-4">
        A tax receipt has been sent to your email address for your records.
      </p>
    </>
  );
  
  const renderPurchaseConfirmation = () => (
    <>
      <div className="bg-gray-50 p-6 rounded-md">
        <ShoppingBag className="h-10 w-10 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Order Confirmation</h3>
        
        {purchasedItems.length > 0 ? (
          <div className="space-y-4">
            {purchasedItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 border-b pb-4">
                <div className="rounded-md overflow-hidden w-16 h-16 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">Artist: {item.artist}</div>
                  <div className="flex justify-between mt-1">
                    <div className="text-sm">${item.price} × {item.quantity}</div>
                    <div className="font-medium">${item.price * item.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${paymentAmount}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        )}
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Order Details</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Order Number:</span>
            <span>{localStorage.getItem('paymentId')?.substring(0, 8) || 'ORD-' + Math.floor(Math.random() * 10000)}</span>
          </div>
          <div className="flex justify-between">
            <span>Order Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span>Credit Card</span>
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-600 mt-4">
        Your order confirmation and receipt have been sent to your email address.
      </p>
    </>
  );
  
  const renderEventRegistrationConfirmation = () => (
    event && registrationData ? (
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
          A confirmation email has been sent to your email address with your ticket details.
        </p>
      </>
    ) : (
      <p className="text-center text-gray-600">
        Thank you for registering for our event. A confirmation email has been sent with your ticket details.
      </p>
    )
  );
  
  const renderGenericConfirmation = () => (
    <>
      <div className="bg-gray-50 p-6 rounded-md text-center">
        <CreditCard className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Payment Confirmed</h3>
        
        {paymentAmount && (
          <div className="mt-4 mb-2">
            <div className="text-3xl font-bold text-gray-800">${paymentAmount}</div>
            <div className="text-sm text-gray-500">Amount Paid</div>
          </div>
        )}
      </div>
      
      <div className="text-center text-gray-700">
        <p>Your payment has been successfully processed.</p>
        <p>Transaction ID: {localStorage.getItem('paymentId') || 'TXN-' + Math.floor(Math.random() * 10000)}</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </div>
      
      <p className="text-center text-gray-600 mt-4">
        A receipt has been sent to your email address for your records.
      </p>
    </>
  );
  
  const renderConfirmationContent = () => {
    switch(paymentType) {
      case 'donation':
        return renderDonationConfirmation();
      case 'cart-checkout':
        return renderPurchaseConfirmation();
      case 'event-registration':
        return renderEventRegistrationConfirmation();
      default:
        return renderGenericConfirmation();
    }
  };
  
  const getConfirmationTitle = () => {
    switch(paymentType) {
      case 'donation':
        return 'Donation Received';
      case 'cart-checkout':
        return 'Purchase Complete';
      case 'event-registration':
        return 'Registration Confirmed';
      default:
        return 'Payment Successful';
    }
  };
  
  const getConfirmationDescription = () => {
    switch(paymentType) {
      case 'donation':
        return 'Thank you for your generous contribution to our foundation.';
      case 'cart-checkout':
        return 'Your purchase has been completed successfully.';
      case 'event-registration':
        return 'Your event registration has been confirmed.';
      default:
        return 'Your transaction has been completed successfully.';
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#9DD3DD] to-[#87CEEB] p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">{getConfirmationTitle()}</CardTitle>
          <CardDescription>
            {getConfirmationDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          {renderConfirmationContent()}
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