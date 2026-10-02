"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { BRAND, LOCATION } from "@/content/site";

const PINS = [
  { angle: -40, r: 0.32 },
  { angle: 25, r: 0.38 },
  { angle: 150, r: 0.62 },
  { angle: 220, r: 0.88 },
];

/** Location chapter: drive-time figures around an abstract radial map. */
export function LocationScene() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    gsap.from("[data-loc-head] > *", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 65%" },
    });
    gsap.from("[data-ring]", {
      scale: 0,
      opacity: 0,
      transformOrigin: "50% 50%",
      stagger: 0.12,
      duration: 1.6,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-map]", start: "top 75%" },
    });
    gsap.from("[data-pin]", {
      scale: 0,
      transformOrigin: "50% 50%",
      stagger: 0.12,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(2)",
      scrollTrigger: { trigger: "[data-map]", start: "top 75%" },
    });
    gsap.from("[data-loc-stat]", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-loc-stats]", start: "top 85%" },
    });
  });

  return (
    <section id="location" ref={ref} className="relative w-full overflow-hidden bg-forest text-dark-foreground px-5 md:px-[5vw] py-[16vh]">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div data-loc-head>
          <p className="text-micro text-dark-foreground/50 mb-6">08 — Location · {BRAND.location}</p>
          <h2 className="text-serif-xl">
            Everything
            <br />
            <em>within reach.</em>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-dark-foreground/70">
            A connected community. A place to call your own. Minutes from the metro, the marina and the heart of the city.
          </p>
        </div>

        <div data-map className="relative aspect-square w-full max-w-xl mx-auto">
          <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
            {[90, 70, 50, 30].map((r) => (
              <circle key={r} data-ring r={r} fill="none" stroke="rgba(243,241,236,0.18)" strokeDasharray="1 3" />
            ))}
            <line x1={-100} y1={0} x2={100} y2={0} stroke="rgba(243,241,236,0.08)" />
            <line x1={0} y1={-100} x2={0} y2={100} stroke="rgba(243,241,236,0.08)" />
            {PINS.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = Math.cos(rad) * p.r * 100;
              const y = Math.sin(rad) * p.r * 100;
              return (
                <g key={i} data-pin>
                  <line x1={0} y1={0} x2={x} y2={y} stroke="rgba(243,241,236,0.25)" strokeWidth={0.4} />
                  <circle cx={x} cy={y} r={2.2} fill="#F3F1EC" />
                  <text x={x + 4} y={y - 4} fill="rgba(243,241,236,0.85)" style={{ font: "4px var(--font-sans)", letterSpacing: "0.15em" }}>
                    {LOCATION[i].place.toUpperCase()}
                  </text>
                </g>
              );
            })}
            <circle r={4} fill="#D9A441" />
            <circle r={4} fill="none" stroke="#D9A441" className="animate-ping origin-center" style={{ transformBox: "fill-box" }} />
          </svg>
        </div>
      </div>

      <div data-loc-stats className="mt-[10vh] grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-dark-foreground/15 pt-10">
        {LOCATION.map((l) => (
          <div key={l.place} data-loc-stat>
            <p className="font-display text-7xl md:text-8xl leading-none">
              {l.minutes}
              <span className="text-micro ml-2 align-top text-dark-foreground/60">min</span>
            </p>
            <p className="mt-4 text-sm">{l.place}</p>
            <p className="text-micro text-dark-foreground/50 mt-1">{l.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
