export type Property = {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  price: string;
  area: number; // sq ft
  /** Path under /public, e.g. "/properties/ganges-residency.jpg". */
  image?: string;
};

// Sample data — replace with real listings.
export const FEATURED_PROPERTIES: Property[] = [
  {
    id: "ganges-residency",
    name: "The Ganges Residency",
    location: "Lanka, Varanasi",
    bedrooms: 4,
    bathrooms: 2,
    parking: 1,
    price: "₹1.3Cr",
    area: 1456,
  },
  {
    id: "assi-ghat-villa",
    name: "Assi Ghat Villa",
    location: "Assi, Varanasi",
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
    price: "₹2.4Cr",
    area: 2310,
  },
  {
    id: "sarnath-greens",
    name: "Sarnath Greens",
    location: "Sarnath, Varanasi",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    price: "₹86L",
    area: 1180,
  },
  {
    id: "riverfront-heights",
    name: "Riverfront Heights",
    location: "Bhelupur, Varanasi",
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    price: "₹1.1Cr",
    area: 1320,
  },
  {
    id: "kashi-courtyard",
    name: "Kashi Courtyard Homes",
    location: "Sigra, Varanasi",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    price: "₹1.7Cr",
    area: 1890,
  },
  {
    id: "cantt-residences",
    name: "Cantt Residences",
    location: "Cantonment, Varanasi",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    price: "₹68L",
    area: 960,
  },
];
