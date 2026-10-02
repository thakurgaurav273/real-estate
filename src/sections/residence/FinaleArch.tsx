"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { BRAND, IMAGES } from "@/content/site";

/** Giant wordmark; the arch window opens until it becomes the whole view. */
export function FinaleArch() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "+=180%", scrub: 1, pin: true },
    });
    tl.fromTo(
      "[data-finale-window]",
      { clipPath: "inset(18% 38% 14% 38% round 999px 999px 0px 0px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "power2.inOut", duration: 1 },
      0
    )
      .fromTo("[data-finale-img]", { scale: 1.5 }, { scale: 1, ease: "power2.inOut", duration: 1 }, 0)
      .to("[data-finale-word]", { scale: 1.4, opacity: 0, ease: "power1.in", duration: 0.6 }, 0)
      .to("[data-rhythm]", { opacity: 0, y: -30, duration: 0.25 }, 0)
      .fromTo("[data-finale-end] > *", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.25 }, 0.8);
  });

  return (
    <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden bg-forest text-dark-foreground">
      <p
        data-finale-word
        aria-hidden
        className="absolute inset-x-0 top-[8vh] text-center font-display uppercase leading-none tracking-[-0.04em] text-[clamp(6rem,26vw,30rem)] select-none"
      >
        {BRAND.project}
      </p>

      <div data-finale-window className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(18% 38% 14% 38% round 999px 999px 0px 0px)" }}>
        <div data-finale-img className="absolute inset-0">
          <CinematicImage src={IMAGES.exterior} alt={`${BRAND.projectFull} at dusk`} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      </div>

      <div data-rhythm className="absolute inset-x-0 bottom-[5vh] text-center">
        <p className="font-display text-3xl md:text-4xl leading-tight">
          Make room for
          <br />
          <em>a different rhythm.</em>
        </p>
      </div>

      <div data-finale-end className="absolute bottom-0 inset-x-0 px-5 md:px-[3vw] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="font-display text-4xl md:text-6xl uppercase leading-[0.95]">{BRAND.projectFull}</p>
          <p className="text-micro text-dark-foreground/70 mt-2">{BRAND.location}</p>
        </div>
        <a href="#residences" className="text-micro rounded-full border border-white/50 px-6 py-3 hover:bg-white hover:text-black transition-colors w-max">
          Explore residences
        </a>
      </div>
    </section>
  );
}
