import { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function ShowreelSection({
  title = "SHOWREEL",
  subtitle = "Selected cuts from recent work",
  videoSrc,
  poster,
  className = "",
}) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [22, -18]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -10]);
  const headingSkew = useTransform(scrollYProgress, [0, 1], [0, -2]);

  const letters = useMemo(() => title.toUpperCase().split(""), [title]);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden bg-slate-950 ${className}`}>
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 py-16 sm:py-20">
        {/* animated heading */}
        <motion.h2
          style={{ y: headingY, skewY: headingSkew }}
          className="flex justify-center gap-1 sm:gap-2 text-white font-black tracking-[0.18em] text-3xl sm:text-5xl lg:text-6xl"
          aria-label={title}
        >
          {letters.map((ch, i) => (
            <motion.span
              key={i + ch}
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.h2>

        {/* subtitle */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.05 * letters.length + 0.1 }}
          className="mt-3 text-center text-sm text-slate-400 sm:text-base"
        >
          {subtitle}
        </motion.p>

        {/* video container */}
        <motion.div
          style={{ y: parallaxY }}
          initial={{ y: 72, opacity: 0, scale: 0.94, clipPath: "inset(100% 0% 0% 0% round 22px)" }}
          animate={
            inView
              ? { y: 0, opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 22px)" }
              : {}
          }
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 18,
            mass: 0.9,
            delay: 0.05 * letters.length + 0.2,
          }}
          className="relative mx-auto mt-8 sm:mt-10 aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-black shadow-2xl ring-1 ring-white/10"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent" />
          {videoSrc ? (
            <video
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-400">
              Add a videoSrc prop to ShowreelSection
            </div>
          )}
          {/* badge */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.05 * letters.length + 0.7 }}
            className="absolute left-3 top-3 sm:left-4 sm:top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-900 shadow"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sky-500" />
            SHOWREEL
          </motion.div>
        </motion.div>

        {/* buttons */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.05 * letters.length + 0.8 }}
          className="mx-auto mt-6 sm:mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="#"
            className="rounded-full bg-white px-6 py-3 text-sm sm:text-base font-semibold text-slate-900 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 text-center"
          >
            Watch full reel
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-white/25 px-6 py-3 text-sm sm:text-base font-semibold text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20 text-center"
          >
            View portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export { ShowreelSection };
