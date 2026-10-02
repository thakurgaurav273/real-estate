"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Scopes a GSAP setup to a section element and reverts it on unmount.
 * The setup receives the section root and the reduced-motion flag; selector
 * strings inside it resolve within the section only. A returned function runs
 * on revert, for listeners registered during setup.
 */
export function useScene<T extends HTMLElement = HTMLElement>(
  setup: (root: T, reduced: boolean) => void | (() => void),
  deps: DependencyList = []
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const ctx = gsap.context(() => setup(root, reduced), root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);

  return ref;
}
