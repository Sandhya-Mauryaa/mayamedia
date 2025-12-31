// src/Screens/Results/result.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Motion presets ---------------- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ------------- Import screenshots -------------
   NOTE: In your project, keep these in /src/assets/results/
   and update the paths if needed. Filenames with spaces work fine.
*/

import SS16 from "../../assets/Screenshot (16).png";  // BPPW KIDS lifetime
import SS164 from "../../assets/Screenshot (164).png"; // BTPW lifetime content
import SS312 from "../../assets/Screenshot (312).png"; // BTECH PAANI PURI WALI custom range

/* ---------------- Data model ---------------- */
const RESULTS = [



  {
    id: "bppw-kids-lt",
    channel: "BPPW KIDS",
    period: "Lifetime",
    kpis: [
      { label: "Views", value: "49.0K" },
      { label: "Watch time", value: "211.2 h" },
      { label: "Subscribers", value: "+605" },
      { label: "Realtime subs", value: "614" },
    ],
    proof: SS16,
  },
  {
    id: "btpw-compare",
    channel: "BTPW",
    period: "Lifetime content compare",
    kpis: [
      { label: "Chart", value: "Yearly subscribers" },
      { label: "Type", value: "Line chart" },
    ],
    proof: SS164,
  },
  {
    id: "btech-ppw-custom",
    channel: "BTECH PAANI PURI WALI",
    period: "Dec 5 2023 to Jan 16 2024",
    kpis: [
      { label: "Views", value: "44.3M" },
      { label: "Watch time", value: "327.6K h" },
      { label: "Subscribers", value: "+107.1K" },
      { label: "Revenue", value: "₹27,908.54" },
    ],
    proof: SS312,
  },
];

/* ---------------- Small UI parts ---------------- */
function Chip({ children, className = "" }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] tracking-wide text-white/80 " +
        className
      }
    >
      {children}
    </span>
  );
}

function KPI({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] uppercase tracking-widest text-white/55">{label}</span>
      <span className="mt-0.5 text-base md:text-lg font-semibold">{value}</span>
    </div>
  );
}

/* ---------------- Lightbox ---------------- */
function Lightbox({ src, alt, onClose }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={src}
            alt={alt}
            className="max-h-[90vh] w-auto max-w-[95vw] rounded-xl shadow-2xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={onClose}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90 hover:bg-white/20"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Card ---------------- */
function ResultCard({ item, onView }) {
  return (
    <motion.div
      variants={fadeUp}
      className={
        "group relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-xl backdrop-blur " +
        (item.highlight ? "ring-1 ring-amber-300/30" : "")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base md:text-lg font-bold tracking-tight">{item.channel}</h3>
          <div className="mt-1.5 flex flex-wrap gap-2">
            <Chip>{item.period}</Chip>
            {item.highlight && <Chip className="bg-gradient-to-r from-amber-300 to-sky-300 text-slate-900">Highlight</Chip>}
          </div>
        </div>
        <button
          onClick={() => onView(item.proof)}
          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 hover:bg-white/15"
        >
          View proof
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {item.kpis.map((k) => (
          <KPI key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
        <img
          src={item.proof}
          alt={`${item.channel} - ${item.period}`}
          className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center leading-none font-extrabold tracking-tight text-[clamp(44px,8vw,84px)]"
        >
          <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Results
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-center text-white/75"
        >
          Real channel analytics. Clean presentation. Proof attached for each card.
        </motion.p>
        <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
export default function Results() {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <main className="bg-neutral-950 text-white">
      <Hero />

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {RESULTS.map((item) => (
              <ResultCard key={item.id} item={item} onView={(src) => setLightboxSrc(src)} />
            ))}
          </motion.div>

          <div className="mt-10 flex items-center justify-center">
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-sky-300 px-6 font-semibold text-slate-900 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition"
            >
              Schedule a call
            </a>
          </div>
        </div>
      </section>

      <Lightbox src={lightboxSrc} alt="Proof" onClose={() => setLightboxSrc(null)} />
    </main>
  );
}
