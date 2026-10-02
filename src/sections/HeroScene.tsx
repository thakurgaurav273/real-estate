"use client";

import { useEffect, useRef } from "react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { playHeroSceneAnimation } from "@/animations/heroScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = playHeroSceneAnimation({
      container: containerRef.current,
      image: imageRef.current,
      titleLines: [line1Ref.current, line2Ref.current],
      metaElements: [labelRef.current, footerRef.current],
      prefersReducedMotion,
    });

    return () => {
      if (ctx && typeof ctx.revert === "function") {
        ctx.revert();
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="overview"
      ref={containerRef}
      className="scene-viewport relative w-full overflow-hidden bg-dark-background text-dark-foreground flex flex-col justify-between pt-[14vw] md:pt-[10vw] pb-10 px-5 md:px-[4vw]"
    >
      {/* Background Image Container */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none transform-gpu"
      >
        <CinematicImage
          src="/images/hero.jpg"
          alt="Architectural alpine residence"
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-background via-dark-background/40 to-dark-background/60" />
      </div>

      {/* Top Header Meta */}
      <div className="relative z-10 w-full flex justify-between items-start">
        <p ref={labelRef} className="text-editorial-label text-dark-foreground/80">
          01 — PRIVATE ESTATE / ZÜRICH
        </p>
      </div>

      {/* Main Display Headline with Line Mask Wrappers */}
      <div className="relative z-10 w-full my-auto py-12">
        <h2 className="text-[clamp(2.5rem,7vw,7.5rem)] font-display font-light uppercase tracking-tight leading-[0.92] text-dark-foreground max-w-5xl flex flex-col items-start">
          <span className="block overflow-hidden py-1">
            <span ref={line1Ref} className="block transform-gpu">
              Architectural
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span ref={line2Ref} className="block transform-gpu">
              Elevation
            </span>
          </span>
        </h2>
      </div>

      {/* Footer Meta */}
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
          A study in space, light, and materiality across alpine topography.
        </div>
      </div>
    </section>
  );
}
