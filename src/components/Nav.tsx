"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "#machine", label: "Machine" },
  { href: "#rivals", label: "Rivals" },
  { href: "#timeline", label: "Timeline" },
  { href: "#numbers", label: "Numbers" },
];

export default function Nav() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div ref={bar} className="h-[2px] origin-left bg-accent" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-xl font-extrabold uppercase tracking-[0.2em]">
          Slip<span className="text-accent">stream</span>
        </a>
        <ul className="hidden gap-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
