"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { INTRO_DONE_EVENT } from "./intro";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
];

// Scroll distance (px) before direction changes register, and the zone near
// the top of the page where the capsule always stays open.
const SCROLL_THRESHOLD = 8;
const TOP_ZONE = 80;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Size of the collapsed circle: 48px logo + 6px padding each side + 1px border.
const COLLAPSED_SIZE = 62;

const reveal = (expanded: boolean, delay: number, offset = 16) => ({
  opacity: expanded ? 1 : 0,
  transform: expanded ? "translateX(0)" : `translateX(-${offset}px)`,
  transitionDelay: expanded ? `${delay}ms` : "0ms",
});

export default function Navbar() {
  // Starts collapsed so the capsule plays its left-to-right intro once the
  // splash intro has finished (or immediately if it was already seen).
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navWidth, setNavWidth] = useState(0);
  const [hover, setHover] = useState<{ left: number; width: number } | null>(
    null,
  );

  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  // Track the full available width so the inner row keeps its layout while
  // the capsule animates (it gets clipped, not squeezed).
  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setNavWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Collapse on scroll down, expand on scroll up.
  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    let intro = 0;
    const playIntro = () => {
      intro = requestAnimationFrame(() => setExpanded(true));
    };
    if ("introSeen" in document.documentElement.dataset) playIntro();
    else window.addEventListener(INTRO_DONE_EVENT, playIntro, { once: true });

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < TOP_ZONE) {
        setExpanded(true);
        lastY.current = y;
        return;
      }
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      if (delta > 0) {
        setExpanded(false);
        setMenuOpen(false);
      } else {
        setExpanded(true);
      }
      lastY.current = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(intro);
      window.removeEventListener(INTRO_DONE_EVENT, playIntro);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (!expanded) {
      e.preventDefault();
      lastY.current = window.scrollY;
      setExpanded(true);
    }
  };

  const showHover = (e: React.MouseEvent<HTMLElement>) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setHover({ left: offsetLeft, width: offsetWidth });
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-8">
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="relative mx-auto w-full max-w-7xl"
      >
        {/* Capsule — grows from the logo circle (left) to full width */}
        <div
          className={`pointer-events-auto overflow-hidden rounded-full border border-white/60 bg-white/75 backdrop-blur-xl motion-reduce:transition-none ${
            expanded
              ? "shadow-[0_10px_40px_-12px_rgba(13,71,161,0.35),0_2px_6px_-2px_rgba(0,0,0,0.08)]"
              : "shadow-[0_8px_30px_-6px_rgba(13,71,161,0.45),0_2px_6px_-2px_rgba(0,0,0,0.1)]"
          }`}
          style={{
            width: expanded ? "100%" : COLLAPSED_SIZE,
            transition: `width 750ms ${EASE}, box-shadow 500ms`,
          }}
        >
          <div
            className="flex items-center justify-between p-1.5"
            style={{ width: navWidth ? navWidth - 2 : "100%" }}
          >
            {/* Left: logo + wordmark */}
            <div className="flex items-center">
              {/* Logo — always visible; acts as the expand trigger when collapsed */}
              <Link
                href="/#home"
                onClick={handleLogoClick}
                aria-label={expanded ? "RHC home" : "Expand navigation"}
                aria-expanded={expanded}
                className="group relative grid h-12 w-12 shrink-0 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#0b6fb8] focus-visible:ring-offset-2"
              >
                {/* Rotating gradient halo shown while collapsed */}
                <span
                  aria-hidden
                  className={`absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,#0b6fb8,#7cc4ff,#1f4e8c,#0b6fb8)] transition-opacity duration-500 motion-safe:animate-[nav-spin_6s_linear_infinite] ${
                    expanded ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src="/rhc_logo.jpeg"
                    alt="RHC logo"
                    width={96}
                    height={96}
                    loading="eager"
                    fetchPriority="high"
                    className="h-11 w-11 object-contain"
                  />
                </span>
              </Link>

              <span
                className="ml-3 text-[15px] font-semibold tracking-[0.2em] text-[#0d3b73] transition-all duration-500"
                style={reveal(expanded, 120, 12)}
              >
                RHC
              </span>
            </div>

            {/* Center: desktop links */}
            <ul
              className="relative hidden items-center md:flex"
              onMouseLeave={() => setHover(null)}
              aria-hidden={!expanded}
              inert={!expanded}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 rounded-full bg-[#0b6fb8]/10 transition-all duration-300 ease-out"
                style={{
                  left: hover?.left ?? 0,
                  width: hover?.width ?? 0,
                  opacity: hover ? 1 : 0,
                }}
              />
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  className="relative transition-all duration-500"
                  style={reveal(expanded, 200 + i * 60)}
                  onMouseEnter={showHover}
                >
                  <Link
                    href={link.href}
                    className="block rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#0d3b73] focus-visible:text-[#0d3b73] focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: CTA (desktop) / menu toggle (mobile) */}
            <div
              className="flex items-center transition-all duration-500"
              style={reveal(expanded, 200 + NAV_LINKS.length * 60)}
              aria-hidden={!expanded}
              inert={!expanded}
            >
              <Link
                href="/contact"
                className="hidden rounded-full bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(11,111,184,0.7)] transition-all duration-300 hover:shadow-[0_8px_26px_-6px_rgba(11,111,184,0.9)] hover:brightness-110 md:inline-block"
              >
                Get in touch
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="grid h-12 w-12 place-items-center rounded-full text-[#0d3b73] transition-colors hover:bg-[#0b6fb8]/10 md:hidden"
              >
                <span className="relative block h-3.5 w-5">
                  <span
                    className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                      menuOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-opacity duration-300 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                      menuOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav"
          className={`absolute right-0 top-full mt-3 w-60 origin-top-right rounded-3xl border border-white/60 bg-white/85 p-2 shadow-[0_20px_50px_-15px_rgba(13,71,161,0.4)] backdrop-blur-xl transition-all duration-300 md:hidden ${
            menuOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
          inert={!menuOpen}
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-[#0b6fb8]/10 hover:text-[#0d3b73]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 block rounded-2xl bg-gradient-to-r from-[#0b6fb8] to-[#1f4e8c] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}
