"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { IMAGES } from "@/content/site";

const COLLAGE = [
  { src: IMAGES.interior, cls: "left-[4%] top-[10%] w-[34vw] aspect-[4/3]", speed: -18, pos: "center" },
  { src: IMAGES.material, cls: "right-[6%] top-[4%] w-[22vw] aspect-[3/4]", speed: -40, pos: "center" },
  { src: IMAGES.exterior, cls: "right-[18%] bottom-[6%] w-[30vw] aspect-[16/10]", speed: -28, pos: "center" },
  { src: IMAGES.aerial, cls: "left-[22%] bottom-[2%] w-[16vw] aspect-square", speed: -55, pos: "center" },
];

/** Dark forest chapter: drifting collage under oversized italic type. */
export function ComingHome() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    root.querySelectorAll<HTMLElement>("[data-collage]").forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -Number(el.dataset.speed) },
        {
          yPercent: Number(el.dataset.speed),
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
    gsap.fromTo(
      "[data-home-line]",
      { xPercent: (i) => (i === 0 ? -20 : 20), opacity: 0 },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 55%" },
      }
    );
  });

  return (
    <section ref={ref} className="relative min-h-[130vh] w-full overflow-hidden bg-forest text-dark-foreground">
      <div className="absolute top-[8vh] left-5 md:left-[5vw] flex items-center gap-4 z-20">
        <span className="text-micro text-dark-foreground/50">06</span>
        <span className="block h-px w-10 bg-dark-foreground/30" />
        <span className="text-micro text-dark-foreground/70">The feeling of home</span>
      </div>

      {COLLAGE.map((c, i) => (
        <div key={i} data-collage data-speed={c.speed} className={`absolute ${c.cls} overflow-hidden`}>
          <CinematicImage src={c.src} alt="" sizes="35vw" objectPosition={c.pos} />
        </div>
      ))}

      <div className="relative z-10 min-h-[130vh] flex flex-col justify-center px-5 md:px-[5vw] pointer-events-none">
        <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-display leading-[0.85] tracking-[-0.04em] drop-shadow-[0_6px_40px_rgba(0,0,0,0.35)]">
          <span data-home-line className="block">
            The luxury of
          </span>
          <em data-home-line className="block md:pl-[18vw]">
            coming home
          </em>
        </h2>
        <div className="mt-12 md:ml-auto md:mr-[8vw] max-w-xs">
          <p className="text-micro text-dark-foreground/60 mb-3">Residential above</p>
          <p className="text-sm leading-relaxed text-dark-foreground/80">
            Natural light, thoughtful finishes and a life that feels yours the moment the door closes behind you.
          </p>
        </div>
      </div>
    </section>
  );
}
