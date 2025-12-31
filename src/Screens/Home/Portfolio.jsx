// Screens/Home/FeaturedPortfolio.jsx
import { useRef, useEffect, useMemo, useState } from "react";
import { useScroll } from "framer-motion";

// ✅ Use these 5 Cloudinary videos
const portfolio = [
  {
    title: "Nursing Ad",
    src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759218297/Nursing_video_ad_b8xf7t.mp4",
  },
  {
    title: "Onboardian – Mr. McVicker",
    src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759218571/Mr._McVicker_onboardian_1_tepnaq.mp4",
  },
  {
    title: "Long Video Sample",
    src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759217857/long_video_sample_1_t6adzt.mp4",
  },
  {
    title: "Ad Video",
    src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759184026/AD_VIDEO_1_1_zvhisv.mp4",
  },
  {
    title: "3M Brand Edit",
    src: "https://res.cloudinary.com/dgxkhsjnk/video/upload/v1759219415/3MbrandEdit_zqbi36.mp4",
  },
];


export default function FeaturedPortfolio() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const videoRefs = useRef([]);
  const [containerW, setContainerW] = useState(0);
  const [contentW, setContentW] = useState(0);

  // Vertical page scroll progress mapped to horizontal drift
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // keep stable refs
  useMemo(() => {
    videoRefs.current = Array(portfolio.length)
      .fill(null)
      .map((_, i) => videoRefs.current[i] || null);
  }, []);

  // measure and start aligned to right edge
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const measure = () => {
      setContainerW(el.clientWidth);
      setContentW(el.scrollWidth);
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      el.scrollLeft = maxScroll; // start from right
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // page scroll drives horizontal
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let ticking = false;
    const unsub = scrollYProgress.on("change", (p) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const maxScroll = Math.max(0, contentW - containerW);
        el.scrollLeft = maxScroll * p;
        ticking = false;
      });
    });

    return () => unsub && unsub();
  }, [containerW, contentW, scrollYProgress]);

  // mouse wheel to horizontal
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const atStart = el.scrollLeft <= 0;
      const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return; // allow page scroll at edges
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // drag to scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let down = false;
    let startX = 0;
    let startLeft = 0;

    const downH = (e) => {
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add("cursor-grabbing");
    };
    const moveH = (e) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const upH = (e) => {
      down = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      el.classList.remove("cursor-grabbing");
    };

    el.addEventListener("pointerdown", downH);
    el.addEventListener("pointermove", moveH);
    window.addEventListener("pointerup", upH);

    return () => {
      el.removeEventListener("pointerdown", downH);
      el.removeEventListener("pointermove", moveH);
      window.removeEventListener("pointerup", upH);
    };
  }, []);

  // autoplay videos that are mostly visible
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { root, threshold: [0.6] }
    );

    videoRefs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  // mouse follow panning inside the strip
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf = 0;
    let target = el.scrollLeft;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      target = maxScroll * x;
      if (!raf) tick();
    };

    const tick = () => {
      const current = el.scrollLeft;
      const next = lerp(current, target, 0.12);
      el.scrollLeft = next;
      if (Math.abs(next - target) > 0.5) raf = requestAnimationFrame(tick);
      else {
        el.scrollLeft = target;
        raf = 0;
      }
    };

    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl sm:text-5xl font-bold text-white mb-8">
          Our Handpicked Featured Portfolio
        </h2>
      </div>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent z-10" />

        {/* reel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar px-6 select-none cursor-grab"
          style={{ scrollBehavior: "auto" }}
        >
          {portfolio.map((item, i) => (
            <Card
              key={i}
              title={item.title}
              src={item.src}
              refFn={(el) => (videoRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Card */
function Card({ title, src, refFn }) {
  return (
    <div
      data-card
      className="
        snap-end relative
        w-[220px] sm:w-[260px] md:w-[300px]
        h-[44vh] sm:h-[42vh] md:h-[40vh]
        rounded-3xl overflow-hidden flex-shrink-0
        bg-slate-900 shadow-lg ring-1 ring-white/10 group
      "
    >
      <video
        ref={refFn}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <div className="absolute top-3 left-3 text-sm font-semibold text-white drop-shadow">
        {title}
      </div>

      <a
        href="#portfolio"
        className="absolute left-4 bottom-4 h-16 w-16 rounded-full border border-white/50 text-white grid place-items-center text-[11px] tracking-wide
                   opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                   transition-all duration-300"
      >
        VIEW ALL
      </a>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/30 transition" />
    </div>
  );
}
