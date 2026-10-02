import { gsap } from "@/lib/gsap";

export interface HeroSceneAnimationParams {
  container: HTMLElement;
  image: HTMLElement | null;
  titleLines: (HTMLElement | null)[];
  metaElements: (HTMLElement | null)[];
  prefersReducedMotion: boolean;
}

export function playHeroSceneAnimation({
  container,
  image,
  titleLines,
  metaElements,
  prefersReducedMotion,
}: HeroSceneAnimationParams) {
  const validLines = titleLines.filter(Boolean) as HTMLElement[];
  const validMeta = metaElements.filter(Boolean) as HTMLElement[];

  if (prefersReducedMotion) {
    if (image) gsap.set(image, { scale: 1, filter: "brightness(0.9)" });
    if (validLines.length > 0) gsap.set(validLines, { opacity: 1, yPercent: 0 });
    if (validMeta.length > 0) gsap.set(validMeta, { opacity: 1, y: 0 });
    return null;
  }

  const ctx = gsap.context(() => {
    // 1. Initial State Setup
    if (validLines.length > 0) {
      gsap.set(validLines, { opacity: 0, yPercent: 100 });
    }
    if (validMeta.length > 0) {
      gsap.set(validMeta, { opacity: 0, y: 20 });
    }
    if (image) {
      gsap.set(image, { scale: 1.12, filter: "brightness(0.75)" });
    }

    // 2. Entrance Animation on Scroll
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    if (image) {
      entranceTl.to(image, {
        scale: 1,
        filter: "brightness(0.85)",
        duration: 1.6,
      });
    }

    if (validLines.length > 0) {
      entranceTl.to(
        validLines,
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.2,
          stagger: 0.15,
        },
        "-=1.2"
      );
    }

    if (validMeta.length > 0) {
      entranceTl.to(
        validMeta,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.8"
      );
    }

    // 3. Scroll Scrubbing Parallax & Scale
    if (image) {
      gsap.to(image, {
        yPercent: 15,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, container);

  return ctx;
}
