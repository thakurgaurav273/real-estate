import { gsap } from "@/lib/gsap";

export interface SpecsFeatureAnimationParams {
  container: HTMLElement;
  header: HTMLElement | null;
  specItems: (HTMLElement | null)[];
  prefersReducedMotion: boolean;
}

export function playSpecsFeatureAnimation({
  container,
  header,
  specItems,
  prefersReducedMotion,
}: SpecsFeatureAnimationParams) {
  const validItems = specItems.filter(Boolean) as HTMLElement[];

  if (prefersReducedMotion) {
    if (header) gsap.set(header, { opacity: 1, y: 0 });
    if (validItems.length > 0) gsap.set(validItems, { opacity: 1, y: 0 });
    return null;
  }

  const ctx = gsap.context(() => {
    if (header) {
      gsap.set(header, { opacity: 0, y: 30 });
    }
    if (validItems.length > 0) {
      gsap.set(validItems, { opacity: 0, y: 30 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    if (header) {
      tl.to(header, {
        opacity: 1,
        y: 0,
        duration: 1,
      });
    }

    if (validItems.length > 0) {
      tl.to(
        validItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
        },
        "-=0.6"
      );
    }
  }, container);

  return ctx;
}
