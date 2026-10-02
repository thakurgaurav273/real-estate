"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { lockScroll } from "@/lib/lenis";
import { useScene } from "@/hooks/useScene";
import { cn } from "@/lib/utils";
import { BRAND, FLOOR_COUNT, UNIT_TYPES, bandForLevel } from "@/content/site";
import { TowerSvg, TOWER, floorY, FLOOR_HEIGHT } from "@/components/tower/TowerSvg";
import { FloorPlate } from "@/components/tower/FloorPlate";
import { UnitPlan } from "@/components/tower/UnitPlan";
import { scrollToHash } from "@/components/menu/MenuDrawer";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function unitSummary(level: number) {
  const band = bandForLevel(level);
  const names = Array.from(new Set(band.units.map((u) => UNIT_TYPES[u.unit].name)));
  return { band, names, count: band.units.length };
}

/* Deterministic star field so server and client render the same markup. */
const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: (i * 37.7) % 100,
  top: (i * 23.3) % 55,
  delay: (i % 7) * 0.6,
  size: i % 9 === 0 ? 2 : 1,
}));

export function TowerExplorer() {
  const [hoverLevel, setHoverLevel] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [unitIndex, setUnitIndex] = useState<number | null>(null);
  const [hoverUnit, setHoverUnit] = useState<number | null>(null);
  const [view3d, setView3d] = useState(false);
  const towerWrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    gsap.from("[data-tower]", {
      yPercent: 12,
      opacity: 0,
      duration: 1.6,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
    gsap.from("[data-explore-copy] > *", {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 55%" },
    });
    gsap.fromTo(
      "[data-sky]",
      { yPercent: -8 },
      { yPercent: 8, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });

  // Track the hovered floor with a horizontal scan line across the scene.
  useEffect(() => {
    const line = lineRef.current;
    const wrap = towerWrapRef.current;
    const section = ref.current;
    if (!line || !wrap || !section) return;
    if (hoverLevel === null) {
      gsap.to(line, { opacity: 0, duration: 0.3 });
      return;
    }
    const svg = wrap.querySelector("svg");
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const scale = svgRect.height / TOWER.height;
    const y = svgRect.top - sectionRect.top + (floorY(hoverLevel) + FLOOR_HEIGHT / 2) * scale;
    gsap.to(line, { y, opacity: 1, duration: 0.35, ease: "power2.out" });
  }, [hoverLevel, ref]);

  const close = useCallback((after?: () => void) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(overlay, {
      clipPath: "inset(50% 0% 50% 0%)",
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => {
        setLevel(null);
        setUnitIndex(null);
        setView3d(false);
        // Let the scroll lock release before travelling elsewhere on the page.
        if (after) requestAnimationFrame(after);
      },
    });
  }, []);

  const openLevel = useCallback((l: number) => {
    setLevel(l);
    setUnitIndex(null);
    setHoverLevel(null);
  }, []);

  // Overlay entrance + scroll lock
  useEffect(() => {
    const open = level !== null;
    lockScroll(open);
    if (open && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { clipPath: "inset(50% 0% 50% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" }
      );
    }
  }, [level !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stage transitions inside the overlay
  useEffect(() => {
    if (level === null || !overlayRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-stage] [data-stagger]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        "[data-stage-visual]",
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
      );
    }, overlayRef);
    return () => ctx.revert();
  }, [level, unitIndex]);

  useEffect(() => {
    if (level === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (unitIndex !== null) setUnitIndex(null);
      else close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [level, unitIndex, close]);

  const hoverInfo = hoverLevel !== null ? unitSummary(hoverLevel) : null;
  const current = level !== null ? unitSummary(level) : null;
  const unit = current && unitIndex !== null ? UNIT_TYPES[current.band.units[unitIndex].unit] : null;

  return (
    <section
      id="residences"
      ref={ref}
      className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-dusk text-dark-foreground"
    >
      {/* Dusk sky */}
      <div
        data-sky
        className="absolute inset-[-10%_0]"
        style={{
          background:
            "linear-gradient(180deg, #070b14 0%, #131d33 35%, #34405a 62%, #a7795a 86%, #e3a46b 100%)",
        }}
      />
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle 4s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Scan line */}
      <div ref={lineRef} className="absolute left-0 right-0 top-0 h-px opacity-0 pointer-events-none z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="absolute inset-x-0 -top-6 h-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md" />
      </div>

      {/* Tower */}
      <div ref={towerWrapRef} data-tower className="absolute inset-x-0 bottom-0 top-[6vh] flex justify-end md:justify-center translate-x-[28%] md:translate-x-0 opacity-70 md:opacity-100">
        <TowerSvg activeLevel={hoverLevel} onHover={setHoverLevel} onSelect={openLevel} />
      </div>

      {/* Copy */}
      <div
        data-explore-copy
        className="relative z-20 h-full flex flex-col justify-center px-5 md:px-[5vw] max-w-xl pointer-events-none"
      >
        <p className="text-micro text-dark-foreground/60 mb-5">02 — Residences</p>
        <h2 className="text-serif-lg uppercase">
          Explore
          <br />
          Residences
        </h2>
        <p className="text-micro text-dark-foreground/70 mt-5">Select a level to discover the residences</p>

        <div className="mt-10 h-24 border-l border-dark-foreground/25 pl-5">
          {hoverInfo && hoverLevel !== null ? (
            <div key={hoverLevel} className="animate-[fadeIn_300ms_ease]">
              <p className="font-display text-3xl">Level {pad(hoverLevel)}</p>
              <p className="text-micro text-dark-foreground/70 mt-2 leading-relaxed">
                {hoverInfo.names.join(" · ")}
              </p>
              <p className="text-micro text-dark-foreground/50 mt-1">{hoverInfo.count} residences on this level</p>
            </div>
          ) : (
            <p className="text-micro text-dark-foreground/45 leading-relaxed">
              {FLOOR_COUNT} levels · 1 BHK to 4 BHK penthouses
              <br />
              Hover the tower, click to enter
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-5 md:left-[3vw] z-20">
        <p className="font-display text-lg uppercase tracking-[0.12em]">{BRAND.projectFull}</p>
        <p className="text-micro text-dark-foreground/60">{BRAND.location}</p>
      </div>
      <p className="hidden md:block absolute bottom-6 right-[3vw] z-20 font-sans text-sm tracking-[0.35em] uppercase font-medium">
        {BRAND.developer}
      </p>

      {/* Floor / unit overlay */}
      {level !== null && current && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Level ${level}`}
          className="fixed inset-0 z-50 bg-[#0a0d14] text-dark-foreground overflow-y-auto"
          style={{ clipPath: "inset(50% 0% 50% 0%)" }}
        >
          <div className="min-h-full flex flex-col px-5 md:px-[3vw] pt-24 md:pt-28 pb-8">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => (unit ? setUnitIndex(null) : close())}
                className="text-micro flex items-center gap-3 text-dark-foreground/70 hover:text-dark-foreground transition-colors cursor-pointer"
              >
                <span className="block h-px w-8 bg-current" />
                {unit ? "Back to floor" : "Back to building"}
              </button>
              <button
                type="button"
                onClick={() => close()}
                className="text-micro text-dark-foreground/70 hover:text-dark-foreground cursor-pointer"
              >
                Close [✕]
              </button>
            </div>

            {!unit ? (
              <div data-stage key={`floor-${level}`} className="flex-1 grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 mt-8">
                <div className="flex flex-col">
                  <div>
                    <h3 data-stagger className="font-display text-5xl md:text-7xl uppercase">
                      Level {pad(level)}
                    </h3>
                    <p data-stagger className="text-micro text-dark-foreground/70 mt-3">
                      {current.names.join(" · ")}
                    </p>
                    <p data-stagger className="text-micro text-dark-foreground/45 mt-1">
                      Select a residence to view its plan
                    </p>
                  </div>
                  <div data-stage-visual className="flex-1 flex items-center justify-center py-8 md:px-[4vw]">
                    <div className="w-full max-w-5xl">
                      <FloorPlate
                        band={current.band}
                        hovered={hoverUnit}
                        onHover={setHoverUnit}
                        onSelect={(i) => {
                          setHoverUnit(null);
                          setUnitIndex(i);
                        }}
                      />
                    </div>
                  </div>
                  <p data-stagger className="text-micro text-center text-dark-foreground/60">
                    {current.band.title} of levels {pad(current.band.from)} — {pad(current.band.to)}
                  </p>
                </div>

                {/* Level rail */}
                <ol className="hidden md:flex flex-col-reverse justify-center gap-[3px] pr-1" aria-label="Levels">
                  {Array.from({ length: FLOOR_COUNT }, (_, i) => i + 1).map((l) => (
                    <li key={l}>
                      <button
                        type="button"
                        onClick={() => openLevel(l)}
                        className={cn(
                          "group flex items-center gap-2 text-[10px] tabular-nums cursor-pointer transition-colors",
                          l === level ? "text-dark-foreground" : "text-dark-foreground/35 hover:text-dark-foreground/80"
                        )}
                      >
                        <span className="w-5 text-right">{pad(l)}</span>
                        <span
                          className={cn(
                            "block h-px bg-current transition-all",
                            l === level ? "w-8" : "w-3 group-hover:w-5"
                          )}
                        />
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div data-stage key={`unit-${level}-${unitIndex}`} className="flex-1 grid lg:grid-cols-[1fr_1.6fr] gap-10 items-center mt-8">
                <div>
                  <p data-stagger className="text-micro text-dark-foreground/60">
                    Level {pad(level)} · {unit.type}
                  </p>
                  <h3 data-stagger className="font-display text-5xl md:text-7xl uppercase mt-3 leading-[0.92]">
                    {unit.name}
                  </h3>
                  <dl data-stagger className="mt-10 grid grid-cols-3 gap-6 border-t border-dark-foreground/15 pt-6 max-w-md">
                    {[
                      ["Internal", unit.internal],
                      ["Balcony", unit.balcony],
                      ["Total", unit.total],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-micro text-dark-foreground/50">{k}</dt>
                        <dd className="font-display text-2xl mt-1">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div data-stagger className="mt-10 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setView3d((v) => !v)}
                      className="text-micro rounded-full border border-dark-foreground/40 px-6 py-3 hover:bg-dark-foreground hover:text-dark-background transition-colors cursor-pointer"
                    >
                      {view3d ? "View in 2D" : "View in 3D"}
                    </button>
                    <button
                      type="button"
                      onClick={() => close(() => scrollToHash("#contact"))}
                      className="text-micro rounded-full bg-dark-foreground text-dark-background px-6 py-3 hover:opacity-85 transition-opacity cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                  <div data-stagger className="mt-10 flex gap-2 flex-wrap">
                    {current.band.units.map((u, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setUnitIndex(i)}
                        className={cn(
                          "text-micro px-3 py-2 border cursor-pointer transition-colors",
                          i === unitIndex
                            ? "border-dark-foreground text-dark-foreground"
                            : "border-dark-foreground/15 text-dark-foreground/50 hover:text-dark-foreground"
                        )}
                        style={{ borderLeftColor: UNIT_TYPES[u.unit].color, borderLeftWidth: 3 }}
                      >
                        {UNIT_TYPES[u.unit].type} · {pad(i + 1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div data-stage-visual className="[perspective:1600px]">
                  <div
                    className="bg-[#FBFAF7] p-4 md:p-8 shadow-2xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: view3d ? "rotateX(52deg) rotateZ(-28deg) scale(0.86)" : "none",
                      transformStyle: "preserve-3d",
                      boxShadow: view3d ? "-30px 60px 80px rgba(0,0,0,0.55)" : undefined,
                    }}
                  >
                    <UnitPlan unit={unit} />
                    <div className="flex justify-between mt-4 text-[9px] tracking-[0.2em] uppercase text-neutral-500">
                      <span>{BRAND.projectFull}</span>
                      <span>
                        {unit.type} · Level {pad(level)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
