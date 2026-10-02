"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { onPreloaderDone } from "@/components/preloader/Preloader";
import { BRAND, IMAGES, INTRO } from "@/content/site";

const CLOUDS = [
  { left: "-20%", top: "-10%", size: 90, dx: -60, dy: -30 },
  { left: "40%", top: "-20%", size: 80, dx: 60, dy: -40 },
  { left: "-15%", top: "40%", size: 85, dx: -70, dy: 30 },
  { left: "45%", top: "35%", size: 95, dx: 70, dy: 40 },
  { left: "15%", top: "10%", size: 70, dx: 0, dy: -70 },
  { left: "20%", top: "55%", size: 75, dx: 10, dy: 70 },
];

/**
 * Opening scene: the camera drifts through clouds over the city, then
 * descends toward the site while "Why here?" fades in.
 */
export function HeroDescent() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) {
      gsap.set("[data-cloud]", { opacity: 0 });
      gsap.set("[data-why]", { display: "none" });
      return;
    }

    // Intro: clouds part and the title rises once the preloader lifts.
    gsap.set("[data-title-char]", { yPercent: 110 });
    gsap.set("[data-hero-meta]", { opacity: 0 });
    const intro = gsap.timeline({ paused: true });
    intro
      .fromTo("[data-hero-img-inner]", { scale: 1.35 }, { scale: 1.1, duration: 3.2, ease: "power2.out" }, 0)
      .to("[data-title-char]", { yPercent: 0, duration: 1.3, stagger: 0.035, ease: "power4.out" }, 0.5)
      .to("[data-hero-meta]", { opacity: 1, duration: 1, stagger: 0.1 }, 1.2);
    root.querySelectorAll<HTMLElement>("[data-cloud]").forEach((el) => {
      intro.to(
        el,
        { xPercent: Number(el.dataset.dx) * 0.4, yPercent: Number(el.dataset.dy) * 0.4, opacity: 0.75, duration: 3, ease: "power2.out" },
        0
      );
    });

    // Scroll: descend through the clouds toward the site.
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "+=220%", scrub: 1, pin: true },
    });
    tl.to("[data-hero-img]", { scale: 1.9, yPercent: 6, ease: "none", duration: 1 }, 0)
      .to("[data-cloud-layer]", { scale: 2.6, opacity: 0, ease: "power1.in", duration: 0.6 }, 0)
      .to("[data-hero-title]", { yPercent: -40, opacity: 0, ease: "power1.in", duration: 0.35 }, 0)
      .to("[data-hero-meta-wrap]", { opacity: 0, duration: 0.2 }, 0)
      .to("[data-hero-shade]", { opacity: 1, duration: 0.4 }, 0.45)
      .fromTo("[data-why] > *", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.3 }, 0.55);

    return onPreloaderDone(() => intro.play());
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden bg-dark-background text-dark-foreground"
    >
      <div data-hero-img className="absolute inset-0 transform-gpu will-change-transform">
        <div data-hero-img-inner className="absolute inset-0">
          <CinematicImage src={IMAGES.aerial} alt="Aerial view over the city" preload sizes="100vw" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      <div data-hero-shade className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent opacity-0" />

      {/* Cloud layer */}
      <div data-cloud-layer className="absolute inset-0 pointer-events-none origin-center">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            data-cloud
            data-dx={c.dx}
            data-dy={c.dy}
            className="absolute rounded-full"
            style={{
              left: c.left,
              top: c.top,
              width: `${c.size}vw`,
              height: `${c.size * 0.6}vw`,
              background:
                "radial-gradient(closest-side, rgba(245,243,238,0.95), rgba(235,232,226,0.7) 45%, rgba(235,232,226,0) 100%)",
              filter: "blur(18px)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(closest-side, rgba(255,255,255,0.6), transparent)",
                animation: `cloud-drift ${14 + i * 3}s ease-in-out infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Title */}
      <div data-hero-title className="absolute inset-0 flex items-center px-5 md:px-[6vw]">
        <h1 className="text-serif-xl uppercase tracking-[-0.02em] drop-shadow-[0_2px_30px_rgba(0,0,0,0.25)]">
          {BRAND.projectFull.split(" ").map((word) => (
            <span key={word} className="block overflow-hidden pb-[0.06em]">
              {word.split("").map((ch, i) => (
                <span key={i} data-title-char className="inline-block">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div data-hero-meta-wrap className="absolute bottom-0 inset-x-0 px-5 md:px-[3vw] pb-6 flex items-end justify-between">
        <p data-hero-meta className="text-micro text-dark-foreground/80">
          {BRAND.location}
        </p>
        <p data-hero-meta className="text-micro text-dark-foreground/80 flex items-center gap-3">
          <span className="block h-8 w-px bg-dark-foreground/60 animate-pulse" />
          Scroll to descend
        </p>
        <p data-hero-meta className="hidden md:block font-sans text-sm tracking-[0.35em] uppercase font-medium">
          {BRAND.developer}
        </p>
      </div>

      {/* Why here */}
      <div data-why className="absolute left-0 top-0 h-full flex flex-col justify-center px-5 md:px-[6vw] max-w-2xl pointer-events-none">
        <p className="text-micro text-dark-foreground/60 mb-5">01 — The city</p>
        <h2 className="text-serif-lg uppercase">{INTRO.eyebrow}</h2>
        <p className="mt-6 max-w-sm text-sm md:text-base leading-relaxed text-dark-foreground/80">{INTRO.body}</p>
      </div>
    </section>
  );
}
