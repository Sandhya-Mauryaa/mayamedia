import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi"; // react-icons

const FAQS = [
  {
    q: "What services do you provide?",
    a: "We specialize in Filming, Script Writing, Sound Design, Color Grading, VFX, and more — offering end-to-end creative production solutions.",
  },
  {
    q: "How does your editing process work?",
    a: "Once we receive your raw footage, our team handles color correction, sound design, and grading. We keep you updated with review drafts until final delivery.",
  },
  {
    q: "Do you offer custom packages?",
    a: "Yes! Every project is unique. We design flexible packages tailored to your budget, scope, and creative vision.",
  },
  {
    q: "What’s your typical turnaround time?",
    a: "For most projects, we deliver within 7–15 days depending on complexity. Fast-track options are available on request.",
  },
  {
    q: "How do I get started?",
    a: "Simply reach out via our contact form. We’ll schedule a quick discovery call to understand your goals and kick off the process.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = (i) => {
    setActive(active === i ? null : i);
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-zinc-900 to-black py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-12">
          Frequently Asked <span className="text-amber-400">Questions</span>
        </h2>

        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-lg backdrop-blur-sm"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg md:text-xl font-semibold text-white">
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: active === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shadow-inner"
                >
                  <FiChevronDown size={22} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-6 pb-6 text-white/80 leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
