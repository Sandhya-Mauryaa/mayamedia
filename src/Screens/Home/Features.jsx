// src/Sections/GroProCardsSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GroPro-like cards with glassmorphism, rounded outline, and accordion details
 * Requirement:
 *  - Left headline stays STICKY (always visible while scrolling)
 *  - Right-side cards scroll upward independently
 *  - Button arrow flips ↓ to ↑ when opened
 */

const fadeUp = (y = 16, d = 0.5) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: d, ease: "easeOut" } },
});

function Section({ children, className = "" }) {
  return (
    
      <section className={`relative overflow-visible ${className}`}>
      {/* subtle vertical grid lines like screenshot */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 120px)",
        }}
      />
      {/* cyan corner glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px] px-5 py-20 md:py-28 min-h-screen">{children}</div>
    </section>
  );
}

function OutlineCard({ title, subtitle, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      variants={fadeUp()}
      className="relative rounded-[28px] bg-white/[0.03] p-6 text-white backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
    >
      {/* gradient border ring */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.25)]" />
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      {subtitle && <p className="mt-2 max-w-[48ch] text-slate-300">{subtitle}</p>}

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="group inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/15 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {open ? "HIDE DETAILS" : "LEARN MORE"}
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
            <motion.svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="currentColor"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* chevron-down path (rotated when open) */}
              <path d="M12 16a1 1 0 0 1-.7-.29l-5-5a1 1 0 0 1 1.4-1.42L12 13.6l4.3-4.31a1 1 0 0 1 1.4 1.42l-5 5A1 1 0 0 1 12 16Z" />
            </motion.svg>
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 text-slate-300">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function GroProCardsSection() {
  return (
    <Section className="bg-[#0b0b0c]">
      <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
        {/* Left headline — STICKY */}
        <div className="md:sticky md:top-24 self-start">
          <motion.h2
            variants={fadeUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-4xl font-semibold leading-tight text-white md:text-5xl"
          >
            Need Quality at Scale? We
            <br /> Deliver Every Time!
          </motion.h2>
        </div>

        {/* Right stacked glass cards — scroll independently */}
        <motion.div
          variants={fadeUp(20)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col gap-8"
        >
          <OutlineCard
            title="Videos edited in 24 hours"
            subtitle="Keep your projects moving forward and reliably hit deadlines."
          >
            <ul className="grid grid-cols-1 gap-2 pl-1 text-sm md:text-base">
              <li>Same/next-day delivery window</li>
              <li>Timezone-aligned handoffs</li>
              <li>Rush lane for urgent briefs</li>
            </ul>
          </OutlineCard>

          <OutlineCard
            title="Real-Time Collaboration"
            subtitle="Never get left on read. Your project manager responds within an hour (US Central Time)."
            defaultOpen
          >
            <div className="grid grid-cols-2 gap-y-2 text-sm md:text-base">
              <div>• 24/7 chat support</div>
              <div>• Weekly review calls</div>
              <div>• Dedicated project managers</div>
              <div>• Daily progress reports</div>
            </div>
          </OutlineCard>

          <OutlineCard
            title="Project Dashboard"
            subtitle="See everything in one place — web access, mobile app, and live updates."
          >
            <ul className="grid grid-cols-1 gap-2 pl-1 text-sm md:text-base">
              <li>Centralised dashboard</li>
              <li>Live progress notifications</li>
              <li>Role-based permissions</li>
            </ul>
          </OutlineCard>

          <OutlineCard
            title="Project Animation"
            subtitle="See everything in one place — web access, mobile app, and live updates."
          >
            <ul className="grid grid-cols-1 gap-2 pl-1 text-sm md:text-base">
              <li>Centralised dashboard</li>
              <li>Live progress notifications</li>
              <li>Role-based permissions</li>
            </ul>
          </OutlineCard>
        </motion.div>
      </div>
    </Section>
  );
}
