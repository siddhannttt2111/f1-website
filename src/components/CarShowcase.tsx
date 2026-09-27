"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPIN_FRAMES, STAGES } from "@/lib/showcase";

gsap.registerPlugin(ScrollTrigger);

const N = SPIN_FRAMES.length;
const EDGE_FADE = "radial-gradient(ellipse 56% 58% at 50% 52%, #000 62%, transparent 100%)";
const TICKS =
  "repeating-conic-gradient(from 0deg, rgba(230,233,238,0.35) 0deg 0.6deg, transparent 0.6deg 7.5deg)";
const RING_MASK = "radial-gradient(circle, transparent 60%, #000 61%, #000 70%, transparent 71%)";

export default function CarShowcase() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dial = useRef<HTMLDivElement>(null);
  const degrees = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const frames = gsap.utils.toArray<HTMLElement>(".spin-frame", section.current);
    const state = { frame: 0, target: 0, drag: 0 };

    // Blend the two nearest turntable frames so the car appears to rotate continuously.
    const render = () => {
      state.frame += (state.target + state.drag - state.frame) * 0.1;
      const f = ((state.frame % N) + N) % N;
      frames.forEach((el, k) => {
        let d = f - k;
        if (d > N / 2) d -= N;
        if (d < -N / 2) d += N;
        const ad = Math.abs(d);
        el.style.opacity = String(gsap.utils.clamp(0, 1, (0.8 - ad) / 0.6));
        el.style.transform = `translateX(${-d * 3}%) scale(${1 - ad * 0.04})`;
      });
      const angle = (f / N) * 360;
      if (dial.current) dial.current.style.transform = `rotateX(76deg) rotateZ(${-angle}deg)`;
      if (degrees.current) degrees.current.textContent = String(Math.round(angle) % 360).padStart(3, "0");
    };
    gsap.ticker.add(render);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".stage-panel");
      gsap.set(panels.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: `+=${STAGES.length * 100}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            state.target = self.progress * N;
            const i = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
            setActive((prev) => (prev === i ? prev : i));
          },
        },
      });

      panels.forEach((panel, i) => {
        if (i > 0) tl.fromTo(panel, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.3 }, i);
        if (i < panels.length - 1) tl.to(panel, { autoAlpha: 0, y: -60, duration: 0.3 }, i + 0.7);
      });
      tl.to({}, { duration: 0.3 }, STAGES.length - 0.3);
    }, section);

    let lastX: number | null = null;
    const el = stage.current!;
    const down = (e: PointerEvent) => {
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (lastX === null) return;
      state.drag -= ((e.clientX - lastX) / el.clientWidth) * N * 0.75;
      lastX = e.clientX;
    };
    const up = () => {
      lastX = null;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    return () => {
      gsap.ticker.remove(render);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      ctx.revert();
    };
  }, []);

  return (
    <section id="machine" ref={section} className="relative h-screen overflow-hidden bg-[#0b0d10]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[20vw] font-extrabold uppercase leading-none text-outline"
      >
        {STAGES[active].label}
      </div>

      <div className="absolute inset-0 flex items-start justify-center pt-28 md:items-center md:justify-end md:pt-0">
        <div
          ref={stage}
          className="relative aspect-video w-[100vw] cursor-grab touch-pan-y select-none active:cursor-grabbing md:mr-[-3vw] md:w-[68vw]"
          style={{ perspective: 1400 }}
        >
          <div
            ref={dial}
            aria-hidden
            className="absolute left-[15%] top-[30%] aspect-square w-[70%]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: TICKS, maskImage: RING_MASK, WebkitMaskImage: RING_MASK }}
            />
            <div className="absolute left-1/2 top-[14.5%] h-[7%] w-[3px] -translate-x-1/2 bg-accent" />
          </div>

          {SPIN_FRAMES.map((src, i) => (
            <div
              key={src}
              className="spin-frame absolute inset-0 will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0, maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
            >
              <Image
                src={src}
                alt={i === 0 ? "Red Bull RB19 on a studio turntable" : ""}
                fill
                priority
                draggable={false}
                sizes="(min-width: 768px) 68vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto h-full max-w-7xl px-6">
        {STAGES.map((s, i) => (
          <article
            key={s.id}
            className="stage-panel absolute bottom-28 left-6 right-6 max-w-sm border-l-2 border-accent bg-surface/90 p-7 md:bottom-auto md:right-auto md:top-1/2 md:-translate-y-1/2"
          >
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent">
              {String(i + 1).padStart(2, "0")} / {s.label}
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-none md:text-5xl">{s.title}</h2>
            <p className="mt-4 text-muted">{s.body}</p>
            <div className="mt-6 flex items-end gap-3 border-t border-white/10 pt-5">
              <span className="font-display text-5xl font-bold leading-none">{s.stat}</span>
              <span className="pb-1 text-xs uppercase tracking-[0.2em] text-muted">{s.statLabel}</span>
            </div>
          </article>
        ))}

        <ol className="absolute bottom-8 left-6 flex gap-2">
          {STAGES.map((s, i) => (
            <li key={s.id} className="w-16 md:w-24">
              <span
                className="block h-[2px] transition-colors duration-500"
                style={{ background: i <= active ? "var(--accent)" : "rgba(255,255,255,0.15)" }}
              />
              <span
                className="mt-2 block font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500"
                style={{ color: i === active ? "var(--foreground)" : "var(--muted)" }}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ol>

        <div className="absolute bottom-8 right-6 text-right">
          <p className="font-display text-5xl font-bold leading-none tabular-nums">
            <span ref={degrees}>000</span>
            <span className="text-accent">°</span>
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted">Red Bull RB19 · drag to rotate</p>
        </div>
      </div>
    </section>
  );
}
