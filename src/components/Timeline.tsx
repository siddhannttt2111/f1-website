"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTOS, type Photo } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger);

const ERAS: { year: string; title: string; tag: string; text: string; photo: Photo }[] = [
  {
    year: "1950",
    title: "Alfa Romeo 158 “Alfetta”",
    tag: "The first champion",
    text: "Giuseppe Farina wins the first-ever World Championship in the supercharged Alfa Romeo 158, a car first built back in 1938.",
    photo: PHOTOS.alfa158,
  },
  {
    year: "1976",
    title: "McLaren M23",
    tag: "Hunt vs Lauda",
    text: "James Hunt takes the title by a single point from Niki Lauda in one of the most dramatic seasons Formula 1 has ever seen.",
    photo: PHOTOS.m23,
  },
  {
    year: "1988",
    title: "McLaren MP4/4",
    tag: "Senna & Prost",
    text: "Ayrton Senna and Alain Prost win 15 of 16 races in the Honda-powered MP4/4, one of the most dominant cars in history.",
    photo: PHOTOS.mp44,
  },
  {
    year: "2010",
    title: "Red Bull RB6",
    tag: "Vettel's first crown",
    text: "Adrian Newey's RB6 delivers Red Bull's first double. Sebastian Vettel becomes the youngest champion in F1 history, at 23.",
    photo: PHOTOS.rb6,
  },
  {
    year: "2023",
    title: "Red Bull RB19",
    tag: "21 wins from 22",
    text: "The most dominant season ever: the RB19 wins 21 of 22 Grands Prix, 19 of them in the hands of Max Verstappen.",
    photo: PHOTOS.rb19,
  },
  {
    year: "2024",
    title: "McLaren MCL38",
    tag: "Papaya returns",
    text: "Lando Norris and Oscar Piastri power McLaren to its first constructors' championship since 1998.",
    photo: PHOTOS.mcl38,
  },
];


export default function Timeline() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = { trigger: ".timeline-track", start: "top 60%", end: "bottom 60%", scrub: true };
      gsap.fromTo(".timeline-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: track });
      gsap.fromTo(".timeline-marker", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: track });

      gsap.from(".timeline-heading > *", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".timeline-heading", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".era-row").forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const scrub = { trigger: row, start: "top 90%", end: "top 40%", scrub: 1 };

        gsap.from(row.querySelector(".era-card"), {
          x: 120 * dir,
          rotateY: 14 * dir,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: scrub,
        });
        gsap.fromTo(
          row.querySelector(".era-image"),
          { clipPath: dir < 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", scale: 1.25 },
          { clipPath: "inset(0 0% 0 0%)", scale: 1, ease: "power2.out", scrollTrigger: scrub },
        );
        gsap.fromTo(
          row.querySelector(".era-year"),
          { yPercent: 50, opacity: 0 },
          {
            yPercent: -30,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 60%",
          toggleClass: { targets: [row.querySelector(".era-node"), row.querySelector(".era-year")], className: "is-active" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={root} className="relative py-32">
      <div className="timeline-heading relative mx-auto max-w-7xl px-6 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.4em] text-accent">The Timeline</p>
        <h2 className="mt-3 font-display text-6xl font-bold uppercase leading-none md:text-8xl">Legends of Speed</h2>
        <p className="mx-auto mt-6 max-w-xl text-muted">
          The real cars that defined their eras, from the Alfetta to the RB19 and the MCL38. Keep
          scrolling to drive through history.
        </p>
      </div>

      <div className="timeline-track relative mx-auto mt-24 max-w-6xl px-6" style={{ perspective: 1200 }}>
        <div className="absolute bottom-0 left-8 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
        <div className="timeline-fill absolute bottom-0 left-8 top-0 w-[2px] origin-top -translate-x-1/2 bg-accent md:left-1/2" />
        <div className="timeline-marker absolute left-8 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent md:left-1/2" />

        {ERAS.map((era, i) => {
          const left = i % 2 === 0;
          return (
            <div key={era.year} className="era-row relative grid items-center gap-8 py-16 pl-16 md:grid-cols-2 md:gap-20 md:pl-0">
              <span className="era-node absolute left-8 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-steel bg-background transition-all duration-500 md:left-1/2" />

              <div
                className={`era-year font-display text-8xl font-extrabold leading-none text-steel transition-colors duration-500 md:text-[10rem] [&.is-active]:text-foreground ${
                  left ? "md:order-2 md:text-left" : "md:text-right"
                }`}
              >
                {era.year}
              </div>

              <article className={`era-card group overflow-hidden border border-white/10 bg-surface ${left ? "md:order-1" : ""}`}>
                <div className="era-image relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={era.photo.src}
                    alt={era.photo.alt}
                    fill
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-background/85 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {era.tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-3xl font-bold uppercase">{era.title}</h3>
                  <p className="mt-3 text-muted">{era.text}</p>
                  <p className="mt-4 text-[11px] text-muted/60">
                    Photo: {era.photo.author} / {era.photo.license}
                  </p>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}