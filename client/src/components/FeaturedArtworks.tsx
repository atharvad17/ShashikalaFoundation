import { Link } from 'wouter';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  artist: string;
  image: string;
}

const FeaturedArtworks = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  /* 
  // API INTEGRATION POINT: GET Featured Products/Artworks
  // This would fetch featured or top-selling artwork products from the external API
  // Example API call:
  // GET: ${BASE_URL}/api/products/featured
  // 
  // const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  //
  // useEffect(() => {
  //   async function fetchFeaturedProducts() {
  //     try {
  //       const response = await fetch(`${BASE_URL}/api/products/featured`);
  //       if (!response.ok) throw new Error('Failed to fetch featured products');
  //       const data = await response.json();
  //       setFeaturedProducts(data);
  //     } catch (error) {
  //       console.error('Error fetching featured products:', error);
  //       // You can set some fallback or error state here
  //     }
  //   }
  //   
  //   fetchFeaturedProducts();
  // }, []);
  */
  
  // Top selling artwork items - a subset of products from the Shop page
  const featuredProducts: Product[] = [
    {
      id: 1,
      title: 'Abstract Landscape',
      description: 'Original acrylic painting on canvas, measuring 24" x 36".',
      price: 350,
      artist: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
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
      id: 5,
      title: 'Handwoven Textile',
      description: 'Handwoven wall hanging, natural dyes. 24" x 36".',
      price: 185,
      artist: 'Amara Patel',
      image: 'https://images.unsplash.com/photo-1576187407450-394566cf35cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80'
    }
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Artworks</h2>
          <Link href="/shop">
            <a className="text-[#9DD3DD] font-medium flex items-center">
              View All Artworks <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
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
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
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
    </section>
  );
};

export default FeaturedArtworks;