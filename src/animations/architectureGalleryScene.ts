import { gsap } from "@/lib/gsap";

export interface GalleryItemRefs {
  card: HTMLElement | null;
  image: HTMLElement | null;
  title: HTMLElement | null;
}

export interface ArchitectureGalleryAnimationParams {
  container: HTMLElement;
  items: GalleryItemRefs[];
  prefersReducedMotion: boolean;
}

export function playArchitectureGalleryAnimation({
  container,
  items,
  prefersReducedMotion,
}: ArchitectureGalleryAnimationParams) {
  if (prefersReducedMotion) {
    items.forEach(({ card, image, title }) => {
      if (card) gsap.set(card, { opacity: 1, y: 0 });
      if (image) gsap.set(image, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
      if (title) gsap.set(title, { opacity: 1, y: 0 });
    });
    return null;
  }

  const ctx = gsap.context(() => {
    items.forEach(({ card, image, title }) => {
      if (!card) return;

      // Set initial state
      if (image) {
        gsap.set(image, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.1 });
      }
      if (title) {
        gsap.set(title, { opacity: 0, y: 30 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      if (image) {
        tl.to(image, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.4,
          ease: "power4.inOut",
        });
      }

      if (title) {
        tl.to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8"
        );
      }
    });
  }, container);

  return ctx;
}
