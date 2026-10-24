"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import type { Photo } from "../../data/properties";
import Icon from "./Icon";
import PhotoImage from "./PhotoImage";

const EASE = [0.22, 1, 0.36, 1] as const;

const noopSubscribe = () => () => {};
/** False during SSR and hydration, true afterwards — gates the portal. */
const useMounted = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

function Lightbox({
  photos,
  index,
  name,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  name: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [dir, setDir] = useState(1);
  const go = useCallback(
    (step: 1 | -1) => {
      setDir(step);
      onIndex((index + step + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal
      aria-label={`${name} photos`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#050d1c]/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
        <p className="text-sm">
          <span className="font-serif text-lg">{name}</span>
          <span className="ml-3 text-white/50">
            {index + 1} / {photos.length}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photos"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20"
        >
          <Icon name="close" strokeWidth={2} className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20">
        <div className="relative aspect-[4/3] w-full max-w-6xl overflow-hidden rounded-3xl sm:aspect-[16/10] [max-height:72vh]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={index}
              custom={dir}
              className="absolute inset-0 cursor-grab overflow-hidden active:cursor-grabbing"
              variants={{
                enter: (d: number) => ({ x: `${d * 18}%`, opacity: 0, scale: 1.04 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({ x: `${d * -18}%`, opacity: 0, scale: 0.97 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <PhotoImage
                photo={photos[index]}
                alt={`${name} — photo ${index + 1}`}
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="pointer-events-none select-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {(["prev", "next"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d === "next" ? 1 : -1)}
            aria-label={d === "next" ? "Next photo" : "Previous photo"}
            className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#0a1f3d] sm:grid ${
              d === "next" ? "right-5" : "left-5"
            }`}
          >
            <Icon
              name="chevron"
              strokeWidth={2}
              className={`h-5 w-5 ${d === "prev" ? "rotate-180" : ""}`}
            />
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto px-5 py-5">
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDir(i > index ? 1 : -1);
              onIndex(i);
            }}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl transition-all duration-500 sm:h-16 sm:w-24 ${
              i === index
                ? "opacity-100 ring-2 ring-white ring-offset-2 ring-offset-[#050d1c]"
                : "opacity-45 hover:opacity-80"
            }`}
          >
            <PhotoImage photo={photo} alt="" sizes="96px" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function Gallery({
  photos,
  name,
  ready,
}: {
  photos: Photo[];
  name: string;
  ready: boolean;
}) {
  const mounted = useMounted();
  const [open, setOpen] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const tiles = photos.slice(0, 5);

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (el) setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      {/* Desktop mosaic */}
      <div className="relative hidden h-[min(62vh,540px)] grid-cols-4 grid-rows-2 gap-3 md:grid">
        {tiles.map((photo, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
            className={`group relative overflow-hidden rounded-[26px] bg-[#e7e3dc] ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{
              clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
            }}
            transition={{
              duration: 1.2,
              ease: EASE,
              delay: ready ? 0.1 + i * 0.09 : 0,
            }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.25 }}
              animate={{ scale: ready ? 1 : 1.25 }}
              transition={{
                duration: 1.8,
                ease: EASE,
                delay: ready ? 0.1 + i * 0.09 : 0,
              }}
            >
              <PhotoImage
                photo={photo}
                alt={`${name} — photo ${i + 1}`}
                sizes={i === 0 ? "(min-width: 1280px) 640px, 50vw" : "320px"}
                preload={i === 0}
                className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
            </motion.div>
            <span className="absolute inset-0 bg-[#06142b]/0 transition-colors duration-500 group-hover:bg-[#06142b]/15" />
          </motion.button>
        ))}

        <motion.button
          type="button"
          onClick={() => setOpen(0)}
          className="absolute bottom-5 right-5 inline-flex h-11 items-center gap-2 rounded-full bg-white/90 px-5 text-sm font-medium text-[#0a1f3d] shadow-[0_12px_30px_-12px_rgba(6,20,43,0.6)] backdrop-blur-md transition-colors hover:bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: EASE, delay: ready ? 0.9 : 0 }}
          whileTap={{ scale: 0.96 }}
        >
          <Icon name="grid" className="h-4 w-4" />
          View all {photos.length} photos
        </motion.button>
      </div>

      {/* Mobile carousel */}
      <motion.div
        className="relative md:hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="flex aspect-[4/3.2] snap-x snap-mandatory overflow-x-auto rounded-[26px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
              className="relative h-full w-full shrink-0 snap-center overflow-hidden"
            >
              <PhotoImage
                photo={photo}
                alt={`${name} — photo ${i + 1}`}
                sizes="100vw"
                preload={i === 0}
              />
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-[#06142b]/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {slide + 1} / {photos.length}
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full bg-white transition-all duration-500 ${
                i === slide ? "w-5" : "w-1.5 opacity-60"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open !== null && (
              <Lightbox
                photos={photos}
                index={open}
                name={name}
                onIndex={setOpen}
                onClose={() => setOpen(null)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
