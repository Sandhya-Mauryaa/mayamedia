// src/Common/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

/* ---------------- Brand ---------------- */
function BrandPill() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 text-white"
      aria-label="Go to homepage"
    >
      <span
        className="relative inline-grid h-9 w-9 place-items-center rounded-full 
        bg-gradient-to-br from-yellow-300 to-amber-400 text-slate-900 font-black shadow-inner"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2 3 7l9 5 9-5-9-5Zm0 9L3 16l9 5 9-5-9-5Z"
          />
        </svg>
      </span>
      {/* Mobile par text hide; md+ par show */}
      <div className="leading-tight hidden md:block">
        <div className="text-sm font-extrabold tracking-wide">MAYA MEDIA</div>
        <div className="text-[13px] tracking-wide text-white/80">
          Communication
        </div>
      </div>
    </Link>
  );
}

const DEFAULT_ITEMS = [
  { label: "Home", href: "/", type: "link" },
  { label: "Portfolio", href: "/portfolio", type: "link" },
  //{ label: "Blog", href: "/blog", type: "link" },
  { label: "", href: "/service", type: "link" }, // empty placeholder removed later
  { label: "About", href: "/about", type: "link" },
  { label: "Result", href: "/result", type: "link" },
  { label: "Contact", href: "/contact", type: "link" },
];

export default function ResponsiveGlassNavbar({
  items = DEFAULT_ITEMS,
  ctaText = "Schedule a Call",
  ctaHref = "https://calendly.com/",
}) {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // remove empty labels to keep equal spacing
  const computedItems = items.filter(
    (i) => i.label && i.label.trim().length > 0
  );

  function onScroll() {
    const y = window.scrollY || 0;
    setScrolled(y > 80);
  }

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  const isActive = (href) => {
    if (!href) return false;
    if (href.startsWith("#")) return hash === href;
    return pathname === href;
  };

  const containerClasses = cx(
    "mx-auto mt-3 max-w-[1200px] px-4 sm:px-6",
    "grid grid-cols-3 items-center",
    "rounded-full border text-white backdrop-blur-xl",
    "bg-black/40 border-white/10",
    "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition-[height,margin] duration-300",
    scrolled ? "mt-2 h-14" : "mt-3 h-16"
  );

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div className={containerClasses} role="navigation" aria-label="Primary">
        {/* LEFT: Brand */}
        <div>
          <BrandPill />
        </div>

        {/* CENTER: Desktop nav */}
        <nav className="hidden md:flex justify-center items-center gap-10 col-start-2">
          {computedItems.map((item) => {
            const active = isActive(item.href);
            const base =
              "relative text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 rounded";
            const cls = cx(
              base,
              active ? "text-amber-300" : "hover:text-amber-300/90"
            );
            if (item.type === "link") {
              return (
                <Link key={item.href} to={item.href} className={cls}>
                  {item.label}
                </Link>
              );
            }
            return (
              <a key={item.href} href={item.href} className={cls}>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: CTA + Hamburger */}
        <div className="flex items-center justify-end gap-2 col-start-3 ml-auto">
          <a
            href={ctaHref}
            className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r 
                       from-amber-300 to-sky-300 px-5 py-2.5 text-sm font-semibold text-black
                       shadow-md hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
            target="_blank"
            rel="noreferrer"
          >
            {ctaText}
          </a>

          {/* Hamburger / Close */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden
                       bg-black/40 ring-1 ring-white/10 backdrop-blur
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile CTA (centered, visible when menu closed) */}
        {!open && (
          <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
            <a
              href={ctaHref}
              className="inline-flex items-center rounded-full bg-gradient-to-r 
                          from-amber-300 to-sky-300 px-4 py-2 text-sm font-semibold text-slate-900 
                          shadow-md hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
              target="_blank"
              rel="noreferrer"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm md:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div
            id="mobile-menu"
            className="fixed inset-x-3 top-20 z-[60] grid max-h-[70vh] grid-rows-[1fr_auto] 
                       rounded-2xl border border-white/10 bg-black/80 
                       backdrop-blur-xl p-3 shadow-2xl md:hidden text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="overflow-y-auto pr-1">
              <div className="flex flex-col">
                {computedItems.map((item) => {
                  const active = isActive(item.href);
                  const Inner = item.type === "link" ? Link : "a";
                  const props =
                    item.type === "link"
                      ? { to: item.href }
                      : { href: item.href };
                  return (
                    <Inner
                      key={item.href}
                      {...props}
                      className={cx(
                        "flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium",
                        active
                          ? "bg-amber-300/20 text-amber-200"
                          : "hover:bg-white/5"
                      )}
                    >
                      {item.label}
                      {active && (
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-amber-300" />
                      )}
                    </Inner>
                  );
                })}
              </div>
              <div className="h-3" />
            </div>

            {/* sticky bottom CTA */}
            <div className="sticky bottom-0 left-0 right-0 -mx-3 border-t border-white/10 bg-black/70 p-3 backdrop-blur">
              <a
                href={ctaHref}
                className="flex w-full items-center justify-center rounded-xl 
                          bg-gradient-to-r from-amber-300 to-sky-300 px-4 py-3 
                          text-sm font-semibold text-slate-900 shadow hover:shadow-md"
                target="_blank"
                rel="noreferrer"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
