"use client";

import { useEffect, useRef } from "react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Intro entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.4 } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.15, filter: "brightness(0.7)" },
        { scale: 1, filter: "brightness(0.9)", duration: 2 }
      )
        .fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=1.5"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=1.1"
        )
        .fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.9"
        );

      // Scroll-driven subtle parallax zoom
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="scene-viewport relative w-full overflow-hidden bg-dark-background text-dark-foreground flex flex-col justify-between pt-[12vw] md:pt-[10vw] pb-10 px-5 md:px-[4vw]"
    >
      {/* Background Image Container */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      >
        <CinematicImage
          src="/images/hero.jpg"
          alt="Architectural residence exterior"
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle dark gradient overlay for optimal editorial text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-background/90 via-dark-background/40 to-dark-background/60" />
      </div>

      {/* Hero Header Meta */}
      <div className="relative z-10 w-full flex justify-between items-start">
        <p ref={labelRef} className="text-editorial-label text-dark-foreground/80">
          01 — PRIVATE ESTATE / ZÜRICH
        </p>
      </div>

      {/* Main Display Headline */}
      <div className="relative z-10 w-full my-auto py-12">
        <h1
          ref={titleRef}
          className="text-display-giant text-dark-foreground uppercase tracking-tight font-display max-w-5xl"
        >
          Architectural Elevation
        </h1>
      </div>

      {/* Hero Footer Meta */}
      <div
        ref={footerRef}
        className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-8 border-t border-dark-foreground/15 text-metadata text-dark-foreground/70"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-dark-foreground/90">
            47.3769° N, 8.5417° E
          </p>
          <p className="text-xs text-dark-foreground/60 mt-0.5">
            Designed for timeless permanence
          </p>
        </div>

        <div className="max-w-xs text-xs leading-relaxed text-dark-foreground/80">
          A study in space, light, and materiality across alpine typography.
        </div>
      </div>
    </section>
  );
}
