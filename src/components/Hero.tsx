"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTOS } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger);

function SplitLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`block overflow-hidden whitespace-nowrap ${className}`}>
      {text.split("").map((c, i) => (
        <span key={i} className="hero-char inline-block">
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-char", {
        yPercent: 110,
        stagger: 0.03,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".hero-fade", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        delay: 0.8,
        ease: "power3.out",
      });

      const scroll = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-bg", { scale: 1.2, yPercent: 10, ease: "none", scrollTrigger: scroll });
      gsap.to(".hero-content", { yPercent: -50, opacity: 0, ease: "none", scrollTrigger: scroll });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative flex h-screen items-center overflow-hidden">
      <div className="hero-bg absolute inset-0">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] saturate-[0.8]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-6">
        <p className="hero-fade mb-5 font-display text-sm font-semibold uppercase tracking-[0.4em] text-accent">
          Formula 1 / 1950 – today
        </p>
        <h1 className="font-display text-[19vw] font-extrabold uppercase leading-[0.82] tracking-tight md:text-[11rem]">
          <SplitLine text="Full" />
          <SplitLine text="Throttle" className="text-outline-strong" />
        </h1>
        <p className="hero-fade mt-8 max-w-md text-lg text-muted">
          Red Bull vs McLaren, Senna to Verstappen, the Alfetta to the RB19. Scroll to take the
          wheel of the fastest story in motorsport.
        </p>
        <div className="hero-fade mt-10 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="h-px w-12 bg-accent" />
          Scroll
        </div>
      </div>
    </section>
  );
}
