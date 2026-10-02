"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, registerGSAPPlugins } from "@/lib/gsap";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    registerGSAPPlugins();

    const lenis = initLenis();
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const handleTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(handleTicker);
      destroyLenis();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
