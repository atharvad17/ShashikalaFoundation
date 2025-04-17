export interface Program {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  details?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: {
    day: string;
    month: string;
  };
  time: string;
  location: string;
  image?: string;
  price: number; // Price in USD, 0 for free events
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  artist: string;
  image: string;
}

export interface Artist {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

export const programs: Program[] = [
  {
    id: 1,
    title: 'Art Workshops',
    description: 'Weekly art workshops for beginners and experienced artists alike.',
    imageUrl: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
  },
  {
    id: 2,
    title: 'Art Exhibitions',
    description: 'Monthly exhibitions featuring work from our community artists.',
    imageUrl: 'https://images.unsplash.com/photo-1578926288207-32356a2b80df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
  },
  {
    id: 3,
    title: 'Community Outreach',
    description: 'Art therapy and education programs for underserved communities.',
    imageUrl: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
  }
];

export const events: Event[] = [
  {
    id: 1,
    title: 'Summer Art Fair',
    description: 'Join us for our annual summer art fair featuring works from over 50 local artists. Browse and purchase unique artworks, enjoy live demonstrations, and participate in hands-on activities for all ages.',
    date: {
      day: '15',
      month: 'Aug'
    },
    time: '10:00 AM - 4:00 PM',
    location: 'Central Park, Main Plaza',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
    price: 0 // Free event
  },
  {
    id: 2,
    title: 'Watercolor Workshop',
    description: 'Learn essential watercolor techniques from our experienced instructors in this hands-on workshop. This class is suitable for beginners and intermediate painters looking to refine their skills.',
    date: {
      day: '23',
      month: 'Aug'
    },
    time: '2:00 PM - 5:00 PM',
    location: 'Art Studio, 123 Main St',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
    price: 25 // $25 per person
  },
  {
    id: 3,
    title: 'Artist Talk: Modern Expressionism',
    description: 'Join renowned artist Maria Sanchez as she discusses the influence of expressionism in contemporary art. Following the talk will be a Q&A session and light refreshments.',
    date: {
      day: '30',
      month: 'Aug'
    },
    time: '6:30 PM - 8:00 PM',
    location: 'Community Gallery',
    image: 'https://images.unsplash.com/photo-1580060860978-d479ca3087fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
    price: 10 // $10 per person
  },
  {
    id: 4,
    title: 'Children\'s Art Day',
    description: 'A special day dedicated to young artists! Children ages 5-12 can explore different art mediums through guided activities. All materials provided.',
    date: {
      day: '05',
      month: 'Sep'
    },
    time: '9:00 AM - 12:00 PM',
    location: 'Youth Center, 456 Elm St',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
    price: 15 // $15 per child
  },
  {
    id: 5,
    title: 'Sculpture Exhibition Opening',
    description: 'Be the first to see our new sculpture exhibition featuring works from regional artists. Opening reception includes artist meet-and-greet and wine tasting.',
    date: {
      day: '12',
      month: 'Sep'
    },
    time: '7:00 PM - 9:00 PM',
    location: 'Main Gallery',
    image: 'https://images.unsplash.com/photo-1620504155085-d7b3cf1c8b46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
    price: 20 // $20 per person
  },
  {
    id: 6,
    title: 'Plein Air Painting Excursion',
    description: 'Join us for a day of outdoor painting in the scenic Riverside Park. Bring your own supplies or rent from us. All skill levels welcome.',
    date: {
      day: '19',
      month: 'Sep'
    },
    time: '10:00 AM - 2:00 PM',
    location: 'Riverside Park, East Entrance',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
    price: 0 // Free event, just bring your supplies
  }
];

export const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Handcrafted Art, Heartfelt Stories",
    subtitle: "Your one-stop solution for managing tasks efficiently"
  },
  {
    url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Empowering Artists",
    subtitle: "Discover unique talents in our community"
  },
  {
    url: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Nurturing Creativity",
    subtitle: "Supporting artistic expression through exhibitions and workshops"
  },
  {
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Inspiring Communities",
    subtitle: "Bringing art to everyone, everywhere"
  },
  {
    url: "https://images.unsplash.com/photo-1608501821300-4f99e58bba77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Join Our Movement",
    subtitle: "Become part of our growing artistic community"
  }
];
