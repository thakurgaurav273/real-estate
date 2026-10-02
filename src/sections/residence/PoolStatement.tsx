"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { BRAND, IMAGES } from "@/content/site";

/** Full-bleed statement, then a paper arch rises over it. */
export function PoolStatement() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) {
      gsap.set("[data-paper]", { yPercent: 100 });
      return;
    }
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "+=200%", scrub: 1, pin: true },
    });
    tl.fromTo("[data-pool-img]", { scale: 1.25 }, { scale: 1, duration: 1, ease: "none" }, 0)
      .from("[data-feel-1]", { yPercent: 100, opacity: 0, duration: 0.25 }, 0.05)
      .from("[data-feel-2]", { yPercent: 100, opacity: 0, duration: 0.25 }, 0.18)
      .fromTo("[data-paper]", { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: "power2.inOut" }, 0.5)
      .fromTo(
        "[data-paper]",
        { borderTopLeftRadius: "50vw", borderTopRightRadius: "50vw" },
        { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw", duration: 0.25, ease: "none" },
        0.8
      )
      .from("[data-rush] > *", { y: 80, opacity: 0, stagger: 0.06, duration: 0.25 }, 0.72);
  });

  return (
    <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden bg-dark-background text-dark-foreground">
      <div data-pool-img className="absolute inset-0">
        <CinematicImage src={IMAGES.exterior} alt="All-weather pool, podium level" sizes="100vw" objectPosition="80% 80%" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-5">
        <h2 className="text-serif-xl">
          <span className="block overflow-hidden">
            <span data-feel-1 className="block">
              Nothing to do.
            </span>
          </span>
          <span className="block overflow-hidden">
            <em data-feel-2 className="block">
              Everything to feel.
            </em>
          </span>
        </h2>
        <p className="absolute bottom-8 left-5 md:left-[3vw] text-micro text-white/70">All-weather pool · Podium level</p>
      </div>

      <div data-paper className="absolute inset-0 bg-background text-foreground flex items-center justify-center">
        <div data-rush className="text-center px-5">
          <p className="text-micro text-muted-foreground mb-6">The {BRAND.project} philosophy</p>
          <h2 className="text-serif-xl">
            Less rush.
            <br />
            <em>More {BRAND.project}.</em>
          </h2>
          <p className="mt-8 max-w-sm mx-auto text-sm text-muted-foreground leading-relaxed">
            A residence measured not in square feet, but in the hours you get back.
          </p>
        </div>
      </div>
    </section>
  );
}
