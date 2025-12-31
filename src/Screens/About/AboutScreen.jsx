// src/Sections/About.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const fadeUp = (y = 16, d = 0.5) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: d, ease: "easeOut" } },
});

function Section({ children, className = "" }) {
  return (
    <section className={`relative overflow-visible ${className}`}>
      {/* subtle vertical grid lines */}
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
      {/* gradient/soft border ring */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.25)]" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          {subtitle && <p className="mt-2 max-w-[60ch] text-slate-300">{subtitle}</p>}
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/15 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {open ? "HIDE" : "LEARN"}
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
            <motion.svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="currentColor"
              aria-hidden
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
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

export default function About() {
  return (
    <Section className="bg-[#0b0b0c]">
      <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
        {/* Left sticky headline */}
        <div className="md:sticky md:top-24 self-start">
          <motion.div
            variants={fadeUp()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-5"
          >
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              We’re a Speed‑First
              <br />
              Creative Post Team
            </h2>
            <p className="max-w-[60ch] text-slate-300">
              From ads and explainers to podcasts and full corporate reels, our in‑house editors
              deliver reliable quality at scale. Collaborative by default, deadline‑obsessed by design.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow-md ring-1 ring-white/10 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300/40"
              >
                Schedule a Call
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 text-white px-5 py-3 text-sm font-semibold shadow-sm ring-1 ring-white/15 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-cyan-300/30"
              >
                See Our Work
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: stacked outline cards */}
        <motion.div
          variants={fadeUp(20)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col gap-8"
        >
          <OutlineCard
            title="Who We Are"
            subtitle="A tight core of producers, motion designers, and editors operating like an in‑house team."
            defaultOpen
          >
            <ul className="grid grid-cols-1 gap-2 pl-1 text-sm md:text-base">
              <li>25+ in‑house editors and animators</li>
              <li>Global talent bench for spikes in volume</li>
              <li>Dedicated PM as your single point of contact</li>
            </ul>
          </OutlineCard>

          <OutlineCard
            title="What We Do"
            subtitle="Edit, animate, grade, mix, localise, deliver—fast."
          >
            <div className="grid grid-cols-2 gap-y-2 text-sm md:text-base">
              <div>• Ads & Social Reels</div>
              <div>• Corporate/Brand Films</div>
              <div>• Podcasts (Audio/Video)</div>
              <div>• Explainers & Motion GFX</div>
              <div>• Event Aftermovies</div>
              <div>• Multi‑language Localisation</div>
            </div>
          </OutlineCard>

          <OutlineCard
            title="How We Work"
            subtitle="Clear inputs in, predictable outputs out. Built for daily handoffs."
          >
            <ul className="grid grid-cols-1 gap-2 pl-1 text-sm md:text-base">
              <li>Async boards + weekly reviews</li>
              <li>Timezone‑aligned turnarounds</li>
              <li>Rush lane for urgent briefs</li>
            </ul>
          </OutlineCard>

          <OutlineCard
            title="Capabilities & Tooling"
            subtitle="We slot into your stack and ship in your spec."
          >
            <ul className="grid grid-cols-1 gap-2 pl-1 text-sm md:text-base">
              <li>Adobe CC, Resolve, Blender, Figma</li>
              <li>Frame.io, Notion, Slack, G‑Drive</li>
              <li>Color‑managed, loudness‑normalised masters</li>
            </ul>
          </OutlineCard>

          <OutlineCard
            title="Proof in Numbers"
            subtitle="A quick snapshot of our throughput and reliability."
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/15 p-5 text-center">
                <div className="text-3xl font-extrabold text-white">10k+</div>
                <div className="mt-1 text-slate-300 text-sm">Videos Delivered</div>
              </div>
              <div className="rounded-2xl border border-white/15 p-5 text-center">
                <div className="text-3xl font-extrabold text-white">350+</div>
                <div className="mt-1 text-slate-300 text-sm">Happy Clients</div>
              </div>
              <div className="rounded-2xl border border-white/15 p-5 text-center">
                <div className="text-3xl font-extrabold text-white">24 hr</div>
                <div className="mt-1 text-slate-300 text-sm">Rush Turnarounds</div>
              </div>
              <div className="rounded-2xl border border-white/15 p-5 text-center">
                <div className="text-3xl font-extrabold text-white">100+</div>
                <div className="mt-1 text-slate-300 text-sm">Repeat Partners</div>
              </div>
            </div>
          </OutlineCard>
        </motion.div>
      </div>
    </Section>
  );
}
