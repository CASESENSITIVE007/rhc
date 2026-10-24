export type AmenityKey =
  | "parking"
  | "security"
  | "power"
  | "gated"
  | "garden"
  | "balcony"
  | "kitchen"
  | "water"
  | "lift"
  | "gym"
  | "pool"
  | "clubhouse";

export type NearbyPlace = {
  name: string;
  distance: string;
  time: string;
};

export type Property = {
  id: string;
  name: string;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  price: string;
  area: number; // sq ft
  /** Estimated monthly rent in rupees. */
  rent: number;
  facing: string;
  status: string;
  furnishing: string;
  description: string;
  amenities: AmenityKey[];
  nearby: NearbyPlace[];
  /** Path under /public, e.g. "/properties/ganges-residency.jpg". */
  image?: string;
  /** Extra photos under /public for the detail page gallery. */
  gallery?: string[];
};

export const AMENITY_LABELS: Record<AmenityKey, string> = {
  parking: "Covered car parking",
  security: "24/7 security",
  power: "Power backup",
  gated: "Gated entrance",
  garden: "Garden and lawn",
  balcony: "Balcony and terrace",
  kitchen: "Modular kitchen",
  water: "Water supply",
  lift: "Elevator",
  gym: "Fitness centre",
  pool: "Swimming pool",
  clubhouse: "Clubhouse",
};

// Sample data — replace with real listings.
export const PROPERTIES: Property[] = [
  {
    id: "ganges-residency",
    name: "The Ganges Residency",
    location: "Lanka, Varanasi",
    type: "Independent house",
    bedrooms: 4,
    bathrooms: 2,
    parking: 1,
    price: "₹1.3Cr",
    area: 1456,
    rent: 38000,
    facing: "East",
    status: "Ready to move",
    furnishing: "Semi-furnished",
    description:
      "A modern four-bedroom independent house in Lanka, close to Banaras Hindu University and Assi Ghat. The house has a covered car park, a balcony and a quiet gated entrance. Rooms are bright and well planned, with space for the whole family — and a terrace that catches the evening breeze off the river.",
    amenities: [
      "parking",
      "security",
      "power",
      "gated",
      "garden",
      "balcony",
      "kitchen",
      "water",
    ],
    nearby: [
      { name: "Banaras Hindu University", distance: "1 km", time: "4 min drive" },
      { name: "Assi Ghat", distance: "2.5 km", time: "10 min drive" },
      { name: "Varanasi Junction", distance: "9 km", time: "28 min drive" },
      { name: "Airport", distance: "28 km", time: "55 min drive" },
    ],
  },
  {
    id: "assi-ghat-villa",
    name: "Assi Ghat Villa",
    location: "Assi, Varanasi",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
    price: "₹2.4Cr",
    area: 2310,
    rent: 65000,
    facing: "North-East",
    status: "Ready to move",
    furnishing: "Fully furnished",
    description:
      "A five-bedroom villa a short walk from Assi Ghat, with river views from the upper terrace. Generous living spaces, a private lawn and two covered parking bays make it ideal for a large family or a heritage homestay.",
    amenities: [
      "parking",
      "security",
      "power",
      "gated",
      "garden",
      "balcony",
      "kitchen",
      "water",
      "pool",
    ],
    nearby: [
      { name: "Assi Ghat", distance: "400 m", time: "5 min walk" },
      { name: "Banaras Hindu University", distance: "2 km", time: "8 min drive" },
      { name: "Kashi Vishwanath Temple", distance: "5 km", time: "20 min drive" },
      { name: "Airport", distance: "29 km", time: "1 hr drive" },
    ],
  },
  {
    id: "sarnath-greens",
    name: "Sarnath Greens",
    location: "Sarnath, Varanasi",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    price: "₹86L",
    area: 1180,
    rent: 26000,
    facing: "East",
    status: "Under construction",
    furnishing: "Unfurnished",
    description:
      "Three-bedroom apartments in a low-rise, green community near the Sarnath heritage zone. Wide balconies, a landscaped central garden and a clubhouse — calm living, twenty minutes from the city centre.",
    amenities: [
      "parking",
      "security",
      "power",
      "lift",
      "garden",
      "balcony",
      "gym",
      "clubhouse",
    ],
    nearby: [
      { name: "Dhamek Stupa", distance: "1.2 km", time: "5 min drive" },
      { name: "Sarnath Railway Station", distance: "2 km", time: "7 min drive" },
      { name: "Varanasi Junction", distance: "10 km", time: "25 min drive" },
      { name: "Airport", distance: "24 km", time: "45 min drive" },
    ],
  },
  {
    id: "riverfront-heights",
    name: "Riverfront Heights",
    location: "Bhelupur, Varanasi",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    price: "₹1.1Cr",
    area: 1320,
    rent: 34000,
    facing: "West",
    status: "Ready to move",
    furnishing: "Semi-furnished",
    description:
      "Spacious three-bedroom homes on the upper floors of a boutique tower in Bhelupur, with sunset views over the Ganga. Every unit has an attached bath for each bedroom and a modular kitchen.",
    amenities: [
      "parking",
      "security",
      "power",
      "lift",
      "balcony",
      "kitchen",
      "water",
      "gym",
    ],
    nearby: [
      { name: "Kedar Ghat", distance: "1 km", time: "4 min drive" },
      { name: "Banaras Hindu University", distance: "3 km", time: "12 min drive" },
      { name: "Varanasi Junction", distance: "6 km", time: "20 min drive" },
      { name: "Airport", distance: "26 km", time: "50 min drive" },
    ],
  },
  {
    id: "kashi-courtyard",
    name: "Kashi Courtyard Homes",
    location: "Sigra, Varanasi",
    type: "Row house",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    price: "₹1.7Cr",
    area: 1890,
    rent: 50000,
    facing: "North",
    status: "Ready to move",
    furnishing: "Semi-furnished",
    description:
      "Contemporary row houses built around a shared central courtyard, inspired by traditional Banarasi havelis. Four bedrooms over two floors, a private terrace and parking for two cars, in the heart of Sigra.",
    amenities: [
      "parking",
      "security",
      "power",
      "gated",
      "garden",
      "balcony",
      "kitchen",
      "clubhouse",
    ],
    nearby: [
      { name: "Sigra Stadium", distance: "800 m", time: "3 min drive" },
      { name: "Varanasi Junction", distance: "3 km", time: "10 min drive" },
      { name: "Kashi Vishwanath Temple", distance: "4 km", time: "18 min drive" },
      { name: "Airport", distance: "22 km", time: "45 min drive" },
    ],
  },
  {
    id: "cantt-residences",
    name: "Cantt Residences",
    location: "Cantonment, Varanasi",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    price: "₹68L",
    area: 960,
    rent: 22000,
    facing: "South-East",
    status: "Ready to move",
    furnishing: "Unfurnished",
    description:
      "Well-planned two-bedroom apartments in the leafy Cantonment area, minutes from the railway station. A smart first home or a steady rental investment in one of the city's most sought-after addresses.",
    amenities: ["parking", "security", "power", "lift", "water", "gym"],
    nearby: [
      { name: "Varanasi Junction", distance: "1.5 km", time: "6 min drive" },
      { name: "Cantonment Park", distance: "600 m", time: "8 min walk" },
      { name: "Godowlia Market", distance: "6 km", time: "22 min drive" },
      { name: "Airport", distance: "20 km", time: "40 min drive" },
    ],
  },
  {
    id: "dashashwamedh-lofts",
    name: "Dashashwamedh Lofts",
    location: "Godowlia, Varanasi",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    price: "₹1.9Cr",
    area: 1640,
    rent: 62000,
    facing: "East",
    status: "Ready to move",
    furnishing: "Fully furnished",
    description:
      "A rare duplex penthouse steps from Dashashwamedh Ghat, with a private rooftop for watching the evening aarti. Double-height living, three en-suite bedrooms and finishes chosen for comfort and calm.",
    amenities: [
      "parking",
      "security",
      "power",
      "lift",
      "balcony",
      "kitchen",
      "water",
    ],
    nearby: [
      { name: "Dashashwamedh Ghat", distance: "300 m", time: "4 min walk" },
      { name: "Kashi Vishwanath Temple", distance: "800 m", time: "10 min walk" },
      { name: "Varanasi Junction", distance: "5 km", time: "20 min drive" },
      { name: "Airport", distance: "25 km", time: "55 min drive" },
    ],
  },
  {
    id: "babatpur-meadows",
    name: "Babatpur Meadows",
    location: "Babatpur, Varanasi",
    type: "Plot + house",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    price: "₹74L",
    area: 1500,
    rent: 21000,
    facing: "North-East",
    status: "New launch",
    furnishing: "Unfurnished",
    description:
      "Independent homes on generous plots in a planned gated township near the airport. Wide internal roads, a park in every block and room to grow — an excellent long-term investment on the city's fastest-growing corridor.",
    amenities: ["parking", "security", "power", "gated", "garden", "water"],
    nearby: [
      { name: "Airport", distance: "3 km", time: "6 min drive" },
      { name: "Babatpur Market", distance: "1 km", time: "3 min drive" },
      { name: "Varanasi Junction", distance: "20 km", time: "40 min drive" },
      { name: "Sarnath", distance: "22 km", time: "40 min drive" },
    ],
  },
];

export function getProperty(id: string) {
  return PROPERTIES.find((p) => p.id === id);
}

/** "₹1.3Cr" → 13000000, "₹86L" → 8600000. */
export function priceInRupees(price: string) {
  const n = parseFloat(price.replace(/[^\d.]/g, ""));
  if (/cr/i.test(price)) return n * 1e7;
  if (/l/i.test(price)) return n * 1e5;
  return n;
}

/** Other listings, closest in price first. */
export function similarTo(p: Property) {
  const gap = (o: Property) =>
    Math.abs(priceInRupees(o.price) - priceInRupees(p.price));
  return PROPERTIES.filter((o) => o.id !== p.id).sort((a, b) => gap(a) - gap(b));
}

/** How another listing's price compares, as a short card label. */
export function priceBadge(base: Property, other: Property) {
  const ratio = priceInRupees(other.price) / priceInRupees(base.price);
  if (ratio < 0.8) return "Lower budget";
  if (ratio > 1.25) return "Premium pick";
  return "Similar price";
}

/** Gross annual rental yield, as a percentage. */
export function rentalYield(p: Property) {
  return ((p.rent * 12) / priceInRupees(p.price)) * 100;
}

export function pricePerSqft(p: Property) {
  return Math.round(priceInRupees(p.price) / p.area);
}

// Until real photos are added, listings show crops of the hero building.
const PLACEHOLDER_IMAGE = "/hero_image.png";
const PLACEHOLDER_CROPS = [
  "86% 45%",
  "100% 30%",
  "78% 70%",
  "94% 60%",
  "82% 35%",
  "100% 75%",
  "90% 55%",
  "70% 65%",
];

export type Photo = { src: string; position?: string; zoom?: number };

export function coverPhoto(p: Property): Photo {
  if (p.image) return { src: p.image };
  const i = Math.max(0, PROPERTIES.indexOf(p));
  return {
    src: PLACEHOLDER_IMAGE,
    position: PLACEHOLDER_CROPS[i % PLACEHOLDER_CROPS.length],
  };
}

/** Photos for the detail page gallery — the cover first. */
export function galleryPhotos(p: Property): Photo[] {
  if (p.image) {
    return [p.image, ...(p.gallery ?? [])].map((src) => ({ src }));
  }
  return [
    coverPhoto(p),
    { src: PLACEHOLDER_IMAGE, position: "72% 72%", zoom: 1.6 },
    { src: PLACEHOLDER_IMAGE, position: "38% 78%", zoom: 1.8 },
    { src: PLACEHOLDER_IMAGE, position: "92% 42%", zoom: 1.5 },
    { src: PLACEHOLDER_IMAGE, position: "8% 70%", zoom: 1.3 },
  ];
}
