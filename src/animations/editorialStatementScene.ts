import { gsap } from "@/lib/gsap";

export interface EditorialStatementAnimationParams {
  container: HTMLElement;
  quoteLines: (HTMLElement | null)[];
  metaText: HTMLElement | null;
  prefersReducedMotion: boolean;
}

export function playEditorialStatementAnimation({
  container,
  quoteLines,
  metaText,
  prefersReducedMotion,
}: EditorialStatementAnimationParams) {
  const validLines = quoteLines.filter(Boolean) as HTMLElement[];

  if (prefersReducedMotion) {
    if (validLines.length > 0) gsap.set(validLines, { opacity: 1, yPercent: 0 });
    if (metaText) gsap.set(metaText, { opacity: 1, y: 0 });
    return null;
  }

  const ctx = gsap.context(() => {
    if (validLines.length > 0) {
      gsap.set(validLines, { opacity: 0, yPercent: 100 });
    }
    if (metaText) {
      gsap.set(metaText, { opacity: 0, y: 20 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    if (validLines.length > 0) {
      tl.to(validLines, {
        opacity: 1,
        yPercent: 0,
        duration: 1.2,
        stagger: 0.18,
      });
    }

    if (metaText) {
      tl.to(
        metaText,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      );
    }
  }, container);

  return ctx;
}
