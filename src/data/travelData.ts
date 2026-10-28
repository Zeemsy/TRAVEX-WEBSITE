export interface TourPackage {
  id: string;
  title: string;
  country: string;
  city: string;
  continent: 'Europe' | 'Asia' | 'Americas' | 'Middle East' | 'Africa' | 'Oceania';
  type: 'Hiking' | 'Cruises' | 'Wildlife' | 'Cultural' | 'Luxury' | 'Adventure';
  price: number;
  originalPrice?: number;
  durationDays: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  featured?: boolean;
  coordinates: { x: number; y: number; lat: number; lng: number }; // x,y are percentages for interactive SVG world map (0-100)
  highlights: string[];
  itinerary: { day: number; title: string; desc: string }[];
  included: string[];
  maxGroup: number;
  nextDeparture: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  toursCount: number;
  startingPrice: number;
  tagline: string;
  rating: number;
  isCenterpiece?: boolean;
}

export interface TourCategory {
  id: string;
  title: string;
  subtitle: string;
  tourCount: number;
  iconName: string;
  image: string;
  color: string;
}

export interface Guide {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  toursCount: number;
  languages: string[];
  photo: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  tourName: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  summary: string;
  commentsCount: number;
}

export const HERO_IMAGE = '/src/assets/images/hero_tropical_wanderlust_1793005139345.jpg';
export const MALDIVES_IMAGE = '/src/assets/images/dest_maldives_aerial_1793005137925.jpg';
export const SANTORINI_IMAGE = '/src/assets/images/dest_santorini_coastal_1793005139242.jpg';
export const SWISS_IMAGE = '/src/assets/images/dest_swiss_alps_lake_1793005140361.jpg';
export const DUBAI_IMAGE = '/src/assets/images/dest_dubai_skyline_1793005141766.jpg';

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-greece',
    title: 'Greece Tour Package',
    country: 'Greece',
    city: 'Santorini & Mykonos',
    continent: 'Europe',
    type: 'Cultural',
    price: 980,
    originalPrice: 1200,
    durationDays: 12,
    rating: 4.9,
    reviewsCount: 148,
    image: SANTORINI_IMAGE,
    badge: 'Best Seller',
    featured: true,
    coordinates: { x: 55, y: 38, lat: 36.3932, lng: 25.4615 },
    highlights: ['Sunset catamaran cruise in Oia', 'Ancient Akrotiri archaeological exploration', 'Private wine tasting on volcanic vineyard', 'Luxury cave suite with caldera views'],
    itinerary: [
      { day: 1, title: 'Arrival in Athens & Acropolis Sunset', desc: 'Welcome private transfer to your hotel. Evening walking tour with our classical historian to the Parthenon.' },
      { day: 2, title: 'High-speed Ferry to Mykonos', desc: 'Check into seaside suite, stroll through Little Venice and wind mills with local seafood dinner.' },
      { day: 5, title: 'Caldera Crossing to Santorini', desc: 'Arrive in Santorini. Afternoon at Red Beach followed by private volcanic wine pairing.' },
      { day: 8, title: 'Oia Golden Hour Catamaran', desc: 'Private catamaran charter across hot springs, swimming in crystal waters with Greek barbecue onboard.' },
      { day: 12, title: 'Farewell Breakfast & Departure', desc: 'Morning leisure in Fira, private transfer to Santorini International Airport.' }
    ],
    included: ['5-Star Boutique Accommodations', 'Daily Gourmet Breakfast & 4 Dinners', 'Internal High-Speed Ferries', 'Private Certified English Tour Guide', 'All Entrance & Park Fees'],
    maxGroup: 12,
    nextDeparture: 'May 14, 2026',
    description: 'Immerse yourself in whitewashed Cycladic architecture, cobalt Aegean seas, and sun-drenched Mediterranean hospitality.'
  },
  {
    id: 'pkg-italy',
    title: 'Italy Coastal & Tuscany Tour',
    country: 'Italy',
    city: 'Amalfi, Florence & Rome',
    continent: 'Europe',
    type: 'Cultural',
    price: 890,
    originalPrice: 1050,
    durationDays: 7,
    rating: 4.8,
    reviewsCount: 112,
    image: SANTORINI_IMAGE, // fallback or primary
    badge: 'Popular',
    featured: true,
    coordinates: { x: 52, y: 36, lat: 41.8719, lng: 12.5674 },
    highlights: ['Private Positano coastal boat tour', 'Chianti vintage vineyard harvest & dinner', 'Skip-the-line Colosseum & Vatican museums', 'Artisan pasta cooking masterclass'],
    itinerary: [
      { day: 1, title: 'Rome Imperium Welcome', desc: 'Arrive in the Eternal City with welcome dinner at a rooftop trattoria overlooking the Roman Forum.' },
      { day: 3, title: 'High-Speed Rail to Florence & Chianti', desc: 'Renaissance masterpieces at the Uffizi followed by estate truffle hunting.' },
      { day: 5, title: 'Amalfi Coast Cliffside Drive & Boat', desc: 'Scenic journey south to Positano, limoncello tasting, and private motor yacht excursion.' },
      { day: 7, title: 'Naples Historic Centre & Departure', desc: 'Artisanal Neapolitan pizza crafting workshop before airport transfer.' }
    ],
    included: ['Luxury Heritage Hotels', 'First-Class Frecciarossa Train Tickets', 'Daily Breakfast & Selected Dinners', 'VIP Museum Access Passes'],
    maxGroup: 10,
    nextDeparture: 'June 02, 2026',
    description: 'Experience the romantic soul of Italy from ancient Roman cobblestones to rolling Tuscan cypress hills and azure Amalfi cliffs.'
  },
  {
    id: 'pkg-dubai',
    title: 'Dubai Luxury Desert & Skyline',
    country: 'United Arab Emirates',
    city: 'Dubai & Abu Dhabi',
    continent: 'Middle East',
    type: 'Luxury',
    price: 870,
    originalPrice: 990,
    durationDays: 5,
    rating: 4.9,
    reviewsCount: 96,
    image: DUBAI_IMAGE,
    badge: 'Luxury Pick',
    featured: true,
    coordinates: { x: 64, y: 44, lat: 25.2048, lng: 55.2708 },
    highlights: ['Burj Al Arab royal lounge experience', 'Private Arabian desert safari with luxury stargazing camp', 'Private yacht cruise along Dubai Marina', 'Abu Dhabi Louvre & Sheikh Zayed Grand Mosque'],
    itinerary: [
      { day: 1, title: 'Skyline Arrival & Marina Yacht Sunset', desc: 'Private chauffeur in Mercedes-Maybach to your Palm Jumeirah hotel. Sunset champagne cruise.' },
      { day: 2, title: 'Old Dubai Heritage & Gold Souk', desc: 'Abra boat across Dubai Creek, private guide through spice and perfume quarters.' },
      { day: 3, title: 'Red Dunes Safari & Bedouin Glamping', desc: 'Dune bashing, falconry display, gourmet fire-roasted barbecue under desert starlight.' },
      { day: 4, title: 'Abu Dhabi Architectural Wonders', desc: 'VIP access to the Sheikh Zayed Grand Mosque and Louvre Abu Dhabi.' },
      { day: 5, title: 'Burj Khalifa Observation & Departure', desc: 'At the Top Sky lounge breakfast and transfer to Dubai International Airport.' }
    ],
    included: ['5-Star Palm Jumeirah Beachfront Resort', 'Private Luxury Chauffeur Transfers', 'All Desert Activities & Falconry', 'VIP Burj Khalifa Level 148 Access'],
    maxGroup: 8,
    nextDeparture: 'April 28, 2026',
    description: 'A dazzling blend of futuristic architectural splendor, golden Arabian desert dunes, and five-star Arabian hospitality.'
  },
  {
    id: 'pkg-switzerland',
    title: 'Switzerland Alpine Wonders',
    country: 'Switzerland',
    city: 'Zermatt, Interlaken & Lucerne',
    continent: 'Europe',
    type: 'Hiking',
    price: 980,
    originalPrice: 1150,
    durationDays: 7,
    rating: 4.95,
    reviewsCount: 164,
    image: SWISS_IMAGE,
    badge: 'Staff Pick',
    featured: true,
    coordinates: { x: 51, y: 34, lat: 46.8182, lng: 8.2275 },
    highlights: ['Glacier Express panoramic alpine train ride', 'Matterhorn sunrise viewpoint hike in Zermatt', 'Lake Oeschinen turquoise crystal rowboat', 'Jungfraujoch Top of Europe ice palace visit'],
    itinerary: [
      { day: 1, title: 'Zurich to Lucerne Lakefront', desc: 'Meet tour leader at Zurich, scenic scenic cruise across Lake Lucerne to mountaintop hotel.' },
      { day: 2, title: 'Interlaken & Lauterbrunnen Waterfalls', desc: 'Walk beneath 72 roaring glacial cascades in the valley of waterfalls.' },
      { day: 4, title: 'Jungfraujoch & Ice Palace', desc: 'Cogwheel railway ride through the Eiger north face to Europe’s highest station.' },
      { day: 6, title: 'Zermatt & Matterhorn Reflection', desc: 'Gentle sunrise trail to Stellisee lake for the iconic mirror reflection of the Matterhorn.' },
      { day: 7, title: 'Swiss Chocolate Tasting & Departure', desc: 'Artisan chocolatier workshop before direct airport express train.' }
    ],
    included: ['First-Class Swiss Travel Rail Pass', 'Boutique Alpine Chalet Stays', 'Mountain Cable Cars & Cogwheel Passes', 'Mountain Guide & Equipment Gear'],
    maxGroup: 10,
    nextDeparture: 'May 20, 2026',
    description: 'Immaculate alpine valleys, crystal turquoise glacial lakes, and legendary mountain peaks of the Swiss Confederation.'
  },
  {
    id: 'pkg-maldives',
    title: 'Maldives Overwater Paradise',
    country: 'Maldives',
    city: 'North Malé Atoll',
    continent: 'Asia',
    type: 'Luxury',
    price: 1450,
    originalPrice: 1700,
    durationDays: 6,
    rating: 5.0,
    reviewsCount: 204,
    image: MALDIVES_IMAGE,
    badge: 'Top Rated',
    featured: true,
    coordinates: { x: 70, y: 55, lat: 3.2028, lng: 73.2207 },
    highlights: ['Overwater villa with direct ocean lagoon access', 'Guided manta ray and sea turtle reef snorkel', 'Floating breakfast at private infinity pool', 'Sunset dolphin catamaran cruise'],
    itinerary: [
      { day: 1, title: 'Scenic Seaplane Arrival', desc: 'Breathtaking 25-minute scenic flight over coral atolls directly to the resort jetty.' },
      { day: 2, title: 'House Reef Snorkeling Safari', desc: 'Explore virgin coral gardens with a marine biologist guide encountering sea turtles.' },
      { day: 4, title: 'Private Sandbank Picnic', desc: 'Cast away on a completely deserted powder-white sand spit with chef-prepared lunch.' },
      { day: 6, title: 'Spa Ritual & Seaplane Departure', desc: 'Glass-floor overwater massage before return seaplane to Malé.' }
    ],
    included: ['Overwater Pool Villa', 'All-Inclusive Dine-Around Plan', 'Roundtrip Seaplane Transfers', 'Private Snorkeling & Diving Equipment'],
    maxGroup: 4,
    nextDeparture: 'May 08, 2026',
    description: 'The definitive turquoise dreamscape. Unwind in ultra-luxurious private overwater villas perched over glowing coral reefs.'
  },
  {
    id: 'pkg-bali',
    title: 'Bali Spiritual & Island Adventure',
    country: 'Indonesia',
    city: 'Ubud & Nusa Penida',
    continent: 'Asia',
    type: 'Adventure',
    price: 680,
    originalPrice: 820,
    durationDays: 8,
    rating: 4.85,
    reviewsCount: 88,
    image: HERO_IMAGE,
    badge: 'Great Value',
    featured: false,
    coordinates: { x: 78, y: 62, lat: -8.4095, lng: 115.1889 },
    highlights: ['Sunrise hike up Mount Batur active volcano', 'Traditional purification blessing at Tirta Empul', 'Kelingking T-Rex cliff at Nusa Penida', 'Jungle infinity pool & artisan craft workshops'],
    itinerary: [
      { day: 1, title: 'Arrival in Cultural Ubud', desc: 'Private transfer through lush rice terraces to your private rainforest sanctuary.' },
      { day: 3, title: 'Mount Batur Sunrise Trek', desc: 'Early morning climb with headlamps to catch dawn over the sea of clouds.' },
      { day: 5, title: 'Speedboat to Nusa Penida', desc: 'Dramatic coastal cliffs, swimming with giant oceanic manta rays at Manta Point.' },
      { day: 8, title: 'Canggu Sunset Beach Club & Departure', desc: 'Relaxation and massage session before evening flight.' }
    ],
    included: ['Jungle Pool Villas & Island Resorts', 'Private Air-Conditioned Van & Driver', 'All Ferry & Sanctuary Admissions', 'Sunrise Trekking Guide & Gear'],
    maxGroup: 12,
    nextDeparture: 'June 10, 2026',
    description: 'Connect with sacred Balinese temple traditions, dramatic volcanic sunrises, and wild turquoise island coastlines.'
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-1',
    name: 'Maldives',
    country: 'Republic of Maldives',
    region: 'South Asia',
    image: MALDIVES_IMAGE,
    toursCount: 230,
    startingPrice: 1200,
    tagline: 'Azure Lagoons & Overwater Luxury',
    rating: 5.0,
    isCenterpiece: true
  },
  {
    id: 'dest-2',
    name: 'Greece',
    country: 'Hellenic Republic',
    region: 'Southern Europe',
    image: SANTORINI_IMAGE,
    toursCount: 185,
    startingPrice: 850,
    tagline: 'Whitewashed Cliffs & Aegean Romance',
    rating: 4.9
  },
  {
    id: 'dest-3',
    name: 'Switzerland',
    country: 'Switzerland',
    region: 'Central Europe',
    image: SWISS_IMAGE,
    toursCount: 142,
    startingPrice: 980,
    tagline: 'Majestic Peaks & Turquoise Glacial Lakes',
    rating: 4.95
  },
  {
    id: 'dest-4',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    image: DUBAI_IMAGE,
    toursCount: 160,
    startingPrice: 790,
    tagline: 'Futuristic Skyline & Golden Dunes',
    rating: 4.88
  },
  {
    id: 'dest-5',
    name: 'Thailand & Bali',
    country: 'Southeast Asia',
    region: 'East Asia',
    image: HERO_IMAGE,
    toursCount: 295,
    startingPrice: 650,
    tagline: 'Emerald Karsts & Sacred Temples',
    rating: 4.92
  }
];

export const TOUR_CATEGORIES: TourCategory[] = [
  {
    id: 'cat-cruises',
    title: 'Cruises',
    subtitle: 'Ocean & River Luxury',
    tourCount: 48,
    iconName: 'Ship',
    image: HERO_IMAGE,
    color: 'from-cyan-500/20 to-teal-500/10'
  },
  {
    id: 'cat-hiking',
    title: 'Hiking',
    subtitle: 'Alpine & Summit Trails',
    tourCount: 65,
    iconName: 'Footprints',
    image: SWISS_IMAGE,
    color: 'from-emerald-500/20 to-green-500/10'
  },
  {
    id: 'cat-airbirds',
    title: 'Air & Sky',
    subtitle: 'Aerial & Paragliding',
    tourCount: 32,
    iconName: 'Wind',
    image: MALDIVES_IMAGE,
    color: 'from-sky-500/20 to-blue-500/10'
  },
  {
    id: 'cat-wildlife',
    title: 'Wildlife',
    subtitle: 'Safaris & Marine Life',
    tourCount: 54,
    iconName: 'Compass',
    image: DUBAI_IMAGE,
    color: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'cat-walking',
    title: 'Cultural',
    subtitle: 'Ancient Cities & Cuisine',
    tourCount: 82,
    iconName: 'MapPin',
    image: SANTORINI_IMAGE,
    color: 'from-indigo-500/20 to-teal-500/10'
  }
];

export const GUIDES: Guide[] = [
  {
    id: 'guide-1',
    name: 'Jacob Jones',
    role: 'Senior Alpine & Expedition Guide',
    experienceYears: 9,
    rating: 4.96,
    toursCount: 340,
    languages: ['English', 'German', 'French'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    specialty: 'High-Altitude Trekking & Glacier Navigation'
  },
  {
    id: 'guide-2',
    name: 'Jane Cooper',
    role: 'Mediterranean Culture & History Specialist',
    experienceYears: 7,
    rating: 4.98,
    toursCount: 290,
    languages: ['English', 'Greek', 'Italian'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    specialty: 'Archaeological Sites & Culinary Expeditions'
  },
  {
    id: 'guide-3',
    name: 'Guy Hawkins',
    role: 'Desert Safari & Arabian Heritage Guide',
    experienceYears: 8,
    rating: 4.92,
    toursCount: 260,
    languages: ['English', 'Arabic'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    specialty: 'Desert Navigation & Stargazing Astronomy'
  },
  {
    id: 'guide-4',
    name: 'Jenny Wilson',
    role: 'Marine Biologist & Scuba Expedition Leader',
    experienceYears: 6,
    rating: 5.0,
    toursCount: 215,
    languages: ['English', 'Spanish', 'Indonesian'],
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    specialty: 'Coral Reef Ecology & Pelagic Marine Life'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Andrew Simon',
    role: 'Architect & Travel Writer',
    location: 'Vienna, Austria',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'A tour that perfectly blends sustainability with sheer luxury! From the moment our seaplane touched down in Maldives, every detail was orchestrated with warmth and surgical precision. TRAVEX sets the gold standard.',
    tourName: 'Maldives Overwater Paradise',
    date: 'March 2026'
  },
  {
    id: 't-2',
    name: 'Sophia Patel',
    role: 'Creative Director',
    location: 'London, United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Our 12-day Greece excursion was beyond poetic. Watching the Santorini sunset from a private catamaran while sipping Assyrtiko wine was a core memory. The guides felt like lifelong friends.',
    tourName: 'Greece Tour Package',
    date: 'February 2026'
  },
  {
    id: 't-3',
    name: 'Michael Smith',
    role: 'Financial Analyst',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Hiking through the Swiss Lauterbrunnen valley and seeing the Matterhorn mirrored in alpine waters was breathtaking. Luggage transfers were seamless and the small group dynamic was ideal.',
    tourName: 'Switzerland Alpine Wonders',
    date: 'January 2026'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: '10 Reasons Why You Should Experience the Amalfi Coast by Catamaran',
    date: 'March 18, 2026',
    readTime: '5 min read',
    category: 'Travel Tips',
    author: 'Elena Rossi',
    image: SANTORINI_IMAGE,
    summary: 'Discover hidden sea caves, secluded limoncello coves, and panoramic views of Positano only accessible from the water.',
    commentsCount: 14
  },
  {
    id: 'post-2',
    title: 'The Best Seasons to Visit Japan and Enjoy the Sacred Cherry Blossoms',
    date: 'March 12, 2026',
    readTime: '7 min read',
    category: 'Destinations',
    author: 'Kenji Sato',
    image: HERO_IMAGE,
    summary: 'A seasonal planning blueprint for timing peak sakura blooms from Tokyo to Kyoto, along with ryokan etiquette.',
    commentsCount: 22
  },
  {
    id: 'post-3',
    title: 'The 7 Most Breathtaking High-Alpine Destinations for Adventure Seekers',
    date: 'February 28, 2026',
    readTime: '6 min read',
    category: 'Adventure',
    author: 'Marcus Lindner',
    image: SWISS_IMAGE,
    summary: 'From the jagged ridges of Zermatt to hidden turquoise glacial tarns, explore our curated list of unforgettable summits.',
    commentsCount: 9
  }
];

export const RECENT_GALLERY = [
  { id: 'g-1', title: 'Sunset Dune Safari', location: 'Dubai, UAE', image: DUBAI_IMAGE },
  { id: 'g-2', title: 'Oia Blue Hour', location: 'Santorini, Greece', image: SANTORINI_IMAGE },
  { id: 'g-3', title: 'Coral Lagoon Diving', location: 'Maldives', image: MALDIVES_IMAGE },
  { id: 'g-4', title: 'Alpine Valley Trek', location: 'Lauterbrunnen, Swiss', image: SWISS_IMAGE },
  { id: 'g-5', title: 'Tropical Bay Expedition', location: 'Phi Phi Islands', image: HERO_IMAGE }
];

export const TRUSTED_PARTNERS = [
  { name: 'Mountain Peak Explorers', symbol: '🏔️' },
  { name: 'Global Eco Trekker', symbol: '🧭' },
  { name: 'BlueLake Adventures', symbol: '🌊' },
  { name: 'Alpine Vista Lodges', symbol: '⛰️' },
  { name: 'Wanderer Society', symbol: '🏕️' }
];

export interface TravelService {
  id: string;
  title: string;
  tagline: string;
  iconName: 'Plane' | 'Hotel' | 'Headphones' | 'ShieldPlus' | 'Luggage';
  image: string;
  description: string;
  perks: string[];
  ctaLabel: string;
  modalType: 'flight' | 'hotel' | 'support' | 'care' | 'baggage';
}

export interface BookingRecord {
  id: string;
  bookingRef: string;
  tourId: string;
  tourTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  departureDate: string;
  guestsCount: number;
  totalPrice: number;
  currency?: 'USD' | 'EUR' | 'GBP' | string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  notes?: string;
}

export const INITIAL_SERVICES: TravelService[] = [
  {
    id: 'cheap-flight',
    title: 'Cheap Flight',
    tagline: 'Global Airline Partner Fares',
    iconName: 'Plane',
    image: DUBAI_IMAGE,
    description: 'Access exclusive wholesale airfares across 140+ international airlines. Enjoy free date adjustments, 24/7 rebooking support, and our lowest fare price-drop guarantee.',
    perks: [
      'Guaranteed Lowest Airline Partner Fares',
      'Complimentary Flexible Date Re-booking',
      'Free Preferred Seat Selection & Carry-on'
    ],
    ctaLabel: 'Search Cheap Flights',
    modalType: 'flight'
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking',
    tagline: 'Handpicked Boutique Stays & Resorts',
    iconName: 'Hotel',
    image: MALDIVES_IMAGE,
    description: 'Reserve curated 5-star beachfront resorts, alpine chalets, and private overwater villas with complimentary breakfast, room upgrades, and late checkout privileges.',
    perks: [
      'Verified 5-Star & Heritage Accommodations',
      'Complimentary Suite Upgrades When Available',
      'Early Check-in & Late Checkout Guaranteed'
    ],
    ctaLabel: 'Explore Hotel Stays',
    modalType: 'hotel'
  },
  {
    id: 'live-support',
    title: '24/7 Live Support',
    tagline: 'Always-On Expedition Concierge',
    iconName: 'Headphones',
    image: HERO_IMAGE,
    description: 'Our certified multilingual travel specialists are reachable around the clock via live chat, instant phone call, or WhatsApp to handle flight changes, advice, or emergencies.',
    perks: [
      'Instant Live Agent Response Time (< 60s)',
      'Multilingual Concierge (12+ Languages)',
      'Emergency Flight Rerouting & Assistance'
    ],
    ctaLabel: 'Chat With Support',
    modalType: 'support'
  },
  {
    id: 'travel-care',
    title: 'Travel Care Services',
    tagline: 'Comprehensive Health & Trip Protection',
    iconName: 'ShieldPlus',
    image: SWISS_IMAGE,
    description: 'Comprehensive global travel protection including emergency medical cover up to $1,000,000, trip cancellation reimbursements, flight delay allowances, and telehealth access.',
    perks: [
      '$1,000,000 Emergency Medical & Evacuation',
      '100% Trip Cancellation Reimbursement',
      '24/7 Telehealth Access with English Doctors'
    ],
    ctaLabel: 'Get Travel Care Plan',
    modalType: 'care'
  },
  {
    id: 'lost-baggage',
    title: 'Lost Baggage Protection',
    tagline: 'Luggage Tracking & Rapid Payout',
    iconName: 'Luggage',
    image: SANTORINI_IMAGE,
    description: 'Real-time baggage transit tracking worldwide. If your luggage is delayed over 24 hours, receive guaranteed rapid compensation up to $2,500 without tedious paperwork.',
    perks: [
      'Real-time Satellite Baggage Monitoring',
      'Up to $2,500 Guaranteed Cash Payout',
      'Dedicated Baggage Recovery Team'
    ],
    ctaLabel: 'Add Baggage Cover',
    modalType: 'baggage'
  }
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bkg-1',
    bookingRef: 'TRX-94821',
    tourId: 'pkg-greece',
    tourTitle: 'Greece Tour Package',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.vance@lifestyle.com',
    customerPhone: '+1 (555) 234-8901',
    departureDate: '2026-05-18',
    guestsCount: 2,
    totalPrice: 1960,
    status: 'Confirmed',
    createdAt: '2026-10-24 14:22',
    notes: 'Honeymoon couple, private catamaran booked.'
  },
  {
    id: 'bkg-2',
    bookingRef: 'TRX-83194',
    tourId: 'pkg-maldives',
    tourTitle: 'Maldives Overwater Paradise',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@design.org',
    customerPhone: '+44 20 7946 0912',
    departureDate: '2026-06-08',
    guestsCount: 2,
    totalPrice: 2900,
    status: 'Pending',
    createdAt: '2026-10-25 09:15',
    notes: 'Requested seaplane window seat & vegan meals.'
  },
  {
    id: 'bkg-3',
    bookingRef: 'TRX-71249',
    tourId: 'pkg-switzerland',
    tourTitle: 'Switzerland Alpine Wonders',
    customerName: 'David K. Becker',
    customerEmail: 'd.becker@fintech.de',
    customerPhone: '+49 89 2018 4421',
    departureDate: '2026-05-20',
    guestsCount: 3,
    totalPrice: 2940,
    status: 'Confirmed',
    createdAt: '2026-10-25 18:40',
    notes: 'First-class Glacier Express seats confirmed.'
  }
];


