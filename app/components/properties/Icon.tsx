import type { AmenityKey } from "../../data/properties";

const icons = {
  pin: (
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  ),
  bed: (
    <path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18M3 15h18M6 9V6.5h4.5V9m3 0V6.5H18V9M3 18v1.5M21 18v1.5" />
  ),
  bath: (
    <path d="M4 12h16v2.5A4.5 4.5 0 0 1 15.5 19h-7A4.5 4.5 0 0 1 4 14.5V12Zm2 0V6a2 2 0 0 1 3.7-1M8 19l-1 2m10-2 1 2" />
  ),
  car: (
    <path d="M5 16.5V11l2-4.5h10l2 4.5v5.5M5 16.5h14M5 16.5v2m14-2v2M5 11h14m-11 2.8h.01m7.99 0h.01" />
  ),
  area: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  share: (
    <path d="M12 4v11m0-11-4 4m4-4 4 4M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
  ),
  calendar: <path d="M5 6h14v14H5zM5 10h14M9 3v4m6-4v4" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  ),
  home: <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5" />,
  compass: (
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z" />
  ),
  key: (
    <path d="M14.5 13.5a4.5 4.5 0 1 0-4-4L4 16v4h4v-2h2v-2h2l2.5-2.5ZM16 8h.01" />
  ),
  sofa: (
    <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3v-5Zm2 5v2m14-2v2" />
  ),
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2" />,
  external: (
    <path d="M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  // Amenities
  shield: (
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" />
  ),
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
  gate: (
    <path d="M4 21V8m16 13V8M4 8l8-4 8 4M8 21v-9m4 9v-9m4 9v-9M4 12h16" />
  ),
  leaf: <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14H5Zm0 0 7-7" />,
  balcony: (
    <path d="M4 12h16M5 12v8m14-8v8M9 12v8m6-8v8M4 20h16M7 12V5h10v7" />
  ),
  pot: (
    <path d="M4 10h16v2a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-2Zm-1 0h18M9 6c0-1 1-1 1-2m4 2c0-1 1-1 1-2" />
  ),
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />,
  lift: <path d="M5 3h14v18H5zM9 9l3-3 3 3m-6 6 3 3 3-3" />,
  dumbbell: <path d="M6 8v8M3 10v4m15-6v8m3-6v4M6 12h12" />,
  pool: (
    <path d="M3 17c2 0 2-1.5 4.5-1.5S10 17 12 17s2-1.5 4.5-1.5S19 17 21 17M3 21c2 0 2-1.5 4.5-1.5S10 21 12 21s2-1.5 4.5-1.5S19 21 21 21M8 14V5a2 2 0 0 1 4 0m4 9V5a2 2 0 0 0-4 0M8 9h8" />
  ),
  star: (
    <path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4l-5.3 3 1.2-6-4.5-4.1 6-.7L12 3Z" />
  ),
};

export type IconName = keyof typeof icons;

export const AMENITY_ICONS: Record<AmenityKey, IconName> = {
  parking: "car",
  security: "shield",
  power: "bolt",
  gated: "gate",
  garden: "leaf",
  balcony: "balcony",
  kitchen: "pot",
  water: "drop",
  lift: "lift",
  gym: "dumbbell",
  pool: "pool",
  clubhouse: "star",
};

export default function Icon({
  name,
  className = "h-4 w-4",
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icons[name]}
    </svg>
  );
}
