import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export function CartIcon() {
  const { isCartOpen, setIsCartOpen, itemCount } = useCart();
  
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#9DD3DD] hover:bg-[#87CEEB] p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110" 
         onClick={() => setIsCartOpen(!isCartOpen)}>
      <ShoppingBag className="h-6 w-6 text-white" />
      {itemCount > 0 && (
        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">
          {itemCount}
        </div>
      )}
    </div>
  );
}

export function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen,
    cartTotal
  } = useCart();
  
  const [_, navigate] = useLocation();
  
  if (!isCartOpen) return null;
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={(e) => {
      if (e.target === e.currentTarget) setIsCartOpen(false);
    }}>
      <div className="w-full max-w-md bg-white h-full overflow-auto shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-[#9DD3DD]">
          <h2 className="text-xl font-semibold text-white">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-white hover:text-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-grow overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some items to your cart to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex border rounded-lg overflow-hidden">
                  <div className="w-24 h-24 bg-gray-100 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow p-3 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">{item.artist}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1 min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t mt-auto">
            <div className="flex justify-between py-2">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Shipping and taxes calculated at checkout
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full py-2 bg-[#FFA07A] hover:bg-[#FF8C66] text-white"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}