import propertiesData from "./properties.json";

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

/** The groups the properties page can be filtered by. */
export const CATEGORIES = [
  "Plots",
  "Villas",
  "Homes",
  "Flats",
  "Apartments",
  "Duplex",
] as const;

export type PropertyCategory = (typeof CATEGORIES)[number];

export type NearbyPlace = {
  name: string;
  distance: string;
  time: string;
};

export type Property = {
  id: string;
  name: string;
  location: string;
  /** Exact spot shown on the Google Map (copy from Google Maps). */
  coordinates: { lat: number; lng: number };
  /** Optional: the `src` from Google Maps → Share → Embed a map. When empty,
   *  the map shows a pin at `coordinates` instead. */
  mapEmbedUrl?: string;
  type: string;
  category: PropertyCategory;
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
  /** Paths under /public. The first is the card photo; all of them make up
   *  the detail page gallery. */
  images: string[];
};

/** A plot site, in the same columns as the plots sheet. */
export type Plot = {
  id: string;
  name: string;
  branch: string;
  address: string;
  /** Rate in ₹ per sq ft: "1000", or a range such as "1600-1800". */
  pricePerSqft: string;
  area: number; // sq ft
  type: string;
  /** Empty when not known. */
  facing: string;
  /** Empty when not known. */
  road: string;
  /** null when not known — the map then searches for the address. */
  coordinates: { lat: number; lng: number } | null;
  mapEmbedUrl?: string;
  powerBackup: boolean;
  security: boolean;
  waterSupply: boolean;
  park: boolean;
  /** Paths under /public. The first is the card photo. */
  images: string[];
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

// Listings live in properties.json, grouped by filter: each property takes its
// category from the section it sits in. The order of the sections and of the
// listings in them is the order they appear on the site.
// The "Plots" section uses the plot columns instead, so it is kept apart.
const { Plots, ...homeSections } = propertiesData;

export const PLOTS = Plots as Plot[];

const byCategory = homeSections as Record<string, Omit<Property, "category">[]>;

export const PROPERTIES: Property[] = Object.entries(byCategory).flatMap(
  ([category, list]) =>
    list.map((p) => ({ ...p, category: category as PropertyCategory })),
);

export function getProperty(id: string) {
  return PROPERTIES.find((p) => p.id === id);
}

export function getPlot(id: string) {
  return PLOTS.find((p) => p.id === id);
}

const rupees = (n: string) => Number(n).toLocaleString("en-IN");

/** "1000" → "₹1,000/sq ft", "1600-1800" → "₹1,600–1,800/sq ft". */
export function plotRate(p: Plot) {
  return `₹${p.pricePerSqft.split("-").map(rupees).join("–")}/sq ft`;
}

/** "20 Feet Plot Main Road" → "20 ft road"; empty when not known. */
export function roadWidth(p: Plot) {
  const feet = p.road.match(/(\d+)\s*feet/i)?.[1];
  return feet ? `${feet} ft road` : p.road;
}

/** Other sites, the same branch first. */
export function similarPlots(p: Plot) {
  const others = PLOTS.filter((o) => o.id !== p.id);
  return [
    ...others.filter((o) => o.branch === p.branch),
    ...others.filter((o) => o.branch !== p.branch),
  ];
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

// Until real photos are added, listings point at the hero photo, and each
// use of it is shown as a different crop so the cards don't all look alike.
const PLACEHOLDER_IMAGE = "/hero_image.png";
const COVER_CROPS = [
  "86% 45%",
  "100% 30%",
  "78% 70%",
  "94% 60%",
  "82% 35%",
  "100% 75%",
  "90% 55%",
  "70% 65%",
];
const GALLERY_CROPS = [
  { position: "72% 72%", zoom: 1.6 },
  { position: "38% 78%", zoom: 1.8 },
  { position: "92% 42%", zoom: 1.5 },
  { position: "8% 70%", zoom: 1.3 },
];

export type Photo = { src: string; position?: string; zoom?: number };

type HasImages = { id: string; images: string[] };

/** The card photo: the first of the listing's images. */
export function coverPhoto(p: HasImages): Photo {
  const src = p.images[0] ?? PLACEHOLDER_IMAGE;
  if (src !== PLACEHOLDER_IMAGE) return { src };
  // Pick a crop from the id, so each listing keeps the same one.
  const i = [...p.id].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return { src, position: COVER_CROPS[i % COVER_CROPS.length] };
}

/** Photos for the detail page gallery, the card photo first. */
export function galleryPhotos(p: HasImages): Photo[] {
  return [
    coverPhoto(p),
    ...p.images.slice(1).map((src, i) =>
      src === PLACEHOLDER_IMAGE
        ? { src, ...GALLERY_CROPS[i % GALLERY_CROPS.length] }
        : { src },
    ),
  ];
}
