export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  items: string[];
  icon: string;
  image: string;
}

export const BUSINESS_INFO = {
  name: 'Preeti Enterprises',
  type: 'Wholesale & Retail Two-Wheeler Auto Parts Dealer',
  wholesalerRank: 'No. 1 Wholesaler in Undivided Koraput District',
  regionCoverage: 'Jeypore & Undivided Koraput District (Koraput, Nabarangpur, Malkangiri, Rayagada)',
  address: 'Purnagard Chowk, Canal Road, Jeypore, Odisha – 764003, India',
  addressShort: 'Purnagard Chowk, Canal Road, Jeypore',
  city: 'Jeypore',
  state: 'Odisha',
  pincode: '764003',
  country: 'India',
  phone: '7777888760',
  formattedPhone: '+91 7777888760',
  telLink: 'tel:7777888760',
  whatsappNumber: '917777888760',
  mapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Preeti+Enterprises%2C+Purnagard+Chowk%2C+Canal+Road%2C+Jeypore%2C+Odisha+764003',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Purnagard+Chowk,+Canal+Road,+Jeypore,+Odisha+764003&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const COMMON_VEHICLES = [
  'Hero Splendor / HF Deluxe',
  'Hero Glamour / Passion',
  'Honda Activa / Dio',
  'Honda Shine / SP 125',
  'Bajaj Pulsar (150/180/220)',
  'Bajaj Platina / CT 100',
  'TVS Apache RTR',
  'TVS Jupiter / XL 100',
  'Yamaha FZ / RayZR',
  'Suzuki Access 125',
  'Other Motorcycle / Scooter',
];

export interface BrandDealership {
  name: string;
  specialty: string;
  products: string[];
}

export const DEALER_BRANDS: BrandDealership[] = [
  {
    name: 'UNO MINDA',
    specialty: 'Battery & Switches',
    products: ['Battery', 'Switches', 'Lighting', 'Horns'],
  },
  {
    name: 'SUPRAJIT',
    specialty: 'Cables, Mirrors, Air Filters & Indicators',
    products: ['Control Cables', 'Mirrors', 'Air Filters', 'Indicators'],
  },
  {
    name: 'BOSCH',
    specialty: 'Lubricants & Spark Plugs',
    products: ['Lubricants', 'Spark Plugs'],
  },
  {
    name: 'PRICOL',
    specialty: 'Gauges, Sensors, Oil Pumps & S.M Assy',
    products: ['Gauges', 'Sensors', 'Oil Pumps', 'S.M Assembly'],
  },
  {
    name: 'JK FENNER',
    specialty: 'Belts, Seals & Filters',
    products: ['Belts', 'Seals', 'Filters'],
  },
  {
    name: 'SAI',
    specialty: 'Fiber Body Parts, Drums & Headlights',
    products: ['Fiber Body Parts', 'Brake Drums', 'Headlights'],
  },
  {
    name: 'TMC GROUP',
    specialty: 'Indicators, Lights & Rubber Items',
    products: ['Indicators', 'Lights', 'Rubber Items'],
  },
  {
    name: 'NIPPON',
    specialty: 'Electrical Items',
    products: ['Electrical Items', 'Relays & Wiring'],
  },
  {
    name: 'KING QUALITY',
    specialty: 'Levers & Drums',
    products: ['Control Levers', 'Brake Drums'],
  },
  {
    name: 'ROLON',
    specialty: 'Chains & Sprockets',
    products: ['Drive Chains', 'Sprocket Kits'],
  },
  {
    name: 'GABRIEL',
    specialty: 'Shock Absorbers & Suspension',
    products: ['Rear Shockers', 'Front Forks'],
  },
  {
    name: 'SHRI RAM PISTON (USHA)',
    specialty: 'Pistons, Rings & Engine Spares',
    products: ['Pistons', 'Piston Rings', 'Engine Spares'],
  },
  {
    name: 'RALSON TYRE',
    specialty: 'Two-Wheeler Tyres & Tubes',
    products: ['Bike Tyres', 'Scooter Tyres', 'Tubes'],
  },
  {
    name: 'AVIS TUBE',
    specialty: 'Inner Tubes',
    products: ['Two-Wheeler Inner Tubes'],
  },
  {
    name: 'SANDHAR',
    specialty: 'Locks & Ignition Systems',
    products: ['Lock Sets', 'Ignition Switches'],
  },
  {
    name: 'TVS LUCAS',
    specialty: 'Starters & Electrical Systems',
    products: ['Starter Motors', 'Electrical Systems'],
  },
];

export const PRODUCT_CATEGORIES: CategoryItem[] = [
  {
    id: 'engine-parts',
    name: 'Engine Parts',
    description: 'Motorcycle & scooter engine components, cylinder kits, and gaskets.',
    items: ['Engine components', 'Gaskets', 'Pistons', 'Bearings', 'Seals'],
    icon: 'Cog',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'brake-parts',
    name: 'Brake Parts',
    description: 'Two-wheeler brake shoes, disc pads, levers, and motorcycle brake cables.',
    items: ['Brake shoes', 'Brake pads', 'Brake cables', 'Brake components'],
    icon: 'Disc',
    image: 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clutch-transmission',
    name: 'Clutch & Transmission',
    description: 'Motorcycle clutch plates, chain sprockets, and gear shifter parts.',
    items: ['Clutch plates', 'Clutch cables', 'Transmission components', 'Related parts'],
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'electrical-parts',
    name: 'Electrical Parts',
    description: 'Two-wheeler headlamp bulbs, handlebar switch units, horns, and wiring.',
    items: ['Bulbs', 'Switches', 'Wiring components', 'Electrical accessories'],
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'suspension-steering',
    name: 'Suspension & Steering',
    description: 'Motorcycle front fork oil seals, rear shock absorbers, and T-stem bearings.',
    items: ['Suspension components', 'Steering parts', 'Related replacement components'],
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cables-controls',
    name: 'Cables & Controls',
    description: 'Two-wheeler accelerator cables, clutch cables, levers, and handlebar grips.',
    items: ['Accelerator cables', 'Clutch cables', 'Brake cables', 'Control components'],
    icon: 'Cable',
    image: 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'filters-maintenance',
    name: 'Filters & Maintenance',
    description: 'Two-wheeler air filters, oil strainers, spark plugs, and maintenance essentials.',
    items: ['Air filters', 'Oil filters', 'Fuel-related filters/components', 'Maintenance items'],
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'two-wheeler-accessories',
    name: 'Two-Wheeler Accessories',
    description: 'Motorcycle mirrors, crash guards, seat covers, and rider utility items.',
    items: ['Motorcycle accessories', 'Utility accessories', 'Replacement accessories'],
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
  },
];
