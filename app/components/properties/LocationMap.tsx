"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { Property } from "../../data/properties";
import Icon from "./Icon";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LocationMap({ property }: { property: Property }) {
  const [loaded, setLoaded] = useState(false);
  const { lat, lng } = property.coordinates;
  const locality = property.location.split(",")[0];

  // Google's free embed, no API key needed: the pasted embed link if there is
  // one, otherwise a pin at the coordinates.
  const embedUrl =
    property.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const viewUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="grid overflow-hidden rounded-[30px] bg-white shadow-[0_24px_60px_-36px_rgba(10,31,61,0.45)] ring-1 ring-[#0a1f3d]/[0.06] lg:grid-cols-[1.6fr_1fr]">
      {/* Map */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f7] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[440px]">
        {/* Shown until the map arrives */}
        <div
          aria-hidden
          className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(rgba(10,31,61,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,31,61,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
          <span className="relative grid h-12 w-12 place-items-center rounded-full bg-white text-[#0b6fb8] shadow-[0_10px_30px_-12px_rgba(10,31,61,0.5)]">
            <Icon name="pin" className="h-5 w-5" />
          </span>
        </div>

        {/* Loads only when scrolled near, to keep the page light on mobile data */}
        <iframe
          title={`Map showing ${property.name}`}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
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
              className="flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors duration-300 hover:bg-[#0a1f3d]/[0.03]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.08 }}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#0b6fb8] text-xs font-bold text-[#0b6fb8]">
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
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#0a1f3d] to-[#0d3b73] px-5 text-sm font-medium text-white shadow-[0_10px_24px_-12px_rgba(10,31,61,0.9)]"
          >
            <Icon name="compass" className="h-4 w-4" />
            Get directions
          </a>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-[#0a1f3d]/15 px-5 text-sm font-medium text-[#0a1f3d] transition-colors hover:border-[#0a1f3d]"
          >
            Open in Google Maps
            <Icon
              name="external"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
