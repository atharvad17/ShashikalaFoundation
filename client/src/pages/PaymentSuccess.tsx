import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const [_, navigate] = useLocation();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#9DD3DD] to-[#87CEEB] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your payment. Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-gray-600">
            A confirmation email has been sent to your email address with your receipt details.
          </p>
          
          <div className="flex space-x-4 pt-4">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}