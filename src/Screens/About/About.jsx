// About.jsx — single file drop-in (cards upgraded)
import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------------------------- Small utility hooks ---------------------------- */
function useInView(threshold = 0.3, rootMargin = "0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold, rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, inView];
}

function useCountUp(when, end = 100, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!when) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setVal(Math.floor(end * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [when, end, duration]);
  return val;
}

/* ------------------------------ CSS (inline) -------------------------------- */
const CSS = `
:root{
  --rad:16px;
  --max:1200px;
  --soft:cubic-bezier(.2,.8,.2,1);
}
*{box-sizing:border-box}
img{display:block;max-width:100%}
section{isolation:isolate}

/* container */
.wrap{max-width:var(--max);margin-inline:auto;padding:96px 24px}
.button{
  display:inline-flex;align-items:center;gap:10px;padding:14px 20px;border-radius:999px;
  border:1px solid rgba(255,255,255,.28);backdrop-filter: blur(6px);
  transition:transform .25s var(--soft), box-shadow .25s var(--soft)
}
.button:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.25)}
.button img{filter:invert(1)}

/* ----------------------------- HERO ------------------------------------- */
.hero{
  position:relative;min-height:100vh;display:grid;align-items:center;overflow:hidden;color:#fff;
  background: radial-gradient(1200px 600px at -10% -10%, #4a2a05 0%, #1a0f06 40%, #0c0704 100%);
}
.hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.18;pointer-events:none}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg, transparent 0%, rgba(0,0,0,.35) 60%, rgba(0,0,0,.6) 100%)}
.heroGrid{position:relative;z-index:2;display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}
.hero h1{font-size:clamp(36px,4vw,56px);line-height:1.05;letter-spacing:-.02em;margin:0}
.hero p{max-width:42ch;opacity:.9;margin:18px 0 28px}

.heroImages{position:relative;display:flex;gap:28px;justify-content:flex-end}
.card{width:min(420px,44vw);border-radius:var(--rad);box-shadow:0 24px 80px rgba(0,0,0,.45);will-change:transform;transition:transform .9s var(--soft)}
.cardOne{transform:translate(-18px,24px) rotate(-2.5deg) scale(.98);width:min(370px,40vw)}
.cardTwo{transform:translate(60px,50px) rotate(6deg) scale(.92)}
.cardTwo.snapped{transform:translate(0,0) rotate(0) scale(1)}

.bigText{
  position:absolute;left:max(24px,4vw);bottom:max(-8px,-1vh);display:flex;gap:6px;z-index:1;pointer-events:none
}
.bigText span{
  font-weight:800;font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial;
  color:rgba(255,255,255,.10);font-size:clamp(80px,12vw,220px);line-height:.8;letter-spacing:-.02em
}

/* faint vertical guides */
.heroGrid::before,.heroGrid::after{
  content:"";position:absolute;top:0;bottom:0;width:1px;left:33%;background:linear-gradient(180deg,transparent,rgba(255,255,255,.25),transparent);opacity:.15
}
.heroGrid::after{left:auto;right:33%}

/* --------------------------- DIFFERENCE/COUNTERS ------------------------ */
.diff{background:#000;color:#fff}
.diffTop{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
.counter{font-size:clamp(42px,6vw,84px);font-weight:800;letter-spacing:-.02em}
.h1Italic{font-size:clamp(28px,4vw,64px);font-style:italic;margin:0;opacity:.9}
.h2Big{font-size:clamp(48px,8vw,120px);line-height:.9;margin:.25em 0 0}
.diffGrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;align-items:start;margin-top:48px}
.diffItem{display:flex;gap:14px;padding:16px 0}
.diffItem img{width:28px;height:28px}
.thumbWrap{position:relative}
.thumb{width:100%;border-radius:14px;box-shadow:0 18px 80px rgba(0,0,0,.55);transform:translateY(8px);transition:transform .5s var(--soft)}
.thumbWrap:hover .thumb{transform:translateY(0)}

/* -------------------------------- TEAM (new card system) ------------------ */
.team{background:#000;color:#fff}
.team h2{font-size:clamp(36px,5vw,72px);margin:0 0 10px}
.team p{max-width:44ch;opacity:.8;margin:0}
.cardsGrid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:42px
}
@media (max-width:1100px){ .cardsGrid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:720px){ .cardsGrid{grid-template-columns:1fr} }

.profileCard{
  position:relative;border-radius:20px;overflow:hidden;background:linear-gradient(180deg,#0d0d0d,#0a0a0a);
  border:1px solid rgba(255,255,255,.08);box-shadow:0 20px 80px rgba(0,0,0,.5);
  transform-style:preserve-3d;will-change:transform,box-shadow;
  transition:transform .35s var(--soft), box-shadow .35s var(--soft), border-color .35s var(--soft)
}
.profileCard:hover{box-shadow:0 40px 120px rgba(0,0,0,.7);border-color:rgba(255,255,255,.18)}

.media{
  position:relative;height:340px;overflow:hidden
}
.media img, .media video{width:100%;height:100%;object-fit:cover;transform:translateZ(0)}
.badge{
  position:absolute;top:14px;left:14px;z-index:2;
  display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;
  font-size:12px;letter-spacing:.12em;text-transform:uppercase;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);backdrop-filter: blur(6px)
}
.blob{
  position:absolute;inset:auto -20% -30% auto;width:260px;height:260px;border-radius:50%;
  background:radial-gradient(closest-side,#6ee7ff33,#6ee7ff00 70%);filter:blur(18px);transform:translateZ(0)
}

/* conic ring accent */
.ring{
  position:absolute;inset:-1px;border-radius:22px;pointer-events:none;
  background:
    conic-gradient(from 0deg at 50% 50%, #8ec5ff, #ffb86b, #c084fc, #8ec5ff);
  mask:
    linear-gradient(#000,#000) content-box, 
    linear-gradient(#000,#000);
  -webkit-mask:
    linear-gradient(#000,#000) content-box,
    linear-gradient(#000,#000);
  padding:1px; opacity:.12; transition:opacity .35s var(--soft), filter .35s var(--soft);
}
.profileCard:hover .ring{opacity:.35;filter:saturate(120%)}

/* moving shine */
.shine{
  position:absolute;inset:0;background:
    radial-gradient(500px 300px at var(--mx,50%) var(--my,50%), rgba(255,255,255,.08), transparent 60%);
  pointer-events:none;mix-blend-mode:overlay;transition:opacity .2s var(--soft)
}
.profileCard:hover .shine{opacity:1}

/* content */
.cardBody{padding:18px 18px 16px}
.nameLine{display:flex;align-items:center;justify-content:space-between;gap:12px}
.person{display:flex;flex-direction:column}
.person .nm{font-size:20px;font-weight:700;margin:0 0 2px}
.person .mail{opacity:.65;margin:0;font-size:13px}
.chip{
  border-radius:10px;padding:6px 10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.03);
  font-size:12px;opacity:.9
}

/* actions slide-in */
.actions{
  display:flex;gap:10px;margin-top:14px;transform:translateY(8px);opacity:.0;
  transition:transform .3s var(--soft), opacity .3s var(--soft)
}
.profileCard:hover .actions{transform:none;opacity:1}
.iconBtn{
  width:38px;height:38px;border-radius:12px;display:grid;place-items:center;
  border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);
  transition:transform .2s var(--soft), background .2s var(--soft), border-color .2s var(--soft)
}
.iconBtn:hover{transform:translateY(-2px);background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3)}
.iconBtn img{width:18px;height:18px;filter:invert(1)}

/* --------------------------------- CTA ---------------------------------- */
.cta{background: radial-gradient(800px 400px at 10% -10%, #2b6cff33, transparent 60%), radial-gradient(800px 400px at 90% 110%, #ff7a2a33, transparent 60%), #0b0b0b;color:#fff}
.ctaInner{max-width:1000px;margin:0 auto;padding:120px 24px;text-align:center}
.cta h2{font-size:clamp(36px,5vw,72px);margin:0 0 10px}
.cta p{opacity:.82;margin:0 0 18px}

/* ------------------------------ reveal utils ---------------------------- */
.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s var(--soft), transform .6s var(--soft)}
.reveal.in{opacity:1;transform:none}
.float{animation:float 6s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}

/* ------------------------------ responsive ------------------------------ */
@media (max-width:980px){
  .heroGrid{grid-template-columns:1fr;gap:36px}
  .heroImages{justify-content:flex-start}
  .diffGrid{grid-template-columns:1fr}
}
`;

/* --------------------------------- Parts --------------------------------- */
const Style = () => <style dangerouslySetInnerHTML={{ __html: CSS }} />;

/* ---------------------------------- HERO --------------------------------- */
function Hero() {
  const secRef = useRef(null);
  const [txtRef, txtIn] = useInView(0.35);

  // Snap second image into place as you scroll a bit
  const imgTwoRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!secRef.current || !imgTwoRef.current) return;
      const r = secRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const progress = 1 - Math.min(Math.max((r.top + r.height * 0.25) / (vh * 0.75), 0), 1);
      if (progress > 0.25) imgTwoRef.current.classList.add("snapped");
      else imgTwoRef.current.classList.remove("snapped");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // gentle parallax on first image
  const imgOneRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!secRef.current || !imgOneRef.current) return;
      const rect = secRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const center = (rect.top + rect.bottom) / 2;
      const diff = center - vh / 2;
imgOneRef.current.style.transform = `translateY(${(diff / vh) * 30}px) translateX(-18px) rotate(-2.5deg) scale(.98)`;

    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={secRef} className="hero">
      <Style />
      <video autoPlay muted loop playsInline>
        <source src="https://cdn.prod.website-files.com/682c7c431f6db7df2e59975a%2F6834423d8ca2006f1699bd24_133718-757782493_large-transcode.mp4" />
        <source src="https://cdn.prod.website-files.com/682c7c431f6db7df2e59975a%2F6834423d8ca2006f1699bd24_133718-757782493_large-transcode.webm" />
      </video>

      <div className="wrap heroGrid">
        <div ref={txtRef} className={`reveal ${txtIn ? "in" : ""}`}>
          <h1>Our creations</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur suspendisse porta vel tempus molestie justo
            suspendisse.
          </p>
          <a className="button" href="/contact">
            Get in touch
            <img
              width="10"
              height="9"
              alt=""
              src="https://cdn.prod.website-files.com/681b02510c8768b89d1a5e5e/68383fed52bc563e42e90be0_Button%20Arrow.svg"
            />
          </a>
        </div>

        <div className="heroImages">
          <img
            ref={imgOneRef}
            className="card cardOne float"
            alt="Model in orange hoodie"
            src="https://cdn.prod.website-files.com/681b02510c8768b89d1a5e5e/684a930541311e7d9452b841_2%20(9).avif"
          />
          <img
            ref={imgTwoRef}
            className="card cardTwo"
            alt="Silhouette with glasses"
            src="https://cdn.prod.website-files.com/681b02510c8768b89d1a5e5e/684a930541311e7d9452b7c9_image%20(12).avif"
            srcSet="https://cdn.prod.website-files.com/681b02510c8768b89d1a5e5e/684a930541311e7d9452b7c9_image%20(12).avif 500w, https://cdn.prod.website-files.com/681b02510c8768b89d1a5e5e/684a930541311e7d9452b7c9_image%20(12).avif 1066w"
            sizes="(max-width: 767px) 100vw, 533px"
          />
        </div>

        <div className="bigText" aria-hidden>
          {"About us".split("").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Difference/Stats ---------------------------- */
function Difference() {
  const [ref, seen] = useInView(0.25);
  const c1 = useCountUp(seen, 200);
  const c2 = useCountUp(seen, 98);
  const c3 = useCountUp(seen, 23);

  return (
    <section className="diff">
      <div className="wrap">
        <div ref={ref} className={`reveal ${seen ? "in" : ""}`}>
          <div className="diffTop">
            <div className="counter">{c1}%</div>
            <div className="counter">{c2}%</div>
            <div className="counter">{c3}k</div>
          </div>

          <h3 className="h1Italic">Built to</h3>
          <h2 className="h2Big">Make a difference</h2>
        </div>

        <div className="diffGrid">
          <div>
            <div className="diffItem">
              <img
                alt=""
                src="https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a0732ade64d5712c39c361_icon-2.svg"
              />
              <p>
                <strong>Our Mission:</strong> Create intuitive & visually appealing experiences.
              </p>
            </div>
            <div className="diffItem">
              <img
                alt=""
                src="https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a0732a288a807b15ea79f0_icon-3.svg"
              />
              <p>
                <strong>Collaboration:</strong> Co-create high-impact solutions that empower teams.
              </p>
            </div>
          </div>

          <div className="thumbWrap">
            <img
              className="thumb"
              alt="Difference visual"
              src="https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a074a2e1507c4c4effedd0_thumb-13.webp"
              srcSet="
                https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a074a2e1507c4c4effedd0_thumb-13-p-500.webp 500w,
                https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a074a2e1507c4c4effedd0_thumb-13-p-800.webp 800w,
                https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a074a2e1507c4c4effedd0_thumb-13-p-1080.webp 1080w,
                https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a074a2e1507c4c4effedd0_thumb-13.webp 1600w
              "
              sizes="(max-width:1600px) 100vw, 1600px"
            />
          </div>

          <div>
            <div className="diffItem">
              <img
                alt=""
                src="https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a0732a7c86ba66b17f972d_icon-4.svg"
              />
              <p>
                <strong>Our Values:</strong> Seamless, engaging experiences that inspire.
              </p>
            </div>
            <div className="diffItem">
              <img
                alt=""
                src="https://cdn.prod.website-files.com/687e5ec079ccbd0ea8a6a4db/68a0732accfcae2e3490270f_icon-5.svg"
              />
              <p>
                <strong>Our Vision:</strong> Great work is built together with our clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Team (Upgraded Cards) ------------------ */
function TeamCards() {
  const [titleRef, titleIn] = useInView(0.25);

  const people = [
    {
      role: "CEO",
      name: "John White",
      email: "john@agency.com",
      img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687d2f1bcc31da64106580c4_Teams-pt2-4.webp",
    },
    {
      role: "Developer",
      name: "Tina Wright",
      email: "tina@agency.com",
      img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687d005e5cd3d4a2906355c8_Teams-pt2-2.webp",
    },
    {
      role: "Designer",
      name: "Nick Smith",
      email: "nick@agency.com",
      img: "https://cdn.prod.website-files.com/68711b2b9332a934a2b42342/687d005e7d1362f24d299596_Teams-pt2-3.webp",
    },
  ];

  // Respect reduced motion users
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Magnetic tilt handler
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width;   // 0..1
    const my = (e.clientY - r.top) / r.height;   // 0..1
    el.style.setProperty("--mx", `${mx * 100}%`);
    el.style.setProperty("--my", `${my * 100}%`);
    if (!reduced) {
      const rx = (0.5 - my) * 10; // tilt X
      const ry = (mx - 0.5) * 12; // tilt Y
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.transform = "none";
  };

  return (
    <section className="team">
      <div className="wrap">
        <div ref={titleRef} className={`reveal ${titleIn ? "in" : ""}`}>
          <h2>Happiest Team in the world</h2>
          <p>Our team of talented designers and developers bring expertise and creativity to every project.</p>
        </div>

        <div className="cardsGrid">
          {people.map((p, i) => (
            <article
              key={i}
              className="profileCard"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <div className="media">
                <span className="badge">{p.role}</span>
                <img src={p.img} alt={p.name} loading="lazy" />
                <span className="blob" aria-hidden />
              </div>

              <div className="cardBody">
                <div className="nameLine">
                  <div className="person">
                    <h3 className="nm">{p.name}</h3>
                    <p className="mail">{p.email}</p>
                  </div>
                  <span className="chip">Available</span>
                </div>

                <div className="actions">
                  <a className="iconBtn" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                    <img
                      alt="YouTube"
                      src="https://cdn.prod.website-files.com/687a47ac0ada569c1869f79a/687a47ac0ada569c1869f7bd_youtube.png"
                    />
                  </a>
                  <a className="iconBtn" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <img
                      alt="Instagram"
                      src="https://cdn.prod.website-files.com/687a47ac0ada569c1869f79a/687a47ac0ada569c1869f7bb_instagram.png"
                    />
                  </a>
                  <a className="iconBtn" href="https://www.tiktok.com/en/" target="_blank" rel="noreferrer">
                    <img
                      alt="TikTok"
                      src="https://cdn.prod.website-files.com/687a47ac0ada569c1869f79a/687a47ac0ada569c1869f7df_tiktok.png"
                    />
                  </a>
                </div>
              </div>

              {/* effects */}
              <span className="ring" aria-hidden />
              <span className="shine" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA ---------------------------------- */
function CTA() {
  return (
    <section className="cta">
      <div className="ctaInner">
        <h2>Ready to build something standout?</h2>
        <p>Let’s turn ideas into beautiful, high-performing products.</p>
        <a className="button" href="/contact" style={{ borderColor: "rgba(255,255,255,.35)" }}>
          Start a project
          <img
            width="10"
            height="9"
            alt=""
            src="https://cdn.prod.website-files.com/681b02510c8768b89d1a5e5e/68383fed52bc563e42e90be0_Button%20Arrow.svg"
          />
        </a>
      </div>
    </section>
  );
}

/* ---------------------------------- PAGE --------------------------------- */
export default function About() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!reduced) return;
    document.querySelectorAll(".float").forEach((el) => (el.style.animation = "none"));
  }, [reduced]);

  return (
    <>
      <Hero />
      <Difference />
      <TeamCards />
      <CTA />
    </>
  );
}
