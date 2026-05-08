export interface Destination {
  id: number;
  name: string;
  region: string;
  description: string;
  image: string;
  tours: number;
  featured?: boolean;
}

export interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price: number;
  startingPoint: string;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  category: "group" | "private" | "package";
  badge?: string;
}

export interface Review {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
  tourTitle: string;
  date: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Yerevan",
    region: "Ararat Valley",
    description: "The Pink City — Armenia's vibrant capital with ancient history, modern boulevards, and unbeatable food scene.",
    image: "https://images.unsplash.com/photo-1697700257503-1b6e2034eb37?auto=format&fit=crop&w=800&q=80",
    tours: 24,
    featured: true,
  },
  {
    id: 2,
    name: "Tatev Monastery",
    region: "Syunik Province",
    description: "Perched on a dramatic basalt cliff, reached by the world's longest reversible cable car.",
    image: "https://images.unsplash.com/photo-1672924986550-eea7b31eb414?auto=format&fit=crop&w=800&q=80",
    tours: 12,
    featured: true,
  },
  {
    id: 3,
    name: "Garni Temple",
    region: "Kotayk Province",
    description: "The only standing Greco-Roman colonnaded building in Armenia, set against stunning basalt gorge scenery.",
    image: "https://images.unsplash.com/photo-1701690651074-386824b44c47?auto=format&fit=crop&w=800&q=80",
    tours: 18,
    featured: true,
  },
  {
    id: 4,
    name: "Dilijan",
    region: "Tavush Province",
    description: "Armenia's Little Switzerland — a lush national park town with medieval monasteries and pristine forests.",
    image: "https://images.unsplash.com/photo-1630267580474-2905295b5f3d?auto=format&fit=crop&w=800&q=80",
    tours: 9,
  },
  {
    id: 5,
    name: "Lake Sevan",
    region: "Gegharkunik Province",
    description: "One of the world's largest high-altitude freshwater lakes, glistening at 1,900 m above sea level.",
    image: "https://images.unsplash.com/photo-1629218476153-36adc81140f2?auto=format&fit=crop&w=800&q=80",
    tours: 15,
  },
  {
    id: 6,
    name: "Geghard Monastery",
    region: "Kotayk Province",
    description: "A UNESCO World Heritage site — a medieval monastery hewn entirely from solid rock in a dramatic gorge.",
    image: "https://images.unsplash.com/photo-1603872864781-798ed261b79d?auto=format&fit=crop&w=800&q=80",
    tours: 14,
  },
];

export const tourPackages: TourPackage[] = [
  {
    id: 1,
    title: "Classic Armenia Discovery",
    duration: "7 days",
    price: 890,
    startingPoint: "Yerevan",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    reviewCount: 87,
    highlights: ["Yerevan City Tour", "Garni & Geghard", "Lake Sevan", "Tatev Cable Car"],
    category: "private",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Southern Armenia Explorer",
    duration: "5 days",
    price: 620,
    startingPoint: "Yerevan",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    reviewCount: 54,
    highlights: ["Tatev Monastery", "Noravank Canyon", "Goris", "Cave City Khndzoresk"],
    category: "private",
  },
  {
    id: 3,
    title: "Highlights Private Tour",
    duration: "4 days",
    price: 1180,
    startingPoint: "Yerevan",
    image: "https://images.pexels.com/photos/4609034/pexels-photo-4609034.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5.0,
    reviewCount: 32,
    highlights: ["Custom Itinerary", "Private Guide", "Luxury Transport", "Fine Dining"],
    category: "private",
    badge: "Premium",
  },
  {
    id: 4,
    title: "Northern Monasteries Trek",
    duration: "3 days",
    price: 410,
    startingPoint: "Yerevan",
    image: "https://images.pexels.com/photos/7005428/pexels-photo-7005428.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    reviewCount: 41,
    highlights: ["Haghpat Monastery", "Sanahin", "Dilijan Forest", "Lastiver Waterfall"],
    category: "private",
  },
  {
    id: 5,
    title: "Wine & Culture Journey",
    duration: "6 days",
    price: 740,
    startingPoint: "Yerevan",
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    reviewCount: 63,
    highlights: ["Areni Wine Village", "Cave of Birds", "Noravank", "Wine Tastings"],
    category: "private",
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    country: "United Kingdom",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "Absolutely life-changing experience. Our guide Armen was incredibly knowledgeable, and the monasteries left me speechless. ArmeniaTours handled every detail perfectly — from hotels to food to timing. I will be back.",
    tourTitle: "Classic Armenia Discovery",
    date: "September 2024",
  },
  {
    id: 2,
    name: "Marcus Weber",
    country: "Germany",
    avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "The private tour exceeded all expectations. Tatev Monastery at sunset was one of the most memorable sights of my life. The cable car alone is worth the trip. Exceptional value for the quality provided.",
    tourTitle: "Highlights Private Tour",
    date: "August 2024",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    country: "Japan",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "I joined the Southern Armenia Explorer as a solo traveler and instantly felt welcome. The small group size meant personalized attention. The food, the people, the landscapes — Armenia surprised me in the best way.",
    tourTitle: "Southern Armenia Explorer",
    date: "October 2024",
  },
  {
    id: 4,
    name: "James Hoffman",
    country: "United States",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    text: "Booking was seamless, communication was prompt and professional. The Wine and Culture tour was a revelation — Armenian wines are world-class and nobody outside knows it yet. Our guide's passion for the country was infectious.",
    tourTitle: "Wine & Culture Journey",
    date: "July 2024",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 7 Reasons to Visit Armenia in Autumn",
    excerpt: "From the golden foliage around Dilijan to the grape harvest festivals in Areni — autumn transforms Armenia into a photographer's paradise.",
    image: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Travel Tips",
    date: "November 12, 2024",
    readTime: 6,
    author: "Ani Petrosyan",
  },
  {
    id: 2,
    title: "The World's Longest Reversible Cable Car: Wings of Tatev",
    excerpt: "At 5.7 km, the Wings of Tatev cable car whisks visitors over breathtaking canyons to one of Armenia's most dramatic monasteries.",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Destinations",
    date: "October 28, 2024",
    readTime: 5,
    author: "Armen Grigoryan",
  },
  {
    id: 3,
    title: "A Culinary Journey Through Armenian Cuisine",
    excerpt: "Dolma, khorovats, manti, and lavash — dive deep into the flavors that have made Armenian cuisine one of the region's richest culinary traditions.",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Food & Culture",
    date: "October 5, 2024",
    readTime: 7,
    author: "Nare Hovhannisyan",
  },
];

export const stats = [
  { label: "Years of Experience", value: 12, suffix: "+" },
  { label: "Happy Travelers", value: 15000, suffix: "+" },
  { label: "Tour Packages", value: 48, suffix: "" },
  { label: "Expert Guides", value: 30, suffix: "+" },
];
