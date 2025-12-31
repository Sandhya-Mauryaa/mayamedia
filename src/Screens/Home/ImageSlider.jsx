// components/ImageSlider.jsx
import React, { useEffect, useState, useRef } from "react";

const images = [
  "https://cdn.prod.website-files.com/668c03e7e4168e68237e85a0/669b17a4074baf1014366e04_Slider%20Images%2006.jpg",
  "https://cdn.prod.website-files.com/668c03e7e4168e68237e85a0/669b17a498fc3ab33c5e9ea2_Slider%20Images%2001.jpg",
  "https://cdn.prod.website-files.com/668c03e7e4168e68237e85a0/669ff856e788557dc777d528_Slider%20Images%207.jpg",
  "https://cdn.prod.website-files.com/668c03e7e4168e68237e85a0/669ff864ff9ebebdd053fbaf_Slider%20Images%208.jpg",
  "https://cdn.prod.website-files.com/668c03e7e4168e68237e85a0/669b17a32bcb988e7f7ba02d_Slider%20Images%2004.jpg",
  "https://cdn.prod.website-files.com/668c03e7e4168e68237e85a0/669b17a44113ec5bb7aaeb65_Slider%20Images%2005.jpg",
];

export default function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const length = images.length;
  const intervalRef = useRef(null);

  // advance one slide
  const advanceSlider = () => {
    setActiveIndex((prev) => (prev + 1) % length);
  };

  // start/stop autoplay
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advanceSlider, 3000);
  };
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered) startInterval();
    else stopInterval();
    return () => stopInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, length]);

  const goToNext = () => {
    stopInterval();
    setActiveIndex((prev) => (prev + 1) % length);
    if (!isHovered) startInterval();
  };

  const goToPrev = () => {
    stopInterval();
    setActiveIndex((prev) => (prev - 1 + length) % length);
    if (!isHovered) startInterval();
  };

  const handleClickImage = (clickedIndex) => {
    stopInterval();
    if (clickedIndex !== activeIndex) setActiveIndex(clickedIndex);
    if (!isHovered) startInterval();
  };

  const getLoopIndex = (offset) => {
    return (activeIndex + offset + length) % length;
  };

  // layout tuning
  const CARD_HEIGHT = 500;
  const SIDE_SCALE = 0.8;
  const GAP_X = 420; // px distance between slides

  return (
    <div
      className="relative w-full h-[650px] flex items-center justify-center overflow-hidden bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-live="polite"
      aria-label="Image Slider"
    >
      {/* Prev / Next (optional) */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-black/40 text-white px-3 py-2 text-sm hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-black/40 text-white px-3 py-2 text-sm hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Three visible slides: left (-1), center (0), right (+1) */}
      {[-1, 0, 1].map((offset) => {
        const idx = getLoopIndex(offset);
        const isCenter = offset === 0;

        const style = {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateX(${offset * GAP_X}px) scale(${
            isCenter ? 1 : SIDE_SCALE
          })`,
          height: `${CARD_HEIGHT}px`,
          width: "auto",
          zIndex: isCenter ? 30 : 20 - Math.abs(offset),
          transition: "transform 700ms ease-in-out, opacity 700ms ease-in-out",
          opacity: 1,
        };

        return (
          <img
            key={`${idx}-${offset}`}
            src={images[idx]}
            alt={`Slide ${idx + 1} of ${length}`}
            style={style}
            className="rounded-xl shadow-xl object-cover cursor-pointer select-none"
            draggable={false}
            onClick={() => handleClickImage(idx)}
          />
        );
      })}
    </div>
  );
}
