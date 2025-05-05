import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia'
});

export async function registerRoutes(app: Express): Promise<Server> {
  /* 
  // API INTEGRATION POINT: POST Create Donation Intent
  // This endpoint creates a Stripe payment intent for donations
  // In the external API implementation, you would:
  // 1. Validate the request data
  // 2. Create a payment intent with Stripe
  // 3. Store the donation information in your database
  // 4. Return the client secret to the frontend
  //
  // The response format should match:
  // {
  //   clientSecret: string, // The Stripe client secret for the payment intent
  // }
  */
  
  // Stripe payment intent for donations
  app.post('/api/create-donation-intent', async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!amount || amount < 1) {
        return res.status(400).json({ message: 'Invalid donation amount' });
      }
      
      // Create a PaymentIntent with the donation amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        metadata: { purpose: 'donation' },
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating donation payment intent: ' + error.message });
    }
  });
  
  /* 
  // API INTEGRATION POINT: POST Create Event Registration Intent
  // This endpoint creates a Stripe payment intent for event registrations
  // In the external API implementation, you would:
  // 1. Validate the event exists and is available
  // 2. Check seat/capacity availability for the event
  // 3. Create a preliminary registration record in the database
  // 4. Create a payment intent with Stripe
  // 5. Return the client secret to the frontend
  //
  // The response format should match:
  // {
  //   clientSecret: string, // The Stripe client secret for the payment intent
  //   registrationId: string, // Optional ID of the preliminary registration record
  // }
  */
  
  // Stripe payment intent for event registrations
  app.post('/api/create-event-registration-intent', async (req, res) => {
    try {
      const { eventId, attendees, pricePerAttendee } = req.body;
      
      if (!eventId || !attendees || !pricePerAttendee || attendees < 1) {
        return res.status(400).json({ message: 'Invalid registration details' });
      }
      
      const totalAmount = attendees * pricePerAttendee;
      
      // Create a PaymentIntent with the registration amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: 'usd',
        metadata: { 
          purpose: 'event-registration',
          eventId,
          attendees
        },
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating event registration payment intent: ' + error.message });
    }
  });
  
  /* 
  // API INTEGRATION POINT: POST Create Cart Payment Intent
  // This endpoint creates a Stripe payment intent for shopping cart checkout
  // In the external API implementation, you would:
  // 1. Validate the product items exist and are available
  // 2. Check inventory/stock for each product
  // 3. Calculate the final price (including any discounts/taxes)
  // 4. Create a preliminary order record in the database
  // 5. Create a payment intent with Stripe
  // 6. Return the client secret to the frontend
  //
  // The response format should match:
  // {
  //   clientSecret: string, // The Stripe client secret for the payment intent
  //   orderId: string, // Optional ID of the preliminary order record
  // }
  */
  
  // Stripe payment intent for shopping cart checkout
  app.post('/api/create-cart-payment-intent', async (req, res) => {
    try {
      const { cartItems, cartTotal } = req.body;
      
      if (!cartItems || !cartTotal || cartTotal < 1) {
        return res.status(400).json({ message: 'Invalid cart details' });
      }
      
      // Create a PaymentIntent with the cart total
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(cartTotal * 100), // Convert to cents
        currency: 'usd',
        metadata: { 
          purpose: 'cart-checkout',
          items: JSON.stringify(cartItems.map((item: any) => ({ id: item.id, quantity: item.quantity })))
        },
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating cart payment intent: ' + error.message });
    }
  });
  
  /* 
  // API INTEGRATION POINT: POST Create Generic Payment Intent
  // This is a generic endpoint for creating Stripe payment intents that can be used by any component
  // In the external API implementation, you might want to:
  // 1. Add additional authentication/authorization for this endpoint
  // 2. Log payment attempt details for analytics
  // 3. Add validation for metadata based on payment purpose
  // 4. Return consistent error responses
  //
  // The response format should match:
  // {
  //   clientSecret: string, // The Stripe client secret for the payment intent
  // }
  */
  
  // Generic payment intent route that can be used by any component
  app.post('/api/create-payment-intent', async (req, res) => {
    try {
      const { amount, currency = 'usd', metadata = {}, payment_method_types = ['card'] } = req.body;
      
      if (!amount || amount < 1) {
        return res.status(400).json({ message: 'Invalid payment amount' });
      }
      
      // Create a PaymentIntent with the specified amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata,
        payment_method_types,
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating payment intent: ' + error.message });
    }
  });
  
  /* 
  // API INTEGRATION POINT: POST Event RSVP
  // This endpoint handles RSVPs for free events (no payment required)
  // In the external API implementation, you would:
  // 1. Validate the event exists and is available
  // 2. Check capacity availability for the event
  // 3. Store the RSVP in your database
  // 4. Send a confirmation email to the attendee
  // 5. Return success response
  //
  // The response format should match:
  // {
  //   message: string, // Success message
  //   rsvp: { // RSVP details
  //     eventId: number,
  //     name: string,
  //     email: string,
  //     attendees: number,
  //     date: Date
  //   }
  // }
  */
  
  // API routes for free event RSVPs (no payment required)
  app.post('/api/events/rsvp', (req, res) => {
    const { eventId, name, email, attendees } = req.body;
    
    // Validate RSVP data
    if (!eventId || !name || !email || !attendees) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Process RSVP
    res.status(200).json({ 
      message: 'RSVP confirmed successfully',
      rsvp: { eventId, name, email, attendees, date: new Date() }
    });
  });
  
  /* 
  // API INTEGRATION POINT: POST Newsletter Subscription
  // This endpoint handles newsletter subscriptions
  // In the external API implementation, you would:
  // 1. Validate the email format
  // 2. Check if the email is already subscribed
  // 3. Add the subscription to your database or email marketing service
  // 4. Send a confirmation email (optional)
  // 5. Return success response
  //
  // The response format should match:
  // {
  //   message: string, // Success message
  //   subscription: { // Subscription details
  //     email: string,
  //     date: Date
  //   }
  // }
  */
  
  // API route for newsletter signup
  app.post('/api/newsletter/subscribe', (req, res) => {
    const { email } = req.body;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    
    // Process newsletter subscription
    res.status(200).json({ 
      message: 'Subscription successful',
      subscription: { email, date: new Date() }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
