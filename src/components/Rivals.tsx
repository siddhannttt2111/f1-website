"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTOS, type Photo } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger);

type Team = {
  id: string;
  name: string;
  car: string;
  photo: Photo;
  focus: string;
  stats: { label: string; value: number }[];
};

// Championship totals up to the end of the 2025 season.
const TEAMS: Team[] = [
  {
    id: "redbull",
    name: "Red Bull Racing",
    car: "RB20",
    photo: PHOTOS.rb20,
    focus: "55% 80%",
    stats: [
      { label: "Constructors' titles", value: 6 },
      { label: "Drivers' titles", value: 8 },
    ],
  },
  {
    id: "mclaren",
    name: "McLaren",
    car: "MCL38",
    photo: PHOTOS.mcl38Suzuka,
    focus: "60% 50%",
    stats: [
      { label: "Constructors' titles", value: 10 },
      { label: "Drivers' titles", value: 13 },
    ],
  },
];

const MAX = 13;

export default function Rivals() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", pin: true, scrub: 1 },
      });

      tl.fromTo(".rival-redbull", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1 })
        .fromTo(".rival-mclaren", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 1 }, "<0.15")
        .fromTo(".rival-img", { scale: 1.35 }, { scale: 1, duration: 1.2 }, 0)
        .fromTo(".rival-vs", { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.6)" }, 0.8)
        .from(".rival-copy > *", { y: 50, opacity: 0, stagger: 0.08, duration: 0.5 }, 1)
        .fromTo(".rival-bar", { scaleX: 0 }, { scaleX: 1, stagger: 0.1, duration: 0.6 }, 1.3)
        .to({}, { duration: 0.5 });

      gsap.utils.toArray<HTMLElement>(".rival-count").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { v: 0 };
        tl.to(counter, { v: target, duration: 0.6, onUpdate: () => (el.textContent = String(Math.round(counter.v))) }, 1.3);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="rivals" ref={root} className="relative h-screen overflow-hidden bg-background">
      <div className="grid h-full md:grid-cols-2">
        {TEAMS.map((t) => (
          <div key={t.id} className={`rival-${t.id} relative overflow-hidden`}>
            <div className="rival-img absolute inset-x-0 top-0 h-[68%]">
              <Image
                src={t.photo.src}
                alt={t.photo.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: t.focus }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background from-35% via-background/40 via-60% to-transparent" />

            <div className="rival-copy absolute inset-x-0 bottom-0 p-8 md:p-12">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent">{t.car}</p>
              <h3 className="mt-1 font-display text-4xl font-bold uppercase md:text-6xl">{t.name}</h3>
              <dl className="mt-6 space-y-4">
                {t.stats.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between text-sm text-muted">
                      <dt>{s.label}</dt>
                      <dd className="rival-count font-display text-3xl font-bold text-foreground" data-value={s.value}>
                        0
                      </dd>
                    </div>
                    <div className="mt-2 h-[3px] bg-white/10">
                      <div
                        className="rival-bar h-full origin-left bg-accent"
                        style={{ width: `${(s.value / MAX) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[11px] text-muted/70">
                Photo: {t.photo.author} / {t.photo.license}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-white/15 md:block" />
      <div className="rival-vs pointer-events-none absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/30 bg-background font-display text-3xl font-bold md:h-24 md:w-24 md:text-4xl">
        VS
      </div>

      <p className="absolute inset-x-0 top-24 text-center font-display text-sm font-semibold uppercase tracking-[0.4em] text-muted">
        The Rivalry
      </p>
    </section>
  );
}
