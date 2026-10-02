"use client";

import { useEffect, useRef } from "react";
import { playEditorialStatementAnimation } from "@/animations/editorialStatementScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function EditorialStatementScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = playEditorialStatementAnimation({
      container: containerRef.current,
      quoteLines: [line1Ref.current, line2Ref.current, line3Ref.current],
      metaText: metaRef.current,
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
      id="manifesto"
      ref={containerRef}
      className="scene-viewport relative w-full bg-background text-foreground flex flex-col justify-center items-center px-5 md:px-[4vw] py-24 md:py-36 select-none"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Editorial Label */}
        <p className="text-editorial-label text-muted-foreground mb-12">
          03 — ARCHITECTURAL MANIFESTO
        </p>

        {/* Large Quote Statement */}
        <blockquote className="text-[clamp(2rem,5vw,5rem)] font-display font-light uppercase tracking-tight leading-[1.05] text-foreground mb-12 flex flex-col items-center">
          <span className="block overflow-hidden py-1">
            <span ref={line1Ref} className="block transform-gpu">
              &ldquo;Architecture is the restraint
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span ref={line2Ref} className="block transform-gpu">
              of noise, creating space for
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span ref={line3Ref} className="block transform-gpu italic font-normal">
              stillness and permanence.&rdquo;
            </span>
          </span>
        </blockquote>

        {/* Supporting Meta Attribution */}
        <p
          ref={metaRef}
          className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-muted-foreground max-w-md"
        >
          RAISON ARCHITECTURAL DESIGN STUDIO — SWITZERLAND
        </p>
      </div>
    </section>
  );
}
