"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { lockScroll } from "@/lib/lenis";
import { BRAND } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const PRELOADER_DONE = "preloader:done";

export function markPreloaderDone() {
  (window as Window & { __preloaderDone?: boolean }).__preloaderDone = true;
  window.dispatchEvent(new Event(PRELOADER_DONE));
}

/** Calls `cb` once the intro curtain has lifted (immediately if it already has). */
export function onPreloaderDone(cb: () => void) {
  if ((window as Window & { __preloaderDone?: boolean }).__preloaderDone) {
    cb();
    return () => {};
  }
  window.addEventListener(PRELOADER_DONE, cb, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE, cb);
}

const TICKS = 14;

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      markPreloaderDone();
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    lockScroll(true);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          lockScroll(false);
          setHidden(true);
        },
      });
      tl.from("[data-tick]", {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        stagger: { each: 0.07, from: "end" },
        ease: "power2.out",
      })
        .from("[data-rule]", { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, "-=0.4")
        .from("[data-word]", { yPercent: 110, duration: 0.9, stagger: 0.08, ease: "power3.out" }, "-=0.5")
        .from("[data-sub]", { opacity: 0, duration: 0.6 }, "-=0.4")
        .to("[data-inner]", { opacity: 0, y: -30, duration: 0.6, ease: "power2.in" }, "+=0.5")
        .add(markPreloaderDone, "-=0.1")
        .to(root, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "-=0.2");
    }, root);

    return () => {
      ctx.revert();
      lockScroll(false);
    };
  }, [reduced]);

  if (hidden || reduced) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[60] bg-dark-background text-dark-foreground flex items-center justify-center"
    >
      <div data-inner className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-[7px]">
          {Array.from({ length: TICKS }).map((_, i) => (
            <span
              key={i}
              data-tick
              className="block h-px bg-dark-foreground/70 origin-center"
              style={{ width: `${18 + (i % 3) * 6}px` }}
            />
          ))}
        </div>
        <span data-rule className="block h-px w-56 md:w-72 bg-dark-foreground/40 mt-8 origin-center" />
        <p className="mt-10 font-display text-xl md:text-2xl uppercase tracking-[0.18em] flex gap-3 overflow-hidden">
          {BRAND.projectFull.split(" ").map((w) => (
            <span key={w} data-word className="inline-block">
              {w}
            </span>
          ))}
        </p>
        <p data-sub className="text-micro text-dark-foreground/50 mt-3">
          {BRAND.location}
        </p>
      </div>
    </div>
  );
}
