"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/content/site";
import { MenuDrawer, MENU_ITEMS, scrollToHash } from "@/components/menu/MenuDrawer";

export interface NavigationProps {
  className?: string;
}

/**
 * Fixed header rendered with mix-blend-difference so it stays legible over
 * both the paper sections and the dark cinematic scenes.
 */
export function Navigation({ className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 pointer-events-none w-full text-white mix-blend-difference",
          "px-5 pt-5 md:px-[3vw] md:pt-[2vw]",
          "flex items-start justify-between",
          className
        )}
      >
        <a
          href="#top"
          data-nav-brand
          onClick={(e) => {
            e.preventDefault();
            scrollToHash("#top");
          }}
          className="pointer-events-auto select-none leading-none"
        >
          <span className="block font-display text-2xl md:text-[1.7rem] tracking-tight">
            {BRAND.project}
          </span>
          <span className="block text-micro mt-1 opacity-70">{BRAND.tagline}</span>
        </a>

        <div data-nav-menu className="pointer-events-auto flex items-center gap-8">
          <ul className="hidden lg:flex items-center gap-7">
            {MENU_ITEMS.slice(0, 4).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(item.href);
                  }}
                  className="text-micro opacity-75 hover:opacity-100 transition-opacity"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            className="group flex items-center gap-3 text-micro bg-transparent border-0 p-0 cursor-pointer"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-current transition-all group-hover:w-4" />
              <span className="block h-px w-6 bg-current" />
            </span>
            Menu
          </button>
        </div>
      </nav>

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
