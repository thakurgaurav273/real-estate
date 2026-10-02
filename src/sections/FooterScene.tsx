"use client";

import { useEffect, useRef } from "react";
import { playFooterAnimation } from "@/animations/footerScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function FooterScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = playFooterAnimation({
      container: containerRef.current,
      brandText: brandRef.current,
      contactText: contactRef.current,
      prefersReducedMotion,
    });

    return () => {
      if (ctx && typeof ctx.revert === "function") {
        ctx.revert();
      }
    };
  }, [prefersReducedMotion]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      className="w-full bg-dark-background text-dark-foreground pt-24 pb-12 px-5 md:px-[4vw] border-t border-dark-foreground/15 select-none"
    >
      <div className="w-full max-w-[1800px] mx-auto flex flex-col justify-between min-h-[60vh]">
        {/* Contact Header */}
        <div ref={contactRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-16">
          <div>
            <p className="text-editorial-label text-dark-foreground/60 mb-3">
              INQUIRIES & ACQUISITIONS
            </p>
            <a
              href="mailto:inquiries@raisonproperties.ch"
              className="text-2xl md:text-4xl font-display font-light text-dark-foreground hover:opacity-70 transition-opacity"
            >
              inquiries@raisonproperties.ch
            </a>
          </div>

          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Back to top"
            className="font-sans text-xs uppercase tracking-[0.2em] text-dark-foreground/70 hover:text-dark-foreground transition-colors border-0 bg-transparent cursor-pointer p-0"
          >
            TOP ↑
          </button>
        </div>

        {/* Large Brand Typography */}
        <div className="my-auto py-12">
          <h2
            ref={brandRef}
            className="text-[clamp(2.5rem,9.5vw,10.5rem)] font-display font-light uppercase tracking-tight leading-[0.9] text-dark-foreground/90"
          >
            Raison Properties
          </h2>
        </div>

        {/* Copyright Footer Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-dark-foreground/10 text-xs text-dark-foreground/50">
          <span>© 2026 RAISON PROPERTIES. ALL RIGHTS RESERVED.</span>
          <span className="font-mono text-[10px] uppercase tracking-widest">
            ZÜRICH / SWITZERLAND
          </span>
        </div>
      </div>
    </footer>
  );
}
