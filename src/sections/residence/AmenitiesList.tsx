"use client";

import { useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { cn } from "@/lib/utils";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { AMENITIES } from "@/content/site";

const WORDS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

/** Scroll-driven list: the item crossing the centre line drives the sticky image. */
export function AmenitiesList() {
  const [active, setActive] = useState(0);

  const ref = useScene<HTMLElement>((root, reduced) => {
    root.querySelectorAll<HTMLElement>("[data-amenity]").forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
    if (reduced) return;
    gsap.from("[data-amen-head] > *", {
      yPercent: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
  });

  return (
    <section id="amenities" ref={ref} className="relative w-full bg-background text-foreground pb-[20vh]">
      <div data-amen-head className="px-5 md:px-[5vw] pt-[10vh] pb-[8vh] max-w-4xl">
        <p className="text-micro text-muted-foreground mb-6">04 — Amenities</p>
        <h2 className="text-serif-xl">
          {WORDS[AMENITIES.length - 1]} ways
          <br />
          <em>to spend a day.</em>
        </h2>
        <p className="mt-6 text-sm text-muted-foreground max-w-sm">
          Everything at Raison is shared, slow and close. Find yours below.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-10 px-5 md:px-[5vw]">
        <div className="hidden md:block">
          <div className="sticky top-[18vh] h-[64vh]">
            <div className="relative h-full w-full overflow-hidden bg-neutral-300">
              {AMENITIES.map((a, i) => (
                <div
                  key={a.name}
                  className="absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.08)" }}
                >
                  <CinematicImage src={a.image} alt={a.name} sizes="50vw" objectPosition={a.position} />
                </div>
              ))}
              <div className="absolute bottom-0 inset-x-0 p-5 flex justify-between text-white bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-micro">{AMENITIES[active].note}</span>
                <span className="text-micro tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {AMENITIES.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ol className="md:py-[24vh]">
          {AMENITIES.map((a, i) => (
            <li key={a.name} data-amenity onMouseEnter={() => setActive(i)}>
              <div
                className={cn(
                  "py-5 md:py-7 border-b border-line flex items-baseline gap-6 transition-all duration-500",
                  i === active ? "opacity-100 md:translate-x-3" : "opacity-30"
                )}
              >
                <span className="text-micro text-muted-foreground w-6 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className={cn("font-display text-3xl md:text-5xl leading-none", i === active && "italic")}>{a.name}</p>
                  <p className="text-micro text-muted-foreground mt-2">{a.note}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
