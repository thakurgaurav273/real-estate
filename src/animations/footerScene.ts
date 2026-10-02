import { gsap } from "@/lib/gsap";

export interface FooterAnimationParams {
  container: HTMLElement;
  brandText: HTMLElement | null;
  contactText: HTMLElement | null;
  prefersReducedMotion: boolean;
}

export function playFooterAnimation({
  container,
  brandText,
  contactText,
  prefersReducedMotion,
}: FooterAnimationParams) {
  if (prefersReducedMotion) {
    if (brandText) gsap.set(brandText, { opacity: 1, y: 0 });
    if (contactText) gsap.set(contactText, { opacity: 1, y: 0 });
    return null;
  }

  const ctx = gsap.context(() => {
    if (brandText) gsap.set(brandText, { opacity: 0, y: 30 });
    if (contactText) gsap.set(contactText, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    if (brandText) {
      tl.to(brandText, {
        opacity: 1,
        y: 0,
        duration: 1.2,
      });
    }

    if (contactText) {
      tl.to(
        contactText,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.8"
      );
    }
  }, container);

  return ctx;
}
