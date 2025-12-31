// WarpLandingTailwind.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  ──────────────────────────────────────────────────────────────────
  Warp-style Landing • React + TailwindCSS (single-file component)
  ------------------------------------------------------------------
  How to use:
  1) Tailwind setup (Vite example):
     - npm i -D tailwindcss postcss autoprefixer
     - npx tailwindcss init -p
     - tailwind.config.js → content: ["./index.html", "./src/*.{js,ts,jsx,tsx}"]
     - src/index.css → @tailwind base; @tailwind components; @tailwind utilities;
  2) Animations: npm i framer-motion
  3) Drop this file into src/WarpLandingTailwind.jsx and import in App.jsx.
  4) This file injects a <style> tag for keyframes/utilities so you don’t
     need to extend tailwind.config for marquee/tilt.
*/

/* ── Micro animation presets ───────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

/* ── Data ──────────────────────────────────────────────────────── */
const BRANDS = [
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b42477_DuneLight.svg",
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b42479_InvertLight.svg",
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b42475_PentaLight.svg",
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b4247a_TerraLight.svg",
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b42474_Iceberglight.svg",
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b42476_PinpointLight.svg",
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b42478_HitechLight.svg",
  "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/68711b2b9332a934a2b42473_ProLineLight.svg",
];

/* Existing "Video Editing" works (kept as-is) */
const WORKS = [
  {
    title: "Sport",
    href: "/works/sport",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cef9ab58621cec61e46a6_1753016094200.webp",
  },
  {
    title: "Modern",
    href: "/works/modern",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cefb89916140832b515d6_1753015059832.webp",
  },
  {
    title: "Future",
    href: "/works/future",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cefd27e1ac20916bb23e6_1753016086303.webp",
  },
];

/* NEW: Website Development works */
const WEBDEV_WORKS = [
  {
    title: "Dashboard",
    href: "/works/web/saas-dashboard",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cefb89916140832b515d6_1753015059832.webp",
  },
  {
    title: "UX",
    href: "/works/web/ecommerce-ux",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cef9ab58621cec61e46a6_1753016094200.webp",
  },
  {
    title: "Portfolio",
    href: "/works/web/portfolio",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cefd27e1ac20916bb23e6_1753016086303.webp",
  },
];

/* NEW: Meta Ads works */
const METAADS_WORKS = [
  {
    title: "LeadGen",
    href: "/works/ads/real-estate",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cefd27e1ac20916bb23e6_1753016086303.webp",
  },
  {
    title: "Awareness",
    href: "/works/ads/d2c-awareness",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cef9ab58621cec61e46a6_1753016094200.webp",
  },
  {
    title: "Conversions",
    href: "/works/ads/local-conv",
    img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42362/687cefb89916140832b515d6_1753015059832.webp",
  },
];

const SERVICES = [
  {
    title: "Research",
    desc: "We create user-focused designs that bring your brand’s vision to life.",
    href: "/services/design",
  },
  {
    title: "Content",
    desc: "Our marketing solutions drive growth and elevate your brand's presence.",
    href: "/services/marketing",
  },
  {
    title: "Design",
    desc: "We develop innovative ideas that form the foundation of standout projects.",
    href: "/services/concept",
  },
  {
    title: "Development",
    desc: "Our branding expertise transforms concepts into memorable identities.",
    href: "/services/branding",
  },
    {
    title: "Growth",
    desc: "Our branding expertise transforms concepts into memorable identities.",
    href: "/services/branding",
  },
];

/* ── Utilities ─────────────────────────────────────────────────── */
const GLOBAL_STYLES = `
:root{
  --bg:#0b0b0c; --text:#e5e7eb; --muted:#9aa0a6;
  --card:hsla(0,0%,100%,.045); --border:hsla(0,0%,100%,.12);
  --ring:#facc15; --ring2:#22d3ee;
}
html,body,#root{background:var(--bg)}

@keyframes marqueeX { to { transform: translateX(-50%); } }
@keyframes floaty   { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-6px) } }
@media (prefers-reduced-motion:reduce){
  .reduce-motion *{ animation: none !important; transition: none !important; }
}

/***** Glass helpers *****/
.glass { background: color-mix(in srgb, var(--bg) 78%, transparent); backdrop-filter: blur(10px) saturate(120%); }
.glass-border{ border:1px solid var(--border) }

/***** Gradient text *****/
.grad-text{ background:linear-gradient(180deg,#fff,#d1d5db 55%, #ffffff30); -webkit-background-clip:text; background-clip:text; color:transparent; }

/***** Card hover ring *****/
.card-hover:hover{ box-shadow:0 10px 40px rgba(250,204,21,.08); }
`;

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* ── Sections ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(250,204,21,.12),transparent_60%)]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-12 pt-16 sm:px-6 md:grid-cols-2 lg:pt-24">
        {/* Left imagery stack */}
        <div className="grid grid-cols-2 gap-4">
          {[
            "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe7ce1fe8d45c86e80aa_Orange_gradient.webp",
            "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf1dba22945ac811c0c1a_1753015059832-2.webp",
            "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe71216fcb9d157da3b9_Future.webp",
            "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe038d6eb8bbcf7a5074_Concret.webp",
          ].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,.25)]"
            >
              <img
                src={src}
                alt="hero tile"
                className="h-full w-full object-cover"
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20" />
            </motion.div>
          ))}
        </div>

        {/* Right content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            className="grad-text text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          >
            MAYA<span className="block">MEDIA</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-slate-300">
            From concept to creation — beautiful design has the power to captivate audiences.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-7 flex gap-3">
            <a
              href="#works"
              className="rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-sky-300 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_10px_30px_rgba(34,211,238,0.25)] hover:shadow-[0_12px_40px_rgba(34,211,238,0.35)]"
            >
              View Works
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-white/90 hover:bg-white/10"
            >
              Our Services
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WorkCard({ item }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5"
      aria-label={`View work ${item.title}`}
    >
      <motion.div
        initial={{ rotateX: 0, rotateY: 0, scale: 1 }}
        animate={{ rotateX: hover ? 6 : 0, rotateY: hover ? -6 : 0, scale: hover ? 0.98 : 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
        className="relative aspect-[16/10] w-full overflow-hidden"
      >
        <img src={item.img} alt={item.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <div className="overflow-hidden">
          <div className="flex w-[200%] -translate-x-1/3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <h2 key={i} className="text-3xl font-extrabold tracking-tight text-white/95">
                {item.title}
              </h2>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-4 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs text-white transition group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:to-sky-300 group-hover:text-black">
        View Work
      </div>
    </a>
  );
}

/* Existing Video Editing section (kept) */
function Works() {
  return (
    <section id="works" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-6 sm:py-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-5xl font-bold tracking-tight">
              Video Editing
            </motion.span>
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WORKS.map((w) => (
              <WorkCard key={w.title} item={w} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* NEW: Website Development section (same style) */
function WorksWebDev() {
  return (
    <section id="webdev" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-6 sm:py-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-5xl font-bold tracking-tight">
              Website Development
            </motion.span>
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WEBDEV_WORKS.map((w) => (
              <WorkCard key={w.title} item={w} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* NEW: Meta Ads section (same style) */
function WorksMetaAds() {
  return (
    <section id="meta-ads" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-6 sm:py-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-5xl font-bold tracking-tight">
              Meta Ads
            </motion.span>
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {METAADS_WORKS.map((w) => (
              <WorkCard key={w.title} item={w} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-6 sm:py-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-5xl font-bold tracking-tight">
              From concept to launch, we can help you at every stage!
            </motion.span>
          </motion.h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="card-hover relative rounded-2xl border border-white/12 bg-white/5 p-5 transition-transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-amber-300">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Explore</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:rotate-45"
                  >
                    <path
                      d="M7 17L17 7M17 7H9M17 7V15"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.h3 variants={fadeUp} className="text-3xl font-bold">
            Ready to build something great?
          </motion.h3>
          <motion.p variants={fadeUp} className="mx-auto mt-2 max-w-xl text-slate-300">
            Creative that performs, media that scales, systems that last.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-sky-300 px-7 py-3 font-semibold text-slate-900 shadow-[0_10px_30px_rgba(34,211,238,0.25)] transition hover:shadow-[0_12px_40px_rgba(34,211,238,0.35)]"
            >
              Let's Work Together
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BrandMarquee({ logos = BRANDS, speed = 22 }) {
  const dup = useMemo(() => logos.concat(logos), [logos]);
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-16 py-16">
          <h3 className="text-center text-sm tracking-[0.28em] text-slate-400">
            TRUSTED BY BRANDS
          </h3>
          <div className="relative overflow-hidden">
            <div
              className="flex w-[200%] animate-[marqueeX_var(--speed)_linear_infinite] gap-16 opacity-90 hover:opacity-100"
              style={{ ["--speed"]: `${speed}s` }}
            >
              {dup.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="brand"
                  className="h-10 w-auto object-contain transition-transform duration-200 hover:-translate-y-1"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function WarpLandingTailwind() {
  return (
    <main className="text-white">
      <style>{GLOBAL_STYLES}</style>
      <Hero />
      <Works />
      <WorksWebDev />
      <Services />
      <WorksMetaAds />
      <BrandMarquee />
      <CTA />
    </main>
  );
}
