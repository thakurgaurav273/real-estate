import { gsap } from "@/lib/gsap";

export const OPENING_TIMING = {
  nav: {
    duration: 1.0,
    delay: 0.1,
    ease: "power2.out",
  },
  title: {
    duration: 1.4,
    stagger: 0.2,
    ease: "power3.out",
  },
};

export interface OpeningSceneAnimationParams {
  container: HTMLElement;
  titleLines: (HTMLElement | null)[];
  navBrand?: HTMLElement | null;
  navMenu?: HTMLElement | null;
  prefersReducedMotion: boolean;
}

/**
 * Creates and executes the master GSAP animation timeline for the Opening Scene.
 */
export function playOpeningAnimation({
  container,
  titleLines,
  navBrand,
  navMenu,
  prefersReducedMotion,
}: OpeningSceneAnimationParams) {
  const validLines = titleLines.filter(Boolean) as HTMLElement[];
  const navElements = [navBrand, navMenu].filter(Boolean) as HTMLElement[];

  if (prefersReducedMotion) {
    if (navElements.length > 0) {
      gsap.set(navElements, { opacity: 1, y: 0 });
    }
    if (validLines.length > 0) {
      gsap.set(validLines, { opacity: 1, yPercent: 0 });
    }
    return null;
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: OPENING_TIMING.title.ease },
    });

    // 1. Initial hidden state setup to avoid FOUC & layout shifts
    if (navElements.length > 0) {
      gsap.set(navElements, { opacity: 0, y: -15 });
    }
    if (validLines.length > 0) {
      gsap.set(validLines, { opacity: 0, yPercent: 105 });
    }

    tl.addLabel("start");

    // 2. Navigation entrance
    if (navElements.length > 0) {
      tl.addLabel("nav");
      tl.to(
        navElements,
        {
          opacity: 1,
          y: 0,
          duration: OPENING_TIMING.nav.duration,
          ease: OPENING_TIMING.nav.ease,
          stagger: 0.1,
        },
        `start+=${OPENING_TIMING.nav.delay}`
      );
    }

    // 3. Display Title line-by-line masked reveal
    if (validLines.length > 0) {
      tl.addLabel("title");
      tl.to(
        validLines,
        {
          opacity: 1,
          yPercent: 0,
          duration: OPENING_TIMING.title.duration,
          stagger: OPENING_TIMING.title.stagger,
          ease: OPENING_TIMING.title.ease,
        },
        "-=0.6"
      );
    }

    tl.addLabel("settle");
  }, container);

  return ctx;
}
