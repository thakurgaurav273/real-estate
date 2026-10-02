"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { lockScroll } from "@/lib/lenis";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { ROOMS } from "@/content/site";

export function RoomsArches() {
  const [open, setOpen] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    gsap.from("[data-rooms-head] > *", {
      yPercent: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
    gsap.fromTo(
      "[data-arch]",
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.18,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-arches]", start: "top 80%" },
      }
    );
    gsap.from("[data-arch-label]", {
      opacity: 0,
      y: 16,
      stagger: 0.18,
      duration: 1,
      delay: 0.5,
      scrollTrigger: { trigger: "[data-arches]", start: "top 80%" },
    });
  });

  useEffect(() => {
    lockScroll(open !== null);
    if (open === null || !modalRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(modalRef.current, { clipPath: "circle(0% at 50% 60%)" }, { clipPath: "circle(150% at 50% 60%)", duration: 1.1, ease: "power3.inOut" });
      gsap.fromTo("[data-modal-img]", { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "power3.out" });
      gsap.fromTo("[data-modal-text] > *", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, delay: 0.5, ease: "power3.out" });
    }, modalRef);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % ROOMS.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + ROOMS.length) % ROOMS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const room = open !== null ? ROOMS[open] : null;

  return (
    <section id="interiors" ref={ref} className="relative w-full bg-background text-foreground py-[18vh] px-5 md:px-[5vw]">
      <div data-rooms-head className="text-center">
        <p className="text-micro text-muted-foreground mb-6">03 — Interiors</p>
        <h2 className="text-serif-xl">
          Step inside
          <br />
          <em>the everyday.</em>
        </h2>
        <p className="mt-6 text-sm text-muted-foreground">Four rooms, each designed around how you live.</p>
      </div>

      <div data-arches className="mt-[12vh] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {ROOMS.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setOpen(i)}
            className="group text-left cursor-pointer"
            aria-label={`Open ${r.name}`}
          >
            <div data-arch className="arch relative aspect-[3/4] bg-neutral-300">
              <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                <CinematicImage src={r.image} alt={r.name} sizes="(min-width: 768px) 25vw, 50vw" objectPosition={r.position} />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-micro text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                View room
              </span>
            </div>
            <div data-arch-label className="mt-5 flex items-baseline justify-between border-t border-line pt-3">
              <span className="font-display text-xl md:text-2xl">{r.name}</span>
              <span className="text-micro text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            </div>
          </button>
        ))}
      </div>

      {room && open !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={room.name}
          className="fixed inset-0 z-50 bg-dark-background text-dark-foreground overflow-hidden"
        >
          <div key={room.id} data-modal-img className="absolute inset-0">
            <CinematicImage src={room.image} alt={room.name} sizes="100vw" objectPosition={room.position} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />
          </div>
          <div className="relative h-full flex flex-col justify-between px-5 md:px-[3vw] pt-6 pb-8">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="text-micro rounded-full border border-white/40 px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                ← Interiors
              </button>
              <p className="text-micro text-white/70 self-center">
                {String(open + 1).padStart(2, "0")} / {String(ROOMS.length).padStart(2, "0")}
              </p>
            </div>
            <div key={`t-${room.id}`} data-modal-text className="max-w-3xl">
              <h3 className="text-serif-xl">{room.name.replace("The ", "The ")}</h3>
              <p className="font-display italic text-2xl md:text-3xl mt-3">{room.line}</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80">{room.body}</p>
            </div>
            <div className="flex justify-end gap-3">
              {[
                ["Previous", -1],
                ["Next", 1],
              ].map(([label, d]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setOpen((i) => (i === null ? i : (i + (d as number) + ROOMS.length) % ROOMS.length))}
                  className="text-micro rounded-full border border-white/40 px-5 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
