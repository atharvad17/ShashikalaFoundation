import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  artist: string;
  image: string;
}

const Shop = () => {
  const { toast } = useToast();
  
  const products: Product[] = [
    {
      id: 1,
      title: 'Abstract Landscape',
      description: 'Original acrylic painting on canvas, measuring 24" x 36".',
      price: 350,
      artist: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
    },
    {
      id: 2,
      title: 'Ocean Waves Print',
      description: 'Limited edition print, signed and numbered. 18" x 24".',
      price: 75,
      artist: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1577032064092-31a5e972b08a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
    },
    {
      id: 3,
      title: 'Ceramic Vase',
      description: 'Handcrafted ceramic vase with blue glaze. 12" tall.',
      price: 120,
      artist: 'Elena Rodriguez',
      image: 'https://images.unsplash.com/photo-1612196808214-b7b41b50710c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
    },
    {
      id: 4,
      title: 'Wood Sculpture',
      description: 'Hand-carved oak sculpture. 15" tall.',
      price: 275,
      artist: 'David Anderson',
      image: 'https://images.unsplash.com/photo-1612540905615-2b7c5bad84b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
    },
    {
      id: 5,
      title: 'Handwoven Textile',
      description: 'Handwoven wall hanging, natural dyes. 24" x 36".',
      price: 185,
      artist: 'Amara Patel',
      image: 'https://images.unsplash.com/photo-1576187407450-394566cf35cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
    },
    {
      id: 6,
      title: 'Digital Art Print',
      description: 'Digital illustration printed on archival paper. 11" x 17".',
      price: 45,
      artist: 'Jordan Smith',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
    }
  ];

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Shop</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Purchase original artwork and support our artists. A portion of all sales goes to our community programs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-2">By {product.artist}</p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <Button 
                    className="bg-[#9DD3DD] hover:bg-opacity-90 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
