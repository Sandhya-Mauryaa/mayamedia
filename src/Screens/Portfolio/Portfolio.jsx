// Portfolio.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

/* ======================= */
/*    Motion Variants      */
/* ======================= */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ======================= */
/*  Responsive Card Height */
/* ======================= */
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

/* ======================= */
/*        Icons            */
/* ======================= */
const PlayIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className || "w-5 h-5"}>
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className || "w-5 h-5"}>
    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
  </svg>
);
const VolumeOnIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className || "w-5 h-5"}>
    <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a3.5 3.5 0 0 1-2.06 3.19l.84 1.82A5.5 5.5 0 0 0 20.5 12a5.5 5.5 0 0 0-5.22-5.01l-.84 1.82A3.5 3.5 0 0 1 16.5 12z" />
  </svg>
);
const VolumeOffIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className || "w-5 h-5"}>
    <path d="M3 10v4h4l5 5V5L7 10H3z" />
    <path d="m21 8-1.5-1.5L17 9l-2.5-2.5L13 8l2.5 2.5L13 13l1.5 1.5L17 12l2.5 2.5L21 13l-2.5-2.5L21 8z" />
  </svg>
);

/* ======================= */
/*      Tilt Image Card    */
/* ======================= */
function TiltImage({ src, alt, className = "", imgClassName = "", style, onHoverIn, onHoverOut }) {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150, mass: 0.3 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150, mass: 0.3 });

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x); my.set(y);
  };

  const handleLeave = () => {
    mx.set(0); my.set(0);
    onHoverOut && onHoverOut();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
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

/* ======================= */
/*   Tilt Media (Video)    */
/* ======================= */
function TiltMedia({
  type = "image",
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
  onHoverIn,
  onHoverOut,
  videoProps = {},
  videoRefPassthrough = null,
  hideControls = false,
}) {
  const cardRef = useRef(null);
  const vidRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userActivated, setUserActivated] = useState(false);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150, mass: 0.3 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150, mass: 0.3 });

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = isMuted;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
    v.removeEventListener("pause", onPause);
    v.removeEventListener("play", onPlay);

    };
  }, [isMuted]);

  const attachVideoRef = (el) => {
    vidRef.current = el;
    if (!el) return;
    if (typeof videoRefPassthrough === "function") videoRefPassthrough(el);
    else if (videoRefPassthrough && typeof videoRefPassthrough === "object") videoRefPassthrough.current = el;
  };

  const playVideo = async () => { try { await vidRef.current?.play(); } catch {} };
  const pauseVideo = () => { try { vidRef.current?.pause(); } catch {} };

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x); my.set(y);
  };

  const handleEnter = () => {
    onHoverIn && onHoverIn(src);
    if (type === "video") {
      if (!isPlaying) playVideo();
    }
  };

  const handleLeave = () => {
    mx.set(0); my.set(0);
    onHoverOut && onHoverOut();
    if (type === "video" && !userActivated) {
      pauseVideo();
      if (vidRef.current) vidRef.current.currentTime = 0;
    }
  };

  const handleCardClick = () => {
    if (type !== "video") return;
    setUserActivated(true);
    setIsMuted(false);
    playVideo();
  };

  const togglePlay = (e) => { e.stopPropagation(); isPlaying ? pauseVideo() : playVideo(); };
  const toggleMute = (e) => { e.stopPropagation(); setIsMuted((m) => !m); setUserActivated(true); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleCardClick}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", ...style }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-xl backdrop-blur-sm ${className}`}
    >
      {type === "video" ? (
        <video
          ref={attachVideoRef}
          src={src}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          {...videoProps}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          loading="lazy"
        />
      )}

      {!hideControls && type === "video" && (
        <div className="absolute left-2 top-2 flex items-center gap-2">
          <div className="rounded-full bg-white/10 px-2 py-1 text-[10px] tracking-wider uppercase">Video</div>
          {isPlaying && (
            <div className="flex items-center gap-1 text-xs text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Playing
            </div>
          )}
        </div>
      )}

      {!hideControls && type === "video" && !isPlaying && (
        <button
          onClick={(e) => { e.stopPropagation(); setUserActivated(true); setIsMuted(false); playVideo(); }}
          className="absolute inset-0 grid place-items-center text-white/90 hover:text-white focus:outline-none"
          aria-label="Play with sound"
        >
          <div className="rounded-full bg-black/40 backdrop-blur-sm p-3">
            <PlayIcon className="w-8 h-8" />
          </div>
        </button>
      )}

      {!hideControls && type === "video" && (
        <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-between bg-black/35 backdrop-blur-sm">
          <button onClick={togglePlay} className="inline-flex items-center gap-2 text-xs text-white/90 hover:text-white">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button onClick={toggleMute} className="inline-flex items-center gap-2 text-xs text-white/90 hover:text-white">
            {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
            <span className="hidden sm:inline">{isMuted ? "Muted" : "Sound on"}</span>
          </button>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
    </motion.div>
  );
}

/* ======================= */
/*   Scroll Reveal Column  */
/* ======================= */
function ScrollColumn({ images, direction = "up", scrollProgress, onHoverIn, onHoverOut }) {
  const visibleCount = 4;
  const GAP = 16;
  const CARD_H = useResponsiveCardHeight();
  const wrapperH = visibleCount * CARD_H + (visibleCount - 1) * GAP;
  const travel = Math.max(0, (images.length - visibleCount) * (CARD_H + GAP));
  const y = useTransform(scrollProgress, [0, 1], direction === "up" ? [0, -travel] : [0, travel]);

  return (
    <div className="relative w-full" style={{ height: wrapperH }}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="grid gap-4 w-full max-w-[260px]">
          {images.map((it, idx) => (
            <motion.div key={`${direction}-${idx}`} variants={fadeUp}>
              <TiltImage src={it.src} alt={it.alt} style={{ height: CARD_H }} onHoverIn={onHoverIn} onHoverOut={onHoverOut} />
            </motion.div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-neutral-950 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>
    </div>
  );
}

/* ======================= */
/*       Hero Section      */
/* ======================= */
function HeroSection({ leftImages, rightImages }) {
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
            alt="hover background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.22, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 z-10 bg-black/40 md:bg-black/30" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,680px)_1fr] gap-6 md:gap-10 items-center min-h-[92vh]">
          <div className="hidden md:block pt-2">
            <ScrollColumn images={leftImages} direction="up" scrollProgress={scrollYProgress} onHoverIn={(src) => setBgSrc(src)} onHoverOut={() => setBgSrc(null)} />
          </div>

          <div className="relative flex flex-col items-center justify-center text-center self-center">
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="leading-none font-extrabold tracking-tight text-[clamp(64px,14vw,164px)]">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">MAYA</span>
            </motion.h1>

            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="mt-2 font-extrabold tracking-tight leading-tight text-[clamp(22px,4.5vw,50px)]">
              <span className="bg-gradient-to-r from-white via-white/85 to-white/60 bg-clip-text text-transparent">Our Handpicked Portfolio</span>
            </motion.h2>

            <div className="relative mt-3 h-px w-[clamp(72px,9vw,120px)] overflow-hidden">
              <motion.div initial={{ scaleX: 0, opacity: 0.6 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="origin-left h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.6 }} className="mt-5 max-w-2xl text-[15px] md:text-base text-white/75">
              From concept to creation, beautiful design that captivates and converts.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.5 }} className="mt-12 md:mt-16 flex flex-wrap items-center gap-3">
              <a href="https://calendly.com/" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-sky-300 px-6 text-sm md:text-base font-semibold text-slate-900 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M7 2v2m10-2v2M4 7h16M5 6h14v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm0 4h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Schedule a Call
              </a>

              <a href="/service" className="group inline-flex h-12 items-center rounded-full border border-white/20 bg-white/5 px-6 text-sm md:text-base text-white/90 hover:border-white/40 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
                <span className="inline-flex items-center gap-1">
                  Services
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>

          <div className="hidden md:block pt-2">
            <ScrollColumn images={rightImages} direction="up" scrollProgress={scrollYProgress} onHoverIn={(src) => setBgSrc(src)} onHoverOut={() => setBgSrc(null)} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent z-20" />
    </section>
  );
}

/* ======================= */
/*     Showcase Strip      */
/* ======================= */
function ShowcaseStrip({ media }) {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-widest text-white/50">Selected Frames for Editing Part for Long</h2>
        </div>

        <div className="mt-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 snap-x snap-mandatory">
            {media.map((item, i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[360px] md:min-w-[420px] snap-center shrink-0">
                <TiltMedia type={item.type} src={item.src} alt={item.alt} className="h-[200px] sm:h-[240px] md:h-[300px]" />
                {console.log(item.src)}
              </div>
            ))}


          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================= */
/*        SHORTS GRID      */
/* ======================= */
function ShortsGrid({ shorts }) {
  return (
    <section id="shorts" className="bg-neutral-950 text-white pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-widest text-white/50">Shorts</h2>
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {shorts.map((s) => (
            <motion.div key={s.id} layout variants={fadeUp} className="group">
              {/* Vertical card height for 9:16 */}
              <TiltMedia
                type="video"
                src={s.src}
                alt={s.title}
                className="h-[360px] sm:h-[420px] md:h-[560px]"
              />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{s.title}</h3>
                  {s.badge && <p className="text-xs text-white/50">{s.badge}</p>}
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/80 transition">Watch</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


const LEFT_IMAGES = [
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe7ce1fe8d45c86e80aa_Orange_gradient.webp", alt: "orange gradient portrait" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf1dba22945ac811c0c1a_1753015059832-2.webp", alt: "neon blue woman portrait" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe71216fcb9d157da3b9_Future.webp", alt: "car futuristic light" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe038d6eb8bbcf7a5074_Concret.webp", alt: "man on concrete" },
];
const RIGHT_IMAGES = [
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf607456506919fc45012_1753014920558-2.webp", alt: "man red background" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe715508bb1c6f3ae025_Sport.webp", alt: "green shoes floating" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cbe024772311d32f3c4fe_Work1us.webp", alt: "man light background" },
  { src: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687cf4442784720960d2d83e_HeroCar.webp", alt: "car neon orange" },
];



const FULL_STRIP_MEDIA = [
  {type: "video", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759218297/Nursing_video_ad_b8xf7t.mp4" },
  { type: "video", src:"https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759218571/Mr._McVicker_onboardian_1_tepnaq.mp4", alt: "Mr. McVicker (Onboardian)" },
  { type: "video", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759217857/long_video_sample_1_t6adzt.mp4", alt: "Long video sample" },
  { type: "video", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759184026/AD_VIDEO_1_1_zvhisv.mp4", alt: "Ad video" },
];



const SHORTS = [
  { id: "short-1", title: "Video1", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219415/3MbrandEdit_zqbi36.mp4", badge: "Short" },
  { id: "short-2", title: "Video2", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219613/Thar_xte6fq.mp4", badge: "Short" },
  { id: "short-3", title: "Video3", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219479/K_Portfolio_1_uqdgye.mp4", badge: "Short" },
  { id: "short-4", title: "Video4", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219503/LukeRaw_gouzol.mp4", badge: "Short" },
  { id: "short-5", title: "Video5", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219538/MORTGAGE_PROTECTION_36_kuowyu.mp4", badge: "Short" },
  { id: "short-6", title: "Video6", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219456/CAR_blzpmy.mp4", badge: "Short" },
  { id: "short-7", title: "Video7", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219579/test_video_qzgi8q.mp4", badge: "Short" },
  { id: "short-8", title: "Video8", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219766/video_9_jjd5tu.mp4", badge: "Short" },
  { id: "short-9", title: "Video9", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219797/video_3_gxa7pf.mp4", badge: "Short" },
  { id: "short-10", title: "Video10", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219848/video_2_1_ccbmvf.mp4", badge: "Short" },
  { id: "short-11", title: "Video11", src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219682/therabodyfinal_hglrph.mp4", badge: "Short" },
];

/* ======================= */
/*       Page Export       */
/* ======================= */
export default function Portfolio() {
  return (
    <main className="bg-neutral-950 text-white">
      <HeroSection leftImages={LEFT_IMAGES} rightImages={RIGHT_IMAGES} />

      {/* Long horizontal strip (optional) */}
      <ShowcaseStrip media={FULL_STRIP_MEDIA} />

      {/* 🔥 Shorts grid replaces the old PortfolioGrid */}
      <ShortsGrid shorts={SHORTS} />
    </main>
  );
}
