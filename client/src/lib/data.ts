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
    description: 'Join us for our annual summer art fair featuring works from over 50 local artists.',
    date: {
      day: '15',
      month: 'Aug'
    },
    time: '10:00 AM - 4:00 PM',
    location: 'Central Park, Main Plaza'
  },
  {
    id: 2,
    title: 'Watercolor Workshop',
    description: 'Learn essential watercolor techniques from our experienced instructors in this hands-on workshop.',
    date: {
      day: '23',
      month: 'Aug'
    },
    time: '2:00 PM - 5:00 PM',
    location: 'Art Studio, 123 Main St'
  },
  {
    id: 3,
    title: 'Artist Talk: Modern Expressionism',
    description: 'Join renowned artist Maria Sanchez as she discusses the influence of expressionism in contemporary art.',
    date: {
      day: '30',
      month: 'Aug'
    },
    time: '6:30 PM - 8:00 PM',
    location: 'Community Gallery'
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
