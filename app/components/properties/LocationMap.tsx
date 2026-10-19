"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Property } from "../../data/properties";
import Icon from "./Icon";

const EASE = [0.22, 1, 0.36, 1] as const;

// Map canvas — an illustrative city sketch, not to scale.
const W = 800;
const H = 500;
const PIN = { x: 400, y: 250 };

const ROADS = [
  "M-300 120 C 150 140, 500 90, 1100 150",
  "M-300 380 C 200 360, 520 420, 1100 360",
  "M180 -200 C 210 150, 160 380, 230 800",
  "M560 -200 C 520 160, 600 360, 540 800",
  "M-300 250 L 1100 250",
  "M400 -200 L 400 800",
  "M80 520 C 260 300, 520 210, 920 -60",
];

const toKm = (d: string) => {
  const n = parseFloat(d);
  return /km/i.test(d) ? n : n / 1000;
};

/** Spreads the nearby places around the pin, further away when further away. */
function placeMarkers(nearby: Property["nearby"]) {
  const maxKm = Math.max(...nearby.map((n) => toKm(n.distance)));
  return nearby.map((n, i) => {
    const angle = -Math.PI / 3 + (i * 2 * Math.PI) / nearby.length;
    const r = 80 + 140 * (Math.log1p(toKm(n.distance)) / Math.log1p(maxKm));
    return {
      x: PIN.x + Math.cos(angle) * r * 1.35,
      y: PIN.y + Math.sin(angle) * r * 0.85,
    };
  });
}

export default function LocationMap({ property }: { property: Property }) {
  const [active, setActive] = useState<number | null>(null);
  const markers = placeMarkers(property.nearby);
  const locality = property.location.split(",")[0];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    property.location,
  )}`;

  return (
    <div className="grid overflow-hidden rounded-[30px] bg-white shadow-[0_24px_60px_-36px_rgba(10,31,61,0.45)] ring-1 ring-[#0a1f3d]/[0.06] lg:grid-cols-[1.6fr_1fr]">
      {/* Map */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f7] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Illustrated map around ${property.location}`}
        >
          {/* Parks */}
          <ellipse cx="640" cy="120" rx="90" ry="55" fill="#dfeadf" />
          <ellipse cx="130" cy="420" rx="110" ry="60" fill="#dfeadf" />
          <ellipse cx="290" cy="90" rx="50" ry="34" fill="#dfeadf" />

          {/* River */}
          <motion.path
            d="M900 40 C 700 120, 720 260, 640 330 S 520 560, 420 640"
            fill="none"
            stroke="#c9def3"
            strokeWidth="64"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2, ease: EASE }}
          />
          <text
            x="690"
            y="250"
            fill="#7aa3cc"
            fontSize="18"
            fontStyle="italic"
            fontFamily="var(--font-playfair), serif"
            transform="rotate(-62 690 250)"
          >
            Ganga
          </text>

          {/* Roads */}
          {ROADS.map((d, i) => (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke="#dbe2eb"
                strokeWidth={i > 3 ? 16 : 12}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.1 * i }}
              />
              <motion.path
                d={d}
                fill="none"
                stroke="#ffffff"
                strokeWidth={i > 3 ? 11 : 8}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.1 * i }}
              />
            </g>
          ))}

          {/* Route to the hovered place */}
          <AnimatePresence>
            {active !== null && (
              <motion.path
                key={active}
                d={`M${PIN.x} ${PIN.y} Q ${(PIN.x + markers[active].x) / 2} ${
                  Math.min(PIN.y, markers[active].y) - 40
                } ${markers[active].x} ${markers[active].y}`}
                fill="none"
                stroke="#0b6fb8"
                strokeWidth="3"
                strokeDasharray="2 9"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            )}
          </AnimatePresence>

          {/* Nearby markers */}
          {markers.map((m, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 18,
                delay: 1 + i * 0.12,
              }}
              style={{ transformOrigin: `${m.x}px ${m.y}px` }}
            >
              <motion.circle
                cx={m.x}
                cy={m.y}
                animate={{ r: active === i ? 17 : 13 }}
                fill={active === i ? "#0b6fb8" : "#ffffff"}
                stroke="#0b6fb8"
                strokeWidth="2.5"
                className="transition-colors duration-300"
              />
              <text
                x={m.x}
                y={m.y + 4.5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={active === i ? "#ffffff" : "#0b6fb8"}
              >
                {i + 1}
              </text>
            </motion.g>
          ))}

          {/* Property pin */}
          <g>
            {[0, 1].map((ring) => (
              <motion.circle
                key={ring}
                cx={PIN.x}
                cy={PIN.y}
                r="16"
                fill="#0b6fb8"
                initial={{ scale: 1, opacity: 0.35 }}
                animate={{ scale: 3.6, opacity: 0 }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: ring * 1.3,
                }}
                style={{ transformOrigin: `${PIN.x}px ${PIN.y}px` }}
              />
            ))}
            <ellipse cx={PIN.x} cy={PIN.y + 2} rx="9" ry="3.5" fill="#0a1f3d" opacity="0.2" />
            <motion.g
              initial={{ y: -120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.6 }}
            >
              <path
                d={`M${PIN.x} ${PIN.y} c-4-6 -17-17 -17-29 a17 17 0 0 1 34 0 c0 12 -13 23 -17 29Z`}
                fill="#0a1f3d"
              />
              <circle cx={PIN.x} cy={PIN.y - 29} r="6.5" fill="#ffffff" />
            </motion.g>
          </g>
        </svg>

        <motion.div
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2 pr-4 text-sm font-medium text-[#0a1f3d] shadow-[0_10px_30px_-14px_rgba(10,31,61,0.5)] backdrop-blur-md"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0a1f3d] text-white">
            <Icon name="home" className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          {property.name}
        </motion.div>
      </div>

      {/* Nearby list */}
      <div className="flex flex-col p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#0a1f3d]">
          <Icon name="pin" className="h-4 w-4 text-[#0b6fb8]" />
          Near {locality}, Varanasi
        </p>
        <ul className="mt-5 flex flex-col">
          {property.nearby.map((place, i) => (
            <motion.li
              key={place.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.08 }}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(active === i ? null : i)}
                className={`flex w-full items-center gap-4 rounded-2xl px-3 py-3.5 text-left transition-colors duration-300 ${
                  active === i ? "bg-[#0b6fb8]/[0.07]" : "hover:bg-[#0a1f3d]/[0.03]"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#0b6fb8] text-xs font-bold transition-colors duration-300 ${
                    active === i ? "bg-[#0b6fb8] text-white" : "text-[#0b6fb8]"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium text-[#0a1f3d]">
                    {place.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    {place.time}
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-[#f4f7fc] px-3 py-1 text-xs font-semibold text-[#0a1f3d]">
                  {place.distance}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-medium text-[#0b6fb8]"
        >
          Open in Google Maps
          <Icon
            name="external"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  );
}
