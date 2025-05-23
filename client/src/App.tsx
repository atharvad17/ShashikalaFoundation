import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Events from "@/pages/Events";
import Shop from "@/pages/Shop";
import Artists from "@/pages/Artists";
import Profile from "@/pages/Profile";
import ArtistLogin from "@/pages/ArtistLogin";
import ArtistProfile from "@/pages/ArtistProfile";
import Donate from "@/pages/Donate";
import Checkout from "@/pages/Checkout";
import EventRegistration from "@/pages/EventRegistration";
import EventCheckout from "@/pages/EventCheckout";
import PaymentSuccess from "@/pages/PaymentSuccess";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { Cart, CartIcon } from "@/components/Cart";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/events" component={Events} />
      <Route path="/shop" component={Shop} />
      <Route path="/artists" component={Artists} />
      <Route path="/artist-login" component={ArtistLogin} />
      <Route path="/profile" component={Profile} />
      <Route path="/artist-profile" component={ArtistProfile} />
      <Route path="/donate" component={Donate} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/event-registration" component={EventRegistration} />
      <Route path="/event-registration/:id" component={EventRegistration} />
      <Route path="/event-checkout" component={EventCheckout} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <CartIcon />
          <Cart />
        </div>
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
