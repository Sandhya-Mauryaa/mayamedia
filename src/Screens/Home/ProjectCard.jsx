import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DustLayer from "../Portfolio/DustLayer";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ item, tall }) {
  const cardRef = useRef(null);
  const mediaRef = useRef(null);
  const [hover, setHover] = useState(false);

  // subtle media parallax
  useEffect(() => {
    if (!mediaRef.current || !cardRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.fromTo(mediaRef.current, { yPercent: -6 }, { yPercent: 6, ease: "none" });
    return () => tl.scrollTrigger?.kill();
  }, []);

  function onMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(py - 0.5) * -4}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 4}deg`);
  }
  function resetTilt() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }

  return (
    <a
      href="#"
      className="proj-card group block will-change-transform"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); resetTilt(); }}
      onMouseMove={onMove}
    >
      <div
        ref={cardRef}
        style={{ transform: "perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry))" }}
        className="relative overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_12px_38px_-16px_rgba(0,0,0,0.28)] transition-transform duration-200"
      >
        {/* top label bar */}
        <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white/90 px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-[15px] font-semibold text-black">{item.title}</div>
            <div className="truncate text-xs text-black/60">{item.subtitle}</div>
          </div>
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-black/40">
            <path fill="currentColor" d="M13 5l7 7l-7 7v-4H4v-6h9z" />
          </svg>
        </div>

        {/* media */}
        <div ref={mediaRef} className={`relative ${tall ? "aspect-16/10" : "aspect-16/10"} overflow-hidden`}>
          <img
            src={item.thumb}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            style={{ filter: "contrast(1.02) saturate(1.02)" }}
          />
          <video
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hover ? "opacity-100" : "opacity-0"}`}
            src={item.hoverVideo}
            muted
            playsInline
            loop
            autoPlay
          />
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-black/10" />
        </div>

        {/* bottom reveal on hover (unchanged) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-between gap-4 bg-linear-to-t from-black/50 to-transparent px-4 pb-4 pt-8">
            <div>
              <div className="text-white text-[15px] font-semibold">{item.title}</div>
              <div className="text-white/80 text-xs">{item.category}</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-slate-900 text-xs font-semibold shadow">
              View
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13 5l7 7l-7 7v-4H4v-6h9z" />
              </svg>
            </div>
          </div>
        </div>

        <DustLayer />
      </div>
    </a>
  );
}
