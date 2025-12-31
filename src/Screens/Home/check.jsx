import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, animate } from "framer-motion";

const ITEMS = [
  { label: "Meta Ads"},
  { label: "Script Writing"},
  { label: "Sound Design"},
  { label: "Color Grading"},
  { label: "Social Media Management"},
  { label: "Video Editing" },
  { label: "Website Design" },
  { label: "Website Development" },
];

export default function MayamediaReel() {
  const LOOP = useMemo(() => [...ITEMS, ...ITEMS], []);
  const trackRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const SPEED = 90; // px/s
  const [loopWidth, setLoopWidth] = useState(1200);

  // Motion value and animation control ref
  const x = useMotionValue(0);
  const animRef = useRef(null);

  // Measure width once DOM paints
  useLayoutEffect(() => {
    if (!trackRef.current) return;
    const full = trackRef.current.scrollWidth / 2; // because duplicated
    setLoopWidth(Math.max(800, Math.floor(full)));
  }, []);

  // Helper to normalize current x into loop range
  const normalize = (val, size) => {
    const r = val % -size;
    return Number.isNaN(r) ? 0 : r;
  };

  const play = () => {
    if (prefersReduced || !loopWidth) return;
    const start = normalize(x.get(), loopWidth);
    const duration = loopWidth / SPEED;

    animRef.current?.stop?.();
    animRef.current = animate(x, [start, start - loopWidth], {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  };

  const pause = () => {
    animRef.current?.stop?.();
  };

  useEffect(() => {
    if (!prefersReduced && loopWidth) play();
    return () => animRef.current?.stop?.();
  }, [prefersReduced, loopWidth]);

  return (
    <section className="relative w-full bg-black py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" />
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="relative h-[110px] sm:h-[140px] overflow-hidden select-none"
          onMouseEnter={pause}
          onMouseLeave={play}
        >
          <motion.div
            ref={trackRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-8 will-change-transform"
            style={{ x }}
          >
            {LOOP.map((it, i) => (
              <ReelItem key={`${it.label}-${i}`} label={it.label} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReelItem({ label }) {
  return (
    <div className="inline-flex items-center gap-8">
      <span className="whitespace-nowrap text-[40px] font-bold leading-none tracking-tight text-white transition-all duration-200 hover:text-amber-400">
        {label}
      </span>
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(239,68,68,0.75)]" />
    </div>
  );
}
