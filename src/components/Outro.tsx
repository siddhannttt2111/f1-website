"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTOS } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger);

export default function Outro() {
  const root = useRef<HTMLElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom into the stem of the "I" so the photo inside the letter fills the screen.
      const setOrigin = () => {
        if (!mask.current || !target.current) return;
        const m = mask.current.getBoundingClientRect();
        const t = target.current.getBoundingClientRect();
        gsap.set(mask.current, {
          transformOrigin: `${t.left + t.width / 2 - m.left}px ${t.top + t.height * 0.55 - m.top}px`,
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
          onRefresh: setOrigin,
        },
      });

      tl.from(".outro-kicker", { y: 30, opacity: 0, duration: 0.15 })
        .to(".outro-kicker", { opacity: 0, duration: 0.1 }, 0.3)
        .fromTo(mask.current, { scale: 1 }, { scale: 70, duration: 1, ease: "power3.in" }, 0.25)
        .fromTo(".outro-img", { scale: 1.3 }, { scale: 1, duration: 1.1, ease: "power2.out" }, 0.25)
        .to(mask.current, { opacity: 0, duration: 0.1 }, 1.15)
        .from(".outro-copy > *", { y: 50, opacity: 0, stagger: 0.06, duration: 0.3 }, 1.2)
        .to({}, { duration: 0.3 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate h-screen overflow-hidden bg-black">
      <div className="outro-img absolute inset-0">
        <Image src={PHOTOS.rb19.src} alt={PHOTOS.rb19.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      </div>

      <div
        ref={mask}
        className="absolute inset-0 flex items-center justify-center bg-black mix-blend-multiply will-change-transform"
      >
        <span className="font-display text-[34vw] font-extrabold uppercase leading-none text-white md:text-[30vw]">
          L<span ref={target}>I</span>MIT
        </span>
      </div>

      <p className="outro-kicker absolute inset-x-0 top-[18%] text-center font-display text-sm font-semibold uppercase tracking-[0.5em] text-muted">
        75 years beyond the
      </p>

      <div className="outro-copy absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.4em] text-accent">Chequered flag</p>
        <h2 className="mt-3 max-w-4xl font-display text-6xl font-extrabold uppercase leading-[0.9] md:text-9xl">
          The next lap starts now.
        </h2>
        <p className="mt-6 max-w-lg text-muted">
          From Farina&apos;s Alfetta to Verstappen&apos;s RB19 and Norris&apos;s MCL38, Formula 1 has
          never stopped chasing the limit.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#top"
            className="border border-accent bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-background transition hover:bg-transparent hover:text-accent"
          >
            Back to the grid
          </a>
          <a
            href="#timeline"
            className="border border-white/25 px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.2em] transition hover:border-foreground"
          >
            Replay the timeline
          </a>
        </div>
      </div>
    </section>
  );
}
