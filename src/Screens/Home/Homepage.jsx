// src/Screens/Home/Homepage.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portfolio from "./Portfolio";
import Features from "./Features";
import AboutScreen from "../About/AboutScreen";
import Check from "./check";
import FAQ from "./Faq";
import Contact from "../Contact/Contact";
import { ShowreelSection as Showreel } from "./Showreel";

// Local assets
import annieSpratt from "../../assets/annie-spratt-MChSQHxGZrQ-unsplash.jpg";
import unplash2 from "../../assets/unplash2.jpg";

/* ---------- Animation helpers ---------- */
const container = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
const fadeUp = (y = 24, d = 0.6) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: d, ease: "easeOut" } },
});

/* ---------- Reduced motion hook ---------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/* ---------- Video modal ---------- */
function VideoModal({ open, onClose, src }) {
  const escRef = useRef(onClose);

  useEffect(() => {
    escRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && escRef.current?.();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[min(92vw,1000px)] overflow-hidden rounded-2xl bg-black"
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={
                  src ||
                  "https://player.vimeo.com/video/76979871?h=8272103f6e&title=0&byline=0&portrait=0"
                }
                title="Showreel"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Background: striped collage + glow ---------- */
function StripedBackdrop() {
  const panels = [
    annieSpratt,
    unplash2,
    "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {/* Responsive grid that adapts to number of panels */}
      <div className="grid h-full w-full [grid-template-columns:repeat(auto-fit,minmax(0,1fr))]">
        {panels.map((src, i) => (
          <div key={i} className="relative">
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover brightness-[.55] contrast-[.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
          </div>
        ))}
      </div>

      {/* Subtle warm glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,199,120,0.32),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-black/35" />
    </div>
  );
}

/* ---------- CTA Button ---------- */
function ScheduleCallButton({
  label = "Schedule a call",
  href = "https://calendly.com/",
  className = "",
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm sm:text-base font-semibold text-slate-900 bg-gradient-to-r from-amber-300 via-yellow-300 to-sky-300 shadow-lg hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 transition ${className}`}
    >
      {label}
    </a>
  );
}

/* ---------- Hero Section ---------- */
function Hero() {
  const reduce = usePrefersReducedMotion();

  return (
    <section id="home" className="relative isolate min-h-[92svh] overflow-hidden">
      <StripedBackdrop />

      <div className="relative mx-auto flex min-h-[92svh] max-w-[1280px] flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center text-white">
        <motion.div
          variants={reduce ? undefined : container(0.08, 0.1)}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
          className="w-full"
        >
          <motion.h1
            variants={reduce ? undefined : fadeUp(18, 0.7)}
            className="mx-auto max-w-[22ch] text-[clamp(1.8rem,5vw,4.25rem)] font-extrabold leading-[1.08]"
          >
            The Creative Edge Your
            <br className="hidden sm:block" />
            Brand Deserves
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp(18, 0.6)}
            className="mx-auto mt-3 sm:mt-4 max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.15rem)] text-white/85"
          >
            We Cut, Design, Build and Advertise so your brand does not just show up, it stands out.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp(14, 0.6)}
            className="mt-6 sm:mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center"
          >
            <ScheduleCallButton className="w-full sm:w-auto min-h-[44px]" />
            <a
              href="/service"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 min-h-[44px]"
            >
              View work
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}

/* ---------- Main Export ---------- */
export default function Homepage() {
  return (
    <>
      <Hero />
      <Showreel className="scroll-mt-24" />
      <Portfolio />
      <Features />
      <AboutScreen />
      <Check />
      <FAQ />
      <Contact />
    </>
  );
}
