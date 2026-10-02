"use client";

import { useEffect, useRef } from "react";
import { playSpecsFeatureAnimation } from "@/animations/specsFeatureScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPECS_DATA = [
  { label: "LOCATION", value: "Zürich Alpine Ridge, Switzerland" },
  { label: "GROSS FLOOR AREA", value: "1,420 m² / 15,280 sq ft" },
  { label: "SITE LANDSCAPE", value: "4,850 m² Private Alpine Forest" },
  { label: "MATERIALITY", value: "Board-Formed Concrete, Dark Oiled Oak, Brushed Bronze" },
  { label: "SUSTAINABILITY", value: "Minergie-P Eco Certified & Geothermal Heating" },
  { label: "COMPLETION", value: "Q4 2026" },
];

export function SpecsFeatureScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = playSpecsFeatureAnimation({
      container: containerRef.current,
      header: headerRef.current,
      specItems: itemsRef.current,
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
      id="specs"
      ref={containerRef}
      className="w-full bg-dark-background text-dark-foreground py-24 md:py-36 px-5 md:px-[4vw]"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-24 border-b border-dark-foreground/15 pb-8">
          <p className="text-editorial-label text-dark-foreground/70 mb-2">
            04 — SPECIFICATIONS
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight">
            Architectural Data
          </h2>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-foreground/15 border border-dark-foreground/15">
          {SPECS_DATA.map((spec, index) => (
            <div
              key={spec.label}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group bg-dark-background p-8 md:p-12 flex flex-col justify-between transition-colors duration-300 hover:bg-dark-background/80"
            >
              <span className="font-mono text-xs text-dark-foreground/50 uppercase tracking-widest block mb-8">
                {spec.label}
              </span>
              <p className="text-lg md:text-xl font-display font-light text-dark-foreground group-hover:text-dark-foreground/90 transition-colors">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
