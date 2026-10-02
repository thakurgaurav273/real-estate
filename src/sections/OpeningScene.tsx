"use client";

import { useEffect, useRef } from "react";
import { playOpeningAnimation } from "@/animations/openingScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function OpeningScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const navBrand = document.querySelector<HTMLElement>("[data-nav-brand]");
    const navMenu = document.querySelector<HTMLElement>("[data-nav-menu]");

    const animationCtx = playOpeningAnimation({
      container: containerRef.current,
      titleLines: [line1Ref.current, line2Ref.current],
      navBrand,
      navMenu,
      prefersReducedMotion,
    });

    return () => {
      if (animationCtx && typeof animationCtx.revert === "function") {
        animationCtx.revert();
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="scene-viewport relative w-full overflow-hidden bg-dark-background text-dark-foreground flex items-center justify-center px-5 md:px-[4vw] select-none"
    >
      {/* Central Editorial Display Title with Line Mask Wrappers */}
      <h1 className="text-[clamp(2.75rem,8vw,8.5rem)] font-display font-light uppercase tracking-tight leading-[0.92] text-center max-w-5xl text-dark-foreground flex flex-col items-center">
        <span className="block overflow-hidden py-1">
          <span ref={line1Ref} className="block transform-gpu">
            Raison
          </span>
        </span>
        <span className="block overflow-hidden py-1">
          <span ref={line2Ref} className="block transform-gpu">
            Properties
          </span>
        </span>
      </h1>
    </section>
  );
}
