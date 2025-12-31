// Contact.jsx — dark theme + yellow/blue accents + portfolio-style hero
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

/* ---------------- motion helpers ---------------- */
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

/* ---------------- small utilities for hero columns ---------------- */
function useResponsiveCardHeight() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const onR = () => setW(window.innerWidth);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  if (w >= 1280) return 200;
  if (w >= 1024) return 180;
  if (w >= 768) return 160;
  return 140;
}

function TiltImage({ src, alt, className = "", imgClassName = "", style, onHoverIn, onHoverOut }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150, mass: 0.3 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150, mass: 0.3 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    onHoverOut && onHoverOut();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => onHoverIn && onHoverIn(src)}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", ...style }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-xl backdrop-blur-sm ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
    </motion.div>
  );
}

function ScrollColumn({ images, scrollProgress, onHoverIn, onHoverOut }) {
  const visibleCount = 4;
  const GAP = 16;
  const CARD_H = useResponsiveCardHeight();
  const wrapperH = visibleCount * CARD_H + (visibleCount - 1) * GAP;
  const travel = Math.max(0, (images.length - visibleCount) * (CARD_H + GAP));
  const y = useTransform(scrollProgress, [0, 1], [0, -travel]);

  return (
    <div className="relative w-full" style={{ height: wrapperH }}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="grid gap-4 w-full max-w-[260px]">
          {images.map((it, idx) => (
            <motion.div key={idx} variants={fade}>
              <TiltImage
                src={it.src}
                alt={it.alt}
                style={{ height: CARD_H }}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-neutral-950 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>
    </div>
  );
}

/* ---------------- HERO (portfolio-style layout) ---------------- */
function ContactHero({ leftImages, rightImages }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const [bgSrc, setBgSrc] = useState(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-neutral-950 text-white">
      <AnimatePresence>
        {bgSrc && (
          <motion.img
            key={bgSrc}
            src={bgSrc}
            alt="hover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.18, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover z-0"
          />
        )}
      </AnimatePresence>

      {/* vignette + brand haze */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="pointer-events-none absolute -top-24 -left-24 z-0 h-80 w-80 rounded-full bg-amber-300/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 z-0 h-80 w-80 rounded-full bg-sky-300/15 blur-3xl" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,680px)_1fr] gap-6 md:gap-10 items-center min-h-[86vh]">
          <div className="hidden md:block pt-2">
            <ScrollColumn
              images={leftImages}
              scrollProgress={scrollYProgress}
              onHoverIn={(src) => setBgSrc(src)}
              onHoverOut={() => setBgSrc(null)}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative flex flex-col items-center text-center"
          >
            <motion.span
              variants={fade}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.22em] uppercase text-white/70"
            >
              We reply in &lt; 24h
            </motion.span>

            <motion.h1
              variants={fade}
              className="mt-3 font-extrabold leading-[0.9] tracking-tight text-[clamp(48px,10vw,110px)]"
            >
              <span className="bg-gradient-to-r from-amber-300 via-white to-sky-300 bg-clip-text text-transparent">
                Let’s talk
              </span>
            </motion.h1>

            <motion.p variants={fade} className="mt-4 max-w-xl text-white/80">
              Have a project in mind? Tell us a little about it and we’ll get back with a clear next step.
            </motion.p>

            <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center rounded-full bg-gradient-to-r from-amber-300 to-sky-300 px-6 font-semibold text-slate-900 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition"
              >
                Schedule a Call
              </a>
              <a
                href="#contact-form"
                className="inline-flex h-12 items-center rounded-full border border-white/20 bg-white/5 px-6 text-white/90 hover:border-white/40 hover:bg-white/10"
              >
                Message us
              </a>
            </motion.div>
          </motion.div>

          <div className="hidden md:block pt-2">
            <ScrollColumn
              images={rightImages}
              scrollProgress={scrollYProgress}
              onHoverIn={(src) => setBgSrc(src)}
              onHoverOut={() => setBgSrc(null)}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent z-20" />
    </section>
  );
}

/* ---------------- page ---------------- */
export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Contact form:", data);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      e.currentTarget.reset();
      alert("Thanks! We’ll reply within 24 hours.");
    }, 800);
  }

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder-white/40 outline-none " +
    "focus:border-white/40 focus:ring-2 focus:ring-amber-300/40";

  return (
    // 👇 clip any wide glow/blur so there’s no horizontal scroll
    <main className="bg-neutral-950 text-white overflow-x-clip">
      {/* HERO */}
      <ContactHero leftImages={LEFT_IMAGES} rightImages={RIGHT_IMAGES} />

      {/* CONTENT */}
      <section className="relative overflow-x-clip">
        {/* subtle brand glows */}
        <div className="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid items-start gap-12 md:grid-cols-2">
            {/* LEFT: form (ONLY these fields) */}
            <motion.form
              id="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
            >
              <span className="inline-block rounded-full bg-gradient-to-r from-amber-300 to-sky-300 px-3 py-1 text-xs font-semibold tracking-wide text-slate-900">
                GET IN TOUCH
              </span>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name</label>
                  <input type="text" name="name" placeholder="ex. Yash Jain" autoComplete="name" required className={inputCls} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ex. yash@domain.com"
                    autoComplete="email"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Website url</label>
                  <input type="url" name="website" placeholder="ex. upstartic.com" className={inputCls} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">How can we help</label>
                  <select name="service" defaultValue="" required className={inputCls + " bg-black/40"}>
                    <option value="" disabled>
                      Select…
                    </option>
                    <option>UI/UX Design</option>
                    <option>Website Development</option>
                    <option>Branding</option>
                    <option>Social Media</option>
                    <option>Advertising</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="We would love to work with you on…"
                  required
                  className={inputCls + " resize-y"}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-gradient-to-r from-amber-300 to-sky-300 py-3 font-semibold text-slate-900 shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Get in Touch"}
              </button>
            </motion.form>

            {/* RIGHT: copy + contact details + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="px-1"
            >
              <h2 className="leading-tight text-[clamp(34px,6vw,64px)] font-black">
                Have a{" "}
                <span className="bg-gradient-to-r from-amber-300 to-sky-300 bg-clip-text text-transparent">
                  project
                </span>{" "}
                in mind?
              </h2>

              <div className="mt-6 space-y-4 text-[15px] text-white/85">
                <p>Send a message.</p>

                <div className="space-y-1 font-medium">
                  <a href="mailto:hello@mayamedia.com" className="underline decoration-white/30">
                    hello@mayamedia.com
                  </a>
                  <div>
                    <a href="tel:+919876543210" className="underline decoration-white/30">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <p className="text-white/60">
                  Alternatively, you can schedule a call with us by clicking the button below. The more details we
                  have about your project, the better we can plan!
                </p>

                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-sky-300 px-5 py-3 font-semibold text-slate-900 shadow-md hover:shadow-lg"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 2v2m10-2v2M4 7h16M5 6h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Zm4 6h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Click here to schedule a call
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- demo images for hero columns ---------------- */
const LEFT_IMAGES = [
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe7ce1fe8d45c86e80aa_Orange_gradient.webp", alt: "orange gradient" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf1dba22945ac811c0c1a_1753015059832-2.webp", alt: "neon blue portrait" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe71216fcb9d157da3b9_Future.webp", alt: "futuristic car" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf409ab424fc85061beec_1753014837852-2.webp", alt: "backpack" },
];
const RIGHT_IMAGES = [
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf607456506919fc45012_1753014920558-2.webp", alt: "red portrait" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe715508bb1c6f3ae025_Sport.webp", alt: "green shoes" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe024772311d32f3c4fe_Work1us.webp", alt: "light portrait" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf7105b273fec7fd698b5_1753015140492.webp", alt: "sunset silhouette" },
];
