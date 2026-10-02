"use client";

import { useEffect, useRef } from "react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { playArchitectureGalleryAnimation, GalleryItemRefs } from "@/animations/architectureGalleryScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const GALLERY_DATA = [
  {
    id: "structure",
    num: "01",
    title: "Structure & Form",
    subtitle: "Cantilevered board-formed concrete framing alpine vistas",
    image: "/images/architecture_exterior.jpg",
    alt: "Exterior view of concrete alpine villa at twilight",
  },
  {
    id: "sanctuary",
    num: "02",
    title: "Sanctuary & Light",
    subtitle: "Floor-to-ceiling glass merging living space with mountain horizon",
    image: "/images/interior_living.jpg",
    alt: "Minimalist luxury living room interior with panoramic mountain views",
  },
  {
    id: "material",
    num: "03",
    title: "Material & Permanence",
    subtitle: "Tactile union of raw concrete, dark oiled oak, and patinated bronze",
    image: "/images/material_study.jpg",
    alt: "Architectural material study close-up of concrete and dark oak",
  },
];

export function ArchitectureGalleryScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<GalleryItemRefs[]>([]);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = playArchitectureGalleryAnimation({
      container: containerRef.current,
      items: itemsRef.current,
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
      id="architecture"
      ref={containerRef}
      className="w-full bg-dark-background text-dark-foreground py-24 md:py-36 px-5 md:px-[4vw]"
    >
      {/* Section Header */}
      <div className="w-full max-w-[1800px] mx-auto mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-dark-foreground/15 pb-8">
        <div>
          <p className="text-editorial-label text-dark-foreground/70 mb-2">
            02 — SPATIAL STUDIES
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight">
            Architectural Gallery
          </h2>
        </div>
        <p className="max-w-md text-xs md:text-sm text-dark-foreground/70 leading-relaxed">
          Each domain is engineered to harmonize structural audacity with intimate domestic sanctuary.
        </p>
      </div>

      {/* Gallery Stack */}
      <div id="gallery" className="w-full max-w-[1800px] mx-auto flex flex-col gap-24 md:gap-36">
        {GALLERY_DATA.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) {
                itemsRef.current[index] = {
                  card: el,
                  image: el.querySelector("[data-gallery-image]"),
                  title: el.querySelector("[data-gallery-title]"),
                };
              }
            }}
            className="group relative w-full flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16"
          >
            {/* Image Box */}
            <div
              data-gallery-image
              className="relative w-full lg:w-2/3 h-[50vh] md:h-[70vh] rounded-none overflow-hidden bg-dark-background"
            >
              <CinematicImage
                src={item.image}
                alt={item.alt}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Info Box */}
            <div
              data-gallery-title
              className="w-full lg:w-1/3 flex flex-col justify-between py-4 lg:py-8 border-t lg:border-t-0 lg:border-l border-dark-foreground/15 lg:pl-12"
            >
              <div>
                <span className="font-mono text-xs text-dark-foreground/50 uppercase tracking-widest block mb-4">
                  STUDY / {item.num}
                </span>
                <h3 className="text-2xl md:text-4xl font-display font-light uppercase tracking-tight text-dark-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-foreground/70 leading-relaxed max-w-sm">
                  {item.subtitle}
                </p>
              </div>

              <div className="pt-8 mt-auto">
                <span className="text-[10px] uppercase tracking-[0.2em] text-dark-foreground/50 border border-dark-foreground/20 px-3 py-1.5 inline-block">
                  PERMANENT COLLECTION
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
