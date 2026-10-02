"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getLenis, lockScroll } from "@/lib/lenis";
import { BRAND } from "@/content/site";

export interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MENU_ITEMS = [
  { label: "Residences", href: "#residences" },
  { label: "Interiors", href: "#interiors" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Wellness", href: "#wellness" },
  { label: "Enquire", href: "#contact" },
];

export function scrollToHash(href: string) {
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else target.scrollIntoView({ behavior: "smooth" });
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    lockScroll(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!drawerRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        if (prefersReducedMotion) {
          gsap.set(drawerRef.current, { display: "flex", opacity: 1 });
          gsap.set(linksRef.current, { opacity: 1, y: 0 });
          gsap.set(footerRef.current, { opacity: 1 });
        } else {
          const tl = gsap.timeline();
          gsap.set(drawerRef.current, { display: "flex" });

          tl.fromTo(
            drawerRef.current,
            { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 0.8,
              ease: "power4.inOut",
            }
          )
            .fromTo(
              linksRef.current.filter(Boolean),
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.3"
            )
            .fromTo(
              footerRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              "-=0.4"
            );
        }
      } else {
        if (prefersReducedMotion) {
          gsap.set(drawerRef.current, { display: "none" });
        } else {
          gsap.to(drawerRef.current, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            duration: 0.6,
            ease: "power4.inOut",
            onComplete: () => {
              if (drawerRef.current) {
                gsap.set(drawerRef.current, { display: "none" });
              }
            },
          });
        }
      }
    }, drawerRef);

    return () => ctx.revert();
  }, [isOpen, prefersReducedMotion]);

  const handleLinkClick = (href: string) => {
    onClose();
    lockScroll(false);
    scrollToHash(href);
  };

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 hidden flex-col justify-between bg-forest text-dark-foreground px-6 py-12 md:px-[4vw] md:py-[3vw] select-none"
    >
      {/* Drawer Top Header */}
      <div className="flex items-center justify-between w-full pt-4">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-dark-foreground/70">
          NAVIGATION
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="font-sans text-xs uppercase tracking-[0.2em] text-dark-foreground/80 hover:text-dark-foreground transition-colors cursor-pointer border-0 bg-transparent"
        >
          CLOSE [✕]
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="my-auto flex flex-col items-start gap-4 md:gap-6 py-8">
        {MENU_ITEMS.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            ref={(el) => {
              linksRef.current[index] = el;
            }}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(item.href);
            }}
            className="group flex items-baseline gap-5 text-5xl md:text-8xl font-display tracking-tight text-dark-foreground/70 hover:text-dark-foreground transition-all duration-300 hover:translate-x-3 hover:italic"
          >
            <span className="text-micro text-dark-foreground/40 not-italic">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Drawer Footer Meta */}
      <div
        ref={footerRef}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-t border-dark-foreground/15 pt-6 text-xs text-dark-foreground/60"
      >
        <div>
          <p className="font-sans uppercase tracking-widest text-dark-foreground/90 font-medium">
            {BRAND.developer}
          </p>
          <p className="mt-0.5">{BRAND.email}</p>
        </div>
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest">
          {BRAND.location}
        </div>
      </div>
    </div>
  );
}
