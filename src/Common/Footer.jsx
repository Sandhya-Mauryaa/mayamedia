// ContactFooter.jsx
import { FiArrowRight } from "react-icons/fi";
import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";

/* Reusable CTA */
function ScheduleCallButton({
  label = "Schedule a call",
  href = "https://calendly.com/", // put your calendly link here
  className = "",
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-full",
        "bg-gradient-to-r from-amber-300 via-yellow-300 to-sky-300",
        "px-5 py-2.5 font-semibold text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70",
        "transition min-h-[44px]",
        className,
      ].join(" ")}
    >
      <span>{label}</span>
      <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
        <FiArrowRight />
      </span>
    </a>
  );
}

export default function ContactFooter() {
  return (
    <section className="relative isolate w-full bg-black pb-10 pt-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* 2-column cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Contact */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
            <h3 className="mb-4 text-xl font-bold text-white">Contact</h3>
            <div className="space-y-3 text-white/90">
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                <a
                  href="mailto:contact@mayamediacommunication.com"
                  className="text-sky-400 underline-offset-2 hover:underline"
                >
                  contact@mayamediacommunication.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/918178505497"
                  className="text-sky-400 underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  +91 8178505497
                </a>
              </p>

              <div className="pt-2">
                <ScheduleCallButton className="w-full sm:w-auto" />
              </div>
            </div>
          </div>

          {/* Right: Quick Links + Legal */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="mb-4 text-white font-semibold">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/" className="text-sky-400 hover:underline">
                      HOME
                    </a>
                  </li>
                  <li>
                    <a href="/portfolio" className="text-sky-400 hover:underline">
                      PORTFOLIO
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-sky-400 hover:underline">
                      BLOGS
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-sky-400 hover:underline">
                      ABOUT
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-white font-semibold">Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/privacy" className="text-sky-400 hover:underline">
                      PRIVACY POLICY
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-sky-400 hover:underline">
                      TERMS &amp; CONDITIONS
                    </a>
                  </li>
                  <li>
                    <a href="/refunds" className="text-sky-400 hover:underline">
                      REFUND POLICY
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-sky-400 hover:underline">
                      CONTACT US
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Optional bottom CTA inside links card on mobile */}
            <div className="mt-6 md:hidden">
              <ScheduleCallButton className="w-full" />
            </div>
          </div>
        </div>

        {/* Social rows */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <SocialRow
            icon={<FaYoutube className="text-red-500" />}
            label="YouTube"
            href="#"
          />
          <SocialRow
            icon={<RiWhatsappFill className="text-green-500" />}
            label="WhatsApp"
            href="https://wa.me/918178505497"
          />
          <SocialRow
            icon={<FaInstagram className="text-pink-500" />}
            label="Instagram"
            href="#"
          />
          <SocialRow
            icon={<FaLinkedinIn className="text-sky-500" />}
            label="LinkedIn"
            href="#"
          />
        </div>

        {/* Bottom note */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Maya Media Communication. All rights reserved.
        </div>
      </div>
    </section>
  );
}

function SocialRow({ icon, label, href = "#" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-[28px] bg-white/[0.04] border border-white/10 px-5 py-4 backdrop-blur-sm transition hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <div className="flex items-center gap-3">
        <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] border border-white/10 text-white">
          {icon}
        </span>
        <span className="uppercase tracking-wide text-white/90">{label}</span>
      </div>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10 text-white/90 transition group-hover:translate-x-1">
        <FiArrowRight />
      </span>
    </a>
  );
}
