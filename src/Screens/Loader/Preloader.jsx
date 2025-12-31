import { useEffect, useRef } from "react";
import "./loader.css";

export default function Preloader({ onDone }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    // total timeline: 1st word 0s, 2nd 0.9s, 3rd 1.8s + 1.4s anim = ~3.2s
    const totalMs = 3200;

    const t = setTimeout(() => {
      const el = wrapRef.current;
      if (!el) return;

      // when slide-up finishes, unmount
      const handleEnd = () => onDone?.();
      el.addEventListener("transitionend", handleEnd, { once: true });

      // trigger shutter/open (slide up)
      el.classList.add("is-hidden");
    }, totalMs);

    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div ref={wrapRef} className="loader-wrap" role="status" aria-label="Loading">
      <div className="sundown-words" aria-live="polite">
        <h1 className="sd-word sd-1">MAYA</h1>
        <h1 className="sd-word sd-2">MEDIA</h1>
        <h1 className="sd-word sd-3">COMMUNICATION</h1>
      </div>
    </div>
  );
}
