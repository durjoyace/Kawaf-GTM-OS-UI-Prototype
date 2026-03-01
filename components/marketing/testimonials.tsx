"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "./section";
import { FadeIn } from "./motion";

const testimonials = [
  {
    quote:
      "Kawaf replaced our entire $15K/mo agency setup. We're getting better signals and closing 40% more deals with zero manual prospecting.",
    name: "Sarah Chen",
    title: "VP Sales, TechScale",
    initials: "SC",
  },
  {
    quote:
      "The AI scoring is genuinely game-changing. Our SDRs went from 200 cold calls a day to 20 warm, context-rich conversations. Pipeline quality tripled.",
    name: "Marcus Rivera",
    title: "Head of RevOps, DataFlow",
    initials: "MR",
  },
  {
    quote:
      "We were skeptical about another GTM tool, but Kawaf paid for itself in the first week. The signal-to-outreach speed is something I've never seen before.",
    name: "Alex Thompson",
    title: "CRO, CloudServe",
    initials: "AT",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <Section>
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--mkt-accent)]">
            TESTIMONIALS
          </span>

          <div className="relative mt-10 min-h-[220px]">
            {/* Quote mark */}
            <span className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 font-serif text-7xl text-[var(--mkt-accent)]/20 select-none">
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="mt-6 font-serif text-xl leading-relaxed text-[var(--mkt-text)] sm:text-2xl">
                  {t.quote}
                </blockquote>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--mkt-gradient-start)] to-[var(--mkt-gradient-end)]">
                    <span className="text-xs font-bold text-black">
                      {t.initials}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-[var(--mkt-text)]">
                      {t.name}
                    </div>
                    <div className="text-xs text-[var(--mkt-text-muted)]">
                      {t.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot navigation */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-[var(--mkt-accent)]"
                    : "w-2 bg-[var(--mkt-text-muted)]/40 hover:bg-[var(--mkt-text-muted)]"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
