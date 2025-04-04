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
