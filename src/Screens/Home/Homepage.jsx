// src/Screens/Home/Homepage.jsx
import { useState, useEffect, useRef } from "react";
import { motion,} from "framer-motion";
import Portfolio from "./Portfolio";
import Features from "./Features";
import AboutScreen from "../About/AboutScreen";
import Check from "./check";
import FAQ from "./Faq";
import Contact from "../Contact/Contact";
import { ShowreelSection as Showreel } from "./Showreel";

// import img from "./../../assets/homepageimg1.jpg"
import img1 from "./../../assets/main1.jpg"
import img8 from "../../assets/milky-way-over-valley-chocholowska-with-cottage-in-2026-01-09-06-58-35-utc.jpg";
import img3 from "../../assets/mountain-alpine-autumn-misty-morning-lake-konigsse-2026-01-09-13-38-33-utc.jpg"
import img2 from "./../../assets/night-photo-of-traffic-jam-on-motorway-2026-01-08-05-28-49-utc.jpg";
import img7 from "./../../assets/marmolada-3343m-mountainside-view-of-the-highest-2026-01-07-05-40-56-utc.jpeg";
import img5 from "./../../assets/running-man-sprinting-for-success-on-run-top-view-2026-01-07-01-06-06-utc.jpg";
import img6 from "../../assets/empty-road-at-night-with-street-lights-2026-01-08-22-44-33-utc.jpg"

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


/* ---------- Background: striped collage + glow ---------- */
function StripedBackdrop() {
  const panels = [
    img1,
    img2,
    img3,
    img5,
    img6,
    img7,
    img8,
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
              className="h-full w-full object-cover brightness-[.65] contrast-[.95]"
            />

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
