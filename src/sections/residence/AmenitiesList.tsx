"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { cn } from "@/lib/utils";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { AMENITIES } from "@/content/site";

const WORDS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const ITEM_H = 84; // px per list row on desktop, used to centre the active row

/**
 * Pinned amenities chapter: scrolling steps through the list while the
 * portrait image crossfades. On mobile it falls back to a plain stacked list.
 */
export function AmenitiesList() {
  const [active, setActive] = useState(0);

  const ref = useScene<HTMLElement>((root, reduced) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (reduced) return;
      const last = AMENITIES.length - 1;
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.45 * AMENITIES.length}`,
          pin: true,
          scrub: true,
          snap: { snapTo: 1 / last, duration: 0.4, ease: "power2.out" },
          onUpdate: (self) => setActive(Math.round(self.progress * last)),
        },
      });
    });

    gsap.from("[data-amen-head] > *", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 70%" },
    });

    return () => mm.revert();
  });

  const current = AMENITIES[active];

  return (
    <section id="amenities" ref={ref} className="relative w-full bg-background text-foreground md:h-[100dvh] md:overflow-hidden">
      <div className="h-full grid md:grid-cols-[1fr_1.1fr_1fr] gap-8 md:gap-[3vw] px-5 md:px-[5vw] pt-[16vh] md:pt-[14vh] pb-[10vh]">
        {/* Heading + counter */}
        <div data-amen-head className="flex flex-col">
          <p className="text-micro text-muted-foreground mb-6">04 — Amenities</p>
          <h2 className="text-serif-lg md:text-[clamp(2.5rem,4.2vw,4.75rem)] md:whitespace-nowrap">
            {WORDS[AMENITIES.length - 1]} ways
            <br />
            <em>to spend a day.</em>
          </h2>
          <p className="mt-6 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Everything at Raison is shared, slow and close. Find yours below.
          </p>
          <div className="hidden md:flex mt-auto items-end gap-4">
            <span className="font-display text-7xl leading-none tabular-nums">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-micro text-muted-foreground pb-2">/ {AMENITIES.length}</span>
          </div>
          {/* progress rail */}
          <div className="hidden md:block mt-5 h-px w-full max-w-xs bg-line relative">
            <span
              className="absolute left-0 top-0 h-px bg-foreground transition-[width] duration-500"
              style={{ width: `${((active + 1) / AMENITIES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block relative h-full min-h-0">
          <div className="relative h-full max-h-[68vh] aspect-[4/5] mx-auto overflow-hidden bg-neutral-300">
            {AMENITIES.map((a, i) => (
              <div
                key={a.name}
                className="absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.08)" }}
              >
                <CinematicImage src={a.image} alt={a.name} sizes="35vw" objectPosition={a.position} />
              </div>
            ))}
            <div className="absolute bottom-0 inset-x-0 p-4 text-white bg-gradient-to-t from-black/55 to-transparent">
              <p key={current.name} className="font-display italic text-2xl animate-[fadeIn_500ms_ease]">
                {current.name}
              </p>
              <p className="text-micro text-white/75 mt-1">{current.note}</p>
            </div>
          </div>
        </div>

        {/* List: desktop slides to keep the active row centred */}
        <div className="relative md:h-full md:min-h-0 md:overflow-hidden md:[mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]">
          <ol
            className="md:absolute md:inset-x-0 md:top-1/2 md:[transform:translateY(var(--list-y))] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ "--list-y": `${-(active + 0.5) * ITEM_H}px` } as React.CSSProperties}
          >
            {AMENITIES.map((a, i) => (
              <li
                key={a.name}
                className="md:h-[84px] flex flex-col justify-center py-4 md:py-0 border-b border-line"
              >
                <div
                  className={cn(
                    "flex items-baseline gap-4 transition-all duration-500",
                    i === active ? "opacity-100" : "md:opacity-25"
                  )}
                >
                  <span className="text-micro text-muted-foreground w-5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "font-display text-2xl lg:text-[1.9rem] leading-tight truncate transition-transform duration-500 origin-left",
                        i === active && "italic md:translate-x-2"
                      )}
                    >
                      {a.name}
                    </p>
                    <p className="text-micro text-muted-foreground mt-1">{a.note}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
