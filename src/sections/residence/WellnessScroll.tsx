"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { IMAGES, WELLNESS } from "@/content/site";

/** Intro + pinned horizontal track of wellness chapters. */
export function WellnessScroll() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    gsap.from("[data-slow] > *", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: "[data-slow]", start: "top 75%" },
    });
    gsap.fromTo(
      "[data-slow-arch]",
      { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)",
        duration: 1.6,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-slow]", start: "top 70%" },
      }
    );

    const track = root.querySelector<HTMLElement>("[data-track]");
    const pinEl = root.querySelector<HTMLElement>("[data-pin]");
    if (!track || !pinEl) return;
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pinEl,
        start: "top top",
        end: () => `+=${distance()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
    // Parallax inside each panel, driven by the horizontal tween.
    root.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
      gsap.fromTo(
        panel.querySelector("[data-panel-img]"),
        { xPercent: -12 },
        {
          xPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        }
      );
      gsap.from(panel.querySelectorAll("[data-panel-line]"), {
        yPercent: 100,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 70%" },
      });
    });
  });

  return (
    <section id="wellness" ref={ref} className="relative w-full bg-background text-foreground">
      <div data-slow className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center px-5 md:px-[5vw] py-[18vh]">
        <div>
          <p className="text-micro text-muted-foreground mb-6">05 — Wellness & Wellbeing</p>
          <h2 className="text-serif-xl">
            A slower
            <br />
            kind of
            <br />
            <em>everyday.</em>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A collection of spaces for movement, stillness and everything between — so that the best part of your day
            never needs a commute.
          </p>
        </div>
        <div data-slow-arch className="relative aspect-[3/4] w-full max-w-md justify-self-end overflow-hidden">
          <CinematicImage src={IMAGES.exterior} alt="Garden courtyard" sizes="40vw" objectPosition="20% center" />
        </div>
      </div>

      <div data-pin className="relative h-[100dvh] overflow-hidden">
        <div data-track className="flex h-full w-max items-center gap-[6vw] px-5 md:px-[5vw]">
          {WELLNESS.map((w, i) => (
            <article key={i} data-panel className="relative h-[72vh] w-[86vw] md:w-[72vw] shrink-0 grid grid-cols-[1fr_1.2fr] items-center gap-6">
              <div className="relative z-10">
                <p className="text-micro text-muted-foreground mb-4">
                  {String(i + 1).padStart(2, "0")} — {w.note}
                </p>
                <h3 className="text-serif-xl whitespace-nowrap">
                  <span className="block overflow-hidden">
                    <span data-panel-line className="block">
                      {w.title[0]}
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <em data-panel-line className="block">
                      {w.title[1]}
                    </em>
                  </span>
                </h3>
              </div>
              <div className="relative h-full overflow-hidden">
                <div data-panel-img className="absolute inset-[-12%]">
                  <CinematicImage src={w.image} alt={w.title.join(" ")} sizes="50vw" objectPosition={w.position} />
                </div>
              </div>
              <div className="absolute left-[30%] bottom-[-4%] w-[22%] aspect-square overflow-hidden shadow-xl hidden md:block">
                <CinematicImage src={WELLNESS[(i + 1) % WELLNESS.length].image} alt="" sizes="20vw" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
