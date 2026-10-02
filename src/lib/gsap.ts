import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGSAPPlugins() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
}

// Auto-register on module import if running in browser
if (typeof window !== "undefined") {
  registerGSAPPlugins();
}

export { gsap, ScrollTrigger };
