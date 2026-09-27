"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 1000, decimals: 0, suffix: "+", unit: "hp", label: "Hybrid power unit output" },
  { value: 350, decimals: 0, suffix: "+", unit: "km/h", label: "Top speeds on the fastest tracks" },
  { value: 2.6, decimals: 1, suffix: "", unit: "s", label: "0 to 100 km/h, approximately" },
  { value: 1.8, decimals: 2, suffix: "", unit: "s", label: "Fastest pit stops ever recorded" },
];

const WORDS = ["Pole Position", "DRS Open", "Box Box", "Fastest Lap", "Chequered Flag", "Undercut", "Lights Out"];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el, i) => {
        const { value, decimals } = STATS[i];
        const counter = { v: 0 };
        gsap.to(counter, {
          v: value,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = counter.v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          },
        });
      });

      gsap.from(".stat-card", {
        y: 80,
        opacity: 0,
        rotateX: -15,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stat-grid", start: "top 80%" },
      });

      gsap.to(".marquee-skew", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="numbers" ref={root} className="relative overflow-hidden py-32">
      <div className="marquee-skew -ml-[5vw] w-[130vw] overflow-hidden border-y border-white/10 py-5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-4xl font-bold uppercase text-foreground/80">
          {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              {w} <span aria-hidden className="h-2 w-2 rotate-45 bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-28 max-w-7xl px-6">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.4em] text-accent">By the numbers</p>
        <h2 className="mt-3 max-w-3xl font-display text-6xl font-bold uppercase leading-none md:text-8xl">
          Physics, pushed to the limit.
        </h2>

        <div
          className="stat-grid mt-16 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: 1000 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="stat-card bg-background p-8">
              <div className="flex items-baseline gap-1 font-display font-bold">
                <span className="stat-value text-7xl leading-none">0</span>
                <span className="text-4xl text-accent">{s.suffix}</span>
                <span className="ml-1 text-xl uppercase text-accent">{s.unit}</span>
              </div>
              <p className="mt-4 text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
