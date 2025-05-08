import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

// Define interfaces for our data types
interface ArtPiece {
  id: string;
  title: string;
  description: string;
  price: number;
  artType: string;
  image: string;
}

interface Catalog {
  id: string;
  name: string;
  artPieces: ArtPiece[];
}

const ArtistProfile = () => {
  const { toast } = useToast();
  /* 
  // API INTEGRATION POINT: GET Artist Profile
  // External API Endpoint: https://apis-1b88.onrender.com/api/artist/profile
  //
  // This would fetch the artist's profile data from the external API
  // 
  // useEffect(() => {
  //   async function fetchArtistProfile() {
  //     try {
  //       // Get token from localStorage
  //       const token = localStorage.getItem('artistToken');
  //       if (!token) {
  //         // Redirect to login if not authenticated
  //         setLocation('/artist-login');
  //         return;
  //       }
  //       
  //       const response = await fetch('https://apis-1b88.onrender.com/api/artist/profile', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch artist profile');
  //       }
  //       
  //       const data = await response.json();
  //       setArtist(data);
  //       
  //       // Fetch artist's artworks/catalogs
  //       const artworksResponse = await fetch('https://apis-1b88.onrender.com/api/artist/artworks', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       
  //       if (!artworksResponse.ok) {
  //         throw new Error('Failed to fetch artist artworks');
  //       }
  //       
  //       const artworksData = await artworksResponse.json();
  //       setCatalogs(artworksData);
  //     } catch (error) {
  //       console.error('Error fetching artist data:', error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to load your profile data. Please try again later.",
  //         variant: "destructive",
  //       });
  //     }
  //   }
  //   
  //   fetchArtistProfile();
  // }, []);
  */
  
  const [artist, setArtist] = useState({
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80'
  });
  
  const [catalogs, setCatalogs] = useState<Catalog[]>([
    {
      id: '1',
      name: 'Catalog 1',
      artPieces: [
        {
          id: '1a',
          title: 'Art Piece 1A',
          description: 'A beautiful abstract painting with vibrant colors.',
          price: 100,
          artType: 'Painting',
          image: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
        },
        {
          id: '1b',
          title: 'Art Piece 1B',
          description: 'A serene landscape with mountains and a lake.',
          price: 150,
          artType: 'Painting',
          image: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
        },
        {
          id: '1c',
          title: 'Art Piece 1C',
          description: 'An expressive portrait in watercolors.',
          price: 200,
          artType: 'Painting',
          image: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
        },
      ]
    },
    {
      id: '2',
      name: 'Catalog 2',
      artPieces: []
    },
    {
      id: '3',
      name: 'Catalog 3',
      artPieces: []
    },
    {
      id: '4',
      name: 'Catalog 4',
      artPieces: []
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('my-art');
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [selectedArtPiece, setSelectedArtPiece] = useState<ArtPiece | null>(null);
  const [newArtPiece, setNewArtPiece] = useState({
    title: '',
    description: '',
    price: '',
    artType: '',
    image: ''
  });
  const [isAddingCatalog, setIsAddingCatalog] = useState(false);
  const [newCatalogName, setNewCatalogName] = useState('');
  
  // Handlers for catalog operations
  const handleAddCatalog = () => {
    if (!newCatalogName.trim()) {
      toast({
        title: "Catalog name is required",
        description: "Please enter a name for the catalog.",
        variant: "destructive"
      });
      return;
    }
    
    /* 
    // API INTEGRATION POINT: POST Create New Catalog/Artwork Collection
    // External API Endpoint: https://apis-1b88.onrender.com/api/artist/artworks
    //
    // This would create a new catalog in the external API
    // 
    // async function createCatalog() {
    //   try {
    //     // Get token from localStorage
    //     const token = localStorage.getItem('artistToken');
    //     if (!token) {
    //       toast({
    //         title: "Authentication error",
    //         description: "Please log in again to continue.",
    //         variant: "destructive"
    //       });
    //       return;
    //     }
    //     
    //     const response = await fetch('https://apis-1b88.onrender.com/api/artist/artworks', {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         name: newCatalogName,
    //         artPieces: []
    //       }),
    //     });
    //     
    //     if (!response.ok) {
    //       throw new Error('Failed to create catalog');
    //     }
    //     
    //     const data = await response.json();
    //     setCatalogs([...catalogs, data]);
    //     setNewCatalogName('');
    //     setIsAddingCatalog(false);
    //     
    //     toast({
    //       title: "Catalog created",
    //       description: `The catalog "${newCatalogName}" was created successfully.`
    //     });
    //   } catch (error) {
    //     console.error('Error creating catalog:', error);
    //     toast({
    //       title: "Error",
    //       description: "Failed to create catalog. Please try again later.",
    //       variant: "destructive",
    //     });
    //   }
    // }
    // 
    // createCatalog();
    */
    
    const newCatalog: Catalog = {
      id: Date.now().toString(),
      name: newCatalogName,
      artPieces: []
    };
    
    setCatalogs([...catalogs, newCatalog]);
    setNewCatalogName('');
    setIsAddingCatalog(false);
    
    toast({
      title: "Catalog created",
      description: `The catalog "${newCatalogName}" was created successfully.`
    });
  };
  
  const handleDeleteCatalog = (catalogId: string) => {
    /* 
    // API INTEGRATION POINT: DELETE Catalog/Artwork Collection
    // External API Endpoint: https://apis-1b88.onrender.com/api/artist/artworks/<catalog_id>
    //
    // This would delete a catalog from the external API
    // 
    // async function deleteCatalog() {
    //   try {
    //     // Get token from localStorage
    //     const token = localStorage.getItem('artistToken');
    //     if (!token) {
    //       toast({
    //         title: "Authentication error",
    //         description: "Please log in again to continue.",
    //         variant: "destructive"
    //       });
    //       return;
    //     }
    //     
    //     const response = await fetch(`https://apis-1b88.onrender.com/api/artist/artworks/${catalogId}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       }
    //     });
    //     
    //     if (!response.ok) {
    //       throw new Error('Failed to delete catalog');
    //     }
    //     
    //     // Update local state
    //     setCatalogs(catalogs.filter(catalog => catalog.id !== catalogId));
    //     
    //     toast({
    //       title: "Catalog deleted",
    //       description: "The catalog was deleted successfully."
    //     });
    //   } catch (error) {
    //     console.error('Error deleting catalog:', error);
    //     toast({
    //       title: "Error",
    //       description: "Failed to delete catalog. Please try again later.",
    //       variant: "destructive",
    //     });
    //   }
    // }
    // 
    // deleteCatalog();
    */
    
    setCatalogs(catalogs.filter(catalog => catalog.id !== catalogId));
    toast({
      title: "Catalog deleted",
      description: "The catalog was deleted successfully."
    });
  };
  
  // Handlers for art piece operations
  const handleAddArtPiece = (catalogId: string) => {
    if (!newArtPiece.title || !newArtPiece.price) {
      toast({
        title: "Required fields missing",
        description: "Please fill in at least the title and price fields.",
        variant: "destructive"
      });
      return;
    }
    
    /* 
    // API INTEGRATION POINT: POST Add Art Piece to Catalog
    // External API Endpoint: https://apis-1b88.onrender.com/api/artist/artworks/<catalog_id>/artpieces
    //
    // This would add a new art piece to a catalog in the external API
    // 
    // async function addArtPiece() {
    //   try {
    //     // Get token from localStorage
    //     const token = localStorage.getItem('artistToken');
    //     if (!token) {
    //       toast({
    //         title: "Authentication error",
    //         description: "Please log in again to continue.",
    //         variant: "destructive"
    //       });
    //       return;
    //     }
    //     
    //     const artPieceData = {
    //       title: newArtPiece.title,
    //       description: newArtPiece.description,
    //       price: parseFloat(newArtPiece.price),
    //       artType: newArtPiece.artType,
    //       image: newArtPiece.image || 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
    //     };
    //     
    //     const response = await fetch(`https://apis-1b88.onrender.com/api/artist/artworks/${catalogId}/artpieces`, {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(artPieceData),
    //     });
    //     
    //     if (!response.ok) {
    //       throw new Error('Failed to add art piece');
    //     }
    //     
    //     const data = await response.json();
    //     
    //     // Update local state
    //     setCatalogs(catalogs.map(catalog => {
    //       if (catalog.id === catalogId) {
    //         return {
    //           ...catalog,
    //           artPieces: [...catalog.artPieces, data]
    //         };
    //       }
    //       return catalog;
    //     }));
    //     
    //     setNewArtPiece({
    //       title: '',
    //       description: '',
    //       price: '',
    //       artType: '',
    //       image: ''
    //     });
    //     
    //     setSelectedCatalog(null);
    //     
    //     toast({
    //       title: "Art piece added",
    //       description: `"${newArtPiece.title}" was added to the catalog successfully.`
    //     });
    //   } catch (error) {
    //     console.error('Error adding art piece:', error);
    //     toast({
    //       title: "Error",
    //       description: "Failed to add art piece. Please try again later.",
    //       variant: "destructive",
    //     });
    //   }
    // }
    // 
    // addArtPiece();
    */
    
    const newArt: ArtPiece = {
      id: Date.now().toString(),
      title: newArtPiece.title,
      description: newArtPiece.description,
      price: parseFloat(newArtPiece.price),
      artType: newArtPiece.artType,
      image: newArtPiece.image || 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
    };
    
    setCatalogs(catalogs.map(catalog => {
      if (catalog.id === catalogId) {
        return {
          ...catalog,
          artPieces: [...catalog.artPieces, newArt]
        };
      }
      return catalog;
    }));
    
    setNewArtPiece({
      title: '',
      description: '',
      price: '',
      artType: '',
      image: ''
    });
    
    setSelectedCatalog(null);
    
    toast({
      title: "Art piece added",
      description: `"${newArtPiece.title}" was added to the catalog successfully.`
    });
  };
  
  const handleEditArtPiece = (catalogId: string, artPieceId: string) => {
    if (!selectedArtPiece) return;
    
    setCatalogs(catalogs.map(catalog => {
      if (catalog.id === catalogId) {
        return {
          ...catalog,
          artPieces: catalog.artPieces.map(art => {
            if (art.id === artPieceId) {
              return selectedArtPiece;
            }
            return art;
          })
        };
      }
      return catalog;
    }));
    
    setSelectedArtPiece(null);
    
    toast({
      title: "Art piece updated",
      description: `"${selectedArtPiece.title}" was updated successfully.`
    });
  };
  
  const handleDeleteArtPiece = (catalogId: string, artPieceId: string) => {
    setCatalogs(catalogs.map(catalog => {
      if (catalog.id === catalogId) {
        return {
          ...catalog,
          artPieces: catalog.artPieces.filter(art => art.id !== artPieceId)
        };
      }
      return catalog;
    }));
    
    toast({
      title: "Art piece deleted",
      description: "The art piece was deleted successfully."
    });
  };
  
  // Navigation tabs
  const tabs = [
    { id: 'my-art', label: 'My Art' },
    { id: 'events', label: 'Events' },
    { id: 'about-me', label: 'About Me' },
    { id: 'manage-account', label: 'Manage Account' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'profile-management', label: 'Profile Management' },
  ];
  
  return (
    <div className="flex min-h-screen bg-[#fdf6e6] pt-20">
      {/* Left Sidebar */}
      <div className="w-64 p-4 border-r border-gray-200 flex flex-col">
        <div className="text-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
            <img 
              src={artist.avatar} 
              alt={artist.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold">{artist.name}</h2>
        </div>
        
        {/* Navigation */}
        <nav className="flex-grow">
          <ul>
            {tabs.map(tab => (
              <li key={tab.id} className="mb-2">
                <button
                  className={`w-full py-3 px-4 text-left font-medium rounded-md transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-[#F5A962] text-white' 
                      : 'hover:bg-[#F5A962] hover:bg-opacity-10'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="text-gray-600 hover:text-gray-900">FB</button>
          <button className="text-gray-600 hover:text-gray-900">IG</button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-8 bg-[#eef8fd]">
        {activeTab === 'my-art' && (
          <div>
            <h1 className="text-2xl font-bold text-center text-[#4A90E2] mb-8">My Art</h1>
            
            {/* Catalog List */}
            <div className="space-y-4">
              {catalogs.map(catalog => (
                <Accordion 
                  key={catalog.id} 
                  type="single" 
                  collapsible
                  className="mb-4"
                >
                  <AccordionItem value={catalog.id} className="border-0">
                    <Card className="shadow-sm">
                      <div className="bg-[#FFF3DF] rounded-t-lg p-4 flex justify-between items-center">
                        <AccordionTrigger className="flex-grow text-left hover:no-underline">
                          <span className="font-medium">{catalog.name}</span>
                        </AccordionTrigger>
                        <button 
                          className="text-red-500 hover:text-red-700 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCatalog(catalog.id);
                          }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <AccordionContent>
                        <CardContent className="p-6">
                          {catalog.artPieces.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                              {catalog.artPieces.map(art => (
                                <div key={art.id} className="border rounded-lg overflow-hidden shadow-sm">
                                  <div className="h-40 overflow-hidden">
                                    <img 
                                      src={art.image} 
                                      alt={art.title} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="p-4">
                                    <h3 className="font-medium">{art.title}</h3>
                                    <p className="text-gray-900 font-semibold mt-2">${art.price}</p>
                                    <div className="flex justify-between mt-3">
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button 
                                            variant="outline" 
                                            size="icon"
                                            className="h-9 w-9 rounded-full"
                                            onClick={() => setSelectedArtPiece(art)}
                                          >
                                            <Pencil className="h-4 w-4" />
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md">
                                          <DialogHeader>
                                            <DialogTitle>Edit Art Piece</DialogTitle>
                                            <DialogDescription>
                                              Update the details of this art piece.
                                            </DialogDescription>
                                          </DialogHeader>
                                          
                                          {selectedArtPiece && (
                                            <div className="grid gap-4 py-4">
                                              <div className="space-y-2">
                                                <Label htmlFor="edit-title">Title:</Label>
                                                <Input 
                                                  id="edit-title" 
                                                  value={selectedArtPiece.title}
                                                  onChange={(e) => setSelectedArtPiece({
                                                    ...selectedArtPiece,
                                                    title: e.target.value
                                                  })}
                                                />
                                              </div>
                                              
                                              <div className="space-y-2">
                                                <Label htmlFor="edit-description">Description:</Label>
                                                <Textarea 
                                                  id="edit-description" 
                                                  value={selectedArtPiece.description}
                                                  onChange={(e) => setSelectedArtPiece({
                                                    ...selectedArtPiece,
                                                    description: e.target.value
                                                  })}
                                                />
                                              </div>
                                              
                                              <div className="space-y-2">
                                                <Label htmlFor="edit-price">Price:</Label>
                                                <Input 
                                                  id="edit-price" 
                                                  type="number"
                                                  value={selectedArtPiece.price}
                                                  onChange={(e) => setSelectedArtPiece({
                                                    ...selectedArtPiece,
                                                    price: parseFloat(e.target.value)
                                                  })}
                                                />
                                              </div>
                                              
                                              <div className="space-y-2">
                                                <Label htmlFor="edit-art-type">Type of Artwork:</Label>
                                                <Select 
                                                  value={selectedArtPiece.artType}
                                                  onValueChange={(value) => setSelectedArtPiece({
                                                    ...selectedArtPiece,
                                                    artType: value
                                                  })}
                                                >
                                                  <SelectTrigger id="edit-art-type">
                                                    <SelectValue placeholder="Select Art Type" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="painting">Painting</SelectItem>
                                                    <SelectItem value="sculpture">Sculpture</SelectItem>
                                                    <SelectItem value="photography">Photography</SelectItem>
                                                    <SelectItem value="digital">Digital Art</SelectItem>
                                                    <SelectItem value="mixed-media">Mixed Media</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                              
                                              <div className="space-y-2">
                                                <Label>Additional Information</Label>
                                                <Button 
                                                  type="button" 
                                                  variant="outline"
                                                  className="w-full"
                                                >
                                                  Add Custom Field
                                                </Button>
                                              </div>
                                              
                                              <div className="space-y-2">
                                                <Label htmlFor="edit-image">Select Image:</Label>
                                                <div className="flex items-center space-x-2">
                                                  <Input id="edit-image" type="file" className="flex-grow" />
                                                </div>
                                                
                                                <div className="mt-4 rounded-md overflow-hidden">
                                                  <img 
                                                    src={selectedArtPiece.image} 
                                                    alt="Preview" 
                                                    className="w-full h-40 object-cover"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          
                                          <DialogFooter>
                                            <Button
                                              type="button"
                                              onClick={() => handleEditArtPiece(catalog.id, selectedArtPiece?.id || '')}
                                              className="bg-[#4A90E2] hover:bg-[#3A80D2] text-white"
                                            >
                                              Save Changes
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                      
                                      <Button 
                                        variant="outline" 
                                        size="icon"
                                        className="h-9 w-9 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDeleteArtPiece(catalog.id, art.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center py-4">No art pieces in this catalog yet.</p>
                          )}
                          
                          <div className="flex justify-center mt-6">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="bg-[#4A90E2] hover:bg-[#3A80D2] text-white flex items-center">
                                  <Plus className="mr-2 h-4 w-4" />
                                  Add New Art
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Add New Art Piece</DialogTitle>
                                  <DialogDescription>
                                    Fill in the details of your new art piece.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="title">Title:</Label>
                                    <Input 
                                      id="title" 
                                      placeholder="Art Piece 1A"
                                      value={newArtPiece.title}
                                      onChange={(e) => setNewArtPiece({
                                        ...newArtPiece,
                                        title: e.target.value
                                      })}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="description">Description:</Label>
                                    <Textarea 
                                      id="description" 
                                      placeholder="Describe your artwork"
                                      value={newArtPiece.description}
                                      onChange={(e) => setNewArtPiece({
                                        ...newArtPiece,
                                        description: e.target.value
                                      })}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="price">Price:</Label>
                                    <Input 
                                      id="price" 
                                      type="number" 
                                      placeholder="100"
                                      value={newArtPiece.price}
                                      onChange={(e) => setNewArtPiece({
                                        ...newArtPiece,
                                        price: e.target.value
                                      })}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="art-type">Type of Artwork:</Label>
                                    <Select 
                                      value={newArtPiece.artType}
                                      onValueChange={(value) => setNewArtPiece({
                                        ...newArtPiece,
                                        artType: value
                                      })}
                                    >
                                      <SelectTrigger id="art-type">
                                        <SelectValue placeholder="Select Art Type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="painting">Painting</SelectItem>
                                        <SelectItem value="sculpture">Sculpture</SelectItem>
                                        <SelectItem value="photography">Photography</SelectItem>
                                        <SelectItem value="digital">Digital Art</SelectItem>
                                        <SelectItem value="mixed-media">Mixed Media</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <h3 className="font-medium text-center">Additional Information</h3>
                                    <Button 
                                      type="button" 
                                      variant="outline"
                                      className="w-full"
                                    >
                                      Add Custom Field
                                    </Button>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="image">Select Image:</Label>
                                    <div className="flex items-center space-x-2">
                                      <Input id="image" type="file" className="flex-grow" />
                                    </div>
                                    
                                    <div className="mt-4 rounded-md overflow-hidden">
                                      <img 
                                        src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                                        alt="Preview" 
                                        className="w-full h-40 object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                                
                                <DialogFooter>
                                  <Button
                                    type="button"
                                    onClick={() => handleAddArtPiece(catalog.id)}
                                    className="bg-[#4A90E2] hover:bg-[#3A80D2] text-white"
                                  >
                                    Add Art Piece
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                </Accordion>
              ))}
              
              {/* Add Catalog Button/Form */}
              {isAddingCatalog ? (
                <Card className="p-4 bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Catalog name"
                      value={newCatalogName}
                      onChange={(e) => setNewCatalogName(e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      onClick={handleAddCatalog}
                      className="bg-[#4A90E2] hover:bg-[#3A80D2] text-white"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingCatalog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              ) : (
                <Button
                  onClick={() => setIsAddingCatalog(true)}
                  className="w-full bg-[#4A90E2] hover:bg-[#3A80D2] text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Catalog
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <h1 className="text-2xl font-bold text-center text-[#4A90E2] mb-8">Events</h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">View your Events</h2>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#007BFF] hover:bg-[#0069D9] text-white">
                      Create New Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>
                        Fill in the details to create a new event
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-title">Event Title</Label>
                        <Input id="event-title" placeholder="Art Exhibition" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Date</Label>
                        <Input id="event-date" type="date" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-location">Location</Label>
                        <Input id="event-location" placeholder="Gallery A" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-time">Time</Label>
                        <Input id="event-time" type="time" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-price">Price ($)</Label>
                        <Input id="event-price" type="number" min="0" step="0.01" placeholder="10.00" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-description">Description</Label>
                        <Textarea id="event-description" placeholder="Describe your event..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-[#007BFF] hover:bg-[#0069D9] text-white">
                        Create Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="mb-8">
                <h3 className="text-center font-semibold text-lg mb-4">Upcoming Events</h3>
                
                <div className="mb-4">
                  <div className="border rounded-lg p-6 bg-white shadow-sm">
                    <h4 className="text-xl font-semibold text-center mb-4">Art Exhibition</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium text-right">Date:</div>
                      <div>2024-12-20</div>
                      
                      <div className="font-medium text-right">Location:</div>
                      <div>Gallery A</div>
                      
                      <div className="font-medium text-right">Time:</div>
                      <div>18:00</div>
                      
                      <div className="font-medium text-right">Price:</div>
                      <div>$10.00</div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                            <Pencil className="h-4 w-4 text-blue-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Event</DialogTitle>
                            <DialogDescription>
                              Update the details of your event
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-event-title">Event Title</Label>
                              <Input id="edit-event-title" defaultValue="Art Exhibition" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-event-date">Date</Label>
                              <Input id="edit-event-date" type="date" defaultValue="2024-12-20" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-event-location">Location</Label>
                              <Input id="edit-event-location" defaultValue="Gallery A" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-event-time">Time</Label>
                              <Input id="edit-event-time" type="time" defaultValue="18:00" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-event-price">Price ($)</Label>
                              <Input id="edit-event-price" type="number" min="0" step="0.01" defaultValue="10.00" />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-event-description">Description</Label>
                              <Textarea id="edit-event-description" defaultValue="Art exhibition featuring various artists." />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-[#007BFF] hover:bg-[#0069D9] text-white">
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-center font-semibold text-lg mb-4">Past Events</h3>
                
                <div className="mb-4">
                  <div className="border rounded-lg p-6 bg-white shadow-sm">
                    <h4 className="text-xl font-semibold text-center mb-4">Music Concert</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium text-right">Date:</div>
                      <div>2024-11-01</div>
                      
                      <div className="font-medium text-right">Location:</div>
                      <div>Concert Hall</div>
                      
                      <div className="font-medium text-right">Time:</div>
                      <div>20:00</div>
                      
                      <div className="font-medium text-right">Price:</div>
                      <div>$25.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* About Me Tab */}
        {activeTab === 'about-me' && (
          <div>
            <h1 className="text-2xl font-bold text-center text-[#4A90E2] mb-8">About Me</h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself..."
                    className="min-h-[120px]"
                    defaultValue="I am a contemporary artist specializing in abstract paintings and mixed media. My work explores themes of nature and urban landscapes."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    placeholder="Enter Instagram handle..."
                    defaultValue="@artistname"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    placeholder="Enter Facebook profile..."
                    defaultValue="facebook.com/artistname"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    placeholder="Enter LinkedIn profile..."
                    defaultValue="linkedin.com/in/artistname"
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button className="bg-[#007BFF] hover:bg-[#0069D9] text-white w-32">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Management Tab */}
        {activeTab === 'profile-management' && (
          <div>
            <h1 className="text-2xl font-bold text-center text-[#4A90E2] mb-8">Profile Management</h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profile-photo">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Input id="profile-photo" type="file" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input 
                    id="display-name" 
                    placeholder="John Doe"
                    defaultValue="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address Line</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Artist Street"
                    defaultValue="123 Artist Street"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subscription">Current Subscription</Label>
                  <Input 
                    id="subscription" 
                    placeholder="Premium"
                    defaultValue="Premium"
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="public-link">Personal Public Link</Label>
                  <Input 
                    id="public-link" 
                    placeholder="www.shashikala-foundation.com/john-doe"
                    defaultValue="www.shashikala-foundation.com/john-doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="abc@gmail.com"
                    defaultValue="abc@gmail.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Info</Label>
                  <Input 
                    id="contact" 
                    placeholder="1234567890"
                    defaultValue="1234567890"
                  />
                </div>
                
                <div className="text-center mt-4">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-[#007BFF] hover:text-[#0069D9] mb-4"
                  >
                    Change Password
                  </Button>
                  
                  <div className="flex justify-center">
                    <Button type="submit" className="bg-[#F5A962] hover:bg-[#F59742] text-white w-32">
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Display placeholder for any other tabs */}
        {activeTab !== 'my-art' && 
         activeTab !== 'events' && 
         activeTab !== 'about-me' && 
         activeTab !== 'profile-management' && (
          <div className="flex items-center justify-center h-[80vh] text-gray-500">
            <p className="text-xl">{tabs.find(tab => tab.id === activeTab)?.label} content will be implemented later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;