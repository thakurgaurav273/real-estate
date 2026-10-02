import Lenis from "@studio-freight/lenis";

let instance: Lenis | null = null;

export function initLenis() {
  if (typeof window === "undefined") return null;

  instance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  return instance;
}

export function getLenis() {
  return instance;
}

export function destroyLenis() {
  instance?.destroy();
  instance = null;
}

/** Lock page scroll while overlays (menus, modals, explorers) are open. */
export function lockScroll(locked: boolean) {
  if (typeof document === "undefined") return;
  if (locked) instance?.stop();
  else instance?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export type { Lenis };
