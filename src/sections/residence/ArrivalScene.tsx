"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { BRAND, IMAGES } from "@/content/site";

/** Walk up to the entrance, through the doors, into the lobby. */
export function ArrivalScene() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) {
      gsap.set("[data-lobby]", { clipPath: "inset(0% 0% 0% 0% round 0px)" });
      return;
    }
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "+=220%", scrub: 1, pin: true },
    });
    tl.to("[data-exterior]", { scale: 1.9, ease: "power1.in", duration: 1 }, 0)
      .fromTo(
        "[data-lobby]",
        { clipPath: "inset(34% 44% 0% 44% round 999px 999px 0px 0px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "power2.inOut", duration: 0.9 },
        0.35
      )
      .fromTo("[data-lobby-img]", { scale: 1.4 }, { scale: 1, ease: "power2.out", duration: 1.1 }, 0.35)
      .fromTo("[data-arrive-caption]", { yPercent: 100 }, { yPercent: 0, duration: 0.3, ease: "power3.out" }, 1.15)
      .fromTo("[data-arrive-word]", { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 0.3 }, 1.25);
  });

  return (
    <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden bg-dark-background text-dark-foreground">
      <div data-exterior className="absolute inset-0 origin-[50%_62%]">
        <CinematicImage src={IMAGES.exterior} alt="Residence entrance at dusk" sizes="100vw" />
        <div className="absolute inset-0 bg-black/25" />
      </div>
      <div data-lobby className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(34% 44% 0% 44% round 999px 999px 0px 0px)" }}>
        <div data-lobby-img className="absolute inset-0">
          <CinematicImage src={IMAGES.interior} alt="Lobby interior" sizes="100vw" />
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 overflow-hidden">
        <div
          data-arrive-caption
          className="bg-dark-background/90 backdrop-blur-sm px-5 md:px-[3vw] py-6 md:py-8 flex items-end justify-between"
        >
          <h2 className="font-display text-3xl md:text-5xl uppercase flex gap-[0.3em] overflow-hidden">
            {`Welcome to ${BRAND.project}`.split(" ").map((w, i) => (
              <span key={i} data-arrive-word className="inline-block">
                {w}
              </span>
            ))}
          </h2>
          <p className="hidden md:block text-micro text-dark-foreground/60">Arrival · Double-height lobby</p>
        </div>
      </div>
    </section>
  );
}
