export type TourCategory = "group" | "private" | "package";
export type Difficulty = "easy" | "moderate" | "challenging";

export interface DepartureSlot {
  days: string;
  times: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  stops: string[];
  meals: string[];
  accommodation?: string;
}

export interface DetailedTour {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: TourCategory;
  duration: string;
  durationHours?: number;
  durationDays?: number;
  price: number;
  priceNote: string;
  originalPrice?: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  maxGroupSize: number;
  minGroupSize: number;
  languages: string[];
  difficulty: Difficulty;
  pickupIncluded: boolean;
  meetingPoint: string;
  departures: DepartureSlot[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  faq: { question: string; answer: string }[];
  tags: string[];
  badge?: string;
  region: string;
  startingPoint: string;
}

export const detailedTours: DetailedTour[] = [
  {
    id: 1,
    slug: "yerevan-city-highlights-day-tour",
    title: "Yerevan City Highlights Day Tour",
    shortDescription: "Discover the iconic landmarks of Armenia's vibrant capital in one unforgettable day.",
    fullDescription: "Join our expert guides for a full-day exploration of Yerevan — the ancient Pink City. This carefully crafted itinerary takes you through 3,000 years of history, from the iconic Cascade complex and the Republic Square fountains to the world-class Matenadaran manuscript library. Sample Armenian brandy at the Ararat Brandy Factory, stroll through the colourful Vernissage market, and soak in panoramic views of Mount Ararat from the city's best viewpoints.",
    category: "private",
    duration: "8 hours",
    durationHours: 8,
    price: 45,
    priceNote: "per person",
    image: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    rating: 4.9,
    reviewCount: 142,
    maxGroupSize: 12,
    minGroupSize: 2,
    languages: ["English", "Russian", "French"],
    difficulty: "easy",
    pickupIncluded: true,
    meetingPoint: "Republic Square, Yerevan",
    departures: [
      { days: "Daily", times: ["09:00", "13:00"] },
    ],
    highlights: [
      "Republic Square and the singing fountains",
      "Cascade Complex with panoramic city views",
      "Matenadaran Manuscript Institute",
      "Ararat Brandy Factory tour & tasting",
      "Vernissage open-air market",
      "Mother Armenia monument",
    ],
    included: [
      "Professional English-speaking guide",
      "Air-conditioned minibus transport",
      "Hotel pickup and drop-off",
      "Ararat Brandy Factory entrance & tasting",
      "Bottled water",
    ],
    excluded: [
      "Lunch and additional meals",
      "Personal expenses & souvenirs",
      "Matenadaran entrance fee (AMD 1,500)",
      "Tips (optional but appreciated)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Morning: Old Yerevan & History",
        description: "We begin at Republic Square, admiring the neoclassical Soviet architecture. Walk through the bustling Vernissage market where local artists display their crafts and paintings.",
        stops: ["Republic Square", "Vernissage Market", "History Museum of Armenia"],
        meals: ["Breakfast not included"],
      },
      {
        day: 1,
        title: "Midday: Cultural Highlights",
        description: "Visit the Matenadaran — one of the world's foremost repositories of ancient manuscripts. Then head to the iconic Cascade for sweeping views across the city to Mount Ararat.",
        stops: ["Matenadaran Institute", "Cascade Complex", "Charles Aznavour Square"],
        meals: ["Lunch break at local restaurant (own expense)"],
      },
      {
        day: 1,
        title: "Afternoon: Ararat Brandy & Panoramas",
        description: "Tour the legendary Ararat Brandy Factory and sample Armenia's world-famous brandy. End the day at the Mother Armenia statue viewpoint for sunset panoramas over the Ararat plain.",
        stops: ["Ararat Brandy Factory", "Mother Armenia Monument", "Yerevan Ferris Wheel"],
        meals: ["Brandy tasting included"],
      },
    ],
    faq: [
      {
        question: "What is the minimum group size?",
        answer: "Tours operate with a minimum of 2 participants. If your group is smaller, we can still arrange the tour — contact us to discuss options.",
      },
      {
        question: "Is hotel pickup included?",
        answer: "Yes, pickup is included from all hotels in central Yerevan. Please provide your hotel name when booking.",
      },
      {
        question: "Are children welcome?",
        answer: "Absolutely. Children under 5 join for free; ages 5–12 receive a 30% discount.",
      },
    ],
    tags: ["city tour", "culture", "history", "brandy", "food"],
    badge: "Best Seller",
    region: "Yerevan",
    startingPoint: "Yerevan",
  },
  {
    id: 2,
    slug: "garni-temple-geghard-monastery-tour",
    title: "Garni Temple & Geghard Monastery",
    shortDescription: "Two of Armenia's most iconic ancient sites in one legendary half-day trip from Yerevan.",
    fullDescription: "This is Armenia's most popular day excursion — and for good reason. You'll visit the only standing Hellenistic temple in the South Caucasus at Garni, perched dramatically above a deep basalt gorge. Then continue to Geghard Monastery, partially carved from a sheer cliff face and recognised as a UNESCO World Heritage Site. Along the way, stop at a traditional Armenian household to see lavash (flatbread) being baked in a tonir and taste fresh local produce.",
    category: "private",
    duration: "6 hours",
    durationHours: 6,
    price: 35,
    priceNote: "per person",
    image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    rating: 4.8,
    reviewCount: 218,
    maxGroupSize: 15,
    minGroupSize: 2,
    languages: ["English", "Russian", "German", "French"],
    difficulty: "easy",
    pickupIncluded: true,
    meetingPoint: "Republic Square, Yerevan",
    departures: [
      { days: "Daily", times: ["09:00", "10:00", "14:00"] },
    ],
    highlights: [
      "Garni Hellenistic Temple (1st century AD)",
      "Symphony of Stones basalt gorge",
      "Geghard UNESCO Monastery",
      "Traditional lavash bread baking demonstration",
      "Local honey, gata (pastry) and brandy tasting",
    ],
    included: [
      "Professional licensed guide",
      "Air-conditioned minibus",
      "Hotel pickup and drop-off in Yerevan",
      "Lavash tasting at traditional household",
      "Bottled water",
    ],
    excluded: [
      "Entrance fees: Garni (AMD 1,500), Geghard (AMD 400)",
      "Lunch (optional stop at roadside restaurant)",
      "Personal shopping",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Departure & Drive to Garni",
        description: "Pickup from your hotel in Yerevan and drive along the scenic Azat River gorge toward the Kotayk highlands. Stop at a traditional Armenian household to watch lavash being baked in an underground tonir clay oven.",
        stops: ["Yerevan Hotel Pickup", "Traditional Household — Lavash Baking"],
        meals: ["Lavash, gata, honey & brandy tasting"],
      },
      {
        day: 1,
        title: "Garni Temple",
        description: "Arrive at the 1st-century Garni Temple — the only Hellenistic-period structure in Armenia. Explore the royal baths mosaic floor and the dramatic basalt 'Symphony of Stones' gorge viewpoint below.",
        stops: ["Garni Temple", "Royal Baths Mosaic", "Symphony of Stones Viewpoint"],
        meals: [],
      },
      {
        day: 1,
        title: "Geghard Monastery",
        description: "Drive 10 minutes to Geghard Monastery, carved partially from solid rock in the 4th century. Your guide will explain the monastery's ancient khachkar (cross-stone) tradition and the sacred spring inside the cave church.",
        stops: ["Geghard Main Church", "Cave Chapels", "Sacred Spring"],
        meals: [],
      },
    ],
    faq: [
      {
        question: "Is the tour suitable for people with limited mobility?",
        answer: "Garni is mostly accessible via paved paths. Geghard has some uneven stone steps. We recommend comfortable footwear and can advise on what's accessible.",
      },
      {
        question: "How long is the drive from Yerevan?",
        answer: "Garni is about 28 km (40 min drive). Geghard is an additional 8 km from Garni.",
      },
    ],
    tags: ["temple", "monastery", "UNESCO", "history", "cultural"],
    badge: "Most Popular",
    region: "Kotayk",
    startingPoint: "Yerevan",
  },
  {
    id: 3,
    slug: "lake-sevan-sevanavank-day-tour",
    title: "Lake Sevan & Sevanavank Monastery",
    shortDescription: "Spend a magical day at Armenia's azure highland lake — one of the world's largest high-altitude freshwater lakes.",
    fullDescription: "High in the mountains at 1,900 metres above sea level, Lake Sevan is one of the most spectacular natural wonders of the Caucasus. This full-day tour takes you along the lake's shores, with a visit to the 9th-century Sevanavank Monastery perched on a dramatic peninsula. Taste fresh grilled ishkhan (Sevan trout) at a lakeside restaurant, and enjoy the stunning turquoise waters framed by volcanic peaks.",
    category: "private",
    duration: "7 hours",
    durationHours: 7,
    price: 40,
    priceNote: "per person",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    rating: 4.8,
    reviewCount: 97,
    maxGroupSize: 12,
    minGroupSize: 2,
    languages: ["English", "Russian"],
    difficulty: "easy",
    pickupIncluded: true,
    meetingPoint: "Republic Square, Yerevan",
    departures: [
      { days: "Daily", times: ["09:00"] },
      { days: "Sat & Sun", times: ["09:00", "11:00"] },
    ],
    highlights: [
      "Sevanavank Monastery on the lake peninsula",
      "Freshly grilled Sevan trout (ishkhan) lunch",
      "Noratus Khachkar Cemetery (largest in Armenia)",
      "Panoramic lake views at 1,900m altitude",
      "Optional swimming (summer season)",
    ],
    included: [
      "Professional English/Russian guide",
      "Air-conditioned transport",
      "Hotel pickup & drop-off",
      "Bottled water & fruit snacks",
    ],
    excluded: [
      "Lunch at lakeside restaurant (approx $12–18)",
      "Sevanavank entrance (AMD 1,000)",
      "Swimming equipment rental",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Morning Drive to Sevan",
        description: "Depart from Yerevan and drive northeast through the Gegham mountain range. Your guide will share the history of the lake and the ancient Armenian highland civilisations.",
        stops: ["Yerevan Pickup", "Mountain Pass Viewpoint"],
        meals: [],
      },
      {
        day: 1,
        title: "Sevanavank Monastery",
        description: "Visit the 9th-century Sevanavank Monastery complex, dramatically positioned on a former island (now a peninsula) overlooking the lake. Enjoy panoramic views of the azure waters.",
        stops: ["Sevanavank Upper Church", "Lower Church", "Lakeside Viewpoint"],
        meals: [],
      },
      {
        day: 1,
        title: "Noratus & Lakeside Lunch",
        description: "Stop at the Noratus Khachkar Cemetery — the largest field of Armenian cross-stones in the world. Then enjoy fresh grilled Sevan trout (ishkhan) at a traditional lakeside restaurant.",
        stops: ["Noratus Khachkar Cemetery", "Lakeside Restaurant"],
        meals: ["Lunch break — Sevan trout (own expense)"],
      },
    ],
    faq: [
      {
        question: "Can we swim in Lake Sevan?",
        answer: "Yes, from late June to early September. The water temperature reaches 20–22°C. Bring a swimsuit if visiting during summer.",
      },
      {
        question: "Is the Noratus cemetery included in every tour?",
        answer: "Yes, it's a standard stop. The cemetery has over 900 khachkars (cross-stones) dating from the 9th–17th centuries.",
      },
    ],
    tags: ["lake", "monastery", "nature", "scenic", "trout"],
    region: "Gegharkunik",
    startingPoint: "Yerevan",
  },
  {
    id: 4,
    slug: "tatev-monastery-cable-car-tour",
    title: "Tatev Monastery & Wings of Tatev Cable Car",
    shortDescription: "Ride the world's longest non-stop double track cable car to one of Armenia's most dramatic monasteries.",
    fullDescription: "Perched on a volcanic basalt plateau above a deep gorge in southern Armenia, Tatev Monastery is one of the most awe-inspiring sights in the Caucasus. The journey there is half the adventure: the Wings of Tatev cable car — 5.7 km long and a Guinness World Record holder — floats you over canyons and pine forests with jaw-dropping views. This full-day tour also visits the wine village of Areni and the extraordinary Noravank monastery canyon.",
    category: "private",
    duration: "Full day (11–12 hours)",
    durationHours: 12,
    price: 65,
    priceNote: "per person",
    originalPrice: 80,
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4609034/pexels-photo-4609034.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    rating: 5.0,
    reviewCount: 183,
    maxGroupSize: 10,
    minGroupSize: 2,
    languages: ["English", "Russian", "German"],
    difficulty: "moderate",
    pickupIncluded: true,
    meetingPoint: "Republic Square, Yerevan",
    departures: [
      { days: "Daily (Apr–Oct)", times: ["08:00"] },
      { days: "Fri, Sat, Sun (Nov–Mar)", times: ["08:00"] },
    ],
    highlights: [
      "Wings of Tatev — world's longest reversible cable car",
      "Tatev Monastery (9th century) perched on a basalt cliff",
      "Noravank Monastery in a dramatic red-canyon",
      "Areni-1 Cave — where 6,100-year-old wine was discovered",
      "Wine tasting at Areni village winery",
      "Devil's Bridge natural arch (optional swim stop)",
    ],
    included: [
      "Professional English-speaking guide",
      "Comfortable air-conditioned minibus",
      "Hotel pickup & drop-off in Yerevan",
      "Wings of Tatev cable car ticket (round trip)",
      "Areni wine tasting",
      "Bottled water & light snacks",
    ],
    excluded: [
      "Lunch (stop at local restaurant ~$10–15)",
      "Noravank entrance (AMD 1,500)",
      "Tatev Monastery entrance (AMD 400)",
      "Tips (optional)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Departure & Areni Wine Village",
        description: "Early departure from Yerevan, heading south through the Ararat Valley. First stop: the Areni wine village, home of the world's oldest winery. Taste local wines directly from the cellar.",
        stops: ["Yerevan Pickup", "Areni Wine Village", "Areni-1 Cave"],
        meals: ["Wine tasting at Areni winery"],
      },
      {
        day: 1,
        title: "Noravank Canyon",
        description: "Visit the spectacular 13th-century Noravank Monastery set between soaring red-ochre cliffs. The monastery's unique two-story gavit (vestibule) with its famous narrow stone staircase is one of Armenia's most photographed sights.",
        stops: ["Noravank Monastery", "Canyon Viewpoint", "Khachkar Carvings"],
        meals: ["Lunch break at nearby restaurant (own expense)"],
      },
      {
        day: 1,
        title: "Wings of Tatev Cable Car",
        description: "Board the Wings of Tatev cable car — the longest non-stop reversible aerial tramway in the world at 5.7 km — for a breathtaking 12-minute glide over pine forest and volcanic gorges.",
        stops: ["Halidzor Cable Car Station", "Cable Car Ride"],
        meals: [],
      },
      {
        day: 1,
        title: "Tatev Monastery",
        description: "Explore the 9th-century Tatev Monastery complex, standing on a dramatic basalt plateau. Visit the rocking pillar of Gavazani, the oil press, and the panoramic cliff-edge viewpoints.",
        stops: ["Tatev Main Church", "Gavazani Pillar", "Oil Press Museum", "Cliff Viewpoint"],
        meals: [],
      },
    ],
    faq: [
      {
        question: "Is the cable car safe?",
        answer: "The Wings of Tatev cable car was built by a French company (Poma) in 2010 and meets all international safety standards. It's fully enclosed and holds up to 25 passengers.",
      },
      {
        question: "What if the weather is bad?",
        answer: "The cable car operates in most weather conditions. In rare cases of high winds or technical maintenance, we will reschedule or offer a full refund.",
      },
      {
        question: "Is this tour suitable for older travellers?",
        answer: "The monastery requires some uphill walking on stone paths. The cable car itself is very comfortable. If you have mobility concerns, please contact us beforehand.",
      },
    ],
    tags: ["cable car", "monastery", "wine", "canyon", "UNESCO"],
    badge: "Top Rated",
    region: "Syunik",
    startingPoint: "Yerevan",
  },
  {
    id: 5,
    slug: "classic-armenia-7-day-tour",
    title: "Classic Armenia Discovery — 7 Day Tour",
    shortDescription: "The definitive Armenia experience: 7 days covering the country's finest monasteries, landscapes, and cultural highlights.",
    fullDescription: "Our flagship 7-day tour is the most comprehensive way to explore Armenia. From the bustling streets of Yerevan to the alpine meadows of the Geghama Mountains, from the wine country of Vayots Dzor to the dramatic gorges of Syunik — this tour covers it all. With small groups (max 8), expert guides, handpicked family-run guesthouses, and included meals, this is the definitive Armenian journey.",
    category: "private",
    duration: "7 days / 6 nights",
    durationDays: 7,
    price: 890,
    priceNote: "per person",
    originalPrice: 1100,
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    rating: 4.9,
    reviewCount: 87,
    maxGroupSize: 8,
    minGroupSize: 2,
    languages: ["English", "Russian", "German", "French"],
    difficulty: "moderate",
    pickupIncluded: true,
    meetingPoint: "Yerevan International Airport",
    departures: [
      { days: "Every Saturday (Apr–Oct)", times: ["10:00"] },
      { days: "Every Monday (Jun–Aug)", times: ["10:00"] },
    ],
    highlights: [
      "Yerevan city tour with Cascade & Republic Square",
      "Garni Temple & Geghard UNESCO Monastery",
      "Lake Sevan — Armenia's azure highland sea",
      "Dilijan national park & Haghartsin Monastery",
      "Tatev Monastery & Wings of Tatev cable car",
      "Noravank Canyon & Areni wine tasting",
      "Khor Virap Monastery with Ararat views",
    ],
    included: [
      "6 nights accommodation (3-star boutique hotels & guesthouses)",
      "Daily breakfast, 4 dinners included",
      "Airport pickup and drop-off",
      "All transport in air-conditioned minibus",
      "Expert English-speaking guide (all 7 days)",
      "All entrance fees listed in itinerary",
      "Wings of Tatev cable car ticket",
      "Areni wine tasting",
      "Bottled water daily",
    ],
    excluded: [
      "International flights",
      "Travel insurance (strongly recommended)",
      "Lunches (~$8–15 per day)",
      "Personal expenses & optional activities",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Yerevan",
        description: "Arrive at Zvartnots International Airport and transfer to your hotel in central Yerevan. Evening orientation walk through Republic Square and dinner at a traditional Armenian restaurant.",
        stops: ["Zvartnots Airport", "Hotel Check-in", "Republic Square Evening Walk"],
        meals: ["Welcome dinner included"],
        accommodation: "Boutique hotel, Yerevan",
      },
      {
        day: 2,
        title: "Yerevan City & Khor Virap",
        description: "Full-day Yerevan exploration: Matenadaran manuscripts, Cascade Complex, Ararat Brandy Factory. Afternoon drive to Khor Virap Monastery with majestic Ararat views at sunset.",
        stops: ["Matenadaran", "Cascade Complex", "Ararat Brandy Factory", "Khor Virap Monastery"],
        meals: ["Breakfast included"],
        accommodation: "Boutique hotel, Yerevan",
      },
      {
        day: 3,
        title: "Garni, Geghard & Lake Sevan",
        description: "Morning at the Garni Temple and Geghard Monastery. Afternoon drive to Lake Sevan with a visit to Sevanavank and fresh trout lunch by the lake.",
        stops: ["Garni Temple", "Geghard Monastery", "Lake Sevan", "Sevanavank"],
        meals: ["Breakfast included", "Lakeside lunch (own expense)"],
        accommodation: "Guesthouse, Sevan",
      },
      {
        day: 4,
        title: "Dilijan National Park",
        description: "Drive north through the Dilijan National Park — Armenia's 'Little Switzerland.' Visit the medieval Haghartsin Monastery hidden in dense forest. Afternoon forest walk and artisan village visit.",
        stops: ["Dilijan Town", "Haghartsin Monastery", "Parz Lake", "Artisan Village"],
        meals: ["Breakfast included", "Dinner at guesthouse included"],
        accommodation: "Forest guesthouse, Dilijan",
      },
      {
        day: 5,
        title: "Alaverdi & Haghpat/Sanahin",
        description: "Head to the UNESCO twin monasteries of Haghpat and Sanahin in the lush gorges of northern Armenia. Visit the dramatic Alaverdi canyon and a local copper-artisan workshop.",
        stops: ["Haghpat Monastery", "Sanahin Monastery", "Alaverdi Canyon", "Copper Workshop"],
        meals: ["Breakfast included", "Dinner included"],
        accommodation: "Boutique hotel, Alaverdi",
      },
      {
        day: 6,
        title: "Southern Armenia: Noravank & Tatev",
        description: "The highlight day: Noravank canyon monastery, Areni wine village, and the spectacular Wings of Tatev cable car ride to Tatev Monastery for a dramatic sunset.",
        stops: ["Noravank Monastery", "Areni Wine Tasting", "Wings of Tatev", "Tatev Monastery"],
        meals: ["Breakfast included", "Farewell dinner in Goris included"],
        accommodation: "Guesthouse, Goris",
      },
      {
        day: 7,
        title: "Return to Yerevan & Departure",
        description: "Scenic drive back to Yerevan through the Vorotan Gorge. Optional final shopping at Vernissage market before your airport transfer.",
        stops: ["Vorotan Gorge", "Vernissage Market", "Zvartnots Airport"],
        meals: ["Breakfast included"],
      },
    ],
    faq: [
      {
        question: "What is the accommodation style?",
        answer: "We use carefully selected 3-star boutique hotels and family-run guesthouses throughout the tour. All rooms are private en-suite with modern amenities.",
      },
      {
        question: "What if I want to extend the tour?",
        answer: "We can arrange extensions to explore Artsakh, Georgia, or additional Armenian regions. Contact us before booking to discuss options.",
      },
      {
        question: "Is travel insurance required?",
        answer: "It is not mandatory but strongly recommended. We can suggest partners for comprehensive travel insurance.",
      },
    ],
    tags: ["multi-day", "package", "all-inclusive", "cultural", "nature"],
    badge: "Best Seller",
    region: "All Armenia",
    startingPoint: "Yerevan",
  },
  {
    id: 6,
    slug: "dilijan-haghpat-sanahin-tour",
    title: "Dilijan Forest, Haghpat & Sanahin Monasteries",
    shortDescription: "Explore Armenia's lush northern forests and two UNESCO World Heritage monasteries in one breathtaking day.",
    fullDescription: "Northern Armenia is a world away from the highland steppe — dense oak and beech forests draped over deep gorges, with medieval monasteries emerging from the trees. This tour takes you to Dilijan national park and the twin UNESCO monasteries of Haghpat and Sanahin, two of the finest examples of medieval Armenian architecture. A perfect day for lovers of history, nature, and photography.",
    category: "private",
    duration: "9 hours",
    durationHours: 9,
    price: 50,
    priceNote: "per person",
    image: "https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    rating: 4.7,
    reviewCount: 64,
    maxGroupSize: 12,
    minGroupSize: 2,
    languages: ["English", "Russian", "German"],
    difficulty: "easy",
    pickupIncluded: true,
    meetingPoint: "Republic Square, Yerevan",
    departures: [
      { days: "Tue, Thu, Sat, Sun", times: ["08:30"] },
    ],
    highlights: [
      "Haghpat Monastery — UNESCO World Heritage",
      "Sanahin Monastery — UNESCO World Heritage",
      "Dilijan National Park forest walk",
      "Panoramic Debed Canyon views",
      "Local walnut, honey & churchkhela tasting",
    ],
    included: [
      "Professional guide",
      "Air-conditioned transport",
      "Hotel pickup & drop-off",
      "Local food tasting",
      "Bottled water",
    ],
    excluded: [
      "Lunch (~$10)",
      "Monastery entrance fees (combined: AMD 3,000)",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Drive North & Dilijan",
        description: "Drive northeast past Lake Sevan and into the forested highlands of Tavush. Stop in Dilijan for a stroll through the charming old craft quarter.",
        stops: ["Yerevan Pickup", "Dilijan Old Town", "Artisan Workshops"],
        meals: [],
      },
      {
        day: 1,
        title: "Haghpat & Sanahin",
        description: "Descend into the Debed Canyon to visit the twin UNESCO monasteries of Haghpat (10th c.) and Sanahin (10th c.). These are masterpieces of medieval Armenian architecture with intricate stone carvings.",
        stops: ["Haghpat Monastery", "Sanahin Monastery", "Debed Canyon Viewpoint"],
        meals: ["Lunch at local restaurant (own expense)"],
      },
    ],
    faq: [
      {
        question: "Is this tour available in winter?",
        answer: "Yes, but departure frequency is reduced (Saturdays only, Nov–Mar). The forest scenery is particularly beautiful in autumn (October).",
      },
    ],
    tags: ["forest", "UNESCO", "monastery", "nature", "hiking"],
    region: "Lori / Tavush",
    startingPoint: "Yerevan",
  },
];

export function getTourBySlug(slug: string): DetailedTour | undefined {
  return detailedTours.find((t) => t.slug === slug);
}

export function getToursByCategory(category: TourCategory | "all"): DetailedTour[] {
  if (category === "all") return detailedTours;
  return detailedTours.filter((t) => t.category === category);
}
